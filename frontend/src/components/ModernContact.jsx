import React, { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as faLinkedinBrand, faGithub as faGithubBrand, faTwitter as faTwitterBrand } from '@fortawesome/free-brands-svg-icons';

import { Turnstile } from '@marsidev/react-turnstile';
import { World } from './ui/Globe';

const ModernContact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');


  const socialLinks = [
    { icon: faLinkedinBrand, label: 'LinkedIn', link: 'https://linkedin.com/in/ankit-sahoo94' },
    { icon: faGithubBrand, label: 'GitHub', link: 'https://github.com/' },
    { icon: faTwitterBrand, label: 'Twitter', link: 'https://x.com/@AnkitSahoo94' },
  ];

  // Globe configuration
  const globeConfig = useMemo(() => ({
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }), []);

  const sampleArcs = useMemo(() => {
    const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
    return [
      { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: colors[0] },
      { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: colors[1] },
      { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: colors[2] },
      { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: colors[0] },
      { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: colors[1] },
      { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: colors[2] },
      { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: colors[0] },
      { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: colors[1] },
      { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[2] },
      { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: colors[0] },
      { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: colors[1] },
      { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: colors[2] },
      { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: colors[1] },
      { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: colors[2] },
      { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7, color: colors[0] },
      { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: colors[1] },
      { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[2] },
      { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: colors[0] },
      { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: colors[1] },
      { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: colors[2] },
      { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: colors[0] },
      { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: colors[1] },
      { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: colors[2] },
    ];
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ show: false, success: false, message: '' });



    // Validate Turnstile
    if (!turnstileToken) {
      setSubmitStatus({ show: true, success: false, message: 'Please complete the security check.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ show: true, success: true, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTurnstileToken('');

      } else {
        setSubmitStatus({ show: true, success: false, message: data.error || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitStatus({ show: true, success: false, message: 'Failed to connect. Please try again.' });
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 5000);
  };

  return (
    <motion.section 
      ref={ref} 
      id="contact" 
      className="contact-section-clean"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a project in mind or just want to say hi? Send me a message!
        </p>

        <div className="contact-with-globe">
          {/* Left Side - Contact Form & Info */}
          <div className="contact-main">
            <div className="contact-layout">
              {/* Left - Info & Socials */}
              <div className="contact-info-simple">
                <div className="contact-email-box">
                  <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                  <div>
                    <span className="email-label">Email me at</span>
                    <a href="mailto:ankit.sahoo@example.com" className="email-link">
                      ankit.sahoo@example.com
                    </a>
                  </div>
                </div>

                <div className="contact-socials">
                  <span className="socials-label">Or find me on</span>
                  <div className="social-icons-row">
                    {socialLinks.map((social) => (
                      <a 
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        title={social.label}
                      >
                        <FontAwesomeIcon icon={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <form id="contact-form" onSubmit={handleSubmit} className="contact-form-simple">
                {submitStatus.show && (
                  <div className={`form-status ${submitStatus.success ? 'success' : 'error'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <div className="form-row">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  required 
                />

                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                  rows={4}
                />



                <div className="turnstile-wrapper">
                  <Turnstile
                    siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setSubmitStatus({ show: true, success: false, message: 'Security check failed to load.' })}
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Globe */}
          <div className="contact-globe-container">
            <div className="globe-wrapper">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
            <div className="globe-caption">
              <span className="globe-caption-icon">🌍</span>
              <span>Available for opportunities worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ModernContact;

