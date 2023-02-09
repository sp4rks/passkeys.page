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
    <Container className="p-3">
      <Header />
      <Container className="pMain">
        <Route path="/"> <Splash /> </Route>
        <Route path="/tokens"> <Tokens /> </Route>
        <Route path="/config"> <OidcConfig /> </Route>
      </Container>
    </Container>
  );
}

export default App;