'use client';
import React, { FC } from 'react';
import { useEffect } from 'react';
import styles from './DialogLayout.module.css';
import cn from 'classnames';
import { Props } from './DialogLayout.props';
import { ErrorIcon } from '@/components/icons/ErrorIcon';
import { CloseIcon } from '@/components/icons/CloseIcon';

export const DialogLayout: FC<Props> = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  onConfirm,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible, onClose]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.dialog}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <ErrorIcon className={styles.icon} />
            </div>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>{title}</h3>
            </div>
            <button onClick={onClose} className={styles.closeButton}>
              <CloseIcon className={styles.closeIcon} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            {type === 'confirm' && (
              <button onClick={onClose} className={cn(styles.button, styles.cancelButton)}>
                {cancelText}
              </button>
            )}
            <button
              onClick={type === 'confirm' ? handleConfirm : onClose}
              className={cn(styles.button, styles.confirmButton)}>
              {type === 'confirm' ? confirmText : 'ОК'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
