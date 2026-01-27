import { useEffect } from 'react';

import { Toaster } from 'sonner';

import { useAuthStore } from '@/store/authStore';

import Router from './router/router';

const App = () => {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <Toaster richColors />
      <Router />
    </>
  );
};

export default App;
