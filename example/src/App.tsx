import {
  View,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { ToastProvider, Toast } from '@selimh/react-native-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ToastProvider theme="system">
        <SafeAreaView
          style={[styles.container, isDark && styles.containerDark]}
        >
          <Text style={[styles.title, isDark && styles.titleDark]}>
            React Native Toast Test
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Default Toast (System Theme)"
                onPress={() =>
                  Toast.show({
                    type: 'success',
                    text1: 'Great Success!',
                    text2: 'The toast works perfectly.',
                    position: 'top',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Force Dark Theme"
                onPress={() =>
                  Toast.show({
                    type: 'info',
                    theme: 'dark',
                    text1: 'Dark Mode',
                    text2: 'Dark theme looks elegant.',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Force Light Theme"
                onPress={() =>
                  Toast.show({
                    type: 'warning',
                    theme: 'light',
                    text1: 'Light Mode',
                    text2: 'Looking bright and clean.',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Show Error (Bottom)"
                onPress={() =>
                  Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong.',
                    position: 'bottom',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Spring Animation"
                onPress={() =>
                  Toast.show({
                    type: 'info',
                    animationType: 'spring',
                    text1: 'Spring Animation',
                    text2: 'Bouncy and lively.',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Slide Animation"
                onPress={() =>
                  Toast.show({
                    type: 'success',
                    animationType: 'slide',
                    text1: 'Slide Animation',
                    text2: 'Linear and clean sliding.',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Custom View & Background"
                color="#8b5cf6"
                onPress={() =>
                  Toast.show({
                    position: 'bottom',
                    customView: (
                      <View
                        style={{
                          backgroundColor: '#8b5cf6',
                          padding: 16,
                          borderRadius: 12,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 24,
                            marginRight: 12,
                          }}
                        >
                          🚀
                        </Text>
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 16,
                            }}
                          >
                            Custom Layout
                          </Text>
                          <Text style={{ color: '#e2e8f0', fontSize: 13 }}>
                            Built with pure React Native Views.
                          </Text>
                        </View>
                      </View>
                    ),
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Callbacks & Events"
                color="#ec4899"
                onPress={() =>
                  Toast.show({
                    type: 'info',
                    text1: 'Interactive Toast',
                    text2: 'Check console or tap me to dismiss.',
                    autoHide: false,
                    onShow: () => console.log('✅ Toast appeared!'),
                    onHide: () => console.log('👋 Toast disappeared!'),
                    onPress: () => {
                      console.log('👆 Toast was tapped! Hiding manually...');
                      Toast.hide();
                    },
                  })
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1f2937',
  },
  titleDark: {
    color: '#f9fafb',
  },
  buttonContainer: {
    width: '80%',
  },
  buttonWrapper: {
    marginBottom: 16,
  },
});
