import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import UserContext from '../../context/user_context';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routeNames from '../../utils/routeNames';
import { AppBar, Grid, SxProps, Theme, Toolbar } from '@mui/material';
import {
  PersonRounded,
  HomeRounded,
  BorderColorRounded,
  LogoutRounded,
  LoginRounded,
  HowToRegRounded,
} from '@mui/icons-material';
import Routing from '../routing';
import MobileDrawer from './mobile_drawer';
import DesktopDrawer from './desktop_drawer';

const toolBarStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
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

const menuTextStyle: SxProps<Theme> = {
  marginLeft: '0.5rem',
};

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const logoutButtonClick = () => {
    context?.logout();
    navigate(routeNames.login);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <Toolbar sx={toolBarStyle}>
        {context?.user && (
          <Grid component={Link} to={routeNames.home} sx={homeLinksStyle}>
            <HomeRounded fontSize='medium' />
            <Grid sx={menuTextStyle}>Home</Grid>
          </Grid>
        )}
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar position='fixed'>
        <Toolbar
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: {
              sm: `${drawerWidth}px`,
            },
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={routeNames.home}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
              variant='h4'
              component='div'
            >
              Tell Tale
            </Typography>
          </Link>

          <div></div>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label='mailbox folders'
      >
        <MobileDrawer
          container={container}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          drawer={drawer}
        />
        <DesktopDrawer drawer={drawer} drawerWidth={drawerWidth} />
      </Box>
      <Box
        sx={{
          marginLeft: {
            sm: `${drawerWidth + 20}px`,
          },
          marginTop: '5rem',
        }}
      >
        <Routing />
      </Box>
    </Box>
  );
}
