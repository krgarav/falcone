import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import "../node_modules/react-bootstrap/dist/react-bootstrap.js"
// import "../node_modules/bootstrap/dist/css/bootstrap.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.js"
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
