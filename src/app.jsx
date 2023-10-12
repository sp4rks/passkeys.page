import React, { useEffect } from "react";

import { useAuth } from "react-oidc-context";

import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import { Route } from "wouter";

import Header from "./components/header";
import Loading from "./components/loading";
import Splash from "./pages/splash";


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
          
          <Row>
            
            <Col sm={5}>
              <div className="pHighlight">
                <h1>Introducing Passkeys</h1>
                <p>
                  Based on FIDO standards, passkeys are a replacement for passwords that provide faster,
                  easier, and more secure sign-ins to websites and apps across a user’s devices.
                  Unlike passwords, passkeys are always strong and phishing-resistant.
                </p>
                <p>
                  Passkeys simplify account registration for apps and websites, are easy to use, work across most of a user’s devices, and even work on other devices within physical proximity.
                </p>
              </div>
            </Col>
            
            <Col sm={7}>
              <div className="pLight">
                <h1>Let's Get Started</h1>
                <h5 className="text-muted">Sign in below to see Passkeys in action</h5>
                <Button className="pJumboButton">Sign On with Passkey</Button>
              </div>
            </Col>
            
          </Row>
          
        </Route>
      </Container>
    </div>
  );
}

export default App;