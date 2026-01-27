import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faEye,
    faGlobe,
    faDesktop,
    faMobile,
    faTablet,
    faChartLine,
    faSpinner,
    faSync,
    faArrowLeft,
    faCalendarAlt,
    faMapMarkerAlt,
    faClock,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AnalyticsPage = ({ adminUser }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication required. Please login as admin.');
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/analytics/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setStats(data.stats);
            } else {
                setError(data.error || 'Failed to load analytics');
            }
        } catch (err) {
            setError('Unable to connect to server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if user is admin
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
            return;
        }
        fetchStats();
    }, [navigate]);

    const getDeviceIcon = (device) => {
        switch (device) {
            case 'Mobile': return faMobile;
            case 'Tablet': return faTablet;
            default: return faDesktop;
        }
    };

    const formatTimeAgo = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
        return `${Math.floor(seconds / 86400)} days ago`;
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="analytics-page">
            {/* Page Header */}
            <div className="analytics-page-header">
                <div className="analytics-header-content">
                    <button className="analytics-back-btn" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Portfolio</span>
                    </button>
                    <div className="analytics-title-section">
                        <div className="analytics-icon-wrapper">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <div>
                            <h1>Visitor Analytics</h1>
                            <p>Track and analyze your portfolio visitors</p>
                        </div>
                    </div>
                    <div className="analytics-header-actions">
                        <div className="admin-badge-large">
                            <FontAwesomeIcon icon={faShieldAlt} />
                            <span>Admin Access</span>
                        </div>
                        <button className="refresh-btn" onClick={fetchStats} disabled={loading}>
                            <FontAwesomeIcon icon={faSync} spin={loading} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="analytics-page-content">
                {loading && !stats ? (
                    <div className="analytics-loading-state">
                        <div className="loading-spinner-large">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </div>
                        <p>Loading analytics data...</p>
                    </div>
                ) : error ? (
                    <div className="analytics-error-state">
                        <div className="error-icon">⚠️</div>
                        <h3>Unable to Load Analytics</h3>
                        <p>{error}</p>
                        <button className="retry-btn" onClick={fetchStats}>
                            <FontAwesomeIcon icon={faSync} />
                            Try Again
                        </button>
                    </div>
                ) : stats ? (
                    <>
                        {/* Stats Overview Cards */}
                        <div className="analytics-stats-grid">
                            <div className="analytics-stat-card gradient-purple">
                                <div className="stat-card-icon">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <div className="stat-card-content">
                                    <span className="stat-card-value">{stats.visitors.total}</span>
                                    <span className="stat-card-label">Total Visitors</span>
                                </div>
                                <div className="stat-card-decoration"></div>
                            </div>

                            <div className="analytics-stat-card gradient-blue">
                                <div className="stat-card-icon">
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                                <div className="stat-card-content">
                                    <span className="stat-card-value">{stats.visitors.today}</span>
                                    <span className="stat-card-label">Today's Visitors</span>
                                </div>
                                <div className="stat-card-decoration"></div>
                            </div>

                            <div className="analytics-stat-card gradient-green">
                                <div className="stat-card-icon">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </div>
                                <div className="stat-card-content">
                                    <span className="stat-card-value">{stats.visitors.this_week}</span>
                                    <span className="stat-card-label">This Week</span>
                                </div>
                                <div className="stat-card-decoration"></div>
                            </div>

                            <div className="analytics-stat-card gradient-orange">
                                <div className="stat-card-icon">
                                    <FontAwesomeIcon icon={faGlobe} />
                                </div>
                                <div className="stat-card-content">
                                    <span className="stat-card-value">{stats.page_views.total}</span>
                                    <span className="stat-card-label">Page Views</span>
                                </div>
                                <div className="stat-card-decoration"></div>
                            </div>
                        </div>

                        {/* Detailed Stats Section */}
                        <div className="analytics-details-grid">
                            {/* Devices Card */}
                            <div className="analytics-detail-card">
                                <div className="detail-card-header">
                                    <FontAwesomeIcon icon={faDesktop} />
                                    <h3>Devices</h3>
                                </div>
                                <div className="detail-card-content">
                                    {Object.entries(stats.devices || {}).map(([device, count]) => {
                                        const total = Object.values(stats.devices).reduce((a, b) => a + b, 0);
                                        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                                        return (
                                            <div key={device} className="detail-item">
                                                <div className="detail-item-info">
                                                    <FontAwesomeIcon icon={getDeviceIcon(device)} />
                                                    <span className="detail-item-name">{device}</span>
                                                </div>
                                                <div className="detail-item-stats">
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill" 
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="detail-item-value">{count}</span>
                                                    <span className="detail-item-percent">{percentage}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Browsers Card */}
                            <div className="analytics-detail-card">
                                <div className="detail-card-header">
                                    <FontAwesomeIcon icon={faGlobe} />
                                    <h3>Browsers</h3>
                                </div>
                                <div className="detail-card-content">
                                    {Object.entries(stats.browsers || {}).map(([browser, count]) => {
                                        const total = Object.values(stats.browsers).reduce((a, b) => a + b, 0);
                                        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                                        return (
                                            <div key={browser} className="detail-item">
                                                <div className="detail-item-info">
                                                    <span className="browser-icon">{browser.charAt(0)}</span>
                                                    <span className="detail-item-name">{browser}</span>
                                                </div>
                                                <div className="detail-item-stats">
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill browser-fill" 
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="detail-item-value">{count}</span>
                                                    <span className="detail-item-percent">{percentage}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Countries Card */}
                            <div className="analytics-detail-card">
                                <div className="detail-card-header">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <h3>Top Countries</h3>
                                </div>
                                <div className="detail-card-content">
                                    {Object.entries(stats.countries || {}).slice(0, 6).map(([country, count]) => {
                                        const total = Object.values(stats.countries).reduce((a, b) => a + b, 0);
                                        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                                        return (
                                            <div key={country} className="detail-item">
                                                <div className="detail-item-info">
                                                    <span className="country-flag">🌍</span>
                                                    <span className="detail-item-name">{country}</span>
                                                </div>
                                                <div className="detail-item-stats">
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill country-fill" 
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="detail-item-value">{count}</span>
                                                    <span className="detail-item-percent">{percentage}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Recent Visits Section */}
                        <div className="analytics-recent-section">
                            <div className="recent-section-header">
                                <FontAwesomeIcon icon={faClock} />
                                <h3>Recent Visits</h3>
                            </div>
                            <div className="recent-visits-grid">
                                {(stats.recent_views || []).map((view, index) => (
                                    <div key={index} className="recent-visit-card">
                                        <div className="visit-card-icon">
                                            <FontAwesomeIcon icon={getDeviceIcon(view.device)} />
                                        </div>
                                        <div className="visit-card-content">
                                            <div className="visit-location">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                <span>{view.location?.city || 'Unknown'}, {view.location?.country || 'Unknown'}</span>
                                            </div>
                                            <div className="visit-page">
                                                <span className="page-label">Page:</span>
                                                <span className="page-value">{view.page || '/'}</span>
                                            </div>
                                            <div className="visit-meta">
                                                <span className="visit-device">{view.device || 'Unknown'}</span>
                                                <span className="visit-separator">•</span>
                                                <span className="visit-browser">{view.browser || 'Unknown'}</span>
                                            </div>
                                        </div>
                                        <div className="visit-card-time">
                                            <span className="time-ago">{formatTimeAgo(view.timestamp)}</span>
                                            <span className="time-exact">{formatDate(view.timestamp)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default AnalyticsPage;
