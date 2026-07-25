import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      padding: '3rem 0 2rem',
      borderTop: '1px solid var(--glass-border)',
      marginTop: '4rem',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        textAlign: 'center',
      }}>
        {/* Legal links */}
        <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.3s' }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.3s' }}>
            Terms of Service
          </Link>
          <Link to="/contact" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.3s' }}>
            Contact
          </Link>
        </nav>

        {/* Contact info */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <a href="mailto:hello@tharom.com" style={{ color: 'var(--text-secondary)' }}>
            hello@tharom.com
          </a>
          <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
          <span>Bijnor, Uttar Pradesh, India</span>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.6 }}>
          © {new Date().getFullYear()} RKO Services Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
