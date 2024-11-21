import { Fragment } from 'react';
import './VerificationPending.scss';
import Logo from '../../atoms/Logo/Logo';

const VerificationPending = () => {
  return (
    <Fragment>
      <div className="verification-pending-container-main">
        <Logo />
        <h2>Pending Verification</h2>
        <p>
          The verification process will take upto 36 hours. You will be notified
          through an email.
        </p>
      </div>
    </Fragment>
  );
};
export default VerificationPending;
