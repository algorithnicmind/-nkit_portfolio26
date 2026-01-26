import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as faLinkedinBrand, faGithub as faGithubBrand, faTwitter as faTwitterBrand } from '@fortawesome/free-brands-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ show: false, success: false, message: '' });

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
                siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY || "0x4AAAAAACMptg7r5fLAH-Dn"}
                onSuccess={(token) => setTurnstileToken(token)}
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
    </motion.section>
  );
};

export default ModernContact;
