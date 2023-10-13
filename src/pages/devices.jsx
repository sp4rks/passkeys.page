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
  //console.log(auth.user.access_token);
  
  useEffect(() => {
    
    const request = new Request('https://api.pingone.asia/v1/environments/21be67a7-c745-4934-b6a4-6a35c918ce6a/users/a55dcdf4-1418-4ec5-a2a6-97fd589a7058/devices', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Authorization': 'Bearer ' + auth.user.access_token
      }
    })
    
    //console.log('Request Built:')
    //console.log(request)
    
    fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        error.response.text().then(errorMessage => {
          console.error('401 Unauthorized - Response Body:', errorMessage);
        });
      } else {
        console.error(error);
      }
    });
    
  });

  if (auth.isAuthenticated) {
    
    return (
      <div className="pLight">
        
        <Row sm={12}>
          <h1>Your Passkeys</h1>
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
