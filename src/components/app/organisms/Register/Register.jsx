import {Fragment, useState} from 'react';
import Form from '../../molecules/Form/Form';
import Input from '../../../common/Input/Input';
import {Link, useNavigate} from 'react-router-dom';
import {useSignIn} from '../../../../hooks/ReactQueryHooks';

const InputFieldData = [
  {
    name: 'name',
    placeholder: 'Full Name',
    autoComplete: 'name',
    "aria-label": 'Full Name',
  },
  {
    name: 'email',
    placeholder: 'Institute Email',
    type: 'email',
    autoComplete: 'email',
    "aria-label": 'Email',
  },
  {
    name: 'institute_name',
    placeholder: 'Institute Name',
    autoComplete: 'organization',
    "aria-label": 'Institute Name',
  },
  {
    name: 'address',
    placeholder: 'Address',
    autoComplete: 'address',
    "aria-label": 'Address',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    autoComplete: 'new-password',
    "aria-label": 'Password',
  },
  {
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    type: 'password',
    autoComplete: 'new-password',
    "aria-label": 'Confirm Password',
  },
];


const Register = () => {
  const navigate = useNavigate ();
  const [formData, setFormData] = useState({
    name: '',
    scholar_id: '',
    email: '',
    institute_name: '',
    address: '',
    password: '',
  });
  
  const { signIn, isLoading, isError, error} = useSignIn();

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData ({
      ...formData,
      [name]: value,
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData, {
      onSuccess: () => {
        navigate('/verification-pending'); // Navigate to the login page on success
      },
      onError: (error) => {
        console.log('Registration failed', error);
      },
    });
  };


  return (
    <Fragment>
      <Form
        title="Create your account"
        subTitle="Join Scholar Sheet and get instant scholar reports"
        subtext={
          <Fragment>Already a user? <Link to="/login">Log in</Link></Fragment>
        }
        buttonText={isLoading ? 'Loading...' : 'Continue'}
        onSubmit={handleSubmit}
      >
        {InputFieldData.map ((inputField, index) => {
          return (
            <Input
              key={index}
              onChange={handleChange}
              value={formData[inputField.name] || ''}
              {...inputField}
            />
          );
        })}
      </Form>
      {isError && <p style={{ color: 'red' }}>Registration failed: {error.message}</p>}
    </Fragment>
  );
};
export default Register;
