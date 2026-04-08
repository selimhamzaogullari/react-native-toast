export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastPosition = 'top' | 'bottom';

export type ToastTheme = 'light' | 'dark' | 'system';

export interface ToastOptions {
  type?: ToastType;
  text1?: string;
  text2?: string;
  duration?: number;
  position?: ToastPosition;
  topOffset?: number;
  bottomOffset?: number;
  visibilityTime?: number;
  autoHide?: boolean;
  theme?: ToastTheme;
  animationType?: 'spring' | 'slide' | 'fade';
  onPress?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  customView?: React.ReactNode;
  swipeable?: boolean;
}

export interface ToastProps extends ToastOptions {
  isVisible: boolean;
  providerTheme?: ToastTheme;
  onAnimationEnd: (isVisible: boolean) => void;
  onSwipeDismiss?: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  theme?: ToastTheme;
}

export interface ToastRef {
  show: (options: ToastOptions) => void;
  hide: () => void;
}
