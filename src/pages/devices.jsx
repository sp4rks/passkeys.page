import * as React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";
import JSONPretty from 'react-json-pretty';

import JSONTheme from "../config/jsontheme";


function DevicesBox() {
  
  const auth = useAuth();
  const [devices, setDevices] = useState('');
  
  const decodedIdToken = jwt_decode(auth.user.id_token);
  const decodedAccessToken = jwt_decode(auth.user.access_token);
  
  useEffect(() => {
    fetch('https://httpbin.org/ip')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setDevices(JSON.stringify(data))
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  if (auth.isAuthenticated) {
    
    return (
      <div className="pLight">
        
        <Row sm={12}>
          <h1>All Signed In!</h1>
          <h5 className="text-muted">{decodedIdToken.username}</h5>
        </Row>

        <Row sm={12}>
          <p>{devices}</p>
        </Row>

      </div>
    );
    
  } else {
    
    return (
      <div className="pLight">
        
        <Row sm={12}>
          <h1>An Error Occured</h1>
          <h5 className="text-muted">You shouldn't see this message</h5>
        </Row>

      </div>
    );
  }
}

export default DevicesBox;
