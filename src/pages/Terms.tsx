import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Terms() {
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
            Terms of Service
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
            Last updated: July 2025
          </p>

          <div style={{ color: 'var(--text-primary)', lineHeight: 1.85, fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              These terms govern your use of the Tharom website at tharom.com, operated by <strong>RKO Services Pvt Ltd</strong>.
            </p>
            <p style={{ marginBottom: '2rem', padding: '1rem 1.25rem', borderLeft: '3px solid var(--accent-color)', background: 'rgba(243, 128, 32, 0.05)', borderRadius: '0 8px 8px 0' }}>
              Tharom is currently in a pre-launch phase. These terms cover the waitlist and this website only. Separate terms will apply when the full service launches.
            </p>

            <Section title="What Tharom Is">
              <p>
                Tharom is an AI-powered learning platform being built for schools and educational institutions. It is not yet available for general use. The waitlist allows you to register your interest in early access.
              </p>
            </Section>

            <Section title="The Waitlist">
              <p>
                Joining the waitlist registers your interest. It does not guarantee access to the service, create an account, or establish a subscription. We review waitlist signups and grant access by invitation.
              </p>
            </Section>

            <Section title="Acceptable Use">
              <p>
                When using this website, you agree not to:
              </p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem' }}>
                <li>Submit false or misleading information</li>
                <li>Attempt to interfere with the website's operation</li>
                <li>Use automated tools to submit forms or scrape content</li>
                <li>Use the website for any unlawful purpose</li>
              </ul>
            </Section>

            <Section title="Intellectual Property">
              <p>
                The Tharom name, logo, and website content are the property of RKO Services Pvt Ltd. You may not reproduce, distribute, or create derivative works from our content without written permission.
              </p>
            </Section>

            <Section title="No Warranties">
              <p>
                This website and the waitlist are provided "as is." We make no warranties about the availability of the website, the timing of the product launch, or the features of the final product. As a pre-launch project, details are subject to change.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the maximum extent permitted by law, RKO Services Pvt Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.
              </p>
            </Section>

            <Section title="Changes to These Terms">
              <p>
                We may update these terms from time to time. The updated version will be posted on this page with a revised date. Continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </Section>

            <Section title="Governing Law">
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at Bijnor, Uttar Pradesh, India.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For questions about these terms, contact us at{' '}
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
