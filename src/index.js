import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

import App from "./components/app";
import { LocalStorageContextProvider } from "./local-storage-context";

ReactDOM.render(
  <React.StrictMode>
    <LocalStorageContextProvider>
      <Router>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
      </Router>
    </LocalStorageContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
