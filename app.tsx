import React, { ComponentType } from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#32424A",
    },
    background: {
      default: "#263238",
      paper: "#263238",
    },
    text: {
      primary: "#607D8B",
    },
    divider: "#009688",
  },
});

export default function App(
  { Page, pageProps }: { Page: ComponentType<any>; pageProps: any },
) {
  return (
    <main>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Page {...pageProps} />
      </MuiThemeProvider>
    </main>
  );
}
