import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import ProtectedRoute from './components/app/organisms/ProtectedRoute/ProtectedRoute';

const Auth = lazy(() => import('./components/app/pages/Auth/Auth'));
const Register = lazy(
  () => import('./components/app/organisms/Register/Register')
);
const Login = lazy(() => import('./components/app/organisms/Login/Login'));
const VerifyEmail = lazy(
  () => import('./components/app/pages/VerifyEmail/VerifyEmail')
);
const VerificationPending = lazy(
  () =>
    import('./components/app/organisms/VerificationPending/VerificationPending')
);
const Home = lazy(() => import('./components/app/pages/Home/Home'));
const AddFaculty = lazy(
  () => import('./components/app/pages/AddFaculty/AddFaculty')
);

import Report from './components/app/pages/Reports/Report';

import Dashboard from './components/app/pages/Dashboard/Dashboard';
import AllResearchers from './components/app/organisms/AllResearchers/AllResearchers';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        element: <Login />,
        path: 'login',
      },
    ],
  },
  {
    element: <VerificationPending />,
    path: 'verification-pending',
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'reports',
        element: <Report />,
      },
      {
        path: 'researchers',
        element: <AllResearchers />,
      },
      {
        path: 'addFaculty',
        element: <AddFaculty />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
