import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ModernProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Voice Assistant',
      description: 'A smart AI-powered voice assistant capable of understanding natural language commands, executing tasks, and interacting with smart home devices. Features real-time speech recognition and synthesis.',
      technologies: ['React', 'OpenAI API', 'Web Speech API', 'Node.js'],
      category: 'AI / Machine Learning',
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 2,
      title: 'Tourism Explorer',
      description: 'An immersive travel website designed to assist tourists in discovering destinations, booking authentic experiences, and finding local guides. Integrated with interactive maps and reviews.',
      technologies: ['React', 'Mapbox GL', 'CSS Modules', 'Firebase'],
      category: 'Web Development',
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 3,
      title: 'E-commerce Hub',
      description: 'A scalable full-stack e-commerce platform featuring a customized shopping cart, secure payment gateway integration (Stripe), and a comprehensive admin dashboard for inventory management.',
      technologies: ['MERN Stack', 'Redux', 'Stripe API', 'Tailwind'],
      category: 'Full Stack',
      demoLink: '#',
      repoLink: '#'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" className="modern-projects-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div 
          className="modern-projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="premium-project-card"
              variants={cardVariants}
            >
              <div className="project-category-badge">{project.category}</div>
              
              <div className="project-card-content">
                <h3 className="project-title-large">{project.title}</h3>
                
                <p className="project-description-text">
                  {project.description}
                </p>

                <div className="project-tech-stack">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions-footer">
                  <a href={project.repoLink} className="project-btn source" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                    Source Code
                  </a>
                  <a href={project.demoLink} className="project-btn demo" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernProjects;
