import { BrowserRouter } from 'react-router-dom';

import ScrollToTop from '@/components/ScrollToTop';

import Footer from './components/Footer';
import Header from './components/Header';
import Router from './router/router';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
