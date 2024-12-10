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

const Researcher = lazy(
  () => import('./components/app/pages/Researcher/Researcher')
);

// const FlowChart = lazy(
//   () => import('./components/app/organisms/FlowChart/FlowChart')
// );

import Report from './components/app/pages/Reports/Report';

import Dashboard from './components/app/pages/Dashboard/Dashboard';
import AllResearchers from './components/app/organisms/AllResearchers/AllResearchers';
import ErrorElement from './components/common/Error/ErrorElement';

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
    errorElement: <ErrorElement />,
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
    errorElement: <ErrorElement />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
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
      {
        // path: 'settings',
        // element: <FlowChart />,
      },
    ],
  },
  {
    path: '/researcher/:id',
    element: (
      <ProtectedRoute>
        <Researcher />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
