import {
  BorderColorRounded,
  HomeRounded,
  HowToRegRounded,
  LoginRounded,
  LogoutRounded,
  PersonRounded,
} from '@mui/icons-material';
import { Divider, Grid, SxProps, Theme, Toolbar } from '@mui/material';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/user_context';
import routeNames from '../../utils/routeNames';

const toolBarStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
};

const menuTextStyle: SxProps<Theme> = {
  marginLeft: '0.5rem',
};

const homeLinksStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '0.5rem',
  textDecoration: 'inherit',
  marginTop: '2rem',
  marginBottom: '2rem',
  color: 'inherit',
};

const DrawerItems = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const logoutButtonClick = () => {
    context?.logout();
    navigate(routeNames.login);
  };
  return (
    <>
      <Toolbar />
      <Divider />
      <Toolbar sx={toolBarStyle}>
        <Grid component={Link} to={routeNames.home} sx={homeLinksStyle}>
          <HomeRounded fontSize='medium' />
          <Grid sx={menuTextStyle}>Home</Grid>
        </Grid>
        {context?.user && (
          <Grid component={Link} to={routeNames.myprofile} sx={homeLinksStyle}>
            <PersonRounded fontSize='medium' />
            <Grid sx={menuTextStyle}>My Profile</Grid>
          </Grid>
        )}
        {context?.user && (
          <Grid component={Link} to={routeNames.createPost} sx={homeLinksStyle}>
            <BorderColorRounded fontSize='medium' />
            <Grid sx={menuTextStyle}>CreatePost</Grid>
          </Grid>
        )}
        {context?.user && (
          <Grid
            onClick={logoutButtonClick}
            sx={{ ...homeLinksStyle, cursor: 'pointer' }}
          >
            <LogoutRounded color='secondary' fontSize='medium' />
            <Grid sx={menuTextStyle}>Logout</Grid>
          </Grid>
        )}
        {!context?.user && (
          <Grid component={Link} sx={homeLinksStyle} to={routeNames.login}>
            <LoginRounded color='secondary' fontSize='medium' />
            <Grid sx={menuTextStyle}>Login</Grid>
          </Grid>
        )}
        {!context?.user && (
          <Grid component={Link} sx={homeLinksStyle} to={routeNames.register}>
            <HowToRegRounded color='secondary' fontSize='medium' />
            <Grid sx={menuTextStyle}>Register</Grid>
          </Grid>
        )}
      </Toolbar>
      <Divider />
    </>
  );
};

export default DrawerItems;
