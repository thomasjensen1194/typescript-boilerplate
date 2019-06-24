import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";

export interface HeaderProps extends RouteComponentProps<any> {}

const Header: React.SFC<HeaderProps> = ({ history }) => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <header>
      <Menu color="blue" inverted attached>
        <Menu.Menu>
          <Menu.Item onClick={() => history.push("/")}>Frontpage</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          {!user && (
            <Menu.Item onClick={() => history.push("/login")}>Login</Menu.Item>
          )}
          {user && (
            <Menu.Item onClick={() => history.push("/logout")}>
              Logout
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </header>
  );
};

export default withRouter<HeaderProps>(Header);
