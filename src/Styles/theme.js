import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3754db",
      light: "#F6F8FD",
    },
    secondary: {
      main: "#FBBE37",
    },
    error: {
      main: "#fb151a",
    },
    warning: {
      main: "#EBA300",
    },
    info: {
      main: "#6684FF",
    },
    success: {
      main: "#00C271",
    },
  },
  shape: {
    borderRadius: 12,
  },

  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Lato"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
  },
  props: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
});
export default theme;
