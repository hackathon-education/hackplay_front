import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
