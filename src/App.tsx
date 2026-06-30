
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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.2rem' }}>
            <img src="/logo.png" alt="Xapproach Logo" style={{ height: '32px', width: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
          <p className="text-mono" style={{ fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} Xapproach. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
