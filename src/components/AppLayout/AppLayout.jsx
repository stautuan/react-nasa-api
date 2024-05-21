import { Outlet } from 'react-router-dom';
import PageNav from '../PageNav/PageNav';

function AppLayout() {
  return (
    <>
      <PageNav />
      <Outlet />
    </>
  );
}

export default AppLayout;
