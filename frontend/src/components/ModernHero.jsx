
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt as faFileSolid, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const phrases = [
  'Student & Tech Developer',
  'Full Stack Enthusiast',
  'Web Designer',
  'Competitive Programmer',
];

const ModernHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const typingIndexRef = useRef(0);
  const phraseIndexRef = useRef(0);
  const isDeletingRef = useRef(false);



  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let timer;
    const typeSpeed = 80; // ms per character
    const backSpeed = 50; // ms per character backspace
    const pauseBeforeDelete = 1500; // ms

    const tick = () => {
      const currentPhrase = phrases[phraseIndexRef.current % phrases.length];
      if (!isDeletingRef.current) {
        // typing forward
        const next = currentPhrase.slice(0, typingIndexRef.current + 1);
        setSubtitle(next);
        typingIndexRef.current += 1;
        if (next === currentPhrase) {
          // pause, then start deleting
          timer = setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, pauseBeforeDelete);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
      } else {
        // deleting
        const next = currentPhrase.slice(0, typingIndexRef.current - 1);
        setSubtitle(next);
        typingIndexRef.current -= 1;
        if (next.length === 0) {
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          timer = setTimeout(tick, typeSpeed);
          return;
        }
        timer = setTimeout(tick, backSpeed);
      }
    };

    timer = setTimeout(tick, 400); // small initial delay
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(79, 70, 229, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const socialVariants = {
    hover: {
      scale: 1.15,
      rotate: 360,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      id="hero"
      className="modern-hero-section"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Content */}
      <div className="hero-content-container">
        <div className="container">
          <div className="hero-content">
            {/* Text Content */}
            <motion.div className="hero-text" variants={itemVariants}>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Hi, I'm{' '}
                <motion.span
                  className="highlight-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Ankit Sahoo
                </motion.span>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                aria-label={subtitle}
              >
                {subtitle}
                <span style={{ display: 'inline-block', width: '1ch' }}>|</span>
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Passionate about creating innovative digital solutions and exploring the world of technology.
                Currently pursuing B.Tech in Computer Science and Engineering.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.a
                  href={process.env.PUBLIC_URL + '/Ankit_Resume (1).pdf'}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FontAwesomeIcon icon={faFileSolid} />
                  Download Resume
                </motion.a>

                <motion.a
                  href="#about"
                  className="btn btn-secondary"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                  Learn More
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="hero-social"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <motion.a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/ankit-sahoo94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </motion.a>
                <motion.a
                  href="https://x.com/@AnkitSahoo94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </motion.a>
                <motion.a
                  href="https://instagram.com/ankitsahoo94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ModernHero;
