import * as React from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";





function RootPage() {
  
  const auth = useAuth();

  function signon() {
    auth.signinRedirect();
  }
  
  if (auth.isAuthenticated) {
    
    const decodedIdToken = jwt_decode(auth.user.id_token);
    const decodedAccessToken = jwt_decode(auth.user.access_token);
    
    return (
      null
    );
    
  } else {
    
    return (
      
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
          {renderRootBox()}
        </Col>

      </Row>
    );
  }
}

export default RootPage;
