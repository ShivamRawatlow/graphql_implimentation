import { Box, Button, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user_context';
import { useRegisterMutation } from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import routeNames from '../../utils/routeNames';
import { useErrorHandler } from '../../utils/use_error_handler';
import useForm from '../../utils/use_form';

const Register = () => {
  const [errors] = useState<any>({});
  const errorHandler = useErrorHandler();
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { values, onSubmit, onChange } = useForm(registerUserCallback, {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { mutate } = useRegisterMutation(graphqlRequestClient, {
    onSuccess(data) {
      context?.login(data.register);
      navigate(routeNames.home);
    },
    onError(err: any) {
      errorHandler.checkError(err);
    },
  });

  function registerUserCallback() {
    mutate(values);
  }

  return (
    <form onSubmit={onSubmit}>
      <Box margin='1rem'>
        <TextField
          fullWidth
          type='text'
          name='userName'
          label='userName'
          value={values.userName}
          variant='outlined'
          onChange={onChange}
          error={errors.userName ? true : false}
        />
      </Box>

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
      <Box margin='1rem'>
        <TextField
          fullWidth
          type='password'
          name='confirmPassword'
          label='confirmPassword'
          value={values.confirmPassword}
          variant='outlined'
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
      </Box>
      <Box margin='1rem' marginTop='2rem'>
        <Button fullWidth variant='outlined' type='submit'>
          <Typography>SignUp</Typography>
        </Button>
      </Box>
    </form>
  );
};

export default Register;
