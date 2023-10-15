import * as React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import jwt_decode from "jwt-decode";

import Config from "../config/config"


function ManagePasskeys() {
  
  const auth = useAuth();
  const [devices, setDevices] = useState([]);
  
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
      setDevices(data._embedded.devices);
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
  
  function Passkeys () {
    const deviceList = devices.map((device, index) =>
      <Accordion.Item eventKey={index.toString()}>
        <Accordion.Header>{device.displayName}</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    );
    
    return (
      <Accordion defaultActiveKey="0">
        {deviceList}
      </Accordion>
    );
  }

  if (auth.isAuthenticated) {
    
    return (
      <div className="pLight">
        
        <Row sm={12} className="pRight">
          <h1>Your Passkeys</h1>
          <h5 className="text-muted">{decodedIdToken.username}</h5>
        </Row>

        <Row sm={12}>
          <Passkeys />
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
