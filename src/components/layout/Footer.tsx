import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
  return (
    <Menu color="blue" inverted size="small" attached>
      <Menu.Menu position="right">
        <Menu.Item>
          <Icon name="heartbeat" /> Af Thomas Jensen
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Footer;
