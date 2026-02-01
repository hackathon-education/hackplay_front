import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from './Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='pt-24'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
