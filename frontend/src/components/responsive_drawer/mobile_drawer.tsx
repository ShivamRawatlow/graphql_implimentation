import { Drawer } from '@mui/material';
import DrawerItems from './drawer_items';

interface Props {
  drawerWidth: number;
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const MobileDrawer = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerToggle,
}: Props) => {
  return (
    <Drawer
      container={container}
      variant='temporary'
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      <DrawerItems />
    </Drawer>
  );
};

export default MobileDrawer;
