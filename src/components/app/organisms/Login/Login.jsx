import { Fragment, useState } from 'react';
import Form from '../../molecules/Form/Form';
import Input from '../../../common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from './../../../../hooks/useAuthHooks';
import { LocalStorage } from '../../../../utils/storage';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoading, isError, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, {
      onSuccess: (response) => {
        console.log('Login successful, response:', response);
        console.log('Token:', response.token);
        LocalStorage.set('authToken', response.token);
        navigate('/home');
      },
      onError: (error) => {
        console.log('Login failed', error.response?.data || error.message);
      },
    });
  };

  const InputFieldData = [
    {
      name: 'email',
      placeholder: 'Institute Email',
      type: 'email',
      autoComplete: 'email',
      'aria-label': 'Institute Email',
      value: formData.email,
      onChange: handleChange,
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      autoComplete: 'current-password',
      'aria-label': 'Password',
      value: formData.password,
      onChange: handleChange,
    },
  ];

  return (
    <Fragment>
      <Form
        title="Login to your account"
        subTitle="Welcome back to Scholar Sheet"
        subtext={
          <Fragment>
            Don’t have an account? <Link to="/">Sign up</Link>
          </Fragment>
        }
        onSubmit={handleSubmit}
        buttonText={isLoading ? 'Logging in...' : 'Login'}
      >
        {InputFieldData.map((inputField, index) => {
          return <Input key={index} {...inputField} />;
        })}
      </Form>
      {isError && <p style={{ color: 'red' }}>Login failed: {error.message}</p>}
    </Fragment>
  );
};

export default Login;
