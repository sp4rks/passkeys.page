import * as React from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";
import JSONPretty from 'react-json-pretty';

import JSONTheme from "../config/jsontheme";


function SignOnBox() {
  
  const auth = useAuth();

  function signon() {
    auth.signinRedirect();
  }
  
  if (auth.isAuthenticated) {
    
    const decodedIdToken = jwt_decode(auth.user.id_token);
    const decodedAccessToken = jwt_decode(auth.user.access_token);
    
    return (
      <div className="pLight">
        
        <Row sm={12}>
          <h1>An Error Occured</h1>
          <h5 className="text-muted">You shouldn't see this message</h5>
        </Row>

      </div>
    );
    
  } else {
    
    return (

    );
  }
}

export default SignOnBox;
