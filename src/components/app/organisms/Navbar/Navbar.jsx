import { Fragment, useEffect, useState } from 'react';
import DepartmentSelector from '../../molecules/DepartmentSelector/DepartmentSelector';
import { faker } from '@faker-js/faker';
import './Navbar.scss';
import formatDate from '../../../../utils/formatDate';
import { subscribeToFetchTime } from '../../../../utils/api';
import SearchBar from '../../../common/SearchBar/SearchBar';

const Navbar = () => {
  const [fetchTime, setFetchTime] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToFetchTime((newTime) => {
      if (newTime) {
        setFetchTime(newTime);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      <nav className="navbar">
        <div className="nav-title">
          <h1>Dashboard Overview</h1>
          <h3>{fetchTime ? formatDate(fetchTime) : 'Never'}</h3>
        </div>
        <div className="nav-options">
          <SearchBar></SearchBar>
          <DepartmentSelector></DepartmentSelector>
          <img src={faker.image.avatar()} alt="#" className="user-avatar" />
        </div>
      </nav>
    </Fragment>
  );
};
export default Navbar;
