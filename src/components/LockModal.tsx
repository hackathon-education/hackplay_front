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
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-modal flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-modal-bg shadow-2 flex w-80 lg:h-111 flex-col items-center justify-center rounded-3xl lg:rounded-4xl px-5 py-8 lg:w-96 lg:px-8 lg:pt-[71px] lg:pb-[39px]"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <LockIcon className="mb-5 h-12 w-12 text-text-accent lg:mb-7.5 lg:h-auto lg:w-auto" />

            <h2 className="text-text-title mb-4 text-xl font-bold lg:mb-6 lg:text-2xl">
              조금만 기다려주세요!
            </h2>

            <p className="text-text-base mb-6 text-center text-sm font-medium leading-relaxed tracking-wide whitespace-pre-line lg:mb-8.5 lg:text-base lg:leading-tight lg:tracking-widest">
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
              className="bg-btn-secondary-bg hover:bg-btn-secondary-bg-hover active:bg-btn-secondary-bg-active text-btn-secondary-text mb-5 flex h-12 w-full items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-95 lg:h-14 lg:rounded-2xl lg:text-base lg:mb-6"
            >
              확인했습니다.
            </button>

            <p className="text-text-base text-xs font-medium lg:text-sm">
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
