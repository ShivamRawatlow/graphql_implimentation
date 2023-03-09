import { useReducer, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserContext, { authReducer } from './context/user_context';
import IUser from './interfaces/user_interface';
import jwtDecode from 'jwt-decode';
import MainTheme from './themes/main-theme';
import { Alert, AlertColor, Snackbar, ThemeProvider } from '@mui/material';
import ResponsiveDrawer from './components/responsive_drawer/responsive_drawer';
import graphqlRequestClient from './graphQLRequestClient';

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

interface IAlert {
  message: string;
  severity: AlertColor;
}

const App = () => {
  const [alert, setAlert] = useState<IAlert>({
    message: '',
    severity: 'success',
  });
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: IUser) => {
    localStorage.setItem('jwtToken', userData.token);
    graphqlRequestClient.setHeader('authorization', `Bearer ${userData.token}`);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const updateUser = (userData: IUser) => {
    localStorage.setItem('jwtToken', userData.token);
    graphqlRequestClient.setHeader('authorization', `Bearer ${userData.token}`);
    dispatch({
      type: 'UPDATE_USER',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    graphqlRequestClient.setHeader('authorization', ``);
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <>
      <ThemeProvider theme={MainTheme}>
        <Snackbar
          open={alert.message !== ''}
          autoHideDuration={2000}
          onClose={() =>
            setAlert((prevState) => ({
              message: '',
              severity: prevState.severity,
            }))
          }
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
        <UserContext.Provider
          value={{ user: state.user, login, logout, setAlert, updateUser }}
        >
          <BrowserRouter>
            <ResponsiveDrawer />
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
