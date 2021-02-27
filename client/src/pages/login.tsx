import { gql, useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user_context';
import AlertSeverity from '../utils/alert-severity';
import routeNames from '../utils/routeNames';
import useForm from '../utils/useForm';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

const Login = () => {
  const [errors, setErrors] = useState<any>({});
  const context = useContext(UserContext);

  const initialState = {
    email: '',
    password: '',
  };

  const { values, onSubmit, onChange } = useForm(
    loginUserCallback,
    initialState
  );

  const history = useHistory();
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log('Login result', userData);
      context?.login(userData);
      history.push(routeNames.home);
    },
    onError(err) {
      const errorData = err.graphQLErrors[0]?.extensions?.exception?.errors;
      console.log('ErrorData', errorData);
      let errorMsg = '';
      for (const oneError in errorData) {
        errorMsg += errorData[oneError] + '\n';
      }

      context?.setAlert({
        message: errorMsg,
        severity: AlertSeverity.error,
      });
      setErrors(errorData || {});
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      style={{ marginTop: '100px' }}
    >
      <Card variant='outlined' style={{ width: '400px' }}>
        <CardContent>
          <Typography align='center' variant='h2'>
            GraphQL App
          </Typography>
          <form onSubmit={onSubmit}>
            <Box margin='10px'>
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
            <Box margin='10px'>
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
            <Box margin='10px' marginTop='20px'>
              <Button fullWidth variant='outlined' type='submit'>
                <Typography>Login</Typography>
              </Button>
            </Box>
          </form>
          <Link to={routeNames.register}>
            <Typography style={{ color: 'black' }} variant='h5' align='center'>
              Dont have an account ?
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
