# @selimh/react-native-toast

A beautifully animated, highly customizable, and imperative Toast library for React Native based on `react-native-reanimated`.

![Image](https://github.com/user-attachments/assets/3e9910ab-0b8a-468e-a778-79ea0d53c525)

## Installation

```sh
npm install @selimh/react-native-toast
# or
yarn add @selimh/react-native-toast
```

You also need to install the peer dependencies:

```sh
yarn add react-native-reanimated react-native-safe-area-context
```

> **Note:** Make sure to follow the installation instructions for `react-native-reanimated` (e.g., adding the babel plugin) and `react-native-safe-area-context`.

## Usage

1. Wrap your root directory with `ToastProvider`:

```tsx
import { ToastProvider } from '@selimh/react-native-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* 
        theme can be 'light', 'dark', or 'system' (default: 'system')
        It will automatically detect user's device preferences.
      */}
      <ToastProvider theme="system">
        {/* Your app components */}
      </ToastProvider>
    </SafeAreaProvider>
  );
}
```

2. Call `Toast.show` from anywhere in your app:

```tsx
import { Toast } from '@selimh/react-native-toast';

Toast.show({
  type: 'success',
  text1: 'Hello',
  text2: 'This is an awesome toast',
  position: 'top',
  visibilityTime: 4000,
});
```

### Dark Mode (Theme) Support
`@selimh/react-native-toast` perfectly supports light and dark modes out of the box. 

1. **System Dependant (Default):** If you pass `theme="system"` to `ToastProvider` or omit it, the toast will automatically adapt to the user's iOS/Android theme.
2. **Forced Theme:** You can override the theme dynamically on a per-toast basis:
```tsx
Toast.show({
  type: 'info',
  theme: 'dark', // 'light' | 'dark' | 'system'
  text1: 'Always Dark',
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
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | Toast visual theme |
| `animationType` | `'spring' \| 'slide' \| 'fade'` | `'fade'` | Animation style for enter/exit |
| `visibilityTime` | `number` | `3000` | Duration in ms |
| `topOffset` | `number` | `40` | Offset from top edge |
| `bottomOffset` | `number` | `40` | Offset from bottom edge |
| `autoHide` | `boolean` | `true` | If false, toast will not hide automatically |
| `customView` | `React.ReactNode` | `undefined` | Render a completely custom component |
| `onPress` | `() => void` | `undefined` | Called when toast is tapped |
| `onShow` | `() => void` | `undefined` | Called when animation finishes showing |
| `onHide` | `() => void` | `undefined` | Called when animation finishes hiding |

### `Toast.hide()`
Hides the currently visible toast.

## License

MIT
