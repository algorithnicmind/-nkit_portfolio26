import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModernAbout = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextPersona = () => {
    setActiveIndex((prev) => (prev + 1) % aboutData.length);
  };

  // Data for the About section - organized by "Personas" / Topics
  const aboutData = [
    {
      id: 'developer',
      label: 'The Developer',
      image: '/images/profile/photo1.jpg', // Ensure these exist or use placeholders
      title: 'Passionate Full Stack Developer',
      description: "I'm a B.Tech Computer Science student at DRIEMS University with a deep love for code. I don't just build websites; I build digital experiences. My core strength lies in translating complex requirements into clean, efficient, and scalable code.",
      stats: [
        { label: 'Experience', value: '2+ Years' },
        { label: 'Projects', value: '15+' }
      ]
    },
    {
      id: 'tech',
      label: 'Tech Stack',
      image: '/images/profile/photo2.jpg',
      title: 'My Technical Arsenal',
      description: "My toolbox is diverse and modern. I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I'm also proficient in Python for data-driven backend tasks. I believe in choosing the right tool for the job, not just the trendiest one.",
      stats: [
        { label: 'Frontend', value: 'React/Next' },
        { label: 'Backend', value: 'Node/Python' }
      ]
    },
    {
      id: 'student',
      label: 'The Student',
      image: '/images/profile/photo3.jpg',
      title: 'Lifelong Learner',
      description: "Beyond the code, I'm a dedicated student. Currently maintaining a strong academic record while actively participating in hackathons and tech communities. I believe that the best developers never stop being students of their craft.",
      stats: [
        { label: 'University', value: 'DRIEMS' },
        { label: 'Focus', value: 'AI / ML' }
      ]
    },
    {
      id: 'human',
      label: 'The Human',
      image: '/images/profile/photo4.jpg',
      title: 'Beyond the Screen',
      description: "When I'm not debugging, I'm exploring. I love connecting with people, sharing knowledge, and understanding the 'why' behind the 'how'. I'm driven by curiosity and the desire to make a tangible impact through technology.",
      stats: [
        { label: 'Location', value: 'India' },
        { label: 'Age', value: '19' }
      ]
    }
  ];

  return (
    <section id="about" className="modern-about-section">
      <div className="container">
        
        <h2 className="section-title">About Me</h2>
        
        <div className="about-interactive-container">
          
          {/* LEFT: Dynamic Content Area */}
          <div className="about-content-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="stat-label-small" style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                  {aboutData[activeIndex].label}
                </div>
                
                <h2 className="about-dynamic-title">
                  {aboutData[activeIndex].title}
                </h2>
                
                <p className="about-dynamic-text">
                  {aboutData[activeIndex].description}
                </p>

                <div className="about-stats-list">
                  {aboutData[activeIndex].stats.map((stat, idx) => (
                    <div key={idx} className="about-stat-item">
                      <span className="stat-value-large">{stat.value}</span>
                      <span className="stat-label-small">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Stacked Image Interaction */}
          <div className="about-stack-container" onClick={handleNextPersona}>
            {aboutData.map((item, index) => {
              // Calculate relative index for stacking order
              const relativeIndex = (index - activeIndex + aboutData.length) % aboutData.length;
              
              return (
                <motion.div 
                  key={item.id}
                  className="about-stack-card"
                  initial={false}
                  animate={{
                    top: relativeIndex * 15,
                    left: relativeIndex * 15,
                    scale: 1 - relativeIndex * 0.05,
                    zIndex: aboutData.length - relativeIndex,
                    opacity: 1 - relativeIndex * 0.2
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.label}
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${item.label}&background=random` }} 
                  />
                  <div className="stack-card-overlay">
                    <span>{item.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
