"""
Visitor Analytics Module
Tracks all visitors to the portfolio without requiring login
Stores: IP, location, device, browser, pages visited, referrer, time spent
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from datetime import datetime, timedelta
from flask import request
import hashlib
import json

# Try to import requests for IP geolocation
try:
    import requests as http_requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

def get_client_ip():
    """Get the real client IP address"""
    # Check for forwarded headers (behind proxy/load balancer)
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    elif request.headers.get('X-Real-IP'):
        return request.headers.get('X-Real-IP')
    else:
        return request.remote_addr

def get_location_from_ip(ip_address):
    """Get location info from IP address using free API"""
    if not HAS_REQUESTS or ip_address in ['127.0.0.1', 'localhost', '::1']:
        return {
            'city': 'Local',
            'region': 'Local',
            'country': 'Local',
            'country_code': 'LC'
        }
    
    try:
        # Using ip-api.com (free, no API key needed)
        response = http_requests.get(
            f'http://ip-api.com/json/{ip_address}',
            timeout=2
        )
        data = response.json()
        
        if data.get('status') == 'success':
            return {
                'city': data.get('city', 'Unknown'),
                'region': data.get('regionName', 'Unknown'),
                'country': data.get('country', 'Unknown'),
                'country_code': data.get('countryCode', 'UN')
            }
    except Exception as e:
        print(f"Geolocation error: {e}")
    
    return {
        'city': 'Unknown',
        'region': 'Unknown',
        'country': 'Unknown',
        'country_code': 'UN'
    }

def parse_user_agent(user_agent_string):
    """Parse user agent string to get device and browser info"""
    ua = user_agent_string.lower() if user_agent_string else ''
    
    # Detect device type
    if 'mobile' in ua or 'android' in ua or 'iphone' in ua:
        device = 'Mobile'
    elif 'tablet' in ua or 'ipad' in ua:
        device = 'Tablet'
    else:
        device = 'Desktop'
    
    # Detect browser
    if 'edg' in ua:
        browser = 'Edge'
    elif 'chrome' in ua and 'chromium' not in ua:
        browser = 'Chrome'
    elif 'firefox' in ua:
        browser = 'Firefox'
    elif 'safari' in ua and 'chrome' not in ua:
        browser = 'Safari'
    elif 'opera' in ua or 'opr' in ua:
        browser = 'Opera'
    else:
        browser = 'Other'
    
    # Detect OS
    if 'windows' in ua:
        os_name = 'Windows'
    elif 'mac' in ua:
        os_name = 'macOS'
    elif 'linux' in ua:
        os_name = 'Linux'
    elif 'android' in ua:
        os_name = 'Android'
    elif 'iphone' in ua or 'ipad' in ua:
        os_name = 'iOS'
    else:
        os_name = 'Other'
    
    return {
        'device': device,
        'browser': browser,
        'os': os_name,
        'raw': user_agent_string[:200] if user_agent_string else ''
    }

def generate_visitor_id(ip, user_agent):
    """Generate a unique but anonymous visitor ID"""
    data = f"{ip}:{user_agent}"
    return hashlib.sha256(data.encode()).hexdigest()[:16]

def register_analytics_routes(app, db):
    """Register all analytics-related routes"""
    from auth import token_required
    
    visitors_collection = db.visitors
    page_views_collection = db.page_views
    
    @app.route('/api/analytics/track', methods=['POST'])
    def track_visit():
        """Track a page visit (called from frontend)"""
        try:
            data = request.get_json() or {}
            
            ip = get_client_ip()
            user_agent = request.headers.get('User-Agent', '')
            visitor_id = generate_visitor_id(ip, user_agent)
            
            # Parse user agent
            ua_info = parse_user_agent(user_agent)
            
            # Get location (async would be better but keeping simple)
            location = get_location_from_ip(ip)
            
            # Prepare visit data
            visit_data = {
                'visitor_id': visitor_id,
                'ip': ip,
                'location': location,
                'device': ua_info['device'],
                'browser': ua_info['browser'],
                'os': ua_info['os'],
                'page': data.get('page', '/'),
                'referrer': data.get('referrer', request.headers.get('Referer', 'Direct')),
                'timestamp': datetime.now().isoformat(),
                'session_start': data.get('session_start', datetime.now().isoformat())
            }
            
            # Record page view
            page_views_collection.insert_one(visit_data)
            
            # Update or create visitor record
            existing_visitor = visitors_collection.find_one({'visitor_id': visitor_id})
            
            if existing_visitor:
                # Update existing visitor
                visitors_collection.update_one(
                    {'visitor_id': visitor_id},
                    {
                        '$set': {
                            'last_visit': datetime.now().isoformat(),
                            'location': location
                        },
                        '$inc': {'visit_count': 1},
                        '$addToSet': {'pages_visited': data.get('page', '/')}
                    }
                )
            else:
                # Create new visitor
                new_visitor = {
                    'visitor_id': visitor_id,
                    'ip': ip,
                    'location': location,
                    'device': ua_info['device'],
                    'browser': ua_info['browser'],
                    'os': ua_info['os'],
                    'first_visit': datetime.now().isoformat(),
                    'last_visit': datetime.now().isoformat(),
                    'visit_count': 1,
                    'pages_visited': [data.get('page', '/')]
                }
                visitors_collection.insert_one(new_visitor)
            
            return {'success': True, 'visitor_id': visitor_id}
        
        except Exception as e:
            print(f"Analytics tracking error: {e}")
            return {'success': False, 'error': str(e)}, 500
    
    @app.route('/api/analytics/visitors', methods=['GET'])
    @token_required
    def get_visitors():
        """Get visitor list (admin only)"""
        try:
            # Get query params
            days = int(request.args.get('days', 7))
            limit = int(request.args.get('limit', 50))
            
            # Calculate date range
            start_date = (datetime.now() - timedelta(days=days)).isoformat()
            
            # Get recent visitors
            visitors = list(visitors_collection.find(
                {'last_visit': {'$gte': start_date}},
                {'_id': 0}  # Exclude MongoDB _id
            ).sort('last_visit', -1).limit(limit))
            
            return {
                'success': True,
                'count': len(visitors),
                'visitors': visitors
            }
        
        except Exception as e:
            return {'success': False, 'error': str(e)}, 500
    
    @app.route('/api/analytics/stats', methods=['GET'])
    @token_required
    def get_analytics_stats():
        """Get analytics statistics (admin only)"""
        try:
            now = datetime.now()
            today_start = now.replace(hour=0, minute=0, second=0).isoformat()
            week_start = (now - timedelta(days=7)).isoformat()
            month_start = (now - timedelta(days=30)).isoformat()
            
            # Count visitors
            total_visitors = visitors_collection.count_documents({})
            today_visitors = visitors_collection.count_documents({
                'last_visit': {'$gte': today_start}
            })
            week_visitors = visitors_collection.count_documents({
                'last_visit': {'$gte': week_start}
            })
            month_visitors = visitors_collection.count_documents({
                'last_visit': {'$gte': month_start}
            })
            
            # Count page views
            total_views = page_views_collection.count_documents({})
            today_views = page_views_collection.count_documents({
                'timestamp': {'$gte': today_start}
            })
            week_views = page_views_collection.count_documents({
                'timestamp': {'$gte': week_start}
            })
            
            # Device breakdown
            device_stats = list(visitors_collection.aggregate([
                {'$group': {'_id': '$device', 'count': {'$sum': 1}}}
            ]))
            
            # Browser breakdown  
            browser_stats = list(visitors_collection.aggregate([
                {'$group': {'_id': '$browser', 'count': {'$sum': 1}}}
            ]))
            
            # Top countries
            country_stats = list(visitors_collection.aggregate([
                {'$group': {'_id': '$location.country', 'count': {'$sum': 1}}},
                {'$sort': {'count': -1}},
                {'$limit': 10}
            ]))
            
            # Recent page views (last 10)
            recent_views = list(page_views_collection.find(
                {},
                {'_id': 0, 'ip': 0}  # Don't expose IP
            ).sort('timestamp', -1).limit(10))
            
            return {
                'success': True,
                'stats': {
                    'visitors': {
                        'total': total_visitors,
                        'today': today_visitors,
                        'this_week': week_visitors,
                        'this_month': month_visitors
                    },
                    'page_views': {
                        'total': total_views,
                        'today': today_views,
                        'this_week': week_views
                    },
                    'devices': {item['_id']: item['count'] for item in device_stats},
                    'browsers': {item['_id']: item['count'] for item in browser_stats},
                    'countries': {item['_id']: item['count'] for item in country_stats},
                    'recent_views': recent_views
                }
            }
        
        except Exception as e:
            return {'success': False, 'error': str(e)}, 500
    
    print("✅ Analytics module loaded - Visitor tracking enabled!")
    return True
