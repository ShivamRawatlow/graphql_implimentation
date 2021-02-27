import React, { useReducer, useState } from 'react';
import Navbar from './components/navbar';
import Routing from './components/routing';
import { BrowserRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import UserContext, { authReducer } from './context/user_context';
import IUser from './interfaces/user_interface';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

const token = localStorage.getItem('jwtToken');
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const App = () => {

  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: IUser) => {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const updateUser = (userData: IUser) => {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'UPDATE_USER',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <>
      <Snackbar
        open={alert.message !== ''}
        autoHideDuration={2000}
        onClose={() => setAlert({ message: '', severity: '' })}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
      <UserContext.Provider
        value={{ user: state.user, login, logout, setAlert, updateUser }}
      >
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;
