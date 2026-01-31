import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser, faLock, faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';
import '../styles.css';

// Backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    // Pre-fill default credentials for convenience
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password,
                    cf_token: turnstileToken
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Store token and expiry in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('authExpiry', Date.now() + (data.expiresIn * 1000));
                localStorage.setItem('adminUser', JSON.stringify(data.user));

                // Notify parent component
                onLogin(data.user);
                setShowSuccess(true);

                setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                    setUsername('');
                    setPassword('');
                }, 1500);
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Unable to connect to server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="login-modal-content"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {showSuccess ? (
                        <motion.div
                            className="login-success-view"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div style={{ fontSize: '3rem', color: '#4ade80', marginBottom: '1rem' }}>✓</div>
                            <h3>Welcome, Admin!</h3>
                            <p style={{ color: '#9ca3af' }}>Access granted. Token expires in 1 hour.</p>
                        </motion.div>
                    ) : (
                        <>
                            <button className="modal-close-btn" onClick={onClose}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>

                            <div className="modal-header">
                                <h3>🔐 Secure Admin Login</h3>
                                <p>Authentication required</p>
                            </div>

                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label><FontAwesomeIcon icon={faUser} /> Username</label>
                                    <input
                                        type="text"
                                        placeholder="Enter admin username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label><FontAwesomeIcon icon={faLock} /> Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter admin password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                
                                {/* INTEGRATION: Cloudflare Turnstile Widget */}
                                {process.env.REACT_APP_TURNSTILE_SITE_KEY && (
                                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                        <Turnstile 
                                            siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
                                            onSuccess={(token) => setTurnstileToken(token)}
                                            options={{ theme: 'dark', size: 'normal' }}
                                        />
                                    </div>
                                )}

                                {error && <p className="error-message">{error}</p>}

                                <button
                                    type="submit"
                                    className="submit-btn full-width"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faSignInAlt} />
                                            Login
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginModal;

