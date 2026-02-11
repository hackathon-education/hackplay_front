import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '@/api/axios';
import { USER_MENU_ITEMS } from '@/constants/menuData';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

export const useUserMenu = (onClose?: () => void) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        await axiosInstance.post(
          '/v1/auth/signout',
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      logout();
      navigate(ROUTES.MAIN);
      if (onClose) onClose();
    }
  };

  const handleMenuItemClick = (item: (typeof USER_MENU_ITEMS)[number]) => {
    if (item.label === '로그아웃') {
      handleLogout();
      return;
    }

    if (item.path && item.path !== '#') {
      navigate(item.path);
    } else {
      console.log(`${item.label} 클릭`);  // TODO: 기능 구현 완료 시 제거
    }

    if (onClose) onClose();
  };

  return { handleMenuItemClick };
};
