import * as React from "react";

import { useAuth } from "react-oidc-context";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "wouter";

import Config from "../config/config";

function Header() {

  const auth = useAuth();
  
  /*function signin() {
    auth.signinRedirect({acr_values:"AdaptiveMFA"});
  }*/
  
  function signin() {
    auth.signinRedirect();
  }
  
  function signout() {
    auth.removeUser();
    auth.signoutRedirect({post_logout_redirect_uri:`https://${Config.projectName}.glitch.me/`});
  }
  
  function User() {

    if (auth.isAuthenticated) {
      return (
        <div>
          <NavDropdown title={auth.user.profile.username}>
            <NavDropdown.Item href={`https://apps.pingone.com/${Config.envId}/myaccount/`}>Manage Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={signout}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </div>
      );
    } else {
      return (
        <div>
          <Button className="pNavButton" onClick={signin}>Sign In</Button>
        </div>
      );
    }

  }
  
  return (
    <Navbar variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={Config.logoUrl}
            height="48"
            className="d-inline-block align-top"
            alt="Company Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tokens" className="nav-link">Tokens</Link>
            <Link to="/config" className="nav-link">Config</Link>
          </Nav>
          <Nav>
            <User />
          </Nav>          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default Header;
