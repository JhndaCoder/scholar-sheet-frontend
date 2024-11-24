import {Fragment} from 'react';
import './SideBar.scss';
import Logo from '../../atoms/Logo/Logo';
import {useNavigate} from 'react-router-dom';

export const SideBar = ({activeTab, onTabChange, sideBarInfo}) => {
  const navigate = useNavigate ();

  const handleTabChange = (index, path) => {
    onTabChange (index);
    navigate (path);
  };

  return (
    <Fragment>
      <div className="sidebar-container-main">
        <Logo />
        <div className="sidebar-content">
          {sideBarInfo.map ((item, index) => {
            return (
              <div
                key={index}
                className={`sidebar-item ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabChange (index, item.path)}
              >
                <span className="material-symbols-outlined icon">
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
