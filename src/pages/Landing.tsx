
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Upload, Brain, MessageCircle, GraduationCap, Building2, BookOpen, ChevronDown } from 'lucide-react';
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
    q: 'What happens to the content I upload?',
    a: 'Your content stays yours. It is used only within your workspace to power AI responses for your learners. It is not shared with other workspaces and is not used to train or improve any AI models.',
  },
  {
    q: 'Who can access my workspace content?',
    a: 'Only learners you invite to your workspace. Each workspace is completely isolated — your content, your users, your data.',
  },
  {
    q: 'How much does Tharom cost?',
    a: 'Pricing has not been announced yet. We are designing it to be accessible for educational institutions. Waitlist members will be the first to hear when pricing is finalised.',
  },
  {
    q: 'When does Tharom launch?',
    a: 'We are targeting September 2026. Waitlist members will receive early access invitations before the public launch.',
  },
  {
    q: 'Is this only for schools?',
    a: 'Schools and educational institutions are our primary audience, but Tharom works for any organisation that has a body of knowledge its users need to learn from — training companies, consultancies, coaching centres.',
  },
];

export default function Landing() {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* ─── HERO (unchanged) ─── */}
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
              Own Your AI Model <br className="hide-on-mobile" /><span style={{ color: 'var(--accent-color)' }}>For Your Users.</span>
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

      {/* ─── THE PROBLEM ─── */}
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
            Great Teaching Material Deserves Better Than a File Server
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '650px',
            margin: '0 auto',
          }}>
            Schools and institutions spend years building course material — lecture notes, recordings, documents, guides. But learners can only browse or download. They can't ask questions, get explanations, or work through the material at their own pace. The knowledge is there, but it's locked in files.
          </p>
        </div>
      </motion.section>

      {/* ─── HOW IT WORKS ─── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ padding: '5rem 0' }}
      >
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '3rem',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}>
            How Tharom Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            <StepCard
              icon={<Upload size={28} />}
              step={1}
              title="Upload Your Material"
              description="Documents, lecture notes, transcripts, video recordings — anything your learners need. Tharom ingests it all into your private workspace."
            />
            <StepCard
              icon={<Brain size={28} />}
              step={2}
              title="AI Grounds in Your Content"
              description="Tharom builds an AI assistant that understands your material — not the open internet, just your content. Accurate, relevant, and within scope."
            />
            <StepCard
              icon={<MessageCircle size={28} />}
              step={3}
              title="Learners Chat With It"
              description="Your students or users ask questions, get explanations, and work through the material conversationally — available any time, from any device."
            />
          </div>
        </div>
      </motion.section>

      {/* ─── WHO IT'S FOR ─── */}
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
            Built for Educators, Open to All
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Tharom is designed for anyone with knowledge worth sharing — and learners who need help absorbing it.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            <AudienceCard
              icon={<GraduationCap size={24} />}
              title="Schools & Universities"
              description="Turn syllabi and lectures into an always-available study companion."
            />
            <AudienceCard
              icon={<Building2 size={24} />}
              title="Training Organisations"
              description="Let employees or trainees learn from your SOPs, manuals, and guides."
            />
            <AudienceCard
              icon={<BookOpen size={24} />}
              title="Coaching & EdTech"
              description="Give students AI-powered help grounded in your own course material."
            />
          </div>
        </div>
      </motion.section>

      {/* ─── WHAT A WORKSPACE GETS ─── */}
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
            Your Workspace, Your Brand
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Each institution gets its own isolated environment. Your content stays yours, and your learners see your brand.
          </p>

          <div className="glass-panel" style={{
            padding: '2rem',
            textAlign: 'left',
          }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gap: '1rem',
            }}>
              {[
                ['Branded subdomain', 'your-school.tharom.com — your identity, powered by Tharom'],
                ['Private content library', 'Upload and manage your material in one place'],
                ['Your own users', 'Invite learners and control who has access'],
                ['Usage-based metering', 'Pay for what your learners actually use, nothing more'],
              ].map(([title, desc]) => (
                <li key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--accent-color)',
                    fontSize: '1.2rem',
                    lineHeight: 1.4,
                    flexShrink: 0,
                  }}>✓</span>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{title}</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>— {desc}</span>
                  </div>
                </li>
              ))}
            </ul>
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
            Interested? Join the Waitlist.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.05rem',
          }}>
            We're launching in September 2026. Waitlist members get early access.
          </p>
          <WaitlistForm />
        </div>
      </motion.section>
    </div>
  );
}

/* ─── Sub-components ─── */

function StepCard({ icon, step, title, description }: { icon: React.ReactNode; step: number; title: string; description: string }) {
  return (
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(243, 128, 32, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-color)',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Step {step}
        </span>
      </div>
      <h3 style={{
        fontSize: '1.15rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
        {description}
      </p>
    </div>
  );
}

function AudienceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
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

