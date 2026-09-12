import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Opts the page into the reveal animations. Without it every .reveal stays
// visible, so a failed bundle degrades to readable static content.
document.documentElement.classList.add("js");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
