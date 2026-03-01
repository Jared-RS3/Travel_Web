import type { PropsWithChildren } from 'react';

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        const id = href.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          smoothScrollTo(id);
        }
      }}
    >
      {children}
    </a>
  );
}

export function LayoutShell({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <div className="bg-accent bg-accent-a" aria-hidden="true" />
      <div className="bg-accent bg-accent-b" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <aside className="left-rail" aria-label="Brand rail">
        <div className="rail-inner">
          <p className="rail-kicker">DayBreak Resort Collection</p>
          <h1 className="rail-word">TRAVEL</h1>
        </div>
      </aside>

      <div className="content-pane">
        <header className="top-nav">
          <a className="brand" href="#top" aria-label="DayBreak home">
            DayBreak
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#destinations">Destinations</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <button
            type="button"
            className="nav-cta"
            onClick={() => smoothScrollTo('contact')}
          >
            Reserve
          </button>
        </header>

        <main id="top">{children}</main>
      </div>
    </div>
  );
}