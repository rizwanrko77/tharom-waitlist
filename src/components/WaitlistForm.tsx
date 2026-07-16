import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const WAITLIST_STORAGE_KEY = 'tharom_waitlist_joined';

export default function WaitlistForm() {
  const [step, setStep] = useState<'intro' | 'form'>('intro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [usecase, setUsecase] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check localStorage on mount for returning visitors
  useEffect(() => {
    const joined = localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (joined) {
      setStatus('already');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !usecase) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, usecase }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage so returning visitors see the success state
        localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify({ name, email, ts: Date.now() }));

        if (data.duplicate) {
          setStatus('already');
        } else {
          setStatus('success');
        }
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <CheckCircle className="text-accent" size={48} style={{ margin: '0 auto 1rem' }} />
            <h3 className="text-mono" style={{ marginBottom: '0.5rem' }}>You're on the list!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Keep an eye on your inbox for updates.</p>
          </motion.div>
        ) : status === 'already' ? (
          <motion.div
            key="already"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <CheckCircle className="text-accent" size={48} style={{ margin: '0 auto 1rem' }} />
            <h3 className="text-mono" style={{ marginBottom: '0.5rem' }}>You're already on the list!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We've got your details. Stay tuned for early access.</p>
          </motion.div>
        ) : step === 'intro' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1rem 0' }}
          >
            <h3 className="text-mono" style={{ marginBottom: '0' }}>Get Early Access</h3>
            <button
              type="button"
              className="btn"
              onClick={() => setStep('form')}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                background: '#1e293b',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Join Waitlist
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <h3 className="text-mono" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Get Early Access</h3>

            <input
              type="text"
              className="input-field"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <textarea
              className="input-field"
              placeholder="Your Use Case (tell us about how you plan to use AI in your business or for your users)"
              value={usecase}
              onChange={(e) => setUsecase(e.target.value)}
              required
              disabled={status === 'loading'}
              rows={3}
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />

            {status === 'error' && (
              <div style={{ color: '#ff4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <AlertTriangle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ marginTop: '0.5rem' }}>
              {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Join Waitlist'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
