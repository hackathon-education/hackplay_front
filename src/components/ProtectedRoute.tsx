import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
