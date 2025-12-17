import { useEffect } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-modal"
      onClick={onCancel}
    >
      <div
        className="shadow-10 w-[25rem] bg-white rounded-1.5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-7 text-base/[1.5] text-center">
          <p>로그아웃 하시겠습니까?</p>
        </div>
        <div className="gap-2 flex justify-center p-3.5">
          <button
            type="button"
            className="rounded-lg px-4 py-1.5 text-sm/[1.16] font-[590] bg-gray-180 text-black"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            type="button"
            className="rounded-lg px-4 py-1.5 text-sm/[1.16] font-[590] bg-blue-400 text-white"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
