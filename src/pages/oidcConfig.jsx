import * as React from "react";

import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Table } from "react-bootstrap";

import Config from "../config/config.jsx";


function OidcConfig() {
  
  const oidcConfig = Config.oidc;
  
  function renderRow(key, value){
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value.toString()}</td>
      </tr>
    );    
  }
  
  function renderConfig(){
    
    return Object.keys(oidcConfig).map((key, i) => (
      renderRow(key, oidcConfig[key])
    ));
  }
    
  
  return (
    <span>
      
      <Row>
        <Col>
          <h2>OIDC Configuration</h2>
        </Col>
      </Row>

      <Table striped hover className="pTable">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {renderConfig()}
        </tbody>
      </Table>

    </span>
  );
  
}

export default OidcConfig;
