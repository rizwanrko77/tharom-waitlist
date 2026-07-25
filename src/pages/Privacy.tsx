import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            Last updated: July 2025
          </p>

          <div style={{ color: 'var(--text-primary)', lineHeight: 1.85, fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Tharom is a service operated by <strong>RKO Services Pvt Ltd</strong>. This policy explains what data we collect through the waitlist at tharom.com and how we handle it.
            </p>
            <p style={{ marginBottom: '2rem', padding: '1rem 1.25rem', borderLeft: '3px solid var(--accent-color)', background: 'rgba(243, 128, 32, 0.05)', borderRadius: '0 8px 8px 0' }}>
              This policy covers the waitlist only. A separate, more detailed policy will apply when the full Tharom service launches.
            </p>

            <Section title="What We Collect">
              <p>When you join the waitlist, you provide us with:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem' }}>
                <li>Your <strong>name</strong></li>
                <li>Your <strong>email address</strong></li>
                <li>A brief description of your <strong>intended use case</strong></li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>
                All of this information is provided voluntarily when you submit the waitlist form.
              </p>
            </Section>

            <Section title="Why We Collect It">
              <p>
                We use this information to manage the waitlist, understand who is interested in Tharom, and send you product updates before launch. We do not use it for any other purpose.
              </p>
            </Section>

            <Section title="Emails We Send">
              <p>
                When you join the waitlist, we send you a single welcome email confirming your signup. We may also send occasional product updates as we approach launch. These emails come from <strong>waitlist@tharom.com</strong>.
              </p>
            </Section>

            <Section title="Who Processes Your Data">
              <p>We use the following services to operate the waitlist:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem' }}>
                <li><strong>Cloudflare</strong> — hosts the website and runs the backend</li>
                <li><strong>Google Sheets</strong> — stores waitlist signups</li>
                <li><strong>Resend</strong> — delivers the welcome email</li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>
                We do not sell, share, or provide your data to advertisers or any other third parties.
              </p>
            </Section>

            <Section title="How to Opt Out">
              <p>
                If you'd like to be removed from the waitlist and have your data deleted, email us at{' '}
                <a href="mailto:hello@tharom.com" style={{ color: 'var(--accent-color)' }}>hello@tharom.com</a>{' '}
                and we'll take care of it promptly.
              </p>
            </Section>

            <Section title="How Long We Keep Your Data">
              <p>
                We retain your waitlist data until you ask to be removed, or until 24 months after your last interaction with us — whichever comes first. Data is deleted sooner on request.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For any questions about your data or this policy, contact us at{' '}
                <a href="mailto:hello@tharom.com" style={{ color: 'var(--accent-color)' }}>hello@tharom.com</a>.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                RKO Services Pvt Ltd<br />
                Nehtour, Bijnor, Uttar Pradesh, India
              </p>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '1.3rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
