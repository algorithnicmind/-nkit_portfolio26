import os
import requests
from flask import request, jsonify
from datetime import datetime
from database_architecture.portfolio_service import PortfolioService

# Cloudflare Turnstile Secret Key
# ⚠️ REPLACE THIS with your actual Secret Key from Cloudflare Dashboard (e.g. 0x4AAAAAA...)
# Currently using Cloudflare's Global Test Secret Key
TURNSTILE_SECRET_KEY = os.getenv('TURNSTILE_SECRET_KEY', '0x4AAAAAACMptnlHsVziby9LKylCxtM6qck')

def register_portfolio_routes(app, limiter=None):
    """Register contact form API routes with the Flask app"""

    def contact():
        """Handle contact form submissions"""
        try:
            data = request.get_json()
            
            # === Cloudflare Turnstile Verification ===
            token = data.get('turnstileToken')
            if not token:
                return jsonify({'success': False, 'error': 'Security check failed. Please refresh and try again.'}), 400
            
            # Verify with Cloudflare
            verify_response = requests.post(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                data={
                    'secret': TURNSTILE_SECRET_KEY,
                    'response': token,
                    'remoteip': request.remote_addr
                }
            )
            verify_result = verify_response.json()
            
            if not verify_result.get('success'):
                # Log the error code for debugging
                error_codes = verify_result.get('error-codes', [])
                print(f"⚠️ Turnstile verification failed: {error_codes}")
                return jsonify({'success': False, 'error': 'Security check failed. Please try again.'}), 400
            
            # === Spam Keyword Filter (Extra Layer) ===
            message_content = (data.get('message', '') + data.get('subject', '')).lower()
            spam_keywords = ['buy now', 'click here', 'casino', 'lottery', 'viagra', 'cryptocurrency', 'investment', 'profit']
            if any(keyword in message_content for keyword in spam_keywords):
                print(f"⚠️ Bot blocked: Spam keyword detected - {request.remote_addr}")
                # Silent failure (fake success)
                return jsonify({'success': True, 'message': 'Message sent successfully'})

            # === Save Submission ===
            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            subject = data.get('subject', '').strip()
            message = data.get('message', '').strip()

            if not all([name, email, message]):
                return jsonify({
                    'success': False,
                    'error': 'Name, email, and message are required'
                }), 400

            # Save contact submission using service layer
            result = PortfolioService.submit_contact_form(name, email, subject, message)
            return jsonify(result)

        except Exception as e:
            print(f"Error in contact form: {e}")
            return jsonify({
                'success': False,
                'error': 'Internal server error'
            }), 500

    # Apply rate limiting if available
    contact_view = contact
    if limiter:
        # Strict limit for contact form: 5 per hour per IP (relaxed slightly for Turnstile)
        contact_view = limiter.limit("5 per hour")(contact)
    
    app.add_url_rule('/api/contact', view_func=contact_view, methods=['POST'])

    @app.route('/api/soft-posts', methods=['GET'])
    def get_soft_posts():
        """Get all soft posts"""
        result = PortfolioService.get_soft_posts()
        return jsonify(result)

    @app.route('/api/soft-posts', methods=['POST'])
    def create_soft_post():
        """Create a new soft post"""
        try:
            data = request.get_json()
            category = data.get('category')
            caption = data.get('caption')
            media_url = data.get('mediaUrl')
            media_type = data.get('mediaType')

            if not category or not caption:
                 return jsonify({'success': False, 'error': 'Category and Caption are required'}), 400

            result = PortfolioService.create_soft_post(category, caption, media_url, media_type)
            return jsonify(result)
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/upload', methods=['POST'])
    def upload_file():
        """Handle file upload"""
        try:
            if 'file' not in request.files:
                return jsonify({'success': False, 'error': 'No file part'}), 400
            
            file = request.files['file']
            if file.filename == '':
                return jsonify({'success': False, 'error': 'No selected file'}), 400

            if file:
                import os
                from werkzeug.utils import secure_filename
                
                filename = secure_filename(file.filename)
                # Save to frontend/public/uploads so React can serve it
                # Assuming this file is in database_architecture/portfolio_api.py
                # Root is two levels up
                import sys
                
                # Setup upload folder path
                # current: database_architecture/portfolio_api.py -> parent: root -> frontend -> public -> uploads
                base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                upload_folder = os.path.join(base_dir, 'frontend', 'public', 'uploads')
                
                if not os.path.exists(upload_folder):
                    os.makedirs(upload_folder)

                # Add timestamp to filename to prevent collisions
                timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                unique_filename = f"{timestamp}_{filename}"
                file_path = os.path.join(upload_folder, unique_filename)
                
                file.save(file_path)
                
                # Return relative path for frontend
                return jsonify({
                    'success': True, 
                    'filePath': f'/uploads/{unique_filename}'
                })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'service': 'Portfolio Backend API'
        })
