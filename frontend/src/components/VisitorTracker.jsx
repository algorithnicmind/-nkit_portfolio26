import { useEffect, useRef } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * VisitorTracker Component
 * Automatically tracks page visits and sends data to backend
 * This component should be placed in App.js to track all page views
 */
const VisitorTracker = () => {
    const sessionStartRef = useRef(new Date().toISOString());
    const lastPageRef = useRef('');

    useEffect(() => {
        const trackPageView = async () => {
            const currentPage = window.location.pathname + window.location.hash;

            // Don't track same page twice in a row
            if (currentPage === lastPageRef.current) return;
            lastPageRef.current = currentPage;

            try {
                await fetch(`${API_BASE_URL}/api/analytics/track`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        page: currentPage,
                        referrer: document.referrer || 'Direct',
                        session_start: sessionStartRef.current
                    }),
                });
            } catch (error) {
                // Silently fail - analytics shouldn't break the site
                console.debug('Analytics tracking failed:', error);
            }
        };

        // Track initial page view
        trackPageView();

        // Track page changes (for SPA navigation)
        const handleNavigation = () => {
            setTimeout(trackPageView, 100); // Small delay to ensure location is updated
        };

        window.addEventListener('popstate', handleNavigation);

        // Also observe hash changes for section navigation
        const hashChangeHandler = () => {
            setTimeout(trackPageView, 100);
        };
        window.addEventListener('hashchange', hashChangeHandler);

        return () => {
            window.removeEventListener('popstate', handleNavigation);
            window.removeEventListener('hashchange', hashChangeHandler);
        };
    }, []);

    // This component doesn't render anything
    return null;
};

export default VisitorTracker;
