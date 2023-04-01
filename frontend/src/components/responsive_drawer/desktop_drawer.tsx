import { Drawer } from '@mui/material';

interface Props {
  drawerWidth: number;
  drawerItems: JSX.Element;
}

const DesktopDrawer = ({ drawerWidth, drawerItems }: Props) => {
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
      {drawerItems}
    </Drawer>
  );
};

export default DesktopDrawer;
