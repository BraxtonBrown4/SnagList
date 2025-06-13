import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  Container,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar color="dark" dark expand="lg" fixed="top">
        <Container>
          <NavbarBrand tag={RRNavLink} to="/">
            SnagList
          </NavbarBrand>
          {loggedInUser ? (
            <Button
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                });
              }}
            >
              Logout
            </Button>
          ) : (
            <Nav navbar className="ms-auto">
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">
                  <Button color="secondary">Login</Button>
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
