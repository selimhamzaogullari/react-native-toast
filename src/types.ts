import type React from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastPosition = 'top' | 'bottom';

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
  onPress?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  customView?: React.ReactNode;
}

export interface ToastProps extends ToastOptions {
  isVisible: boolean;
  onAnimationEnd: (isVisible: boolean) => void;
}

export interface ToastRef {
  show: (options: ToastOptions) => void;
  hide: () => void;
}
