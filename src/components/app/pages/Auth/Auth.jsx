import { Fragment, useEffect } from 'react';
import './Auth.scss';
import Logo from '../../atoms/Logo/Logo';
import { Outlet, useNavigate } from 'react-router-dom';
import TermsOfService from '../../atoms/TermsOfService/TermsOfService';
import { LocalStorage } from '../../../../utils/storage';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = LocalStorage.get('authToken');
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  return (
    <Fragment>
      <div className="auth-page-container-main">
        <Logo />
        <Outlet />
        <TermsOfService />
      </div>
    </Fragment>
  );
};
export default Auth;
