import * as React from "react";

import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Table } from "react-bootstrap";

import Config from "../config/config.jsx";


function Splash() {
  
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
          <h2>Splash!!!</h2>
          <p>A simple, configurable OIDC enabled application useful in demonstrations and proofs of concept.</p>
        </Col>
      </Row>



    </span>
  );
  
}

export default Splash;
