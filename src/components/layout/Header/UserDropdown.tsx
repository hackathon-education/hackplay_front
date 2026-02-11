import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import ProfileDefaultImg from '@/assets/user/profile-default.webp';
import { USER_MENU_ITEMS } from '@/constants/menuData';
import { useUserMenu } from '@/hooks/useUserMenu';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { handleMenuItemClick } = useUserMenu(() => setIsOpen(false));

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={toggleMenu}
        className="flex w-10 h-10 lg:w-14 lg:h-14 items-center justify-center rounded-full border border-profile-img-border bg-profile-img-bg shadow-1 overflow-hidden"
      >
        <img src={ProfileDefaultImg} alt="프로필" className="w-full h-full object-cover" />
        {/* TODO: 프로필 사진 API 연동 */}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="hidden lg:absolute lg:block w-40 right-0 z-dropdown -translate-y-2.5"
          >
            <ul className="flex flex-col rounded-14 border border-dropdown-border bg-dropdown-default-bg shadow-1 right-0 mt-5 z-dropdown divide-y divide-divider overflow-hidden">
              {USER_MENU_ITEMS.map((item, idx) => (
                <button
                  key={idx}
                  className="flex h-12.5 items-center justify-center text-dropdown-default-text text-sm hover:bg-dropdown-hover-bg hover:text-dropdown-hover-text hover:font-medium transition-colors"
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
