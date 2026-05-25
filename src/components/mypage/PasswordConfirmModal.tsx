import ConfirmModal, { type ModalFieldConfig } from '@/components/common/Modal';

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
  const fields: ModalFieldConfig[] = [
    {
      type: 'password',
      placeholder: '현재 비밀번호를 입력해 주세요.',
      iconType: 'confirmPassword',
      iconSize: 'w-4 h-auto stroke-2',
    },
    {
      type: 'password',
      placeholder: '새로운 비밀번호를 입력해 주세요.',
      iconType: 'confirmPassword',
      iconSize: 'w-4 h-auto stroke-2',
    },
    {
      type: 'password',
      placeholder: '새로운 비밀번호를 다시 입력해주세요.',
      iconType: 'password',
      iconSize: 'w-4 h-auto',
    },
  ];

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={title}
      description={description}
      confirmText={confirmText}
      fields={fields}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default PasswordConfirmModal;
