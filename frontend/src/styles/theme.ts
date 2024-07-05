import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#3366ff',
    },
    secondary: {
      main: '#ffcc00',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#33cc33',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
  },
});

export default theme;
