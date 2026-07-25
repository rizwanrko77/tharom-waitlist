
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import ScrollToTop from './components/ScrollToTop';
import BackgroundLayer from './components/BackgroundLayer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BackgroundLayer />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;


