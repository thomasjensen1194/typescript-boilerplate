import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export interface LayoutProps {
  children: object;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });

    return window.removeEventListener("resize", () =>
      setWindowSize(window.innerWidth)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  if (windowSize > 400)
    return (
      <>
        <Header />
        {children}
      </>
    );
  return <Sidebar>{children}</Sidebar>;
};

export default Layout;
