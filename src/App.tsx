
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Thesis from './pages/Thesis'; // trigger ts refresh


function App() {
  return (
    <Router>
      <div className="bg-glow"></div>
      <header style={{ padding: '2rem 0', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5, 5, 5, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.2rem' }}>
            <img src="/logo.png" alt="Xapproach Logo" style={{ height: '32px', width: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" className="text-mono" style={{ fontSize: '0.9rem' }}>Home</Link>
            <Link to="/thesis" className="text-mono" style={{ fontSize: '0.9rem' }}>Thesis</Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/thesis" element={<Thesis />} />
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
