import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import MenuIcon from '@/assets/navigation/menu-icon.svg?react';
import { FilePen } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useMotionValueEvent, useScroll } from 'framer-motion';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

import HeaderTabs from './HeaderTabs';
import MobileMenu from './MobileMenu';
import UserDropdown from './UserDropdown';

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0);
  });

  const isDarkBgPage = pathname === ROUTES.MAIN;
  const showWhiteContent = !isScrolled && isDarkBgPage;

  const headerClass = `
    flex fixed top-0 w-full h-16.5 items-center justify-between z-nav transition-all duration-300
    px-4.5 
    ${
      isScrolled
        ? 'bg-nav-bg/80 backdrop-blur-md border-b border-nav-border shadow-1'
        : 'bg-transparent'
    } 
    lg:h-24 lg:px-5
  `;

  const authClass =
    'flex w-20 h-9.5 items-center justify-center rounded-lg text-sm font-medium transition-colors shadow-1';

  const resumeClass = `
    flex items-center justify-center rounded-full transition-all
    w-10 h-10 mr-2 
    bg-btn-default-bg text-btn-default-text shadow-1
    lg:mr-0 lg:px-5.5 lg:w-auto lg:h-14 lg:gap-2
  `;

  return (
    <>
      <header className={headerClass}>
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <NavLink
            to={ROUTES.MAIN}
            className={`
              flex items-center justify-center transition-all duration-300
              lg:w-[181px] lg:h-14 lg:bg-logo-bg lg:border lg:border-logo-border lg:rounded-20 lg:shadow-1
            `}
          >
            <LogoPrimary
              className={`transition-colors duration-300 ${
                showWhiteContent ? 'text-white' : 'text-black'
              } lg:text-black`}
            />
          </NavLink>
        </div>

        {/* Center: Tabs (Desktop Only) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <HeaderTabs variant="desktop" />
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-1 lg:gap-2.5">
          {isLoggedIn ? (
            <>
              {/* TODO: to 속성 API 연동 */}
              <Link className={resumeClass}>
                <FilePen strokeWidth={1.5} size={19} absoluteStrokeWidth={true} />
                <span className="hidden lg:block font-semibold">학습 이어하기</span>
              </Link>
              <UserDropdown />
            </>
          ) : (
            <div className="hidden lg:flex gap-2.5">
              <Link
                to={ROUTES.SIGNIN}
                className={`${authClass} border border-link-btn-default-border bg-link-btn-default-bg text-link-btn-default-text hover:bg-link-btn-default-bg-hover`}
              >
                로그인
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className={`${authClass} bg-link-btn-accent-bg text-link-btn-accent-text hover:opacity-90`}
              >
                회원가입
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex lg:hidden w-10 h-10 items-center justify-center rounded-md hover:bg-black/5 transition-colors"
            aria-label="메뉴 열기"
          >
            <MenuIcon
              className={`transition-colors duration-300 ${
                showWhiteContent ? 'text-white' : 'text-text-title'
              }`}
            />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
