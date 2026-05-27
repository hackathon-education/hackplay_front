import { useState } from 'react';

import ConfirmModal, { type ModalFieldConfig } from '@/components/common/Modal';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, password: string, confirmPassword: string) => Promise<void> | void;
}

const WithdrawModal = ({ isOpen, onClose, onConfirm }: WithdrawModalProps) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const fields: ModalFieldConfig[] = [
    {
      type: 'email',
      placeholder: '이메일을 입력해 주세요.',
      iconType: 'email',
      iconSize: 'w-4.5 h-auto',
    },
    {
      type: 'password',
      placeholder: '현재 비밀번호를 입력해 주세요.',
      iconType: 'password',
      iconSize: 'w-4 h-auto',
    },
    {
      type: 'password',
      placeholder: '비밀번호를 한 번 더 입력해주세요.',
      iconType: 'password',
      iconSize: 'w-4 h-auto',
    },
  ];

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="회원탈퇴"
      description="아래 항목에 정보를 입력해주세요."
      confirmText="회원탈퇴"
      fields={fields}
      onClose={onClose}
      onConfirm={onConfirm}
      onDisabledChange={setIsDisabled}
      buttonClassName={
        !isDisabled ? '!rounded-2xl !bg-btn-error-bg hover:!bg-btn-error-bg-hover' : '!rounded-2xl'
      }
    />
  );
};

export default WithdrawModal;
