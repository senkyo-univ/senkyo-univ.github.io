import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { footerText, mainNavigation } from '../data/portalContent';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-block">
            <p className="brand-university">仟教大学 学内ポータル</p>
            <NavLink to="/" className="brand-title">
              SCOPE
            </NavLink>
            <p className="brand-subtitle">Senkyo Campus Online Portal Environment</p>
          </div>
          <nav className="main-nav" aria-label="主要メニュー">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'main-nav-link is-active' : 'main-nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="page-container">{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <p>仟教大学</p>
          <p>{footerText}</p>
        </div>
      </footer>
    </div>
  );
}

