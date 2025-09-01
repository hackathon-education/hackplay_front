import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import { useLockModal } from '../hooks/useLockModal';
import LockModal from './LockModal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleRankingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
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

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

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
    <header className="bg-gray-50 w-full z-nav">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        {/* 로고 */}
        <button
          className="w-full max-w-30 sm:max-w-36 md:max-w-40 lg:max-w-44 xl:max-w-[223px] aspect-[223/73] rounded-4xl bg-white px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 lg:px-8 lg:py-5 xl:px-[2.313rem] xl:pt-[1.438rem] xl:pb-[1.378rem]"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="logo" className="w-full" />
        </button>

        {/* 네비게이션 */}
        <nav>
          <ul className="flex gap-8 list-none bg-white px-8 py-2 rounded-full border border-[#eee]">
            <li className={isActive('/') ? 'font-bold' : 'font-medium text-[#555]'}>
              <button
                onClick={() => navigate('/')}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                소개
              </button>
            </li>
            <li className={isActive('/courses') ? 'font-bold' : 'font-medium text-[#555]'}>
              <button
                onClick={() => navigate('/courses')}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                단계별 학습
              </button>
            </li>
            <li className={isActive('/projects') ? 'font-bold' : 'font-medium text-[#555]'}>
              <button
                // onClick={() => navigate('/projects')}
                onClick={handleProjectsClick}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                프로젝트 모집
              </button>
            </li>
            <li className={isActive('/ranking') ? 'font-bold' : 'font-medium text-[#555]'}>
              <button
                onClick={handleRankingClick}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                랭킹
              </button>
            </li>
          </ul>
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-4">
          <button
            className="bg-white px-5 py-2 rounded-full text-[1.05rem] font-medium cursor-pointer flex items-center gap-1"
            onClick={() => navigate('/signin')}
          >
            로그인 <span className="text-base">〉</span>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              className="bg-[#4da3ff] text-white w-10 h-10 rounded-full text-lg cursor-pointer flex items-center justify-center"
              onClick={toggleMenu}
            >
              ☰
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
      </div>

      <LockModal isOpen={isLockModalOpen} onClose={closeLockModal} />
    </header>
  );
};

export default Header;
