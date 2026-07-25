
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
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
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

