import { Fragment, useState } from 'react';
import { SideBar } from '../../organisms/SideBar/SideBar';
import Navbar from '../../organisms/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

import './Dashboard.scss';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Fragment>
      <div className="dashboard-container">
        <SideBar activeTab={activeTab} onTabChange={handleTabChange} />
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
