import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'sonner';

import ScrollToTop from '@/components/ScrollToTop';
import { useAuthStore } from '@/store/authStore';

import Router from './router/router';

const App = () => {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster richColors />
      <Router />
    </BrowserRouter>
  );
};

export default App;
