import { useMutation } from '@apollo/client';
import { Link } from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import gql from 'graphql-tag';
import React, { useState } from 'react';

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
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log('SignUp result', result);
    },
    onError(err) {
      console.log(
        'SignUp Error',
        err.graphQLErrors[0]?.extensions?.exception?.errors
      );
      //setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    addUser();
  };

  return (
    <>
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
                />
              </Box>
              <Box margin='10px' marginTop='20px'>
                <Button fullWidth variant='outlined' type='submit'>
                  <Typography>SignUp</Typography>
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Register;
