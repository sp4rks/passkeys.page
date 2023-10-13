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
  const [devices, setDevices] = useState([]);
  
  const decodedIdToken = jwt_decode(auth.user.id_token);
  const decodedAccessToken = jwt_decode(auth.user.access_token);
  
  function getDevices() {
    setDevices(['Device 1']);
  }
  
  useEffect(() => {
    const url = `https://api.pingone.asia/v1/21be67a7-c745-4934-b6a4-6a35c918ce6a/users/${auth.id_token}/devices`;
    console.log('Looking up: url');
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Device Lookup Failed');
        }
        return response.json();
      })
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  
  function signon() {
    auth.signinRedirect();
  }
  
  if (auth.isAuthenticated) {
    
    const decodedIdToken = jwt_decode(auth.user.id_token);
    const decodedAccessToken = jwt_decode(auth.user.access_token);
    
    return (
      <div className="pLight">
        
        <Row sm={12}>
          <h1>All Signed In!</h1>
          <h5 className="text-muted">{decodedIdToken.username}</h5>
        </Row>

        <Row sm={12}>
          
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
