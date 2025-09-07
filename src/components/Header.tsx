import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { TfiAngleRight } from 'react-icons/tfi';
import { Link, NavLink } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { NAV_ITEMS } from '@/constants/menuData';
import { ROUTES } from '@/constants/routes';
import { useLockModal } from '@/hooks/useLockModal';

import LockModal from './LockModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeaderShadow, setShowHeaderShadow] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

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
      <div className="bg-gray-50 w-full h-[2.188rem]"></div>

      {/* 헤더 */}
      <header
        className={`sticky top-0 z-nav bg-gray-50 w-full transition-shadow ${
          showHeaderShadow ? 'shadow-4' : ''
        }`}
      >
        <nav className="flex mx-auto w-full h-[5.625rem] max-w-[1782px] items-center py-[0.531rem]">
          {/* 로고 */}
          <NavLink
            to={ROUTES.MAIN}
            className="mr-[1.813rem] flex items-center overflow-hidden w-full max-w-[13.938rem] h-[4.563rem] rounded-4xl bg-white pt-[1.438rem] px-[2.313rem] pb-[1.378rem]"
          >
            <img src={logo} alt="logo" className="object-contain" />
          </NavLink>

          {/* 내비게이션 */}
          <ul className="flex w-full max-w-[60.25rem] h-full mr-4 px-[4.281rem] rounded-4xl bg-white shadow-1 text-gray-600 justify-between">
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

          {/* 우측 액션 */}
          <div className="flex w-full max-w-[34.375rem] h-full items-center tracking-[0.04em]">
            <button className="mr-5 w-full h-full max-w-[11.813rem] bg-white rounded-4xl shadow-1">
              학습 이어하기
            </button>

            <Link
              to={ROUTES.SIGNIN}
              className="mr-[1.563rem] w-full max-w-[8.875rem] h-full flex items-center justify-between rounded-4xl bg-white shadow-1 pl-[2.125rem] pr-[1.8rem]"
            >
              로그인 <TfiAngleRight />
            </Link>

            <button className="mr-7 flex items-center justify-center w-full max-w-[4.563rem] h-full rounded-4xl shadow-1 bg-blue-300 p-5">
              <HiOutlineUser className="text-white w-full h-full stroke-1" />
            </button>

            <div className="relative w-full max-w-[4.563rem] h-full rounded-4xl" ref={menuRef}>
              <button
                className="flex items-center justify-center w-full h-full rounded-4xl bg-blue-300 shadow-1"
                onClick={toggleMenu}
              >
                <AiOutlineMenu className="text-white" />
              </button>

              {isMenuOpen && (
                <div className="absolute top-12 right-0 bg-white border border-[#ddd] rounded-lg shadow-lg flex flex-col py-2 z-50 min-w-[160px]">
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
                  <button
                    className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                    onClick={() => alert('로그아웃')}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <LockModal isOpen={isLockModalOpen} onClose={closeLockModal} />
    </>
  );
};

export default Header;
