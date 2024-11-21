import { Fragment, useState, useEffect, useRef } from 'react';
import './VerifyEmail.scss';
import Form from './../../molecules/Form/Form';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import { SessionStorage } from '../../../../utils/storage';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(() => {
    const savedTimer = SessionStorage.get('timer');
    return savedTimer ? parseInt(savedTimer, 10) : 30;
  });
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  useEffect(() => {
    otpInputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          SessionStorage.set('timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
      SessionStorage.set('timer', '0');
    }
  }, [timer]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }

      if (newOtp.join('').length === 6) {
        console.log('Verifying OTP:', newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          otpInputRefs.current[index - 1]?.focus();
        }
      } else {
        let newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (paste.length === 6 && !isNaN(paste)) {
      const newOtp = paste.split('');
      setOtp(newOtp);
      otpInputRefs.current[5]?.focus();
      console.log('Verifying OTP:', newOtp.join(''));
    }
  };

  const handleResendClick = () => {
    setCanResend(false);
    setTimer(30);
    setOtp(new Array(6).fill(''));
    otpInputRefs.current[0]?.focus();
    SessionStorage.set('timer', '30');
    console.log('Resend OTP');
  };

  return (
    <Fragment>
      <div className="verify-email-container-main">
        <Form
          logo={true}
          title="Verify your email"
          subTitle="Check xyz@thapar.edu for otp and enter the code below to verify."
          subtext={
            <Fragment>
              Not your email? <Link to={-1}>Change email</Link>
            </Fragment>
          }
          button={false}
        >
          <div className="otp-inputs" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                ref={(el) => (otpInputRefs.current[index] = el)}
                aria-label={`OTP input ${index + 1}`}
                autoComplete="one-time-code"
                inputMode="numeric"
              />
            ))}
          </div>
          <h3 className="resend-otp">
            Didn’t receive code?{' '}
            {canResend ? (
              <Button variant="secondary" onClick={handleResendClick}>
                Resend
              </Button>
            ) : (
              <span>Resend otp in {timer}s</span>
            )}
          </h3>
        </Form>
      </div>
    </Fragment>
  );
};

export default VerifyEmail;
