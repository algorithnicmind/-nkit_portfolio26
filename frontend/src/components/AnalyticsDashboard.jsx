import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faEye,
    faGlobe,
    faDesktop,
    faMobile,
    faTablet,
    faChartLine,
    faTimes,
    faSpinner,
    faSync
} from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AnalyticsDashboard = ({ isOpen, onClose }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken');
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
        if (isOpen) {
            fetchStats();
        }
    }, [isOpen]);

    if (!isOpen) return null;

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

    return (
        <div className="analytics-overlay" onClick={onClose}>
            <div className="analytics-dashboard" onClick={e => e.stopPropagation()}>
                <div className="analytics-header">
                    <div className="analytics-title">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>Visitor Analytics</span>
                    </div>
                    <div className="analytics-actions">
                        <button className="analytics-refresh" onClick={fetchStats} title="Refresh">
                            <FontAwesomeIcon icon={faSync} spin={loading} />
                        </button>
                        <button className="analytics-close" onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                <div className="analytics-content">
                    {loading && !stats ? (
                        <div className="analytics-loading">
                            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                            <p>Loading analytics...</p>
                        </div>
                    ) : error ? (
                        <div className="analytics-error">
                            <p>{error}</p>
                            <button onClick={fetchStats}>Try Again</button>
                        </div>
                    ) : stats ? (
                        <>
                            {/* Stats Cards */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon visitors">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.visitors.total}</span>
                                        <span className="stat-label">Total Visitors</span>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon today">
                                        <FontAwesomeIcon icon={faEye} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.visitors.today}</span>
                                        <span className="stat-label">Today</span>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon week">
                                        <FontAwesomeIcon icon={faChartLine} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.visitors.this_week}</span>
                                        <span className="stat-label">This Week</span>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon views">
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.page_views.total}</span>
                                        <span className="stat-label">Page Views</span>
                                    </div>
                                </div>
                            </div>

                            {/* Device & Browser Stats */}
                            <div className="stats-row">
                                <div className="stats-section">
                                    <h4>Devices</h4>
                                    <div className="stats-list">
                                        {Object.entries(stats.devices || {}).map(([device, count]) => (
                                            <div key={device} className="stats-item">
                                                <FontAwesomeIcon icon={getDeviceIcon(device)} />
                                                <span className="stats-item-label">{device}</span>
                                                <span className="stats-item-value">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="stats-section">
                                    <h4>Browsers</h4>
                                    <div className="stats-list">
                                        {Object.entries(stats.browsers || {}).map(([browser, count]) => (
                                            <div key={browser} className="stats-item">
                                                <span className="stats-item-label">{browser}</span>
                                                <span className="stats-item-value">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="stats-section">
                                    <h4>Countries</h4>
                                    <div className="stats-list">
                                        {Object.entries(stats.countries || {}).slice(0, 5).map(([country, count]) => (
                                            <div key={country} className="stats-item">
                                                <span className="stats-item-label">{country}</span>
                                                <span className="stats-item-value">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Visits */}
                            <div className="recent-visits">
                                <h4>Recent Visits</h4>
                                <div className="visits-list">
                                    {(stats.recent_views || []).map((view, index) => (
                                        <div key={index} className="visit-item">
                                            <div className="visit-info">
                                                <FontAwesomeIcon icon={getDeviceIcon(view.device)} />
                                                <span className="visit-location">
                                                    {view.location?.city}, {view.location?.country}
                                                </span>
                                                <span className="visit-page">{view.page}</span>
                                            </div>
                                            <span className="visit-time">{formatTimeAgo(view.timestamp)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
