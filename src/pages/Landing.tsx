
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { GraduationCap, Building2, BookOpen, Rocket, ChevronDown } from 'lucide-react';
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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const faqData = [
  {
    q: 'How much does Tharom cost?',
    a: 'Pricing hasn\'t been announced yet. We\'re designing it to be accessible for educational institutions. Waitlist members will be the first to know.',
  },
  {
    q: 'When does Tharom launch?',
    a: 'We\'re opening access to a few users at a time and will soon be open to all. Waitlist members will be the first to get in.',
  },
  {
    q: 'Is this only for schools?',
    a: 'Education is our starting point, but Tharom is built for any organisation with a body of knowledge its users need to learn from — training companies, consultancies, coaching centres, and more.',
  },
];

export default function Landing() {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* ─── HERO ─── */}
      <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
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
              AI Infrastructure <br className="hide-on-mobile" /><span style={{ color: 'var(--accent-color)' }}>for Your Knowledge.</span>
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
              Built for education and beyond — Tharom gives organisations the AI layer to put their expertise to work for the people who need it.
            </motion.p>

            <motion.div variants={itemVariants}>
              <WaitlistForm />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── THE GAP ─── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ padding: '5rem 0' }}
      >
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Your Knowledge Deserves Its Own AI
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '650px',
            margin: '0 auto',
          }}>
            Organisations spend years building expertise — courses, training material, documentation, processes. Generic AI tools can't use any of it. They don't know your content, your context, or your users. Tharom is building the infrastructure to change that.
          </p>
        </div>
      </motion.section>

      {/* ─── BUILT FOR ─── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ padding: '5rem 0' }}
      >
        <div className="container" style={{ maxWidth: '1050px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Built for Education. Open to All.
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Tharom is designed for any organisation that has knowledge worth putting to work.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            <AudienceCard
              icon={<GraduationCap size={24} />}
              title="Schools & Universities"
              description="Give learners an AI that actually knows your curriculum."
            />
            <AudienceCard
              icon={<Building2 size={24} />}
              title="Training & L&D"
              description="Equip teams with AI grounded in your processes, manuals, and SOPs."
            />
            <AudienceCard
              icon={<BookOpen size={24} />}
              title="Coaching & EdTech"
              description="Extend your teaching with AI that reflects your methodology."
            />
            <AudienceCard
              icon={<Rocket size={24} />}
              title="Any Organisation"
              description="If you have a knowledge base and users who need to learn from it, Tharom is for you."
            />
          </div>
        </div>
      </motion.section>

      {/* ─── FAQ ─── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ padding: '5rem 0' }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '2.5rem',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqData.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── BOTTOM CTA ─── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ padding: '5rem 0' }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            Be the First to Build on Tharom.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.05rem',
          }}>
            We're opening access to a few users at a time. Join the waitlist to be first in line.
          </p>
          <WaitlistForm />
        </div>
      </motion.section>
    </div>
  );
}

/* ─── Sub-components ─── */

function AudienceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'rgba(243, 128, 32, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-color)',
        margin: '0 auto 0.75rem',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.05rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.4rem',
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="glass-panel"
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
    >
      <div style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {question}
        </h3>
        <ChevronDown
          size={20}
          style={{
            color: 'var(--text-secondary)',
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{
          padding: '0 1.5rem 1.25rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          fontSize: '0.95rem',
          margin: 0,
        }}>
          {answer}
        </p>
      </motion.div>
    </div>
  );
}
