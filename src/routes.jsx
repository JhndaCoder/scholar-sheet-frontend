import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import ProtectedRoute
  from './components/app/organisms/ProtectedRoute/ProtectedRoute';

const Auth = lazy(() => import('./components/app/pages/Auth/Auth'));
const Register = lazy(() =>
  import('./components/app/organisms/Register/Register')
);
const Login = lazy(() => import('./components/app/organisms/Login/Login'));
const VerifyEmail = lazy(() =>
  import('./components/app/pages/VerifyEmail/VerifyEmail')
);
const VerificationPending = lazy(() =>
  import('./components/app/organisms/VerificationPending/VerificationPending')
);
const Home = lazy(() => import('./components/app/pages/Home/Home'));

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
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, // Redirect any unknown routes to Auth page
  }
]);

export default router;
