import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-16 pb-16 px-4 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
