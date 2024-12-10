import { Fragment, useState, useEffect } from 'react';
import { SideBar } from '../../organisms/SideBar/SideBar';
import Navbar from '../../organisms/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

import './Dashboard.scss';

const sideBarInfo = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/home',
  },
  {
    title: 'Researchers',
    icon: 'person',
    path: '/home/researchers',
  },
  {
    title: 'Add Faculty',
    icon: 'group_add',
    path: '/home/addFaculty',
  },
  // {
  //   title: 'Rankings',
  //   icon: 'insert_chart',
  //   path: '/home/rankings',
  // },
  // {
  //   title: 'Reports',
  //   icon: 'draft',
  //   path: '/home/reports',
  // },
  {
    title: 'Settings',
    icon: 'settings',
    path: '/home/settings',
  },
];

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const currentTabIndex = sideBarInfo.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveTab(currentTabIndex !== -1 ? currentTabIndex : 0);
  }, [location]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Fragment>
      <div className="dashboard-container">
        <SideBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sideBarInfo={sideBarInfo}
        />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
