import React from 'react';
import { Alignment, Button, Navbar } from "@blueprintjs/core";

const NavBar = () => {
  return (
    <Navbar className="bp5-navbar bp5-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Rad Report</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>

      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp5-minimal" icon="cog"/>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
