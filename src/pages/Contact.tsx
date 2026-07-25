import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Contact() {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: '780px', paddingTop: '3rem', paddingBottom: '4rem' }}>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}>
            Contact Us
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            Have a question or want to learn more about Tharom? We'd love to hear from you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email card */}
            <div className="glass-panel" style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(243, 128, 32, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Mail size={22} color="var(--accent-color)" />
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.3rem',
                }}>
                  Email
                </h2>
                <a href="mailto:hello@tharom.com" style={{ color: 'var(--accent-color)', fontSize: '1.05rem' }}>
                  hello@tharom.com
                </a>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                  We typically respond within 1–2 business days.
                </p>
              </div>
            </div>

            {/* Address card */}
            <div className="glass-panel" style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(243, 128, 32, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={22} color="var(--accent-color)" />
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.3rem',
                }}>
                  Address
                </h2>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  RKO Services Pvt Ltd<br />
                  Nehtour, Bijnor<br />
                  Uttar Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
