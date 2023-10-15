import * as React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "react-oidc-context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

function ErrorBox() {
  return (
    <div className="pLight">

      <Row sm={12}>
        <h1>An Error Occured</h1>
        <h5 className="text-muted">You shouldn't see this message</h5>
      </Row>

    </div>
  );
}

export default ErrorBox;
