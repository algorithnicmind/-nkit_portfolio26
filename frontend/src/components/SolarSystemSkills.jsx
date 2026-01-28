import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import './SolarSystem.css';

// --- DATA: Correctly Categorized Skills ---
const skillOrbits = [
    {
        name: "Languages (Core)",
        radius: 130,
        speed: 25,
        skills: [
            { name: 'Python', icon: '🐍', color: '#3776ab', category: 'Programming Language', desc: 'A high-level, interpreted programming language famous for AI and Data Science.' },
            { name: 'JavaScript', icon: 'JS', color: '#f7df1e', category: 'Programming Language', desc: 'The core language of the web, enabling interactive and dynamic content.' },
            { name: 'Java', icon: '☕', color: '#007396', category: 'Programming Language', desc: 'A class-based, object-oriented language designed for portability (Write Once, Run Anywhere).' },
            { name: 'C++', icon: 'C++', color: '#00599c', category: 'Programming Language', desc: 'A powerful general-purpose language used for system/software development and game programming.' },
            { name: 'HTML5', icon: '🌐', color: '#e34f26', category: 'Markup Language', desc: 'The standard markup language for documents designed to be displayed in a web browser.' }
        ]
    },
    {
        name: "Frameworks & DBs",
        radius: 230,
        speed: 40,
        direction: 'reverse',
        skills: [
            { name: 'React', icon: '⚛️', color: '#61dafb', category: 'Frontend Library', desc: 'A JavaScript library for building user interfaces based on UI components.' },
            { name: 'Node.js', icon: '🟢', color: '#339933', category: 'Runtime Environment', desc: 'A JavaScript runtime built on Chrome\'s V8 engine to execute code server-side.' },
            { name: 'MongoDB', icon: '🍃', color: '#47a248', category: 'NoSQL Database', desc: 'A source-available cross-platform document-oriented database program.' },
            { name: 'Flask', icon: '🌶️', color: '#000000', category: 'Web Framework', desc: 'A micro web framework written in Python.' },
            { name: 'Tailwind', icon: '🎨', color: '#38b2ac', category: 'CSS Framework', desc: 'A utility-first CSS framework for rapidly building custom user interfaces.' }
        ]
    },
    {
        name: "Tools & AI",
        radius: 330,
        speed: 60,
        skills: [
            { name: 'Git', icon: '📂', color: '#f05033', category: 'Version Control', desc: 'A distributed version control system to track data changes.' },
            { name: 'GitHub', icon: '🐈', color: '#181717', category: 'Platform', desc: 'A hosting service for software development and version control using Git.' },
            { name: 'VS Code', icon: '💻', color: '#007acc', category: 'IDE / Editor', desc: 'A source-code editor made by Microsoft for Windows, Linux and macOS.' },
            { name: 'Machine Learning', icon: '🤖', color: '#ff6b6b', category: 'Field of AI', desc: 'The study of computer algorithms that improve automatically through experience.' },
            { name: 'Postman', icon: '🚀', color: '#ef5b25', category: 'API Tool', desc: 'An API platform for building and using APIs.' }
        ]
    }
];

// --- Skill Detail Modal (Reused) ---
const SolarSkillModal = ({ skill, onClose }) => {
    if (!skill) return null;
    return (
        <motion.div
            className="skill-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ zIndex: 1000 }} // Ensure it's above solar system
        >
            <motion.div
                className="skill-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{ 
                    borderTop: `4px solid ${skill.color}`,
                    background: '#1e1e1e',
                    color: '#fff',
                    maxWidth: '400px',
                    width: '90%'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '2rem' }}>{skill.icon}</span>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: skill.color }}>{skill.name}</h3>
                            <span className="skill-category-badge" style={{ borderColor: skill.color, color: skill.color }}>
                                {skill.category}
                            </span>
                        </div>
                     </div>
                     <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>
                        <FontAwesomeIcon icon={faTimes} />
                     </button>
                </div>
                
                <p style={{ lineHeight: '1.6', color: '#d4d4d8', marginBottom: '1.5rem' }}>
                    {skill.desc}
                </p>

                {/* Proficiency Visual (Simulated) */}
                <div style={{ background: '#3f3f46', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }} // Default 85% for demo
                        style={{ height: '100%', background: skill.color }}
                    />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', color: '#a1a1aa' }}>Proficiency</div>

            </motion.div>
        </motion.div>
    );
};

// --- Main Component ---
const SolarSystemSkills = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [zoom, setZoom] = useState(1);
    const containerRef = useRef(null);

    const handleZoom = (delta) => {
        setZoom(prev => Math.min(Math.max(prev + delta, 0.4), 2.0));
    };

    // Responsive: Analyze screen size and set optimal zoom
    React.useEffect(() => {
        const handleResize = () => {
             // System Width is approx 700px (Outer Radius 330 * 2 + Planet size). 
             // We add buffer -> ~800px required.
             const optimalZoom = Math.min(window.innerWidth / 800, 1);
             // Ensure it's not too tiny
             setZoom(Math.max(optimalZoom, 0.5));
        };

        handleResize(); // Set on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="skills" style={{ position: 'relative', overflow: 'hidden', minHeight: '900px' }}>
            {/* Header */}
            <div className="container" style={{ position: 'relative', zIndex: 20, paddingTop: '3rem', textAlign: 'center' }}>
                <h2 className="section-title">Skills & Technology</h2>
                <p style={{ color: '#a1a1aa' }}>Interactive Solar System. Click any planet to explore details.</p>
            </div>

            {/* Controls */}
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 100, display: 'flex', gap: '10px' }}>
                <button onClick={() => handleZoom(0.2)} style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faSearchPlus} />
                </button>
                <button onClick={() => handleZoom(-0.2)} style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faSearchMinus} />
                </button>
            </div>

            {/* Solar System Container */}
            <div 
                className="solar-system-container" 
                ref={containerRef}
                style={{ height: '800px' }}
            >
                <motion.div 
                    className="universe-wrapper"
                    animate={{ scale: zoom }}
                    transition={{ type: 'spring', damping: 20 }}
                    style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {/* Sun */}
                    <div className="sun">
                        <span>👨‍💻</span>
                    </div>

                    {/* Orbits */}
                    {skillOrbits.map((orbit, orbitIndex) => (
                        <div 
                            key={orbitIndex} 
                            className="orbit"
                            style={{ 
                                width: orbit.radius * 2, 
                                height: orbit.radius * 2,
                                animationDuration: `${orbit.speed}s`,
                                animationDirection: orbit.direction === 'reverse' ? 'reverse' : 'normal'
                            }}
                        >
                            {/* Planets on Orbit */}
                            {orbit.skills.map((skill, skillIndex) => {
                                const angle = (360 / orbit.skills.length) * skillIndex;
                                // We position planets using rotation transforms from the center of the orbit
                                return (
                                    <div 
                                        key={skillIndex}
                                        className="planet"
                                        style={{
                                            // Position: Absolute based on angle.
                                            top: '50%',
                                            left: '50%',
                                            marginTop: -25,
                                            marginLeft: -25,
                                            // The orbit div rotates, so we just need static placement around circle
                                            transform: `rotate(${angle}deg) translate(${orbit.radius}px) rotate(-${angle}deg)` 
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSkill(skill);
                                        }}
                                    >
                                        <div className="planet-icon-wrapper" style={{ 
                                            animation: `counterRotate ${orbit.speed}s linear infinite`,
                                            animationDirection: orbit.direction === 'reverse' ? 'normal' : 'reverse',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'
                                        }}>
                                            <span style={{ color: skill.color }}>{skill.icon}</span>
                                        </div>
                                        <div className="planet-tooltip">{skill.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                @keyframes counterRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
            `}</style>

            {/* Modal */}
            <AnimatePresence>
                {selectedSkill && <SolarSkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default SolarSystemSkills;
