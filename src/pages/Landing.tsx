
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { GraduationCap, HeartPulse, LifeBuoy, Rocket, ChevronDown, Check, MessageSquarePlus } from 'lucide-react';
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
    a: 'Tharom is pay as you go, so you only pay for what you use. Exact pricing hasn\'t been announced yet. Waitlist members will be the first to know.',
  },
  {
    q: 'When does Tharom launch?',
    a: 'Tharom isn\'t public yet. We\'re rolling out access to businesses in small batches, and waitlist members get in first.',
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

const useCases = [
  {
    icon: <GraduationCap size={24} />,
    label: 'Education',
    title: 'An AI companion for every class',
    summary: 'Your own ChatGPT-like assistant for students, running on your rules and your course material.',
    points: [
      'Set the rules and knowledge for each class or student',
      'Students learn the topics and tools you choose, with AI as their study companion',
      'Students can reach a subject expert whenever they need one',
    ],
    loop: 'Subject experts see how students use AI and step in when needed.',
  },
  {
    icon: <HeartPulse size={24} />,
    label: 'Healthcare',
    title: "Your clinic's AI assistant",
    summary: "Help patients between visits, under your clinic's name.",
    points: [
      'Answer general questions and explain reports in plain language',
      'Book appointments with the right doctor',
      "Get a short summary of each patient's chats before the visit",
    ],
    loop: 'Medical decisions stay with your doctors. AI prepares, doctors decide.',
  },
  {
    icon: <LifeBuoy size={24} />,
    label: 'Product Help',
    title: 'Support that knows your product',
    summary: 'Give users an AI they can ask anything about your product.',
    points: [
      'Manage docs, guides and how-tos from one dashboard',
      'Users get answers through an AI chat under your brand',
      "When AI can't solve it, users raise a ticket and your team takes over",
    ],
    loop: "Your support team handles what AI can't.",
  },
  {
    icon: <Rocket size={24} />,
    label: 'AI-Powered Startups',
    title: 'Why should ChatGPT have all the fun?',
    summary: 'Launch your own AI product for your audience in minutes, without building the infrastructure.',
    points: [
      "Shape it around your users' unique use case",
      'Set usage rules and moderate conversations',
      'Monetize it your way',
    ],
    loop: 'You stay in control of what your AI does and says.',
  },
];

// Smooth-scroll to the bottom form and put the cursor in its first field
function scrollToJoinForm(e: React.MouseEvent) {
  const section = document.getElementById('access');
  if (!section) return;
  e.preventDefault();
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  section.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
}

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
              One Infrastructure. <br className="hide-on-mobile" /><span style={{ color: 'var(--accent-color)' }}>Infinite Use Cases.</span>
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
              Launch your own ChatGPT-style AI for your users, under your brand. You set the rules, your experts stay in the loop, and Tharom runs everything behind it.
            </motion.p>

            <motion.div variants={itemVariants}>
              <div className="glass-panel" style={{
                padding: '3rem 2rem',
                maxWidth: '500px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}>
                <h3 className="text-mono" style={{ marginBottom: '0' }}>Get Early Access</h3>
                <a
                  href="#access"
                  className="btn"
                  onClick={scrollToJoinForm}
                  style={{ width: '100%', background: '#1e293b', color: '#fff' }}
                >
                  Join Waitlist
                </a>
                <span className="text-mono" style={{
                  display: 'inline-block',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid var(--accent-color)',
                  background: 'rgba(243, 128, 32, 0.08)',
                  color: 'var(--accent-color)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                }}>
                  Rolling out in batches
                </span>
              </div>
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
            Every use case runs on the same foundation: your brand, your rules and knowledge, and your people in control.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '1.5rem',
          }}>
            {useCases.map((useCase) => (
              <UseCaseCard key={useCase.label} {...useCase} />
            ))}

            {/* Full-width invite for use cases not listed above */}
            <div className="glass-panel" style={{
              gridColumn: '1 / -1',
              padding: '1.75rem',
              textAlign: 'left',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              border: '1px dashed var(--accent-color)',
            }}>
              <div style={{ flex: '1 1 320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(243, 128, 32, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-color)',
                    flexShrink: 0,
                  }}>
                    <MessageSquarePlus size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Don't see your use case?
                  </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  These are just a few examples. Join the waitlist and tell us what you want to build. We'll show you how Tharom fits. Questions? Email <a
                    href="mailto:hello@tharom.com"
                    style={{ color: 'var(--accent-color)', fontWeight: 600 }}
                  >hello@tharom.com</a>.
                </p>
              </div>
              <a
                href="#access"
                className="btn invite-cta"
                onClick={scrollToJoinForm}
                style={{ flex: '0 0 auto', minWidth: '220px', background: '#1e293b', color: '#fff' }}
              >
                Join Waitlist
              </a>
            </div>
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
        id="access"
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
            Be Among the First to Build on Tharom.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.05rem',
          }}>
            Tharom isn't public yet. We're opening access to businesses in batches. Join the waitlist to get yours.
          </p>
          <WaitlistForm />
        </div>
      </motion.section>
    </div>
  );
}

/* ─── Sub-components ─── */

function UseCaseCard({ icon, label, title, summary, points, loop }: {
  icon: React.ReactNode;
  label: string;
  title: string;
  summary: string;
  points: string[];
  loop: string;
}) {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
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
        <span className="text-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
      </div>
      <h3 style={{
        fontSize: '1.2rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
        {summary}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {points.map((point) => (
          <li key={point} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
            <Check size={18} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '0.1rem' }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p style={{
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid var(--glass-border)',
        color: 'var(--text-secondary)',
        fontSize: '0.88rem',
        lineHeight: 1.5,
      }}>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>In the loop:</span> {loop}
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
