import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const AI_STATUS_OPTIONS = ['Not yet', 'Exploring options', 'Yes, already in use'] as const;
const AI_IN_USE = 'Yes, already in use';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [usecase, setUsecase] = useState('');
  const [aiStatus, setAiStatus] = useState('');
  const [aiDetails, setAiDetails] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !usecase) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          usecase,
          aiStatus,
          aiDetails: aiStatus === AI_IN_USE ? aiDetails : '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // The Apps Script checks the sheet and flags emails that already signed up
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
              placeholder="Tell us about your business use case and what you'd like to build with AI"
              value={usecase}
              onChange={(e) => setUsecase(e.target.value)}
              required
              disabled={status === 'loading'}
              rows={3}
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />

            <fieldset className="choice-fieldset" disabled={status === 'loading'}>
              <legend>Are you using AI for this today?</legend>
              <div className="choice-group">
                {AI_STATUS_OPTIONS.map((option) => (
                  <label key={option} className="choice-pill">
                    <input
                      type="radio"
                      name="aiStatus"
                      value={option}
                      checked={aiStatus === option}
                      onChange={() => setAiStatus(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {aiStatus === AI_IN_USE && (
              <textarea
                className="input-field"
                placeholder="What are you using, and how is it working for you?"
                value={aiDetails}
                onChange={(e) => setAiDetails(e.target.value)}
                disabled={status === 'loading'}
                rows={3}
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
            )}

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
