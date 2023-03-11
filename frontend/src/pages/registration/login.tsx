import { Box, Button, TextField, Typography } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user_context';
import { useLoginMutation } from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import { errorMessages } from '../../utils/errors';
import routeNames from '../../utils/routeNames';
import { useErrorHandler } from '../../utils/use_error_handler';
import useForm from '../../utils/use_form';
import { errorInterface } from './register';

const Login = () => {
  const errorHandler = useErrorHandler();
  const [errors, setErrors] = useState<errorInterface>({});
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const { values, onSubmit, onChange } = useForm(
    loginUserCallback,
    {
      email: '',
      password: '',
    },
    setErrors
  );

  const { mutate } = useLoginMutation(graphqlRequestClient, {
    onSuccess(data) {
      const userData = data.login;
      context?.login(userData);
      setErrors({});
      navigate(routeNames.home);
    },
    onError(err: any) {
      const message = err?.response?.errors[0]?.message;
      if (
        message === errorMessages.EMAIL_INVALID ||
        message === errorMessages.EMAIL_EMPTY
      ) {
        setErrors({ email: true });
      }
      if (message === errorMessages.PASSWORD_EMPTY) {
        setErrors({ password: true });
      }
      if (message === errorMessages.USER_NOT_FOUND) {
        setErrors({ password: true, email: true });
      }
      errorHandler.checkError(err);
    },
  });

  function loginUserCallback() {
    mutate(values as any);
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        sx={{
          marginTop: '1rem',
        }}
        fullWidth
        type='text'
        name='email'
        label='email'
        value={values.email}
        variant='outlined'
        onChange={onChange}
        error={errors.email ? true : false}
      />
      <TextField
        sx={{
          marginTop: '1rem',
        }}
        fullWidth
        type='password'
        name='password'
        label='password'
        value={values.password}
        variant='outlined'
        onChange={onChange}
        error={errors.password ? true : false}
      />
      <Button
        sx={{
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
        fullWidth
        variant='outlined'
        type='submit'
      >
        <Typography>Login</Typography>
      </Button>
    </form>
  );
};

export default Login;
