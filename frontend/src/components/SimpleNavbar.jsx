import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EncryptedText } from './ui/EncryptedText';

const SimpleNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="simple-navbar">
      <div className="container simple-navbar-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#hero" className="brand" onClick={(e) => handleNavigation(e, 'hero')}>
            <EncryptedText
                text="Hello World"
                revealDelayMs={100}
                encryptedClassName="text-white opacity-50"
                revealedClassName="text-white"
            />
            <span className="wave-emoji" style={{ marginLeft: '10px' }}>👋</span>
        </a>

        <div className="navbar-clock" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '500' }}>
            <span>{formatTime(currentTime)}</span>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
            <span>{formatDate(currentTime)}</span>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
