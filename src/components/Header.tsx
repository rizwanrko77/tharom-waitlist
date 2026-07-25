import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100, background: 'transparent' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.2rem' }}>
          <img src="/logo.png" alt="Tharom Logo" style={{ height: '36px', width: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>Tharom</span>
        </Link>
      </div>
    </header>
  );
}
