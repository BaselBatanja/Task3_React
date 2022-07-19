import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AppContextProvider from "./context/app-context";
import { BrowserRouter } from "react-router-dom";

import "./index.styl";
const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
