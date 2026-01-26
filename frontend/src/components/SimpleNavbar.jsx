import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SimpleNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="container simple-navbar-content">
        <a href="#hero" className="brand" onClick={(e) => handleNavigation(e, 'hero')}>
          Ankit Sahoo <span className="wave-emoji">👋</span>
        </a>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
