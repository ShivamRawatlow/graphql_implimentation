import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import routeNames from '../utils/routeNames';

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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
          <Button component={Link} to={routeNames.home}>
            <Typography variant='h6' style={{ color: 'white' }}>
              Home
            </Typography>
          </Button>
        </Box>
        <Button component={Link} to={routeNames.login} color='inherit'>
          Login
        </Button>
        <Button component={Link} to={routeNames.register} color='inherit'>
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/**   */
