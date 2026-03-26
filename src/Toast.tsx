import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
  topOffset = 40,
  bottomOffset = 40,
  onPress,
  onAnimationEnd,
  customView,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(position === 'top' ? -150 : 150);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(
        0,
        {
          damping: 15,
          stiffness: 100,
        },
        (finished) => {
          if (finished && onAnimationEnd) {
            runOnJS(onAnimationEnd)(true);
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
  }, [isVisible, opacity, translateY, position, onAnimationEnd]);

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

  const getContainerStyle = () => {
    const isTop = position === 'top';
    return [
      styles.container,
      isTop
        ? { top: insets.top + topOffset }
        : { bottom: insets.bottom + bottomOffset },
      animatedStyle,
    ] as any;
  };

  return (
    <Animated.View
      // @ts-ignore - TS2589 bypass
      style={getContainerStyle()}
      pointerEvents={isVisible ? 'box-none' : 'none'}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        disabled={!onPress}
        style={styles.content}
      >
        {customView ? (
          customView
        ) : (
          <>
            <View style={styles.iconContainer}>{getIcon()}</View>
            <View style={styles.textContainer}>
              {text1 && <Text style={styles.text1}>{text1}</Text>}
              {text2 && <Text style={styles.text2}>{text2}</Text>}
            </View>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
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
  content: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
    maxWidth: 400,
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
    color: '#1f2937',
    marginBottom: 4,
  },
  text2: {
    fontSize: 13,
    color: '#6b7280',
  },
});
