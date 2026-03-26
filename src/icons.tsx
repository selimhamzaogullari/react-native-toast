import { Text, View, StyleSheet } from 'react-native';

export const SuccessIcon = () => (
  <View style={[styles.container, styles.success]}>
    <Text style={styles.icon}>✓</Text>
  </View>
);

export const ErrorIcon = () => (
  <View style={[styles.container, styles.error]}>
    <Text style={styles.icon}>✕</Text>
  </View>
);

export const InfoIcon = () => (
  <View style={[styles.container, styles.info]}>
    <Text style={styles.icon}>i</Text>
  </View>
);

export const WarningIcon = () => (
  <View style={[styles.container, styles.warning]}>
    <Text style={styles.icon}>!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  success: {
    backgroundColor: '#4ade80',
  },
  error: {
    backgroundColor: '#f87171',
  },
  info: {
    backgroundColor: '#60a5fa',
  },
  warning: {
    backgroundColor: '#fbbf24',
  },
});
