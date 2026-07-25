

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
        {/* Contact info */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <a href="mailto:hello@tharom.com" style={{ color: 'var(--text-secondary)' }}>
            hello@tharom.com
          </a>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.6 }}>
          © {new Date().getFullYear()} RKO Services Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

