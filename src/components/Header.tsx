import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoIcon from '../assets/logo_icon.png';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
    <header className="w-full bg-[#fafafa] border-b border-[#eee] px-10 py-3">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        {/* 로고 */}
        <div
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={logoIcon} alt="logo-icon" className="w-8 h-8" />
          <span className="text-[#0070f3] font-bold text-xl">hackplay</span>
        </div>

        {/* 네비게이션 */}
        <nav>
          <ul className="flex gap-8 list-none bg-white px-8 py-2 rounded-full border border-[#eee]">
            <li className={isActive('/') ? 'font-bold text-black' : 'font-medium text-[#555]'}>
              <button
                onClick={() => navigate('/')}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                소개
              </button>
            </li>
            <li
              className={isActive('/courses') ? 'font-bold text-black' : 'font-medium text-[#555]'}
            >
              <button
                onClick={() => navigate('/courses')}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                단계별 학습
              </button>
            </li>
            <li
              className={isActive('/projects') ? 'font-bold text-black' : 'font-medium text-[#555]'}
            >
              <button
                onClick={() => navigate('/projects')}
                className="bg-none border-none text-lg px-3 py-2 cursor-pointer"
              >
                프로젝트 모집
              </button>
            </li>
            <li
              className={isActive('/ranking') ? 'font-bold text-black' : 'font-medium text-[#555]'}
            >
              <button
                onClick={() => navigate('/ranking')}
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
            className="bg-white px-5 py-2 rounded-full text-[1.05rem] font-medium cursor-pointer flex items-center gap-1 text-black"
            onClick={() => navigate('/login')}
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
                  onClick={() => alert('계정설정')}
                >
                  계정설정
                </button>
                <button
                  className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                  onClick={() => alert('문의하기')}
                >
                  문의하기
                </button>
                <button
                  className="text-left text-sm px-4 py-2 hover:bg-[#f5f5f5]"
                  onClick={() => navigate('/mypage')}
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
    </header>
  );
}

export default Header;
