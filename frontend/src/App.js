import './styles.css';
import React, { Suspense, useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import SimpleNavbar from './components/SimpleNavbar';
import FloatingDock from './components/FloatingDock';
import { AuroraBackground } from './components/ui/AuroraBackground';
import VisitorTracker from './components/VisitorTracker';

import ModernHero from './components/ModernHero';
import Footer from './components/Footer';
import Softs from './components/Softs';
import Chatbot from './components/Chatbot';
import LoginModal from './components/LoginModal';
import AnalyticsPage from './components/AnalyticsPage';

// Lazy load components below the fold for performance
const ModernAbout = React.lazy(() => import('./components/ModernAbout'));
const Experience = React.lazy(() => import('./components/Experience'));
const Educations = React.lazy(() => import('./components/Educations'));
const SolarSystemSkills = React.lazy(() => import('./components/SolarSystemSkills'));
const ModernProjects = React.lazy(() => import('./components/ModernProjects'));
const ModernContact = React.lazy(() => import('./components/ModernContact'));


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
      duration: 1.0, // Slightly faster for snappier feel
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out (smoother)
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false, // Prevent memory issues
    });

    window.lenis = lenis; // Expose for components

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
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
      <AuroraBackground />
      <SimpleNavbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={
            <>
              <ModernHero />
              <Suspense fallback={null}>
                <ModernAbout />
                <Experience />
                <Educations />
                <SolarSystemSkills />
                <ModernProjects />
                <ModernContact />
              </Suspense>
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
