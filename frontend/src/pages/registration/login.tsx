import { Box, Button, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user_context';
import { useLoginMutation } from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import routeNames from '../../utils/routeNames';
import { useErrorHandler } from '../../utils/use_error_handler';
import useForm from '../../utils/use_form';

const Login = () => {
  const errorHandler = useErrorHandler();
  const [errors] = useState<any>({});
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const { values, onSubmit, onChange } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const { mutate } = useLoginMutation(graphqlRequestClient, {
    onSuccess(data) {
      const userData = data.login;
      context?.login(userData);
      navigate(routeNames.home);
    },
    onError(err: any) {
      errorHandler.checkError(err);
    },
  });

  function loginUserCallback() {
    mutate(values);
  }

  return (
    <form onSubmit={onSubmit}>
      <Box margin='1rem'>
        <TextField
          fullWidth
          type='text'
          name='email'
          label='email'
          value={values.email}
          variant='outlined'
          onChange={onChange}
          error={errors.email ? true : false}
        />
      </Box>
      <Box margin='1rem'>
        <TextField
          fullWidth
          type='password'
          name='password'
          label='password'
          value={values.password}
          variant='outlined'
          onChange={onChange}
          error={errors.password ? true : false}
        />
      </Box>
      <Box margin='1rem' marginTop='2rem'>
        <Button fullWidth variant='outlined' type='submit'>
          <Typography>Login</Typography>
        </Button>
      </Box>
    </form>
  );
};

export default Login;
