import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface SubMenusProps {
  sidebarHide: Function;
}

const SubMenus: React.SFC<SubMenusProps> = ({ sidebarHide }) => {
  const history = useHistory();
  const user = useSelector((state: ReduxState) => state.auth.user);

  const handleNavigation = (url: string) => {
    history.push(url);
    sidebarHide();
  };

  return (
    <>
      <Menu.Menu>
        <Menu.Item onClick={() => handleNavigation('/')}>
          <Icon name="home" />
          Frontpage
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        {!user && (
          <Menu.Item onClick={() => handleNavigation('/login')}>
            <Icon name="user" />
            Login
          </Menu.Item>
        )}
        {user && (
          <Menu.Item onClick={() => handleNavigation('/logout')}>
            <Icon name="x" />
            Logout
          </Menu.Item>
        )}
      </Menu.Menu>
    </>
  );
};

export default SubMenus;
