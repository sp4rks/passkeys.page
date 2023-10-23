import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "react-oidc-context";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./app"
import Config from "./config/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider {...Config.oidc}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
