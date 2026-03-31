import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ToastProps } from './types';
import { SuccessIcon, ErrorIcon, InfoIcon, WarningIcon } from './icons';

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  type = 'info',
  text1,
  text2,
  position = 'top',
  topOffset = 10,
  bottomOffset = 10,
  theme,
  providerTheme = 'system',
  onPress,
  onAnimationEnd,
  customView,
  animationType = 'fade',
}) => {
  const insets = useSafeAreaInsets();
  const systemTheme = useColorScheme();

  const activeTheme =
    theme && theme !== 'system'
      ? theme
      : providerTheme !== 'system'
      ? providerTheme
      : systemTheme;

  const isDark = activeTheme === 'dark';

  const translateY = useSharedValue(position === 'top' ? -150 : 150);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      if (animationType === 'fade') {
        translateY.value = position === 'top' ? -20 : 20;
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished && onAnimationEnd) {
            runOnJS(onAnimationEnd)(true);
          }
        });
      } else if (animationType === 'slide') {
        translateY.value = position === 'top' ? -150 : 150;
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished && onAnimationEnd) {
            runOnJS(onAnimationEnd)(true);
          }
        });
      } else {
        // spring
        translateY.value = position === 'top' ? -150 : 150;
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withSpring(
          0,
          {
            damping: 40,
            stiffness: 250,
          },
          (finished) => {
            if (finished && onAnimationEnd) {
              runOnJS(onAnimationEnd)(true);
            }
          }
        );
      }
    } else {
      if (animationType === 'fade') {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(
          position === 'top' ? -20 : 20,
          { duration: 300 },
          (finished) => {
            if (finished && onAnimationEnd) {
              runOnJS(onAnimationEnd)(false);
            }
          }
        );
      } else {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(
          position === 'top' ? -150 : 150,
          { duration: 300 },
          (finished) => {
            if (finished && onAnimationEnd) {
              runOnJS(onAnimationEnd)(false);
            }
          }
        );
      }
    }
  }, [isVisible, opacity, translateY, position, onAnimationEnd, animationType]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };

  const getPositionStyle = () => {
    const isTop = position === 'top';
    return [
      styles.container,
      isTop
        ? { top: insets.top + topOffset }
        : { bottom: insets.bottom + bottomOffset },
    ] as any;
  };

  const contentStyle = [
    styles.content,
    isDark ? styles.contentDark : styles.contentLight,
  ];
  const text1Style = [
    styles.text1,
    isDark ? styles.text1Dark : styles.text1Light,
  ];
  const text2Style = [
    styles.text2,
    isDark ? styles.text2Dark : styles.text2Light,
  ];

  return (
    <View
      style={getPositionStyle()}
      pointerEvents={isVisible ? 'box-none' : 'none'}
    >
      <Animated.View
        // @ts-ignore - TS2589 bypass
        style={
          [
            ...(customView ? [styles.customContent] : contentStyle),
            animatedStyle,
          ] as any
        }
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          disabled={!onPress}
          style={customView ? undefined : styles.touchableContent}
        >
          {customView ? (
            customView
          ) : (
            <>
              <View style={styles.iconContainer}>{getIcon()}</View>
              <View style={styles.textContainer}>
                {text1 && <Text style={text1Style}>{text1}</Text>}
                {text2 && <Text style={text2Style}>{text2}</Text>}
              </View>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
  },
  customContent: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    borderRadius: 12,
    width: '100%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    maxWidth: 400,
  },
  touchableContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  contentLight: {
    backgroundColor: '#ffffff',
    shadowColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.3)' : '#000',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  contentDark: {
    backgroundColor: '#1f2937',
    shadowColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.3)' : '#000',
    borderWidth: 1,
    borderColor: '#374151',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  text1Light: {
    color: '#1f2937',
  },
  text1Dark: {
    color: '#f9fafb',
  },
  text2: {
    fontSize: 13,
  },
  text2Light: {
    color: '#6b7280',
  },
  text2Dark: {
    color: '#9ca3af',
  },
});
