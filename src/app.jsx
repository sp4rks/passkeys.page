import React, { useEffect } from "react";

import { useAuth } from "react-oidc-context";

import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import { Route } from "wouter";

import Header from "./components/header";
import Loading from "./components/loading";
import RootPage from "./pages/root"
import TokenPage from "./pages/tokens"


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
          <RootPage />
        </Route>
        <Route exact path="/tokens">
          <TokenPage />
        </Route>
        <Route exact path="/loading">
          <Loading />
        </Route>
      </Container>
    </div>

  );
}

export default App;
