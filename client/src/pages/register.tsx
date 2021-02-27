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

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

const Register = () => {
  const [errors, setErrors] = useState<any>({});
  const context = useContext(UserContext);
  const history = useHistory();
  const initialState = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { values, onSubmit, onChange } = useForm(
    registerUserCallback,
    initialState
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context?.login(userData);
      history.push(routeNames.home);
    },
    onError(err) {
      const errorData = err.graphQLErrors[0]?.extensions?.exception?.errors;
      console.log('SignUp Error', errorData);
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

  function registerUserCallback() {
    addUser();
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
                name='userName'
                label='userName'
                value={values.userName}
                variant='outlined'
                onChange={onChange}
                error={errors.userName ? true : false}
              />
            </Box>

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
            <Box margin='10px'>
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
            <Box margin='10px' marginTop='20px'>
              <Button fullWidth variant='outlined' type='submit'>
                <Typography>SignUp</Typography>
              </Button>
            </Box>
          </form>
          <Link to={routeNames.login}>
            <Typography style={{ color: 'black' }} variant='h5' align='center'>
              Already have an account ?
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Register;
