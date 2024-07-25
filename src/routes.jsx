import {lazy} from 'react';
import {createBrowserRouter} from 'react-router-dom';

const Auth = lazy (() => import ('./components/app/pages/Auth/Auth'));
const Register = lazy (() =>
  import ('./components/app/organisms/Register/Register')
);
const Login = lazy (() => import ('./components/app/organisms/Login/Login'));
const VerifyEmail = lazy (() =>
  import ('./components/app/pages/VerifyEmail/VerifyEmail')
);

const router = createBrowserRouter ([
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
      }
    ],
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  }
]);


export default router;  