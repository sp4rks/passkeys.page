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
        <Accordion.Body className="terminal">
          <p>Device ID: {device.id}</p>
          <p>Device Status: {device.status}</p>
          <p>Device Type: {device.type}</p>
          <p>Device Lock: {device.lock.status}</p>
          <p>Device Block: {device.block.status}</p>
          <p>Cross Platform?: {device.attributes.isCrossPlatform.toString()}</p>
          <p>Backup Eligible?: {device.attributes.isCrossPlatform.toString()}</p>
          <p>Backed Up?: {device.attributes.isCrossPlatform.toString()}</p>
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
