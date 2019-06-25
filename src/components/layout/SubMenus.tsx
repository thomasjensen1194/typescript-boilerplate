import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector } from "react-redux";

export interface SubMenusProps extends RouteComponentProps {
  sidebarHide: Function;
}

const SubMenus: React.SFC<SubMenusProps> = ({ history, sidebarHide }) => {
  const user = useSelector((state: any) => state.auth.user);

  const handleNavigation = (url: string) => {
    history.push(url);
    sidebarHide();
  };

  return (
    <>
      <Menu.Menu>
        <Menu.Item onClick={() => handleNavigation("/")}>
          <Icon name="home" />
          Frontpage
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        {!user && (
          <Menu.Item onClick={() => handleNavigation("/login")}>
            <Icon name="user" />
            Login
          </Menu.Item>
        )}
        {user && (
          <Menu.Item onClick={() => handleNavigation("/logout")}>
            <Icon name="x" />
            Logout
          </Menu.Item>
        )}
      </Menu.Menu>
    </>
  );
};

export default withRouter(SubMenus);
