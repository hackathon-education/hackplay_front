import LockIcon from '@/assets/modal/lock-icon.svg?react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

interface LockModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const LockModal = ({ isOpen, onClose, message }: LockModalProps) => {
  // Enter 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center w-96 h-111 rounded-4xl bg-modal-bg shadow-2 px-8 pt-[71px] pb-[39px]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LockIcon className="mb-7.5" />
            <h2 className="text-text-title text-2xl font-bold mb-6">조금만 기다려주세요!</h2>
            <p className="text-text-base mb-8.5 text-center whitespace-pre-line leading-tight font-medium tracking-widest">
              {message ?? (
                <>
                  현재 더 나은 경험을 위해
                  <br />
                  <span className="text-text-accent font-semibold">새로운 기능</span>을 열심히
                  개발하고 있습니다.
                </>
              )}
            </p>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-full h-14 rounded-2xl bg-btn-secondary-bg hover:bg-btn-secondary-bg-hover active:bg-btn-secondary-bg-active text-btn-secondary-text font-bold transition-colors mb-6"
            >
              확인했습니다.
            </button>
            <p className="text-text-base font-medium text-sm">
              원하는 기능이 있으신가요?{' '}
              <Link
                to="https://docs.google.com/forms/d/e/1FAIpQLScYFGXxA0_GkEXsiwA28O3PbFEC_PCKcqqjJdNu_24ExuCJ8A/viewform?usp=dialog"
                target="_blank"
                className="text-text-accent"
              >
                의견 보내기
              </Link>{' '}
              {/* TODO: 문의하기 페이지 연결 */}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LockModal;
