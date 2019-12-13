import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styled from 'styled-components';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth);
    });

    return window.removeEventListener('resize', () => setWindowSize(window.innerWidth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `;

  if (windowSize > 400)
    return (
      <MainLayout>
        <Header />
        {children}
        <div style={{ flexGrow: 1 }} />
        <Footer />
      </MainLayout>
    );
  return <Sidebar>{children}</Sidebar>;
};

export default Layout;
