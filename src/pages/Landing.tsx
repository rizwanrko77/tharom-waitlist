
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import WaitlistForm from '../components/WaitlistForm';

export default function Landing() {
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="gradient-text" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
            The <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 300 }}> </span>
            <span className="text-mono" style={{ fontStyle: 'italic', fontWeight: 700 }}>   Ai-Era</span> <br />
            <span style={{ fontSize: 'clamp(2rem, 4vw, 2rem)', lineHeight: 0.7, marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}> has already begun</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
            Integrate AI into your knowledge base and let "YOUR" AI serve your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <WaitlistForm />

          <div style={{ marginTop: '3rem' }}>
            <Link 
              to="/thesis" 
              style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', opacity: 0.8, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} 
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.textDecoration = 'underline'; }} 
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.textDecoration = 'none'; }}
            >
              Thesis <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
