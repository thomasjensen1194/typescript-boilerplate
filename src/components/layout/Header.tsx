import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter, RouteComponentProps } from "react-router-dom";

export interface HeaderProps extends RouteComponentProps<any> {}

const Header: React.SFC<HeaderProps> = ({ history }) => {
  return (
    <header>
      <Menu color="blue" inverted attached>
        <Menu.Menu>
          <Menu.Item onClick={() => history.push("/")}>Frontpage</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item onClick={() => history.push("/login")}>Login</Menu.Item>
        </Menu.Menu>
      </Menu>
    </header>
  );
};

export default withRouter<HeaderProps>(Header);
