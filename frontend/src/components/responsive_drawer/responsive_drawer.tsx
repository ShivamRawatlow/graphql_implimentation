import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import routeNames from '../../utils/routeNames';
import { AppBar, Toolbar } from '@mui/material';
import Routing from '../routing';
import MobileDrawer from './mobile_drawer';
import DesktopDrawer from './desktop_drawer';
import { useState } from 'react';
import DrawerItems from './drawer_items';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar position='fixed'>
        <Toolbar
          sx={{
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
              variant='h3'
              component='div'
              className='brand-logo'
            >
              Tell Tale
            </Typography>
          </Link>
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
          drawerItems={
            <DrawerItems isMobile={true} closeDrawer={closeDrawer} />
          }
        />
        <DesktopDrawer
          drawerWidth={drawerWidth}
          drawerItems={
            <DrawerItems isMobile={false} closeDrawer={closeDrawer} />
          }
        />
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
