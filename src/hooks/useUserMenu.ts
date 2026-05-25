import { useNavigate } from 'react-router-dom';

import { USER_MENU_ITEMS } from '@/constants/menuData';
import { ROUTES } from '@/constants/routes';
import { endAuthSession } from '@/utils/authSession';

export const useUserMenu = (onClose?: () => void) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await endAuthSession();
    navigate(ROUTES.MAIN);
    if (onClose) onClose();
  };

  const handleMenuItemClick = (item: (typeof USER_MENU_ITEMS)[number]) => {
    if (item.label === '로그아웃') {
      handleLogout();
      return;
    }

    if (item.path && item.path !== '#') {
      navigate(item.path);
    } else {
      console.log(`${item.label} 클릭`); // TODO: 기능 구현 완료 시 제거
    }

    if (onClose) onClose();
  };

  return { handleMenuItemClick };
};
