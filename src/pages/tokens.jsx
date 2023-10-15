import * as React from "react";
import { useState } from 'react';

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import jwt_decode from "jwt-decode";
import JSONPretty from 'react-json-pretty';

import JSONTheme from "../config/jsontheme";
import ErrorBox from "../components/error.jsx";


function TokenPage() {
  
  const auth = useAuth();
  const [key, setKey] = useState('idToken');

  function signon() {
    auth.signinRedirect();
  }
  
  if (auth.isAuthenticated) {
    
    const decodedIdToken = jwt_decode(auth.user.id_token);
    const decodedAccessToken = jwt_decode(auth.user.access_token);
    
    return (
      
      <Row>

        <Col sm={5}>
          <div className="pHighlight">
            <h1>OIDC Authentication</h1>
            <p>
              This site uses OIDC to perform user authentication, and facilitate access to the PingOne device management APIs.
            </p>
            <p>
              The tokens used for this are over on the right there. If you're new to OIDC, check out the links below to learn more about it.
            </p>
            <p>
              <a target=”_blank” href="https://www.pingidentity.com/en/resources/identity-fundamentals/authentication-authorization-standards/openid-connect.html">OIDC Primer</a><br/>
              <a target=”_blank” href="https://docs.pingidentity.com/r/en-us/developer/dev_openid_1_about">Developers Guide</a><br/>
              <a target=”_blank” href="https://github.com/pingidentity-developers-experience/ping-oidc-client-sdk">Ping Identity OIDC SDK</a><br/>
            </p>
          </div>
        </Col>

        <Col sm={7}>
          <div className="pLight">

            <Row sm={12}>
              <h1 className="pRight">Tokens</h1>
                <Tabs
                id="tokenTabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                >
                  <Tab eventKey="idToken" title="ID Token">
                    <JSONPretty
                      data={decodedIdToken}
                      theme={JSONTheme}
                      style={{fontSize: ".85em"}}
                    />
                  </Tab>
                  <Tab eventKey="accessToken" title="Access Token">
                    <JSONPretty
                      data={decodedAccessToken}
                      theme={JSONTheme}
                      style={{fontSize: ".85em"}}
                    />
                  </Tab>
                  <Tab eventKey="rawAccessToken" title="Raw Access Token">
                    <p className="terminal">
                      {auth.user.access_token}
                    </p>
                  </Tab>
                </Tabs>
            </Row>

          </div>
        </Col>

      </Row>
    );
    
  } else {
    
    return (
      <ErrorBox />
    );
  }
}

export default TokenPage;
