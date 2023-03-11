import { Drawer } from '@mui/material';
import DrawerItems from './drawer_items';

interface Props {
  drawerWidth: number;
}

const DesktopDrawer = ({ drawerWidth }: Props) => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      open
    >
      <DrawerItems />
    </Drawer>
  );
};

export default DesktopDrawer;
