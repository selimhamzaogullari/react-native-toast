# react-native-toast

A beautifully animated, highly customizable, and imperative Toast library for React Native based on `react-native-reanimated`.

## Installation

```sh
npm install react-native-toast
# or
yarn add react-native-toast
```

You also need to install the peer dependencies:

```sh
yarn add react-native-reanimated react-native-safe-area-context
```

> **Note:** Make sure to follow the installation instructions for `react-native-reanimated` (e.g., adding the babel plugin) and `react-native-safe-area-context`.

## Usage

1. Wrap your root directory with `ToastProvider`:

```tsx
import { ToastProvider } from 'react-native-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        {/* Your app components */}
      </ToastProvider>
    </SafeAreaProvider>
  );
}
```

2. Call `Toast.show` from anywhere in your app:

```tsx
import { Toast } from 'react-native-toast';

Toast.show({
  type: 'success',
  text1: 'Hello',
  text2: 'This is an awesome toast',
  position: 'top',
  visibilityTime: 4000,
});
```

## APIs

### `Toast.show(options: ToastOptions)`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'success' \| 'error' \| 'info' \| 'warning'` | `'info'` | Type of the toast |
| `text1` | `string` | `undefined` | Primary text |
| `text2` | `string` | `undefined` | Secondary description |
| `position` | `'top' \| 'bottom'` | `'top'` | Position of the toast |
| `visibilityTime` | `number` | `3000` | Duration in ms |
| `topOffset` | `number` | `40` | Offset from top edge |
| `bottomOffset` | `number` | `40` | Offset from bottom edge |

### `Toast.hide()`
Hides the currently visible toast.

## License

MIT
