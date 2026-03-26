import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Toast } from './Toast';
import type { ToastOptions, ToastRef, ToastProviderProps } from './types';

export const ToastRefWrapper = React.createRef<ToastRef>();

export const ToastProvider = ({
  children,
  theme = 'system',
}: ToastProviderProps) => {
  const [options, setOptions] = useState<ToastOptions>({});
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback((opts: ToastOptions) => {
    setOptions(opts);
    setIsVisible(true);

    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    const autoHide = opts.autoHide ?? true;
    const visibilityTime = opts.visibilityTime ?? 3000;

    if (autoHide) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, visibilityTime);
    }
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  }, []);

  useEffect(() => {
    (ToastRefWrapper as any).current = { show, hide };
  }, [show, hide]);

  const onAnimationEnd = useCallback(
    (visible: boolean) => {
      if (!visible) {
        options.onHide?.();
      } else {
        options.onShow?.();
      }
    },
    [options]
  );

  return (
    <>
      {children}
      <Toast
        {...options}
        isVisible={isVisible}
        onAnimationEnd={onAnimationEnd}
        providerTheme={theme}
      />
    </>
  );
};

export const ToastService = {
  show: (options: ToastOptions) => ToastRefWrapper.current?.show(options),
  hide: () => ToastRefWrapper.current?.hide(),
};
