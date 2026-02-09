import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from './Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-24 px-[15px] lg:px-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
