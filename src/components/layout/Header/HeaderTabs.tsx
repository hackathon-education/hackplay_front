import { NavLink } from 'react-router-dom';

import { NAV_ITEMS } from '@/constants/menuData';
import { useLockModal } from '@/hooks/useLockModal';

import LockModal from '../../LockModal';

interface HeaderTabsProps {
  variant: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

const HeaderTabs = ({ variant, onItemClick }: HeaderTabsProps) => {
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const listClass =
    variant === 'desktop'
      ? 'lg:flex w-[500px] h-14 items-center justify-center gap-10 rounded-20 border border-nav-border bg-nav-bg shadow-1'
      : '';

  const dividerClass =
    'relative after:absolute after:-right-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-3.5 after:bg-divider last:after:hidden';

  const itemClass =
    variant === 'desktop'
      ? `${dividerClass} text-base transition-colors cursor-pointer text-nav-text-default font-normal hover:text-nav-text-hover`
      : '';

  const linkClass =
    variant === 'desktop'
      ? 'aria-[current=page]:text-nav-text-active aria-[current=page]:font-medium'
      : '';

  const snbItemClass =
    variant === 'mobile'
      ? 'flex items-center p-3 border-b w-full border-divider text-drawer-text-base text-lg font-medium'
      : '';

  return (
    <nav className={listClass}>
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className={`${itemClass} list-none`}>
          {item.locked ? (
            <button onClick={handleLockedItemClick} className={snbItemClass}>
              {item.label}
            </button>
          ) : (
            <NavLink
              to={item.path ?? '#'}
              onClick={onItemClick}
              className={`${linkClass} ${snbItemClass}`}
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
