import {Fragment} from 'react';
import Form from '../../molecules/Form/Form';
import Input from '../../../common/Input/Input';
import { Link ,useNavigate} from 'react-router-dom';

const InputFieldData = [
  {
    placeholder: 'Full Name',
    autoComplete: 'name',
    "aria-label": 'Full Name',
  },
  {
    placeholder: 'Phone Number',
    type: 'tel',
    autoComplete: 'tel-national',
    "aria-label": 'Phone Number',
  },
  {
    placeholder: 'Institute Email',
    type: 'email',
    autoComplete: 'email',
    "aria-label": 'Email',
  },
  {
    placeholder: 'Institute Name',
    autoComplete: 'organization',
    "aria-label": 'Institute Name',
  },
  {
    placeholder: 'Address',
    autoComplete: 'address',
    "aria-label": 'Address',
  },
  {
    placeholder: 'Password',
    type: 'password',
    autoComplete: 'new-password',
    "aria-label": 'Password',
  },
  {
    placeholder: 'Confirm Password',
    type: 'password',
    autoComplete: 'new-password',
    "aria-label": 'Confirm Password',
  },
];



const Register = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    navigate('/verify-email');
  
  }
  return (
    <Fragment>
      <Form
        title="Create your account"
        subTitle="Join Scholar Sheet and get instant scholar reports"
        subtext = {<Fragment>Already a user? <Link to="/login">Log in</Link></Fragment>}
        onSubmit={handleSubmit}
      >
        {InputFieldData.map ((inputField, index) => {
          return <Input key={index} {...inputField} />;
        })}
      </Form>
    </Fragment>
  );
};
export default Register;
