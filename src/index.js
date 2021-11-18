import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import App from "./components/app";
import { LocalStorageContextProvider } from "./local-storage-context";

ReactDOM.render(
  <React.StrictMode>
    <LocalStorageContextProvider>
      <Router>
          <ThemeProvider>
                <CSSReset />
                <App />
          </ThemeProvider>
      </Router>
    </LocalStorageContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
