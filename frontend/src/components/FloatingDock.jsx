import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faCode,
    faProjectDiagram,
    faEnvelope,
    faHeart,
    faLock,
    faComments,
    faSignOutAlt,
    faChartLine,
    faBars
} from '@fortawesome/free-solid-svg-icons';

const FloatingDock = ({ toggleChatbot, toggleLogin, adminUser, onLogout, onOpenAnalytics }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const navItems = [
        { id: 'hero', icon: faHome, label: 'Home', type: 'section' },
        { id: 'about', icon: faUser, label: 'About', type: 'section' },
        { id: 'skills', icon: faCode, label: 'Skills', type: 'section' },
        { id: 'projects', icon: faProjectDiagram, label: 'Projects', type: 'section' },
        { id: 'contact', icon: faEnvelope, label: 'Contact', type: 'section' },
        { id: 'softs', icon: faHeart, label: 'Softs', type: 'link', path: '/softs' },
    ];

    const actionItems = adminUser
        ? [
            { id: 'analytics', icon: faChartLine, label: 'Analytics', action: onOpenAnalytics },
            { id: 'logout', icon: faSignOutAlt, label: 'Logout', action: onLogout },
            { id: 'chatbot', icon: faComments, label: 'Chat', action: toggleChatbot },
        ]
        : [
            { id: 'login', icon: faLock, label: 'Admin', action: toggleLogin },
            { id: 'chatbot', icon: faComments, label: 'Chat', action: toggleChatbot },
        ];

    const allItems = [...navItems, { type: 'separator' }, ...actionItems];

    return (
        <>
            {/* Desktop Dock */}
            <DesktopDock 
                items={allItems} 
                handleNavigation={handleNavigation} 
                adminUser={adminUser}
            />
            
            {/* Mobile Dock */}
            <MobileDock 
                items={allItems} 
                handleNavigation={handleNavigation}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
        </>
    );
};

const DesktopDock = ({ items, handleNavigation, adminUser }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            className="floating-dock-desktop"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            {adminUser && (
                <div className="dock-admin-badge">Admin</div>
            )}
            <div className="dock-items-container">
                {items.map((item, index) => {
                    if (item.type === 'separator') {
                        return <div key="separator" className="dock-separator" />;
                    }
                    return (
                        <DockIcon
                            key={item.id}
                            item={item}
                            mouseX={mouseX}
                            handleNavigation={handleNavigation}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

const DockIcon = ({ item, mouseX, handleNavigation }) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const iconSizeSync = useTransform(distance, [-150, 0, 150], [18, 28, 18]);
    const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const content = (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className="dock-icon"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 5, x: '-50%' }}
                        className="dock-tooltip-animated"
                    >
                        {item.label}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div style={{ fontSize: iconSize }} className="dock-icon-inner">
                <FontAwesomeIcon icon={item.icon} />
            </motion.div>
        </motion.div>
    );

    if (item.type === 'link') {
        return <Link to={item.path}>{content}</Link>;
    }

    if (item.type === 'section') {
        return (
            <a href={`#${item.id}`} onClick={(e) => handleNavigation(e, item.id)}>
                {content}
            </a>
        );
    }

    // Action button
    return (
        <button onClick={item.action} className="dock-action-btn">
            {content}
        </button>
    );
};

const MobileDock = ({ items, handleNavigation, mobileOpen, setMobileOpen }) => {
    return (
        <div className="floating-dock-mobile">
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-dock-menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {items.filter(i => i.type !== 'separator').map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: idx * 0.03 }}
                            >
                                {item.type === 'link' ? (
                                    <Link to={item.path} className="mobile-dock-item" onClick={() => setMobileOpen(false)}>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </Link>
                                ) : item.type === 'section' ? (
                                    <a 
                                        href={`#${item.id}`} 
                                        className="mobile-dock-item"
                                        onClick={(e) => { handleNavigation(e, item.id); setMobileOpen(false); }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                    </a>
                                ) : (
                                    <button 
                                        className="mobile-dock-item"
                                        onClick={() => { item.action(); setMobileOpen(false); }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button className="mobile-dock-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
    );
};

export default FloatingDock;
