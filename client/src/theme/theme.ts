import { createTheme } from '@mui/material/styles'

// Graphite instead of pure black — reads softer everywhere it's used
// (body text and the warning chip, which needs it set separately since
// MUI computes chip contrastText on its own, not from palette.text).
const GRAPHITE = '#212121'

// Palette and typography follow spec §7: neutral background, one calm
// accent (teal fits the medical theme), and status colors read as
// green/yellow/gray rather than MUI's stock saturated defaults.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
    },
    secondary: {
      main: '#64748b',
    },
    success: {
      main: '#16a34a',
    },
    warning: {
      main: '#facc15',
      contrastText: GRAPHITE,
    },
    error: {
      main: '#dc2626',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: GRAPHITE,
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})
