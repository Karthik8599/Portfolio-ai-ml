import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
// Base tokens/reset must land in the cascade before any component CSS,
// so component stylesheets can reliably override equal-specificity base
// rules (e.g. a breakpoint hiding something the base .btn class sets).
import "./styles/global.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
