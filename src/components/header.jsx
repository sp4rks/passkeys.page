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
  
  function signin() {
    auth.signinRedirect({acr_values:"1d5741ccec4b0970b6b83fc161c40056"});
  }
  
  function signout() {
    auth.removeUser();
    auth.signoutRedirect({post_logout_redirect_uri:`https://${Config.projectName}.glitch.me/`});
  }
  
  function User() {

    if (auth.isAuthenticated) {
      return (
        <span>
          <div>
            <NavDropdown title={auth.user.profile.username}>
              <NavDropdown.Item onClick={signout}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </span>
      );
    } else {
      return (
        <div>
          
        </div>
      );
    }

  }
  
  function Avatar() {
    if (auth.isAuthenticated && auth.user.profile.avatar) {
      return(<img height="46px" src={auth.user.profile.avatar} />);
    }
  }
  
  return (
    <Navbar variant="dark" bg="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Config.logoUrl}
            height="32"
            className="d-inline-block align-top"
            alt="Company Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Avatar />
            <User />
          </Nav>          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default Header;
