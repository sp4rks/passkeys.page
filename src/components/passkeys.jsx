import * as React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import jwt_decode from "jwt-decode";

import Config from "../config/config"


function ManagePasskeys() {
  
  const auth = useAuth();
  const [devices, setDevices] = useState([]);
  const [decodedIdToken, setDecodedIdToken] = useState(jwt_decode(auth.user.id_token));
  const [decodedAccessToken, setDecodedAccesstoken] = useState(jwt_decode(auth.user.access_token));
  
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
    
  },[]);
  
  
  function updateDeviceNickname(e) {
    
    const deviceId = 
    
    /*const request = new Request(`https://api.pingone.asia/v1/environments/${Config.envId}/users/${decodedIdToken.sub}/devices/${deviceId}/nickname`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${auth.user.access_token}`
      }
    })*/
    
    alert(e.target.getAttribute('data-deviceid'));
  }
  
  function Passkeys () {
    
    const deviceList = devices.map((device, index) =>
       <Accordion.Item key ={index} eventKey={index}>
        <Accordion.Header>{device.displayName}</Accordion.Header>
        <Accordion.Body>
          <Row>
            
            <Col xs={5}>
              <ul className="list-group">

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Device Status</div>
                    <div>{device.status.toUpperCase()}</div>
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Device Lock</div>
                    {device.lock.status.toUpperCase()}
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Device Block</div>
                    {device.block.status.toUpperCase()}
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Cross Platform?</div>
                    {device.attributes.isCrossPlatform.toString().toUpperCase()}
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Backup Eligible?</div>
                    {device.backup.backupEligibility.toString().toUpperCase()}
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Backed Up?</div>
                    {device.backup.backupState.toString().toUpperCase()}
                  </div>
                </li>         

              </ul>
            </Col>

            <Col xs={7}>
              <Form>
                <Form.Group>
                  <Form.Control id={device.id} className="form-control-lg" type="text" placeholder={device.displayName} />
                </Form.Group>
                
                <br/>

                <div className="d-grid gap-2">
                  <Button className="renameButton" data-deviceid={device.id} size="lg" onClick={updateDeviceNickname}>
                    Rename Device
                  </Button>
                  <Button className="deleteButton" size="lg">
                    Delete Device
                  </Button>
                </div>
              </Form>
              

            </Col>
            
          </Row>
          
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
        
        <Row className="pRight">
          <h1>Your Passkeys</h1>
          <h5 className="text-muted">{decodedIdToken.username}</h5>
        </Row>

        <Row>
          <Passkeys />
        </Row>

      </div>
    );
    
  } else {
    
    return (
      <div className="pLight">
        
        <Row>
          <h1>An Error Occured</h1>
          <h5 className="text-muted">You shouldn't see this message</h5>
        </Row>

      </div>
    );
  }
}

export default ManagePasskeys;
