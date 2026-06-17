import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Find Us', to: '/find-us' },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: '28px', height: '20px', position: 'relative', cursor: 'pointer' }}>
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 9 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px', backgroundColor: '#F5ECD7', borderRadius: '2px', display: 'block' }}
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', top: '9px', left: 0, right: 0, height: '1.5px', backgroundColor: '#F5ECD7', borderRadius: '2px', display: 'block' }}
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -9 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px', backgroundColor: '#F5ECD7', borderRadius: '2px', display: 'block' }}
      />
    </div>
  );
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Hide nav on scroll down, show on scroll up
      if (y > 80 && y > lastScrollY.current + 5) {
        setNavVisible(false);
      } else if (y < lastScrollY.current - 5 || y < 80) {
        setNavVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <div style={{ backgroundColor: '#0D0A07', color: '#F5ECD7', fontFamily: '"DM Sans", sans-serif', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <motion.nav
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(13,10,7,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,184,75,0.1)' : '1px solid transparent',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, padding 0.3s ease',
          padding: scrolled ? '12px 0' : '22px 0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{
                fontFamily: '"Tiro Bangla", serif',
                color: '#00E5CC',
                fontSize: scrolled ? '16px' : '19px',
                transition: 'font-size 0.3s ease',
                textShadow: '0 0 20px rgba(0,229,204,0.35)',
              }}>
                হোটেল খোয়াই
              </div>
              <div style={{
                fontFamily: '"Playfair Display", serif',
                color: '#E8B84B',
                fontSize: scrolled ? '8.5px' : '10px',
                letterSpacing: '5px',
                transition: 'font-size 0.3s ease',
              }}>
                KHOAI
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '28px' }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: isActive(link.to) ? '#E8B84B' : 'rgba(245,236,215,0.75)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  letterSpacing: '0.4px',
                  transition: 'color 0.3s',
                  position: 'relative',
                  paddingBottom: '4px',
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#E8B84B' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Reserve CTA */}
            <Link
              to="/find-us"
              className="khoai-btn-shimmer"
              style={{
                padding: '9px 20px',
                border: '1px solid rgba(232,184,75,0.55)',
                color: '#E8B84B',
                borderRadius: '3px',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '1.2px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
              }}
            >
              Reserve
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1001, backgroundColor: 'rgba(13,10,7,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', padding: '0 32px 48px' }}
          >
            {/* Top bar — only close button, no duplicate logo */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '18px 0' }}>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', minWidth: '44px', minHeight: '44px' }}>
                <HamburgerIcon open={true} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,184,75,0.3), transparent)', marginBottom: '48px' }} />

            {/* Nav links */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    to={link.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 0',
                      color: isActive(link.to) ? '#E8B84B' : '#F5ECD7',
                      textDecoration: 'none',
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '28px',
                      borderBottom: '1px solid rgba(232,184,75,0.08)',
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive(link.to) && <span style={{ color: '#E8B84B', fontSize: '14px' }}>✦</span>}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Reserve button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                to="/find-us"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px',
                  border: '1px solid rgba(232,184,75,0.55)',
                  color: '#E8B84B',
                  borderRadius: '3px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginTop: '24px',
                  minHeight: '52px',
                  lineHeight: '20px',
                }}
              >
                Reserve a Table
              </Link>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ textAlign: 'center', marginTop: '24px', fontFamily: '"Tiro Bangla", serif', color: '#4A3F30', fontSize: '13px' }}
            >
              Where Roots Meet Flavours
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAGE CONTENT ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'linear-gradient(to top, #060402, #0D0A07)', borderTop: '1px solid rgba(232,184,75,0.12)', paddingTop: '72px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

          {/* Logo */}
          <div className="khoai-teal-glow" style={{ fontFamily: '"Tiro Bangla", serif', color: '#00E5CC', fontSize: '36px', marginBottom: '8px' }}>হোটেল খোয়াই</div>
          <div style={{ fontFamily: '"Playfair Display", serif', color: '#E8B84B', fontSize: '11px', letterSpacing: '7px', marginBottom: '12px' }}>KHOAI</div>

          {/* Tagline */}
          <div style={{ fontFamily: '"Playfair Display", serif', color: '#9C8A6E', fontSize: '14px', fontStyle: 'italic', marginBottom: '8px' }}>Where Roots Meet Flavours</div>
          <div style={{ fontFamily: '"Tiro Bangla", serif', color: '#4A3F30', fontSize: '14px', marginBottom: '48px' }}>আসুন, খান, উপভোগ করুন</div>

          {/* Divider line */}
          <div style={{ width: '64px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,184,75,0.5), transparent)', margin: '0 auto 36px' }} />

          {/* Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} style={{ color: '#6A5A46', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.5px', transition: 'color 0.3s' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Credits */}
          <div style={{ color: '#3A3028', fontSize: '12px', marginBottom: '24px' }}>Made with ❤️ for Hotel Khoai</div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: '1px solid rgba(232,184,75,0.18)', color: '#6A5A46', padding: '10px 24px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', letterSpacing: '2.5px', minHeight: '44px' }}
          >
            ↑ BACK TO TOP
          </button>
        </div>
      </footer>
    </div>
  );
}
