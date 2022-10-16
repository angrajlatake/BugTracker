import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext({
  toggleMode: () => {},
  mode: "light",
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    JSON.parse(localStorage.getItem("mode")) || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem(
          "mode",
          JSON.stringify(mode === "light" ? "dark" : "light")
        );
      },
      mode,
    }),
    [mode]
  );

  const themes = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
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
          subtitle1: {
            lineHeight: 1.35,
          },
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
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={themes}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
