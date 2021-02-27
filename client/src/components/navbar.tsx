import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
import routeNames from '../utils/routeNames';
import UserContext from '../context/user_context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const context = useContext(UserContext);
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const logoutButtonClick = () => {
    context?.logout();
    history.push(routeNames.login);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Box className={classes.title}>
          <Button
            component={Link}
            to={routeNames.home}
            style={{ color: 'white' }}
          >
            {context?.user ? context?.user?.userName : 'Home'}
          </Button>
        </Box>

        {context?.user ? (
          <>
            <Button component={Link} to={routeNames.myprofile} color='inherit'>
              My Profile
            </Button>
            <Button component={Link} to={routeNames.createPost} color='inherit'>
              CreatePost
            </Button>
            <Button onClick={logoutButtonClick} color='inherit'>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to={routeNames.login} color='inherit'>
              Login
            </Button>
            <Button component={Link} to={routeNames.register} color='inherit'>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

