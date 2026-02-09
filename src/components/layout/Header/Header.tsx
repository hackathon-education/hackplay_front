import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import MenuIcon from '@/assets/navigation/menu-icon.svg?react';
import { FilePen } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useMotionValueEvent, useScroll } from 'framer-motion';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

import HeaderTabs from './HeaderTabs';
import UserDropdown from './UserDropdown';

const Header = () => {
  const { isLoggedIn } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0);
  });

  const headerClass = `flex fixed w-full h-16.5 items-center justify-between pl-4.5 pr-[15px] z-index-nav transition ${isScrolled ? 'backdrop-blur-[20px]' : ''} lg:h-24 lg:px-5`; // TODO: 스크롤 시 헤더 스타일 개선
  const authClass =
    'flex w-20 h-9.5 items-center justify-center rounded-lg shadow-1 text-sm font-medium';
  const resumeClass =
    'flex w-10 h-10 mr-2 lg:mr-0 lg:px-5.5 lg:w-auto lg:h-14 items-center justify-center rounded-50 bg-btn-default-bg shadow-1 gap-2 text-btn-default-text';

  return (
    <header className={headerClass}>
      <div className="flex-1 flex justify-start">
        <NavLink
          to={ROUTES.MAIN}
          className="flex w-[181px] h-14 items-center justify-center bg-logo-bg border border-logo-border rounded-20 shadow-1"
        >
          <LogoPrimary />
        </NavLink>
      </div>

      <div className="flex-1 flex justify-center">
        <HeaderTabs variant="desktop" />
      </div>
      {/* <HeaderTabs variant="mobile" /> - TODO: 모바일 메뉴 버튼 구현 */}

      <div className="flex-1 flex justify-end gap-0 items-center lg:gap-2.5">
        {isLoggedIn ? (
          <>
            <Link className={resumeClass}>
              {/* TODO: to 속성 API 연동 */}
              <FilePen strokeWidth={1.5} size={19} absoluteStrokeWidth={true} />
              <span className="hidden lg:block font-semibold">학습 이어하기</span>
            </Link>
            <UserDropdown />
          </>
        ) : (
          <>
            <div className="hidden lg:flex gap-2.5">
              <Link
                to={ROUTES.SIGNIN}
                className={`${authClass} border border-link-btn-default-border bg-link-btn-default-bg text-link-btn-default-text`}
              >
                로그인
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className={`${authClass} bg-link-btn-accent-bg text-link-btn-accent-text`}
              >
                회원가입
              </Link>
            </div>
          </>
        )}
        <button className="flex lg:hidden w-10 h-10 items-center justify-center">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
