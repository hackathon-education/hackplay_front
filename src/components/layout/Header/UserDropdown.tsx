import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { axiosInstance } from '@/api/axios';
import ProfileDefaultImg from '@/assets/user/profile-default.webp';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

import LogoutModal from './LogoutModal';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('accessToken'); // TODO: 토큰 쿠키로 변경
      if (token) {
        await axiosInstance.post(
          '/v1/auth/signout',
          {},
          {
            headers: { Authorization: `Bearer ${token}` }, // TODO: 토큰 쿠키로 변경 시 헤더 불필요
          },
        );
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      logout();
      setIsLogoutModalOpen(false);
      navigate(ROUTES.MAIN);
    }
  };

  const menuItems = [
    { label: '계정설정', onClick: () => console.log('계정설정') }, // TODO: 계정설정 기능 구현
    // { label: '문의하기', onClick: () => console.log('문의하기') }, // TODO: 문의하기 기능 구현
    { label: '마이페이지', onClick: () => console.log('마이페이지') }, // TODO: 마이페이지 라우트 연결
    {
      label: '로그아웃',
      onClick: () => {
        setIsLogoutModalOpen(true);
        setIsOpen(false);
      },
    },
  ];

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={toggleMenu}
        className="flex w-14 h-14 items-center justify-center rounded-full border border-profile-img-border bg-profile-img-bg shadow-1 overflow-hidden"
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
            className="absolute w-40 right-0 z-dropdown -translate-y-2.5"
          >
            <ul className="flex flex-col rounded-14 border border-dropdown-border bg-dropdown-default-bg shadow-1 right-0 mt-5 z-dropdown divide-y divide-divider overflow-hidden">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  className="flex h-12.5 items-center justify-center text-dropdown-default-text text-sm hover:bg-dropdown-hover-bg hover:text-dropdown-hover-text hover:font-medium transition-colors"
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};

export default UserDropdown;
