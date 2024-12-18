import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import ProtectedRoute from './components/app/organisms/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/app/pages/Dashboard/Dashboard';

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
const AllResearchers = lazy(
  () => import('./components/app/organisms/AllResearchers/AllResearchers')
);
const RankData = lazy(() => import('./components/app/pages/RankData/RankData'));
const SearchResults = lazy(
  () => import('./components/app/pages/SearchResults/SearchResults')
);
const ErrorElement = lazy(
  () => import('./components/common/Error/ErrorElement')
);

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
        errorElement: <ErrorElement />,
      },
      {
        path: 'login',
        element: <Login />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: 'verification-pending',
    element: <VerificationPending />,
    errorElement: <ErrorElement />,
  },
  {
    path: 'verify-email',
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
        errorElement: <ErrorElement />,
      },
      {
        path: 'researchers',
        element: <AllResearchers />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'addFaculty',
        element: <AddFaculty />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'rankings',
        element: <RankData />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'search/:query',
        element: <SearchResults />,
        errorElement: <ErrorElement />,
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
