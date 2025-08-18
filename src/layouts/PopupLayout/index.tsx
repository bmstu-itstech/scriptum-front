'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './PopupLayout.module.css';
import { Props } from './PopupLayout.props';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { SuccessIcon } from '@/components/icons/SuccessIcon';
import { ErrorIcon } from '@/components/icons/ErrorIcon';
import { WarningIcon } from '@/components/icons/WarningIcon';
import { createPortal } from 'react-dom';

const DURATION_CLOSE = 300;

export const PopupLayout: FC<Props> = ({
  variant,
  title,
  description,
  className,
  duration = 5000,
  onClose,
  ...props
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, DURATION_CLOSE);
  }, [onClose]);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const getVariantIcon = () => {
    switch (variant) {
      case 'success':
        return <SuccessIcon className={styles.icon} />;
      case 'error':
        return <ErrorIcon className={styles.icon} />;
      case 'warning':
        return <WarningIcon className={styles.icon} />;
      default:
        return <SuccessIcon className={styles.icon} />;
    }
  };

  return createPortal(
    <div
      className={cn(
        styles.alert,
        {
          [styles.success]: variant === 'success',
          [styles.error]: variant === 'error',
          [styles.warning]: variant === 'warning',
          [styles.visible]: !isClosing,
          [styles.closing]: isClosing,
        },
        className,
      )}
      {...props}>
      <div className={styles.alertContainer}>
        <div className={styles.iconContainer}>{getVariantIcon()}</div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <button className={styles.closeButton} onClick={handleClose} aria-label='Close alert'>
          <CloseIcon className={styles.closeIcon} />
        </button>

        {duration && (
          <div
            className={styles.progressBar}
            style={{
              animationDuration: `${duration}ms`,
              backgroundColor: `var(--color-${variant}-main)`,
            }}
          />
        )}
      </div>
    </div>,
    document.body,
  );
};
