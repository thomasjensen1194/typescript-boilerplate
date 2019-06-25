import React, { useState } from "react";
import SubMenus from "./SubMenus";
import { Menu, Sidebar as SemanticSidebar, Icon } from "semantic-ui-react";

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const handleSidebarHide = () => {
    setVisible(false);
  };

  return (
    <>
      <SemanticSidebar.Pushable>
        <SemanticSidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          color="blue"
          onHide={handleSidebarHide}
          vertical
          visible={visible}
          width="thin"
        >
          <SubMenus sidebarHide={handleSidebarHide} />
        </SemanticSidebar>

        <SemanticSidebar.Pusher
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
          }}
        >
          <>
            <Menu attached color="blue" inverted>
              <Menu.Item onClick={() => setVisible(true)}>
                <Icon name="bars" />
              </Menu.Item>
            </Menu>
            {children}
          </>
        </SemanticSidebar.Pusher>
      </SemanticSidebar.Pushable>
    </>
  );
};

export default Sidebar;
