import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faTimes, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { CardStack } from './ui/CardStack';

const ModernProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Lock html too
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => { 
            document.body.style.overflow = 'unset'; 
            document.documentElement.style.overflow = 'unset';
        };
    }, [selectedProject]);

    const projects = [
        // ... (data remains same, no change needed here)
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
    ];


    return (
        <section id="projects" className="modern-projects-section" style={{ overflow: 'hidden' }}>
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

                <div style={{ 
                    height: '580px', 
                    width: '100%', 
                    maxWidth: '400px', 
                    margin: '0 auto', 
                    marginTop: '2rem',
                    position: 'relative'
                }}>
                    <CardStack 
                        items={projects} 
                        offset={25} 
                        scaleFactor={0.08}
                        renderItem={(project, isActive) => (
                            <div className="project-stack-card" style={{
                                backgroundColor: '#18181b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '24px',
                                padding: '1.5rem',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                overflow: 'hidden'
                            }}>
                                <div>
                                    <div className="project-category-badge" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                                        {project.category}
                                    </div>
                                    <h3 className="project-title-large" style={{ fontSize: '1.5rem', marginBottom: '0.75rem', lineHeight: '1.2' }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {project.description}
                                    </p>
                                </div>
                                
                                <div style={{ marginTop: 'auto' }}>
                                    <div className="project-tech-stack" style={{ marginBottom: '1rem' }}>
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="tech-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>{tech}</span>
                                        ))}
                                    </div>

                                    {isActive ? (
                                        <motion.button 
                                            className="project-btn"
                                            style={{ 
                                                width: '100%', 
                                                justifyContent: 'center', 
                                                background: 'rgba(255, 255, 255, 0.05)', 
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                padding: '0.8rem',
                                                backdropFilter: 'blur(10px)',
                                                color: '#fff',
                                                fontWeight: '500',
                                                letterSpacing: '0.5px'
                                            }}
                                            whileHover={{ 
                                                scale: 1.02, 
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderColor: 'rgba(255, 255, 255, 0.4)'
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProject(project);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMousePointer} style={{ fontSize: '0.8rem' }} />
                                            Click Me Here
                                        </motion.button>
                                    ) : (
                                        <div style={{ 
                                            textAlign: 'center', 
                                            color: '#52525b', 
                                            fontSize: '0.9rem',
                                            fontStyle: 'italic',
                                            padding: '0.8rem'
                                        }}>
                                            Next Project
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    />
                </div>

                <p style={{ textAlign: 'center', marginTop: '3rem', color: '#71717a' }}>
                    Tap the stack to cycle through projects
                </p>
            </div>

            {/* Project Details Modal - Rendered via Portal to avoid stacking context issues */}
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
                                zIndex: 9999, // Extremely high z-index
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
                                className="create-post-modal" 
                                style={{ 
                                    maxWidth: '600px', 
                                    width: '90%', 
                                    maxHeight: '90vh', 
                                    overflowY: 'auto', 
                                    position: 'relative',
                                    zIndex: 10000 
                                }}
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="modal-header" style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedProject.title}</h3>
                                    <button 
                                        className="modal-close-btn" 
                                        onClick={() => setSelectedProject(null)}
                                        style={{ 
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            color: 'white',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            zIndex: 10
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>

                                <div style={{ padding: '1.5rem' }}>
                                    <img 
                                        src={selectedProject.image} 
                                        alt={selectedProject.title}
                                        style={{ 
                                            width: '100%', 
                                            height: '250px', 
                                            objectFit: 'cover', 
                                            borderRadius: '12px',
                                            marginBottom: '1.5rem'
                                        }} 
                                    />
                                    
                                    <div className="project-category-badge" style={{ marginBottom: '1rem' }}>
                                        {selectedProject.category}
                                    </div>

                                    <p style={{ color: '#e4e4e7', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                        {selectedProject.fullDescription}
                                    </p>

                                    <div className="project-tech-stack" style={{ marginBottom: '2rem' }}>
                                        {selectedProject.technologies.map((tech, i) => (
                                            <span key={i} className="tech-pill">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="project-actions-footer">
                                        <a href={selectedProject.repoLink} className="project-btn source" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faGithub} /> Code
                                        </a>
                                        <a href={selectedProject.demoLink} className="project-btn demo" target="_blank" rel="noopener noreferrer">
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
