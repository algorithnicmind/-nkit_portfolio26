import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faTimes, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


const ModernProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Lock body scroll (and Lenis) when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            if (window.lenis) window.lenis.start();
        }
        return () => { 
            document.body.style.overflow = 'unset'; 
            document.documentElement.style.overflow = 'unset';
            if (window.lenis) window.lenis.start();
        };
    }, [selectedProject]);

    const projects = [
        {
            id: 1,
            title: 'Voice Assistant AI',
            description: 'A smart AI-powered voice assistant capable of understanding natural language commands.',
            fullDescription: 'This project is a comprehensive Voice Assistant built with React and Node.js. It features real-time speech recognition, natural language processing using OpenAI API, and integration with smart home devices. It can set reminders, answer questions, and control IoT devices.',
            technologies: ['React', 'OpenAI API', 'Web Speech API', 'Node.js'],
            category: 'AI / Machine Learning',
            image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop',
            demoLink: '#',
            repoLink: '#'
        },
        {
            id: 2,
            title: 'Tourism Explorer',
            description: 'An immersive travel website designed to assist tourists in discovering destinations.',
            fullDescription: 'Tourism Explorer is a full-stack travel booking application. It uses Mapbox for interactive maps, allowing users to explore destinations visually. Features include hotel booking, local guide connectivity, and a review system. Built with Firebase for real-time data.',
            technologies: ['React', 'Mapbox GL', 'CSS Modules', 'Firebase'],
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
            demoLink: '#',
            repoLink: '#'
        },
        {
            id: 3,
            title: 'E-commerce Hub',
            description: 'A scalable full-stack e-commerce platform featuring a customized shopping cart.',
            fullDescription: 'A robust E-commerce solution offering a seamless shopping experience. It includes a custom shopping cart with persistent state, secure payment processing via Stripe, and a comprehensive Admin Dashboard for inventory and order management.',
            technologies: ['MERN Stack', 'Redux', 'Stripe API', 'Tailwind'],
            category: 'Full Stack',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2664&auto=format&fit=crop',
            demoLink: '#',
            repoLink: '#'
        },
        // Add more projects here as needed
    ];

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

                {/* Replaced CardStack with Responsive Premium Grid for Scalability */}
                <div className="modern-projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="premium-project-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            style={{ cursor: 'pointer' }}
                        >
                            {/* Card Content using CSS classes defined in styles.css */}
                            <div className="project-category-badge">{project.category}</div>
                            
                            <div className="project-card-content">
                                <h3 className="project-title-large">{project.title}</h3>
                                <p className="project-description-text">
                                    {project.description}
                                </p>
                            </div>

                            <div className="project-tech-stack">
                                {project.technologies.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="tech-pill">{tech}</span>
                                ))}
                            </div>

                            <div className="project-actions-footer">
                                <button className="project-btn demo">
                                     <FontAwesomeIcon icon={faMousePointer} style={{ marginRight: '8px' }} />
                                     View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p style={{ textAlign: 'center', marginTop: '3rem', color: '#71717a' }}>
                    More projects coming soon...
                </p>
            </div>

            {/* Project Details Modal via Portal */}
            {ReactDOM.createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div 
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            style={{ 
                                zIndex: 10002, // Higher than everything
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.85)',
                                backdropFilter: 'blur(5px)'
                            }}
                        >
                            <motion.div 
                                className="create-post-modal" // Reusing the clean modal style
                                style={{ 
                                    maxWidth: '700px', // Wider for project details
                                }}
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="modal-header">
                                    <h3 style={{ margin: 0, fontSize: '1.8rem' }}>{selectedProject.title}</h3>
                                    <button 
                                        className="modal-close-btn" 
                                        onClick={() => setSelectedProject(null)}
                                        style={{ position: 'relative', top: 'unset', right: 'unset' }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>

                                <div>
                                    <img 
                                        src={selectedProject.image} 
                                        alt={selectedProject.title}
                                        style={{ 
                                            width: '100%', 
                                            height: '300px', 
                                            objectFit: 'cover', 
                                            borderRadius: '12px',
                                            marginBottom: '1.5rem',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }} 
                                    />
                                    
                                    <div className="project-category-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>
                                        {selectedProject.category}
                                    </div>

                                    <p style={{ color: '#e4e4e7', lineHeight: '1.7', marginBottom: '2rem', fontSize: '1.05rem' }}>
                                        {selectedProject.fullDescription}
                                    </p>

                                    <h4 style={{ color: 'white', marginBottom: '1rem' }}>Technologies</h4>
                                    <div className="project-tech-stack" style={{ marginBottom: '2rem' }}>
                                        {selectedProject.technologies.map((tech, i) => (
                                            <span key={i} className="tech-pill">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="project-actions-footer" style={{ borderTop: 'none', padding: 0 }}>
                                        <a href={selectedProject.repoLink} className="project-btn source" target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                            <FontAwesomeIcon icon={faGithub} /> Source Code
                                        </a>
                                        <a href={selectedProject.demoLink} className="project-btn demo" target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                                            <FontAwesomeIcon icon={faExternalLinkAlt} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default ModernProjects;
