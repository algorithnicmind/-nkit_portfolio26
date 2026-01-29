import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import for Portal
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import './SolarSystem.css';

// --- DATA: Correctly Categorized Skills ---
const skillOrbits = [
    {
        name: "Languages (Core)",
        radius: 10,
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
        radius: 16,
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
        radius: 22,
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

// --- 3D Components ---

const Sun = () => {
    return (
        <mesh>
            <sphereGeometry args={[4, 32, 32]} />
            <meshStandardMaterial 
                emissive="#ff8c00" 
                emissiveIntensity={2} 
                color="#ffd700" 
                roughness={0.2}
            />
            <pointLight distance={100} intensity={3} color="#ffd700" />
            <Html center>
                <div style={{ fontSize: '3rem', pointerEvents: 'none', userSelect: 'none' }}>👨‍💻</div>
            </Html>
        </mesh>
    );
};

const OrbitRing = ({ radius }) => {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.05, 32, 100]} />
            <meshBasicMaterial color="#ffffff" opacity={0.05} transparent side={THREE.DoubleSide} />
        </mesh>
    );
};

const Planet = ({ skill, distance, speed, initialAngle, direction, onSelect }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    // Store initial angle ref
    const angleRef = useRef(initialAngle);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Calculate Rotation
        const rotationSpeed = (0.08 / speed); 
        const dirMultiplier = direction === 'reverse' ? -1 : 1;

        angleRef.current += rotationSpeed * dirMultiplier;

        const x = distance * Math.cos(angleRef.current);
        const z = distance * Math.sin(angleRef.current);

        meshRef.current.position.set(x, 0, z);
    });

    return (
        <group ref={meshRef}>
            {/* Invisible Hit Sphere for Click interaction */}
            <mesh 
                onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
            >
                <sphereGeometry args={[5, 32, 32]} /> 
                <meshBasicMaterial transparent opacity={0.0} color="black" />
            </mesh>
            
            <Html center zIndexRange={[100, 0]} distanceFactor={15} style={{ pointerEvents: 'none' }}>
                <div style={{ 
                    transform: hovered ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ 
                        fontSize: '9rem', 
                        filter: `drop-shadow(0 0 25px ${skill.color}) drop-shadow(0 0 10px rgba(0,0,0,0.8))`,
                        lineHeight: 1
                    }}>
                        {skill.icon}
                    </div>
                </div>
            </Html>
            
            {hovered && (
                 <Html position={[0, 9, 0]} center zIndexRange={[100, 0]} distanceFactor={10}>
                    <div style={{ 
                        background: 'rgba(0,0,0,0.95)', 
                        color: 'white', 
                        padding: '12px 24px', 
                        borderRadius: '12px',
                        whiteSpace: 'nowrap',
                        fontSize: '3.5rem', 
                        fontWeight: '700',
                        pointerEvents: 'none',
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0 0 30px ${skill.color}`
                    }}>
                        {skill.name}
                    </div>
                 </Html>
            )}
        </group>
    );
};

// --- Skill Detail Modal (Reused) ---
const SolarSkillModal = ({ skill, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
        return () => { 
            document.body.style.overflow = 'unset'; 
            if (window.lenis) window.lenis.start();
        };
    }, []);

    if (!skill) return null;

    const modalContent = (
        <motion.div
            className="skill-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ 
                zIndex: 9999, 
                position: 'fixed'
            }} 
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

                <div style={{ background: '#3f3f46', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }} 
                        style={{ height: '100%', background: skill.color }}
                    />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', color: '#a1a1aa' }}>Proficiency</div>
            </motion.div>
        </motion.div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

// --- Main 3D Composition with Controls ---
const SolarSystemScene = ({ onPlanetSelect }) => {
    const controlsRef = useRef();

    const handleZoomIn = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyIn(1.2); 
            controlsRef.current.update();
        }
    };

    const handleZoomOut = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyOut(1.2); 
            controlsRef.current.update();
        }
    };

    return (
        <>
             {/* Controls Overlay */}
             <Html fullscreen style={{ pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', bottom: '30px', right: '30px', pointerEvents: 'auto', display: 'flex', gap: '10px' }}>
                    <button onClick={handleZoomIn} className="solar-zoom-btn" title="Zoom In">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button onClick={handleZoomOut} className="solar-zoom-btn" title="Zoom Out">
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            </Html>

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            
            <group rotation={[0, 0, 0]}> 
                <Sun />
                
                {skillOrbits.map((orbit, idx) => (
                    <React.Fragment key={idx}>
                        <OrbitRing radius={orbit.radius} />
                        {orbit.skills.map((skill, sIdx) => {
                            const angleStep = (2 * Math.PI) / orbit.skills.length;
                            const initialAngle = sIdx * angleStep;
                            return (
                                <Planet 
                                    key={skill.name} 
                                    skill={skill}
                                    distance={orbit.radius}
                                    speed={orbit.speed}
                                    direction={orbit.direction}
                                    initialAngle={initialAngle}
                                    onSelect={onPlanetSelect}
                                />
                            );
                        })}
                    </React.Fragment>
                ))}
            </group>

            <OrbitControls 
                ref={controlsRef}
                enablePan={false}
                enableZoom={false} // Manual buttons only
                minDistance={15}
                maxDistance={120}
                maxPolarAngle={Math.PI / 1.8} 
            />
        </>
    );
};

/* 
   UPDATED LAYOUT: 
   Using a Flex-column approach to strictly separate the Header from the 3D Canvas.
   This prevents the "solar element" from overlapping or clipping the text.
*/
const SolarSystemSkills = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false
    });

    return (
        <section id="skills" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Header Block: Now part of the document flow, not absolute */}
            <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem', textAlign: 'center', zIndex: 10 }}>
                <h2 className="section-title" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontSize: '3.5rem' }}>Skills & Technology</h2>
                <p style={{ color: '#a1a1aa', textShadow: '0 1px 4px rgba(0,0,0,0.8)', fontSize: '1.2rem', marginTop: '1rem' }}>
                    Interactive 3D Universe. Drag to rotate, Use buttons to zoom, Click a planet.
                </p>
            </div>

            {/* 3D Canvas Block: Sits BELOW the header */}
            <div ref={ref} style={{ width: '100%', height: '800px' }}>
                <Canvas 
                    frameloop={inView ? "always" : "never"}
                    camera={{ position: [0, 45, 35], fov: 45 }} 
                    dpr={[1, 2]} 
                    gl={{ powerPreference: "high-performance" }}
                >
                    <SolarSystemScene onPlanetSelect={setSelectedSkill} />
                </Canvas>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedSkill && <SolarSkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default SolarSystemSkills;
