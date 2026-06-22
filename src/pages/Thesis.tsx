
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Thesis() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '800px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            Home
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />
          <span className="text-accent" style={{ letterSpacing: '0.05em' }}>Thesis</span>
        </nav>

        <h1 className="text-mono" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem', lineHeight: 1.2 }}>
          Empowering Businesses in the AI Era
        </h1>

        <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 500 }}>
            Entering the AI Era
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            We believe that cutting-edge AI technology should be accessible, empowering businesses of all sizes to integrate and power their usecases efficiently.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            The current landscape forces businesses to build complex infrastructure from scratch. Xapproach is providing a platform where AI integration is seamless and scalable. 
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            By providing AI as a Service (AaaS), we enable businesses to focus on their core operations while we handle the complexities of AI automation and deployment.
          </p>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
            <h3 className="text-mono" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Core Principles</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="text-accent">▹</span> Accessible AI Integration
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="text-accent">▹</span> Scalable Infrastructure
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="text-accent">▹</span> Business Empowerment
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
