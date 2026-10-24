import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Pricing' },
  { href: '#coaches', label: 'Our Team' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Book Trial' },
];

const LOGO_URL = '/Original_on_transparent_-_Copy.png';

function LogoMark() {
  return (
    <span className="grid place-items-center w-20 h-16 overflow-hidden transition-transform group-hover:scale-105 flex-shrink-0">
      <img
        src={LOGO_URL}
        alt="Coimbatore Chess Centre logo"
        className="w-full h-full object-contain"
      />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-md'
          : 'bg-ink-950/40 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group" aria-label="Coimbatore Chess Centre home">
          <LogoMark />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold text-ink-50">Coimbatore</span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-600">Chess Centre</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-ink-200 hover:text-gold-700 transition-colors duration-200 relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white text-sm font-semibold hover:shadow-glow-gold hover:scale-[1.03] transition-all duration-300"
        >
          Book a Trial
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden grid place-items-center w-10 h-10 rounded-lg text-ink-100 hover:text-gold-700 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-6 mt-3 rounded-2xl bg-ink-900/95 border border-gold-500/20 p-4 space-y-1 shadow-card">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-ink-100 hover:bg-gold-500/10 hover:text-gold-700 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block mt-2 text-center px-4 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold"
            >
              Book a Trial
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
