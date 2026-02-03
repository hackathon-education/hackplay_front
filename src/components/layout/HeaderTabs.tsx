import { NavLink } from 'react-router-dom';

import { NAV_ITEMS } from '@/constants/menuData';
import { useLockModal } from '@/hooks/useLockModal';

import LockModal from '../LockModal';

interface HeaderTabsProps {
  variant: 'desktop' | 'mobile';
  onItemClick?: () => void;
  isScrolled?: boolean;
}

const HeaderTabs = ({ variant, onItemClick, isScrolled = false }: HeaderTabsProps) => {
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const listClass =
    variant === 'desktop'
      ? 'hidden lg:flex w-[500px] h-14 items-center justify-center gap-10 rounded-20 border border-nav-border bg-nav-bg shadow-1'
      : 'space-y-6 flex-1';

  const dividerClass =
    'relative after:absolute after:-right-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-3.5 after:bg-divider last:after:hidden';

  const itemClass =
    variant === 'desktop'
      ? `${dividerClass} text-base transition-colors cursor-pointer text-nav-text-default font-normal hover:text-nav-text-hover`
      : 'text-[18px] font-semibold text-gray-800 block';

  return (
    <nav className={listClass}>
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className={`${itemClass} list-none`}>
          {item.locked ? (
            <button onClick={handleLockedItemClick}>{item.label}</button>
          ) : (
            <NavLink
              to={item.path ?? '#'}
              onClick={onItemClick}
              className="aria-[current=page]:text-nav-text-active aria-[current=page]:font-medium"
            >
              {item.label}
            </NavLink>
          )}
        </li>
      ))}

      <LockModal isOpen={isLockModalOpen} onClose={closeLockModal} />
    </nav>
  );
};

export default HeaderTabs;
