import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitAlt, faReact, faHtml5, faCss3Alt, faJsSquare, faPython, faJava } from '@fortawesome/free-brands-svg-icons';
import { faBrain, faChartLine, faSitemap, faDatabase, faNetworkWired, faComments, faFileCode } from '@fortawesome/free-solid-svg-icons';

const skills = [
  {
    name: 'Git',
    icon: faGitAlt,
    description: 'Version control system for tracking changes in source code during software development.',
    color: '#f05033'
  },
  {
    name: 'React',
    icon: faReact,
    description: 'JavaScript library for building user interfaces, particularly single-page applications.',
    color: '#61dafb'
  },
  {
    name: 'HTML',
    icon: faHtml5,
    description: 'Standard markup language for creating web pages and web applications.',
    color: '#e34f26'
  },
  {
    name: 'CSS',
    icon: faCss3Alt,
    description: 'Style sheet language used for describing the presentation of a document written in HTML.',
    color: '#1572b6'
  },
  {
    name: 'Javascript',
    icon: faJsSquare,
    description: 'High-level, interpreted programming language that conforms to the ECMAScript specification.',
    color: '#f7df1e'
  },
  {
    name: 'Python',
    icon: faPython,
    description: 'High-level, interpreted programming language known for its simplicity and readability.',
    color: '#3776ab'
  },
  {
    name: 'Java',
    icon: faJava,
    description: 'Object-oriented programming language that runs on billions of devices.',
    color: '#007396'
  },
  {
    name: 'C',
    icon: faFileCode,
    description: 'General-purpose programming language supporting structured programming.',
    color: '#a8b9cc'
  },
  {
    name: 'AI',
    icon: faBrain,
    description: 'Artificial Intelligence technologies including machine learning and neural networks.',
    color: '#ff6b6b'
  },
  {
    name: 'Machine Learning',
    icon: faChartLine,
    description: 'Subset of AI that enables systems to learn and improve from experience.',
    color: '#4ecdc4'
  },
  {
    name: 'DSA',
    icon: faSitemap,
    description: 'Data Structures and Algorithms for efficient problem-solving and code optimization.',
    color: '#45b7d1'
  },
  {
    name: 'MongoDB',
    icon: faDatabase,
    description: 'NoSQL document database used for building scalable applications.',
    color: '#47a248'
  },
  {
    name: 'Networking',
    icon: faNetworkWired,
    description: 'Computer networking concepts including protocols, routing, and network security.',
    color: '#00d4aa'
  },
  {
    name: 'Communication',
    icon: faComments,
    description: 'Effective communication skills for team collaboration and project management.',
    color: '#f093fb'
  }
];

const ModernSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleMouseOut = () => {
    setSelectedSkill(null);
  };

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section className="modern-skills-section" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="skills-header"
        >
          <h2 className="section-title">
            Skills & Technologies
          </h2>
          <p className="section-subtitle">
            Proficient in modern web development, programming languages, and emerging technologies
          </p>
        </motion.div>

        {/* Skills Horizontal Scroll */}
        <div className="skills-horizontal-list" onMouseLeave={handleMouseOut}>
          <div className="skills-scroll-container">
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: (index % skills.length) * 0.1 }}
                viewport={{ once: true }}
                className="skill-item"
                onClick={() => handleSkillClick(skill)}
              >
                <div className="skill-content">
                  <FontAwesomeIcon
                    icon={skill.icon}
                    className="skill-icon"
                    style={{ color: selectedSkill?.name === skill.name ? skill.color : '#9ca3af' }}
                  />
                  <button
                    type="button"
                    className={`skill-link ${selectedSkill?.name === skill.name ? 'selected' : ''}`}
                  >
                    {skill.name}
                  </button>
                  <p className="skill-hint">Click to learn more</p>
                </div>
                {selectedSkill?.name === skill.name && (
                  <div className="skill-description">
                    {skill.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );

};

export default ModernSkills;
