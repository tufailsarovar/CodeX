import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366F1"
    },
    secondary: {
      main: "#F97316"
    },
    background: {
      default: "#0B1120",
      paper: "#020617"
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#9CA3AF"
    }
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(148,163,184,0.2)"
        }
      }
    }
  }
});

export default theme;
