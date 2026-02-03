import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import { FilePen } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

import HeaderTabs from './HeaderTabs';
import UserDropdown from './UserDropdown';

const Header = () => {
  const { isLoggedIn } = useAuthStore();

  const headerClass = 'flex fixed w-full h-24 items-center justify-between px-5 z-index-nav';
  const authClass =
    'flex w-20 h-9.5 items-center justify-center rounded-lg border shadow-1 text-sm font-medium';
  const resumeClass =
    'flex px-5.5 h-14 items-center justify-center rounded-50 bg-btn-default-bg shadow-1 gap-2 text-btn-default-text';

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

      <div className="flex-1 flex justify-end gap-2.5 items-center">
        {isLoggedIn ? (
          <>
            <Link className={resumeClass}>
              {/* TODO: to 속성 API 연동 */}
              <FilePen strokeWidth={1.5} size={19} absoluteStrokeWidth={true} />
              <span className="font-semibold">학습 이어하기</span>
            </Link>
            <UserDropdown />
          </>
        ) : (
          <>
            <Link
              to={ROUTES.SIGNIN}
              className={`${authClass} border-link-btn-default-border bg-link-btn-default-bg text-link-btn-default-text`}
            >
              로그인
            </Link>
            <Link
              to={ROUTES.SIGNUP}
              className={`${authClass} border-link-btn-accent-border bg-link-btn-accent-bg text-link-btn-accent-text`}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
