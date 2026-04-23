import { useState, useEffect } from 'react';

const leftLinks  = ['Collections', 'Bridal', 'Occasion Wear'];
const rightLinks = ['Lookbook', 'About', 'Contact'];

function SearchIcon()    { return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>; }
function HeartIcon()     { return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }
function BagIcon()       { return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>; }
function MenuIcon({ open }) {
  return open
    ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
    : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [cartCount]                   = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = scrolled ? 'text-brand' : 'text-white';
  const hoverColor = scrolled ? 'hover:text-gold' : 'hover:text-gold-light';

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-500
        ${scrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-luxury py-3 top-0'
          : 'bg-transparent py-5 top-0'
        }`}
      style={{ top: mobileOpen ? 0 : undefined }}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between gap-4">

        {/* Left: Desktop nav links / Mobile: hamburger */}
        <div className="flex items-center gap-8 flex-1">
          <div className="hidden lg:flex items-center gap-8">
            {leftLinks.map(l => (
              <a key={l} href="#" className={`nav-link font-sans font-light text-xs tracking-luxury uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}>
                {l}
              </a>
            ))}
          </div>
          <button
            className={`lg:hidden transition-colors duration-300 ${textColor}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="text-center flex-shrink-0">
          <a href="#" className="block">
            <img
              src={scrolled ? '/ffbfb.png' : '/Asset1.png'}
              alt="Heirloom"
              className="h-12 lg:h-16 w-auto transition-all duration-500"
            />
          </a>
        </div>

        {/* Right: Desktop nav links + icons / Mobile: icons only */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="hidden lg:flex items-center gap-8">
            {rightLinks.map(l => (
              <a key={l} href="#" className={`nav-link font-sans font-light text-xs tracking-luxury uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}>
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 lg:ml-2">
            {[SearchIcon, HeartIcon].map((Icon, i) => (
              <button key={i} className={`transition-colors duration-300 ${textColor} ${hoverColor}`}>
                <Icon />
              </button>
            ))}
            <button className={`relative transition-colors duration-300 ${textColor} ${hoverColor}`}>
              <BagIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-cream border-t border-gold/20 px-6 py-4 space-y-1">
          {[...leftLinks, ...rightLinks].map(l => (
            <a
              key={l}
              href="#"
              className="block py-3 text-brand font-sans text-xs tracking-luxury uppercase font-light border-b border-cream-dark last:border-0 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
