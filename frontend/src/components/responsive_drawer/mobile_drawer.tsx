import { Drawer } from '@mui/material';

interface Props {
  drawerWidth: number;
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerItems: JSX.Element;
}

const MobileDrawer = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerToggle,
  drawerItems,
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
      {drawerItems}
    </Drawer>
  );
};

export default MobileDrawer;
