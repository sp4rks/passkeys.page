import * as React from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";
import JSONPretty from 'react-json-pretty';

import JSONTheme from "../config/jsontheme";


function SignOn() {
  
  const auth = useAuth();
  
  function signon() {
    auth.signinRedirect({acr_values:"8b5b60cf2699df87f9181ebb873725a7"});
  }
  
  if (auth.isAuthenticated) {
    
    const decodedIdToken = jwt_decode(auth.user.id_token);
    const decodedAccessToken = jwt_decode(auth.user.access_token);
    
    return (
      <span>

        <Row>
          <Col>
            <h2>Token Details</h2>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h4>ID Token</h4>
            <JSONPretty
              data={decodedIdToken}
              theme={JSONTheme}
              style={{fontSize: ".95em"}}
            />
          </Col>
          
          <Col md={6}>
            <h4>Access Token</h4>
            <JSONPretty
              data={decodedAccessToken}
              theme={JSONTheme}
              style={{fontSize: ".95em"}}
            />
          </Col>

          <Col md={12}>
            <h4>Raw Access Token</h4>
            <p className="text-muted pRawToken">{auth.user.access_token}</p>
          </Col>

        </Row>    

      </span>
    );
    
  } else {
    
    return (
      <div className="pLight">
        <Row sm={12}>
          <h1>Let's Get Started</h1>
          <h5 className="text-muted">Sign in below to see Passkeys in action</h5>
        </Row>

        <Row sm={12} className="pMiddle">
          <div>
            <Button className="pJumboButton" onClick={signon}>Sign On with Passkey</Button>
          </div> 
        </Row>

      </div>
    );
  }
}

export default SignOn;
