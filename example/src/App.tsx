import { View, StyleSheet, Button, Text, SafeAreaView } from 'react-native';
import { ToastProvider, Toast } from 'react-native-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>React Native Toast Test</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Show Success (Top)"
                onPress={() =>
                  Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'It works perfectly.',
                    position: 'top',
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
                title="Show Info"
                onPress={() =>
                  Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'Here is some information.',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Show Warning"
                onPress={() =>
                  Toast.show({
                    type: 'warning',
                    text1: 'Warning',
                    text2: 'Please be careful.',
                  })
                }
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Custom Duration (1s)"
                onPress={() =>
                  Toast.show({
                    type: 'success',
                    text1: 'Fast Toast',
                    visibilityTime: 1000,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  buttonWrapper: {
    marginBottom: 16,
  },
});
