import * as React from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import jwt_decode from "jwt-decode";

import ManagePasskeys from "../components/passkeys.jsx";


function RootPage() {
  
  const auth = useAuth();

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
            <h1>You're Signed On!</h1>
            <p>
              You can manage your devices in the right pane, including add, remove and rename.
            </p>
            <p>
              If your're interested in OIDC, you can also view your tokens by selecting that option from the top navbar.
            </p>
          </div>
        </Col>

        <Col sm={7}>
          <ManagePasskeys />
        </Col>

      </Row>
    );
    
  } else {
    
    return (
      
      <Row>

        <Col sm={5}>
          <div className="pHighlight">
            <h1>Introducing Passkeys</h1>
            <p>
              Based on FIDO standards, passkeys are a replacement for passwords that provide faster,
              easier, and more secure sign-ins to websites and apps across a user’s devices.
              Unlike passwords, passkeys are always strong and phishing-resistant.
            </p>
            <p>
              Passkeys simplify account registration for apps and websites, are easy to use, work across most of a user’s devices,
              and even work on other devices within physical proximity.
            </p>
          </div>
        </Col>

        <Col sm={7}>
          <div className="pLight pRight">

            <Row sm={12}>
              <h1>Let's Get Started</h1>
              <h5 className="text-muted">Sign in below to see Passkeys in action</h5>
            </Row>

            <Row sm={12} className="pMiddle">
              <div>
                <Button className="pJumboButton" onClick={signon}>Sign On with Passkey</Button>
              </div> 
            </Row>

          </div>
        </Col>

      </Row>
    );
  }
}

export default RootPage;
