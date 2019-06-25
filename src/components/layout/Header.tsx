import React from "react";
import { Menu } from "semantic-ui-react";
import SubMenus from "./SubMenus";

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
  return (
    <header>
      <Menu color="blue" inverted attached>
        <SubMenus sidebarHide={() => null} />
      </Menu>
    </header>
  );
};

export default Header;
