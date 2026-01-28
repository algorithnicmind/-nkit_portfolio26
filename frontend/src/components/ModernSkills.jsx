import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Professional skill data with descriptions
const skillsRow1 = [
  { 
    name: 'Python', 
    color: '#3776ab', 
    icon: '🐍',
    description: 'High-level programming language known for its simplicity and readability. Used extensively in AI, ML, data science, and web development.',
    proficiency: 90,
    projects: ['AI Chatbot', 'Data Analysis Tools', 'Web Scraping Scripts']
  },
  { 
    name: 'JavaScript', 
    color: '#f7df1e', 
    icon: 'JS',
    description: 'The language of the web. Powers interactive websites, server-side applications, and modern frameworks like React.',
    proficiency: 85,
    projects: ['Portfolio Website', 'Interactive Dashboards', 'Node.js APIs']
  },
  { 
    name: 'React', 
    color: '#61dafb', 
    icon: '⚛️',
    description: 'A JavaScript library for building user interfaces. Component-based architecture for scalable applications.',
    proficiency: 85,
    projects: ['This Portfolio', 'Admin Dashboards', 'E-commerce UIs']
  },
  { 
    name: 'Java', 
    color: '#007396', 
    icon: '☕',
    description: 'Object-oriented programming language that runs on billions of devices. Great for enterprise and Android development.',
    proficiency: 75,
    projects: ['Android Apps', 'Backend Services', 'Data Structures Practice']
  },
  { 
    name: 'C', 
    color: '#a8b9cc', 
    icon: 'C',
    description: 'Foundation of modern programming. Low-level language perfect for system programming and understanding computer architecture.',
    proficiency: 70,
    projects: ['System Programming', 'Algorithm Implementation', 'OS Concepts']
  },
  { 
    name: 'HTML5', 
    color: '#e34f26', 
    icon: '🌐',
    description: 'Standard markup language for creating web pages. The backbone of every website on the internet.',
    proficiency: 95,
    projects: ['Web Pages', 'Email Templates', 'Semantic Layouts']
  },
  { 
    name: 'CSS3', 
    color: '#1572b6', 
    icon: '🎨',
    description: 'Style sheet language for describing web page presentation. Enables animations, layouts, and responsive design.',
    proficiency: 90,
    projects: ['UI Animations', 'Responsive Designs', 'Modern Layouts']
  },
];

const skillsRow2 = [
  { 
    name: 'Machine Learning', 
    color: '#4ecdc4', 
    icon: '🤖',
    description: 'Subset of AI that enables systems to learn and improve from experience without being explicitly programmed.',
    proficiency: 75,
    projects: ['Prediction Models', 'Classification Systems', 'Recommendation Engines']
  },
  { 
    name: 'AI', 
    color: '#ff6b6b', 
    icon: '🧠',
    description: 'Artificial Intelligence technologies including neural networks, NLP, and computer vision applications.',
    proficiency: 70,
    projects: ['Chatbot Development', 'Image Recognition', 'NLP Applications']
  },
  { 
    name: 'MongoDB', 
    color: '#47a248', 
    icon: '🍃',
    description: 'NoSQL document database for modern applications. Flexible schemas and horizontal scalability.',
    proficiency: 80,
    projects: ['User Authentication', 'Content Management', 'Analytics Storage']
  },
  { 
    name: 'Git', 
    color: '#f05033', 
    icon: '📂',
    description: 'Distributed version control system for tracking changes in source code during software development.',
    proficiency: 85,
    projects: ['Team Collaboration', 'Code Versioning', 'Open Source Contributions']
  },
  { 
    name: 'DSA', 
    color: '#45b7d1', 
    icon: '📊',
    description: 'Data Structures and Algorithms - the foundation of efficient problem-solving and code optimization.',
    proficiency: 80,
    projects: ['Competitive Programming', 'Interview Prep', 'Optimization Solutions']
  },
  { 
    name: 'Networking', 
    color: '#00d4aa', 
    icon: '🌐',
    description: 'Computer networking concepts including TCP/IP, protocols, routing, and network security fundamentals.',
    proficiency: 70,
    projects: ['Network Configuration', 'Security Audits', 'Protocol Analysis']
  },
  { 
    name: 'Communication', 
    color: '#f093fb', 
    icon: '💬',
    description: 'Effective communication skills for team collaboration, presentations, and technical documentation.',
    proficiency: 85,
    projects: ['Team Leadership', 'Technical Writing', 'Client Presentations']
  },
];

// Skill Detail Modal
const SkillModal = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <motion.div
      className="skill-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="skill-modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{ '--skill-color': skill.color }}
      >
        <button className="skill-modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="skill-modal-header">
          <div className="skill-modal-icon" style={{ background: `${skill.color}20`, borderColor: `${skill.color}40` }}>
            <span>{skill.icon}</span>
          </div>
          <h3 className="skill-modal-title" style={{ color: skill.color }}>{skill.name}</h3>
        </div>

        <p className="skill-modal-description">{skill.description}</p>

        <div className="skill-modal-proficiency">
          <div className="proficiency-header">
            <span>Proficiency</span>
            <span style={{ color: skill.color }}>{skill.proficiency}%</span>
          </div>
          <div className="proficiency-bar">
            <motion.div 
              className="proficiency-fill"
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
            />
          </div>
        </div>

        <div className="skill-modal-projects">
          <h4>Related Projects</h4>
          <div className="project-tags">
            {skill.projects.map((project, index) => (
              <span 
                key={index} 
                className="project-tag"
                style={{ borderColor: `${skill.color}40`, color: skill.color }}
              >
                {project}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Skill Card Component
const SkillCard = ({ skill, index, onClick }) => (
  <motion.div
    className="skill-card"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
    whileHover={{ 
      scale: 1.15,
    }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(skill)}
  >
    <div className="skill-icon-wrapper">
      <span className="skill-emoji" style={{ color: skill.color }}>{skill.icon}</span>
    </div>
  </motion.div>
);

// Marquee Row Component
const MarqueeRow = ({ skills, direction = 'left', speed = 30, onSkillClick }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];
  
  return (
    <div className="marquee-container">
      <div 
        className={`marquee-track ${direction === 'right' ? 'reverse' : ''}`}
        style={{ '--duration': `${speed}s` }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCard 
            key={`${skill.name}-${index}`} 
            skill={skill} 
            index={index % skills.length}
            onClick={onSkillClick}
          />
        ))}
      </div>
    </div>
  );
};

const ModernSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleCloseModal = () => {
    setSelectedSkill(null);
  };

  return (
    <section className="skills-section-modern" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="skills-header-modern"
        >
          <h2 className="section-title">
            Skills & Technologies
          </h2>
          <p className="section-subtitle-skills">
            Proficient in modern development tools, programming languages, and emerging technologies
          </p>
        </motion.div>
      </div>

      {/* Marquee Rows - Full Width */}
      <div className="skills-marquee-wrapper">
        <MarqueeRow skills={skillsRow1} direction="left" speed={35} onSkillClick={handleSkillClick} />
        <MarqueeRow skills={skillsRow2} direction="right" speed={40} onSkillClick={handleSkillClick} />
      </div>

      {/* Gradient Overlays */}


      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ModernSkills;
