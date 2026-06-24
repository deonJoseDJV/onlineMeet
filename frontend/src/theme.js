import { createTheme } from '@mui/material/styles';

// Shared MUI dark theme so all Material components match the Meetly brand.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8b5cf6', dark: '#6d28d9', light: '#a78bfa' },
    secondary: { main: '#22d3ee' },
    background: { default: '#0a0a12', paper: '#15151f' },
    text: { primary: '#f4f4fb', secondary: '#a3a3c2' },
    error: { main: '#ef4444' },
    success: { main: '#22c55e' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
          boxShadow: '0 8px 24px -8px rgba(139,92,246,0.6)',
          '&:hover': {
            background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.03)',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

export default theme;
