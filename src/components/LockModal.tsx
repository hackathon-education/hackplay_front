import { AnimatePresence, motion } from 'framer-motion';

interface LockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LockModal: React.FC<LockModalProps> = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-lg px-14 py-8 max-w-md mx-4 text-center shadow-2"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">추후 제공 예정입니다</h3>
            <p className="text-gray-600 mb-6">
              해당 기능은 현재 개발 중입니다.
              <br />
              조금만 기다려주세요!
            </p>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              확인
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LockModal;
