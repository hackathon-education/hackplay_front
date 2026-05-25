import { useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export interface ModalFieldConfig {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  iconType: string;
  iconSize: string;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  fields: ModalFieldConfig[];
  onClose: () => void;
  onConfirm: (...values: string[]) => Promise<void> | void;
  buttonClassName?: string;
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText = '확인',
  fields,
  onClose,
  onConfirm,
  buttonClassName,
}: ConfirmModalProps) => {
  const [fieldValues, setFieldValues] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const allFilled = fieldValues.every((value) => value.length >= 1);
    if (fieldValues.length >= 2) {
      const lastTwo = fieldValues.slice(-2);
      const passwordsMatch = lastTwo[0] === lastTwo[1];
      return allFilled && passwordsMatch && !isSubmitting;
    }
    return allFilled && !isSubmitting;
  }, [fieldValues, isSubmitting]);

  useEffect(() => {
    if (!isOpen) return;
    setFieldValues(new Array(fields.length).fill(''));
  }, [isOpen, fields.length]);

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
      await onConfirm(...fieldValues);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (index: number, value: string) => {
    const newValues = [...fieldValues];
    newValues[index] = value;
    setFieldValues(newValues);
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
              {fields.map((field, index) => (
                <Input
                  key={index}
                  type={field.type}
                  iconType={field.iconType}
                  iconSize={field.iconSize}
                  placeholder={field.placeholder}
                  value={fieldValues[index] || ''}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                />
              ))}
            </div>

            <div className="mt-7 max-w-[252px] mx-auto">
              <Button
                type="button"
                size="wfullh44"
                rounded="xs"
                disabled={!canSubmit}
                onClick={handleConfirm}
                className={buttonClassName}
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

export default ConfirmModal;
