import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'sonner';

import ScrollToTop from '@/components/ScrollToTop';

import Router from './router/router';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster richColors />
      <Router />
    </BrowserRouter>
  );
};

export default App;
