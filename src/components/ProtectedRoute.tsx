import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
