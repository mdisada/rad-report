import { useState } from 'react';
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import SettingsMenu from './Menu/SettingsMenu';

const NavBar = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const handleSettingsOpen = () => setIsSettingsOpen(true);
    const handleSettingsClose = () => setIsSettingsOpen(false);

  return (
    <Navbar className="bp5-navbar bp5-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>😎  Rad Report</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>

      <Navbar.Group align={Alignment.RIGHT}>
        <Button id="Settings" className="bp5-minimal" icon="cog" onClick={handleSettingsOpen}/>
      </Navbar.Group>
      <SettingsMenu isOpen={isSettingsOpen} onClose={handleSettingsClose} />
    </Navbar>
  );
};

export default NavBar;
