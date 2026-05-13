import { useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface PasswordConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm: (
    currentPassword: string,
    newPassword: string,
    checkNewPassword: string,
  ) => Promise<void> | void;
}

const PasswordConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText = '비밀번호 변경하기',
  onClose,
  onConfirm,
}: PasswordConfirmModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const allFilled =
      currentPassword.length >= 1 && newPassword.length >= 1 && confirmPassword.length >= 1;
    const passwordsMatch = newPassword === confirmPassword;
    return allFilled && passwordsMatch && !isSubmitting;
  }, [currentPassword, newPassword, confirmPassword, isSubmitting]);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleConfirm = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      await onConfirm(currentPassword, newPassword, confirmPassword);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-modal-backdrop flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="w-full max-w-[422px] rounded-20 bg-white shadow-6 px-5 py-7 lg:px-[10.5px] lg:py-[36.5px]"
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex-1 text-center">
              <h3 className="text-text-title text-2xl font-bold leading-[1.21]">{title}</h3>
              {description && (
                <p className="mt-2.5 text-text-base leading-[1.19] whitespace-pre-line">
                  {description}
                </p>
              )}
            </div>

            <div className="mt-[17px] space-y-[17px]">
              <Input
                type="password"
                iconType="confirmPassword"
                iconSize="w-4 h-auto stroke-2"
                placeholder="현재 비밀번호를 입력해 주세요."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                type="password"
                iconType="confirmPassword"
                iconSize="w-4 h-auto stroke-2"
                placeholder="새로운 비밀번호를 입력해 주세요."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                iconType="password"
                iconSize="w-4 h-auto"
                placeholder="새로운 비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mt-7 max-w-[252px] mx-auto">
              <Button
                type="button"
                size="wfullh44"
                rounded="xs"
                disabled={!canSubmit}
                onClick={handleConfirm}
              >
                {isSubmitting ? '처리 중...' : confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordConfirmModal;
