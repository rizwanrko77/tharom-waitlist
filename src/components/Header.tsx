import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(253, 246, 238, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.2rem' }}>
          <img src="/logo.png" alt="Tharom Logo" style={{ height: '36px', width: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>Tharom</span>
        </Link>
      </div>
    </header>
  );
}
