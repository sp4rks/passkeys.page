import * as React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";
import JSONPretty from 'react-json-pretty';

import JSONTheme from "../config/jsontheme";
import Config from "../config/config"


function ManagePasskeys() {
  
  const auth = useAuth();
  const [devices, setDevices] = useState('');
  
  const decodedIdToken = jwt_decode(auth.user.id_token);
  console.log('id_token:');
  console.log(decodedIdToken);
  
  const decodedAccessToken = jwt_decode(auth.user.access_token);
  
  useEffect(() => {
    
    const request = new Request(`https://api.pingone.asia/v1/environments/${Config.envId}/users/${decodedIdToken.sub}/devices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.user.access_token}`
      }
    })
    
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
  
  function listPasskeys () {
    
  }

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

export default ManagePasskeys;
