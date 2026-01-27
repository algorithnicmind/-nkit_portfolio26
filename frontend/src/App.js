import './styles.css';
import React, { Suspense, useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import SimpleNavbar from './components/SimpleNavbar';
import FloatingDock from './components/FloatingDock';
import GravityStarsBackground from './components/GravityStarsBackground';
import VisitorTracker from './components/VisitorTracker';
import ModernContact from './components/ModernContact';
import ModernHero from './components/ModernHero';
import ModernAbout from './components/ModernAbout';
import Experience from './components/Experience';
import Educations from './components/Educations';
import ModernSkills from './components/ModernSkills';
import ModernProjects from './components/ModernProjects';
import Footer from './components/Footer';
import Softs from './components/Softs';
import Chatbot from './components/Chatbot';
import LoginModal from './components/LoginModal';
import AnalyticsPage from './components/AnalyticsPage';


function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleLogout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpiry');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
  };

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const expiry = localStorage.getItem('authExpiry');
      const storedUser = localStorage.getItem('adminUser');

      if (token && expiry && storedUser) {
        const now = Date.now();
        if (now < parseInt(expiry)) {
          // Token is still valid
          setAdminUser(JSON.parse(storedUser));
        } else {
          // Token expired, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('authExpiry');
          localStorage.removeItem('adminUser');
          setAdminUser(null);
        }
      }
    };

    checkAuth();

    // Check token expiry every minute
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle hash scrolling on route change
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="App">
      <GravityStarsBackground
        starsCount={100}
        gravityStrength={1}
        mouseInfluence={250}
      />
      <SimpleNavbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={
            <>
              <section id="hero" className="modern-hero-section">
                <ModernHero />
              </section>
              <section id="about" className="modern-about-section">
                <ModernAbout />
              </section>
              <section id="experience" className="experience-section">
                <Experience />
              </section>
              <section id="educations" className="educations-section">
                <Educations />
              </section>
              <ModernSkills />
              <section id="projects" className="modern-projects-section">
                <ModernProjects />
              </section>
              <section id="contact" className="modern-contact-section">
                <ModernContact />
              </section>
            </>
          } />
          <Route path="/softs" element={
            <Suspense fallback={<div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>Loading...</div>}>
              <Softs adminUser={adminUser} />
            </Suspense>
          } />
          <Route path="/analytics" element={
            <Suspense fallback={<div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>Loading...</div>}>
              <AnalyticsPage adminUser={adminUser} />
            </Suspense>
          } />
        </Routes>
      </div>
      <Suspense fallback={null}>
        <Footer />
        <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} adminUser={adminUser} />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={setAdminUser} />
      </Suspense>
      <VisitorTracker />
      <FloatingDock
        toggleChatbot={toggleChatbot}
        toggleLogin={toggleLogin}
        adminUser={adminUser}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
