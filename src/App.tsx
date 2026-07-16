
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import ScrollToTop from './components/ScrollToTop';
import BackgroundLayer from './components/BackgroundLayer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BackgroundLayer />
      <header style={{ padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100, background: 'transparent' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.2rem' }}>
            <img src="/logo.png" alt="Tharom AI Logo" style={{ height: '36px', width: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>Tharom</span>
          </Link>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
      
      <footer style={{ padding: '4rem 0 2rem', textAlign: 'center', opacity: 0.5 }}>
        <div className="container">
          <p className="text-mono" style={{ fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} Tharom AI. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
