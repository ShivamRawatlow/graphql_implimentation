import { Drawer } from '@mui/material';

interface Props {
  drawerWidth: number;
  drawer: JSX.Element;
}

const DesktopDrawer = ({ drawerWidth, drawer }: Props) => {
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
      {drawer}
    </Drawer>
  );
};

export default DesktopDrawer;
