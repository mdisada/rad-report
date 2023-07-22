import { Classes, Dialog, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
//import { DatabaseContent } from './SettingContents/DatabaseContent';

const SettingsMenu = ({ isOpen, onClose }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      transitionDuration={0}
      style={{ width: "80vw", height: "80vh" }}
    >
      <div className={Classes.DIALOG_BODY}>
        <div style={{ display: "flex" }}>
          <Menu>
            <MenuItem text="Profile" />
            <MenuDivider />
            <MenuItem text="Database" />
          </Menu>

          <div style={{ width: "90%" }}>

            <h1>Hi</h1>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SettingsMenu;
