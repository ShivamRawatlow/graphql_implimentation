import { Button, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user_context';
import { useRegisterMutation } from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import { errorMessages } from '../../utils/errors';
import routeNames from '../../utils/routeNames';
import { useErrorHandler } from '../../utils/use_error_handler';
import useForm from '../../utils/use_form';
export interface errorInterface {
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  userName?: boolean;
}

const Register = () => {
  const [errors, setErrors] = useState<errorInterface>({});
  const errorHandler = useErrorHandler();
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { values, onSubmit, onChange } = useForm(
    registerUserCallback,
    {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    setErrors
  );

  const { mutate } = useRegisterMutation(graphqlRequestClient, {
    onSuccess(data) {
      context?.login(data.register);
      setErrors({});
      navigate(routeNames.home);
    },
    onError(err: any) {
      const message = err?.response?.errors[0]?.message;
      if (message === errorMessages.USERNAME_EMPTY) {
        setErrors({ userName: true });
      }
      if (
        message === errorMessages.EMAIL_INVALID ||
        message === errorMessages.EMAIL_EMPTY ||
        message === errorMessages.EMAIL_TAKEN
      ) {
        setErrors({ email: true });
      }
      if (message === errorMessages.PASSWORD_EMPTY) {
        setErrors({ password: true });
      }
      if (message === errorMessages.PASSWORD_CONFIRM_PASSWORD_NOT_MATCH) {
        setErrors({
          password: true,
          confirmPassword: true,
        });
      }
      errorHandler.checkError(err);
    },
  });

  function registerUserCallback() {
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
        name='userName'
        label='userName'
        value={values.userName}
        variant='outlined'
        onChange={onChange}
        error={errors.userName ? true : false}
      />

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

      <TextField
        sx={{
          marginTop: '1rem',
        }}
        fullWidth
        type='password'
        name='confirmPassword'
        label='confirmPassword'
        value={values.confirmPassword}
        variant='outlined'
        onChange={onChange}
        error={errors.confirmPassword ? true : false}
      />

      <Button
        sx={{
          marginTop: '2rem',
          marginBottom:'1rem'
        }}
        fullWidth
        variant='outlined'
        type='submit'
      >
        <Typography>SignUp</Typography>
      </Button>
    </form>
  );
};

export default Register;
