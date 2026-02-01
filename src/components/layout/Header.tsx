import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import { FilePen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import ProfileDefaultImg from '@/assets/user/profile-default.webp';
import { ROUTES } from '@/constants/routes';

import HeaderTabs from './HeaderTabs';

const Header = () => {
  return (
    <header>
      <NavLink to={ROUTES.MAIN} className='flex w-[181px] h-14 items-center justify-center bg-logo-bg border border-logo-border rounded-20 shadow-1'>
        <LogoPrimary />
      </NavLink>
      <HeaderTabs variant="desktop" />
      <HeaderTabs variant="mobile" />
      <FilePen strokeWidth={1.5} size={19} absoluteStrokeWidth={true} />
      <img src={ProfileDefaultImg} alt="HACKPLAY" className="w-14" /> {/* TODO: API 연동 */}
    </header>
  );
};

export default Header;
