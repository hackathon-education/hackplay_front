import CloseIcon from '@/assets/common/close-icon.svg?react';
import LogoWhite from '@/assets/logo/logo-white.svg?react';
import { Link } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { USER_MENU_ITEMS } from '@/constants/menuData';
import { ROUTES } from '@/constants/routes';
import { useUserMenu } from '@/hooks/useUserMenu';

import HeaderTabs from './HeaderTabs';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { handleMenuItemClick } = useUserMenu(onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="z-modal fixed inset-0 bg-overlay-bg"
          />

          {/* snb */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="right-0 top-0 bottom-0 flex bg-drawer-bg w-80 fixed flex-col z-modal"
          >
            {/* snb-top */}
            <div className="bg-drawer-header-bg flex justify-between px-6 h-15 items-center mb-3">
              <Link to={ROUTES.MAIN} onClick={onClose}>
                <LogoWhite title="HACKPLAY" className="h-4.5 w-auto" />
              </Link>
              <CloseIcon
                onClick={onClose}
                className="w-7 h-7 text-black cursor-pointer"
                title="닫기"
              />
            </div>

            {/* snb-navigation */}
            <div className="flex-1 overflow-auto p-3.5">
              <HeaderTabs variant="mobile" onItemClick={onClose} />
            </div>

            {/* snb-bottom */}
            <div className="border-t border-divider-secondary">
              <ul className="flex divide-x divide-divider-secondary">
                {USER_MENU_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex-1">
                    <button
                      onClick={() => handleMenuItemClick(item)}
                      className="h-11 w-full text-sm text-drawer-text-secondary"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
