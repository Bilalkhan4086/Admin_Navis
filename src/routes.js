import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import LocalStorageWrapper from './LocalStroageWrapper';

//
import UserData from './pages/UserData';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import AccountView from './pages/AccountView';

// ----------------------------------------------------------------------

export default function Router() {
  const checkLogin = () =>{
    const token = LocalStorageWrapper.getItem("token");
    console.log("token",token)
    return !!token;
  }

  const isLoggedIn = checkLogin();

  return useRoutes([
    {
      path: '/dashboard',
      element: <Protected auth={isLoggedIn}><DashboardLayout /></Protected>,
      children: [
        {
          path: 'clients',
          element: <Protected auth={isLoggedIn}><UserData /></Protected>,
        },
      ],
    },
    {
      path: '/account',
      element: <Protected auth={isLoggedIn}><DashboardLayout /></Protected>,
      children: [{ path: 'settings', element: <Protected auth={isLoggedIn}><AccountView /></Protected> }],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <Protected auth={isLoggedIn}><LogoOnlyLayout /></Protected>,
      children: [
        { path: '/', element: <Protected auth={isLoggedIn}><Navigate to="/dashboard/clients" /></Protected> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
