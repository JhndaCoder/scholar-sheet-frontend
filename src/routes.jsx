import {createBrowserRouter} from 'react-router-dom';
import InfoVis from './components/app/organisms/InfoVis/InfoVis';
import PubInfo from './components/app/organisms/PubInfo/PubInfo';
import PubTable from './components/app/molecules/PubTable/PubTable';
import Dashboard from './components/app/pages/Dashboard/Dashboard';
import Auth from './components/app/pages/Auth/Auth';
import Register from './components/app/organisms/Register/Register';
import Login from './components/app/organisms/Login/Login';
import ProfileInfo from './components/app/organisms/ProfileInfo/ProfileInfo';
import Profile from './components/app/pages/Profile/Profile';
import VerifyEmail from './components/app/pages/VerifyEmail/VerifyEmail';
import ExpInfo from './components/app/organisms/ExpInfo/ExpInfo';
import DataTile from './components/app/molecules/DataTile/DataTile';
import LineChartTile from './components/app/molecules/LineChartTile/LineChartTile';

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
      },
    ],
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  {
    element: <Profile/>,
    path:'profile',
    children:[
      {
        element: <ProfileInfo/>,
        path: 'profileinfo',
      },
      {
        element: <InfoVis/>,
        path: 'infovis',
      },
      {
        element: <DataTile/>,
        path: 'datatile',
      },
      {
        element: <LineChartTile/>,
        path: 'linecharttile',
      },
      {
        element: <PubInfo/>,
        path: 'pubinfo',
        children:[
          {
            element: <PubTable/>,
            path: 'pubtable',
          },
        ]
      },
      {
        element: <ExpInfo/>,
        path: 'expinfo',
      }
    ]
  },
  {
    element: <Dashboard/>,
    path: 'dashboard',
  }
]);


export default router;  