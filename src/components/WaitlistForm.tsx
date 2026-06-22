import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
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
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <h3 className="text-mono" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Early Access Rolls Out Soon</h3>

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

            {status === 'error' && (
              <div style={{ color: '#ff4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <AlertTriangle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ marginTop: '0.5rem' }}>
              {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Join Waitlist'}
            </button>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link 
                to="/thesis" 
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', textUnderlineOffset: '4px', fontSize: '1rem', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} 
                onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.textDecoration = 'underline'; }} 
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.textDecoration = 'none'; }}
                onMouseDown={(e) => { e.currentTarget.style.color = '#0ea5e9'; e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseUp={(e) => { e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.textDecoration = 'underline'; }}
              >
                Thesis <ArrowRight size={16} />
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
