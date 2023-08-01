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
          <img src="https://cdn.glitch.global/8ce02794-cb6c-4412-941c-3e7e9fa8c222/splash?v=1690886916339" style={{"display": "block", "margin-left": "auto", "margin-right": "auto"}}/>
        </Col>
      </Row>



    </span>
  );
  
}

export default Splash;
