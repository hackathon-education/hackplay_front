import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import { FilePen } from 'lucide-react';

import ProfileDefaultImg from '@/assets/user/profile-default.webp';

import HeaderTabs from './HeaderTabs';

const Header = () => {
  return (
    <header>
      <LogoPrimary />
      <HeaderTabs variant="desktop" />
      <HeaderTabs variant="mobile" />
      <FilePen strokeWidth={1.5} size={19} absoluteStrokeWidth={true} />
      <img src={ProfileDefaultImg} alt="HACKPLAY" className="w-14" /> {/* TODO: API 연동 */}
    </header>
  );
};

export default Header;
