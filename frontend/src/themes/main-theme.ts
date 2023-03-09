import { createTheme } from '@mui/material';

export const primaryColor = '#383e56';
const primaryLight = '#e5fad8';
export const primaryContrastText = '#c5d7bd';

const secondaryColor = '#fb743e';
const secondaryLight = '#F5F5F5';
const secondaryContrastText = '#000000';

const MainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },

  palette: {
    primary: {
      main: primaryColor,
      light: primaryLight,
      contrastText: primaryContrastText,
    },
    secondary: {
      main: secondaryColor,
      light: secondaryLight,
      contrastText: secondaryContrastText,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: primaryColor,
          color: primaryContrastText,
        },
      },
    },
  },
});

export default MainTheme;
