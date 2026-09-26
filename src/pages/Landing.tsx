
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { GraduationCap, HeartPulse, LifeBuoy, Rocket, ChevronDown } from 'lucide-react';
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
    a: 'Tharom will be pay as you go, so you only pay for what you use. Exact pricing hasn\'t been announced yet. Waitlist members will be the first to know.',
  },
  {
    q: 'When does Tharom launch?',
    a: 'We\'re opening access to a few users at a time and will soon be open to all. Waitlist members will be the first to get in.',
  },
  {
    q: 'Will Tharom work for my use case?',
    a: 'Tharom is built to handle many kinds of use cases, including education, healthcare, product help and AI startups. If yours is something else, mention it when you join the waitlist. We\'d like to hear about it.',
  },
  {
    q: 'Does Tharom replace my team?',
    a: 'No. AI takes the routine work, and your experts stay in charge of the decisions that need them.',
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
              One AI Infrastructure. <br className="hide-on-mobile" /><span style={{ color: 'var(--accent-color)' }}>Infinite Use Cases.</span>
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
              Launch AI for your users under your own brand, with your experts in the loop. Tharom manages everything behind it.
            </motion.p>

            <motion.div variants={itemVariants}>
              <WaitlistForm />
            </motion.div>
          </motion.div>
        </div>
      </div>

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
            AI and Experts, Working Together.
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
            You own the brand and the relationship with your users. Tharom provides the fully managed AI infrastructure, where AI handles the routine work and your people step in when it counts.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            <AudienceCard
              icon={<GraduationCap size={24} />}
              title="Education"
              description="Give your students AI support while your teachers stay in the loop to guide and review."
            />
            <AudienceCard
              icon={<HeartPulse size={24} />}
              title="Healthcare"
              description="Handle patient questions, routine requests and appointment booking with AI."
            />
            <AudienceCard
              icon={<LifeBuoy size={24} />}
              title="Product Help"
              description="Let AI answer common questions and pass the rest to your team when a person is needed."
            />
            <AudienceCard
              icon={<Rocket size={24} />}
              title="AI-Powered Startups"
              description="Ship your AI product without building or running the infrastructure yourself."
            />
          </div>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            marginTop: '2.5rem',
          }}>
            And many more. <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Tell us yours when you join the waitlist.</span>
          </p>
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
