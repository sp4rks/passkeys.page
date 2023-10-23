import * as React from "react";

import { useAuth } from "react-oidc-context";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "wouter";

import Config from "../config/config";


function Header() {

  const auth = useAuth();
  
  function signout() {
    auth.removeUser();
    auth.signoutRedirect({post_logout_redirect_uri: Config.signoutRedirectURI});
  }
  
  function AuthenticatedNavbar () {
    if (auth.isAuthenticated) {
      return(
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/tokens" className="nav-link">Tokens</Link>
          </Nav>
          <Nav>
            <Button onClick={signout} className="navbarButton">Sign Out</Button>
          </Nav>          
        </Navbar.Collapse>
      );
    } else {
      return(null);
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
        <AuthenticatedNavbar />
      </Container>
    </Navbar>
  );
  
}

export default Header;
