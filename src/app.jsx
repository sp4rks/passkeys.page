import React, { useEffect } from "react";

import { useAuth } from "react-oidc-context";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

import { Route } from "wouter";

import Header from "./components/header";
import Loading from "./components/loading";
import OidcConfig from "./pages/oidcConfig";
import Splash from "./pages/splash";
import Tokens from "./pages/tokens";

function App() {
  
  const auth = useAuth();
 
  if (auth.isLoading || auth.activeNavigator ) {
    return (<Loading />); 
  }
  
  if (auth.error) {
    
    if (auth.error.message == "No matching state found in storage") {
      return (<Loading />);
    } else {
      return (
        <div className="pError">
          <h1>Authentication Error</h1>
          <h3>{auth.error.message}</h3>
        </div>
      );      
    }
  }
  
  return (

    <div className="pMain">
      <Header />
      <Container>
        <Route exact path="/">
          <Splash />
        </Route>
      </Container>
    </div>
  );
}

export default App;