import React, { ComponentType } from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import oceanic from "./themes/oceanic.ts";

export default function App(
  { Page, pageProps }: { Page: ComponentType<any>; pageProps: any },
) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
        
      </head>
      <div className="loader-container">
        <div className="loadingio-spinner-ball-yfsjmyxwdg">
          <div className="ldio-ctbooqqpn3k">
            <div></div>
          </div>
        </div>
      </div>
      <MuiThemeProvider theme={oceanic}>
        <CssBaseline />
        <Page {...pageProps} />
      </MuiThemeProvider>
    </main>
  );
}
