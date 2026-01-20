import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

const ProtectedRoute = () => {
  const location = useLocation();
  const { isLoggedIn, isLoading } = useAuthStore();

  // 로딩 중에는 리다이렉트하지 않음
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>로딩 중...</div>
      </div>
    );
  }

  // 인증되지 않은 경우에만 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    // 현재 경로를 state로 전달하여 로그인 후 돌아올 수 있게 함
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
