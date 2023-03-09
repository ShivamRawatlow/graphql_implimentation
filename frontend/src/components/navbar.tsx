import { AppBar, Button, Grid, SxProps, Toolbar } from '@mui/material';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routeNames from '../utils/routeNames';
import UserContext from '../context/user_context';
import { Theme } from '@emotion/react';
import {
  PersonRounded,
  HomeRounded,
  BorderColorRounded,
  LogoutRounded,
} from '@mui/icons-material';

const toolBarStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const homeLinksStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0.5rem',
  color: 'inherit',
  textDecoration: 'inherit',
};

const Navbar = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const logoutButtonClick = () => {
    context?.logout();
    navigate(routeNames.login);
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={toolBarStyle}>
        <Button component={Link} to={routeNames.home} color='inherit'>
          Tell Tale
        </Button>
        {context?.user && (
          <Grid component={Link} to={routeNames.home} sx={homeLinksStyle}>
            <HomeRounded fontSize='medium' />
            <Grid>Home</Grid>
          </Grid>
        )}
        {context?.user && (
          <Grid component={Link} to={routeNames.myprofile} sx={homeLinksStyle}>
            <PersonRounded fontSize='medium' />
            <Grid>My Profile</Grid>
          </Grid>
        )}
        {context?.user && (
          <Grid component={Link} to={routeNames.createPost} sx={homeLinksStyle}>
            <BorderColorRounded fontSize='medium' />
            <Grid>CreatePost</Grid>
          </Grid>
        )}
        {context?.user && (
          <Grid onClick={logoutButtonClick} sx={homeLinksStyle}>
            <LogoutRounded color='secondary' fontSize='medium' />
            <Grid sx={{ color: 'secondary' }}>Logout</Grid>
          </Grid>
        )}
        {!context?.user && (
          <Button component={Link} to={routeNames.login} color='inherit'>
            Login
          </Button>
        )}
        {!context?.user && (
          <Button component={Link} to={routeNames.login} color='inherit'>
            Login
          </Button>
        )}
        {!context?.user && (
          <Button component={Link} to={routeNames.register} color='inherit'>
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
