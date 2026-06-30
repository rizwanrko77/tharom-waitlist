
import { motion, type Variants } from 'framer-motion';
import WaitlistForm from '../components/WaitlistForm';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 15 } 
  }
};

export default function Landing() {
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow Tag */}
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <span style={{ 
              display: 'inline-block',
              fontSize: '0.85rem', 
              fontWeight: 500, 
              padding: '0.35rem 1rem', 
              borderRadius: '9999px',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              color: 'var(--accent-color)',
              border: '1px solid rgba(2, 132, 199, 0.2)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              AI as a Service
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            lineHeight: 1.1, 
            marginBottom: '1.5rem', 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            Trained, Monetized, <br className="hide-on-mobile" /><span style={{ color: 'var(--accent-color)' }}>Owned by You.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', 
              color: 'var(--text-secondary)', 
              marginBottom: '3rem',
              maxWidth: '650px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6
            }}
          >
            From schools to startups, clinics to consultants — turn your expertise into your own branded AI, working for your business.
          </motion.p>

          <motion.div variants={itemVariants}>
            <WaitlistForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
