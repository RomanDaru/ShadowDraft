import React, { ReactNode } from "react";
import "./styles/globals.css"; // Global styles file

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <title>ShadowDraft</title>
      </head>
      <body>
        <div className='layout__container'>
          <header className='header'>
            <h1>ShadowDraft</h1>
          </header>
          <main className='layout__main'>{children}</main>
          <footer className='footer'>
            <p>© 2025 ShadowDraft</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
