import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi';
import { TfiAngleRight } from 'react-icons/tfi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { axiosInstance } from '@/api/axios';
import logo from '@/assets/logo.svg';
import { NAV_ITEMS } from '@/constants/menuData';
import { ROUTES } from '@/constants/routes';
import { useLockModal } from '@/hooks/useLockModal';
import { useAuthStore } from '@/store/authStore';

import LockModal from './LockModal';
import LogoutModal from './LogoutModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeaderShadow, setShowHeaderShadow] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const codeEditorPathRegex = /^\/workspaces\/[^/]+$/;
  const isCodeEditorPage = codeEditorPathRegex.test(path);
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();
  const { isLoggedIn, logout } = useAuthStore();

  // 페이지별 상단 여백 높이 설정
  const getTopSpacerHeight = (): string => {
    const lectureListPathRegex = /^\/courses\/[^/]+\/[^/]+$/;
    const lectureMainPathRegex = /^\/courses\/[^/]+\/[^/]+\/[^/]+$/;

    if (lectureMainPathRegex.test(path)) {
      return 'h-[1.344rem]';
    } else if (lectureListPathRegex.test(path)) {
      return 'h-[1.844rem]';
    } else if (codeEditorPathRegex.test(path)) {
      return 'h-[1.282rem]';
    } else {
      return 'h-[2.188rem]';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMyPageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

  const handleAccountSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setShowHeaderShadow(scrollY > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* 상단 여백 */}
      <div className={`bg-gray-50 w-full ${getTopSpacerHeight()}`}></div>

      {/* 헤더 */}
      <header
        className={`sticky top-0 z-nav bg-gray-50 w-full transition-shadow ${
          showHeaderShadow ? 'shadow-4' : ''
        } ${isCodeEditorPage ? 'px-[3.164rem]' : 'px-[4.313rem]'}`}
      >
        <nav
          className={`flex mx-auto w-full items-center py-[0.531rem] ${isCodeEditorPage ? 'h-[3.813rem]' : 'h-[5.625rem]'}`}
        >
          {isCodeEditorPage && (
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* 로고 */}
          <NavLink
            to={ROUTES.MAIN}
            className={`flex items-center overflow-hidden w-full rounded-4xl bg-white ${
              isCodeEditorPage
                ? 'mr-5 max-w-[8.401rem] h-11 pt-[0.883rem] px-[1.421rem] pb-[0.846rem] shadow-1'
                : 'mr-[1.813rem] max-w-[13.938rem] h-[4.563rem] pt-[1.438rem] px-[2.313rem] pb-[1.378rem]'
            }`}
          >
            <img src={logo} alt="logo" className="object-contain" />
          </NavLink>

          {isCodeEditorPage ? (
            // 강의 주차 및 제목
            <div className="flex flex-1 max-w-[84.25rem] h-full mr-5 px-[1.849rem] header-white-box text-black justify-start">
              <h1 className="flex items-center font-[410] text-lg leading-[1.17] tracking-[0.03em]">
                1주차 : 회사 내규 및 협업 방식 <TfiAngleRight className="ml-1 h-3.5 stroke-1" />
              </h1>
            </div>
          ) : (
            // 내비게이션
            <ul className="flex w-full h-full mr-4 px-[4.281rem] header-white-box text-gray-600 justify-between">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="h-full flex items-center tracking-[0.04em]">
                  {item.locked ? (
                    <button onClick={handleLockedItemClick} className="h-full">
                      {item.label}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path ?? '#'}
                      className="h-full flex items-center aria-[current=page]:text-black"
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* 우측 액션 */}
          <div className="flex ml-auto max-w-[34.375rem] h-full items-center tracking-[0.04em]">
            {isCodeEditorPage ? (
              <div className="mr-5 h-full w-[10.313rem] header-white-box"></div>
            ) : (
              <>
                {!isLoggedIn ? (
                  <button className="mr-5 h-full max-w-[11.813rem] header-white-box px-[2.564rem] whitespace-nowrap">
                    학습 이어하기
                  </button>
                ) : (
                  <Link
                    to={ROUTES.SIGNIN}
                    className="mr-[1.563rem] w-[8.875rem] max-w-[8.875rem] h-full flex items-center justify-between header-white-box pl-[2.125rem] pr-[1.8rem] whitespace-nowrap"
                  >
                    로그인 <TfiAngleRight />
                  </Link>
                )}
              </>
            )}

            <button
              className={`flex items-center justify-center h-full rounded-full shadow-1 bg-blue-300 ${isCodeEditorPage ? 'max-w-11 max-h-11 p-3.5 mr-5' : 'w-[4.563rem] max-w-[4.563rem] p-5 mr-7'}`}
            >
              <HiOutlineUser
                className={`text-white w-full h-full ${isCodeEditorPage ? '' : 'stroke-1'}`}
              />
            </button>

            <div
              className={`relative w-full h-full rounded-4xl ${isCodeEditorPage ? 'max-w-11 max-h-11' : 'max-w-[4.563rem]'}`}
              ref={menuRef}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                className={`flex items-center justify-center w-full h-full rounded-4xl bg-blue-300 shadow-1 ${isCodeEditorPage ? 'p-3.5' : 'p-[1.594rem]'}`}
                onClick={toggleMenu}
              >
                <AiOutlineMenu className="text-white" />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-12 right-0 bg-white border border-[#ddd] rounded-lg shadow-lg flex flex-col py-2 z-50 min-w-[160px]"
                  >
                    <button
                      className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                      onClick={handleAccountSettingsClick}
                    >
                      계정설정
                    </button>
                    <button
                      className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                      onClick={handleContactClick}
                    >
                      문의하기
                    </button>
                    <button
                      className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                      onClick={handleMyPageClick}
                    >
                      마이페이지
                    </button>
                    {isLoggedIn && (
                      <button
                        className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                        onClick={() => setIsLogoutModalOpen(true)}
                      >
                        로그아웃
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </header>

      <LockModal isOpen={isLockModalOpen} onClose={closeLockModal} />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={async () => {
          try {
            const token = sessionStorage.getItem('accessToken');

            if (token) {
              await axiosInstance.post(
                '/v1/auth/signout',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
            }
          } catch (error) {
            console.error('로그아웃 요청 실패:', error);
          } finally {
            logout();
            setIsLogoutModalOpen(false);
            navigate(ROUTES.MAIN);
          }
        }}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Header;
