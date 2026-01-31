import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ['FLASK_SKIP_DOTENV'] = '1'

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables with UTF-16 encoding for Windows
load_dotenv()

app = Flask(__name__)
# INTEGRATION: Cloudflare Security - Handle Proxy Headers
from werkzeug.middleware.proxy_fix import ProxyFix
app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)
# Enable CORS for React frontend (allow localhost:3000)
# Enable CORS for React frontend (allow localhost and production domain)
allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
frontend_url = os.getenv('FRONTEND_URL')
if frontend_url:
    allowed_origins.append(frontend_url)
    # Handle potentially missing or extra trailing slashes just in case
    if frontend_url.endswith('/'):
        allowed_origins.append(frontend_url[:-1])
    else:
        allowed_origins.append(frontend_url + '/')

CORS(app, resources={r"/*": {"origins": allowed_origins}})

# Import portfolio routes
from database_architecture.portfolio_api import register_portfolio_routes
from database_architecture.connection import get_database

# Register portfolio API routes
# Initialize database connection for Q&As
try:
    db = get_database()
    qa_collection = db.custom_qa
    print("✅ Q&A collection initialized - Chatbot is now 100% database-driven!")
except Exception as e:
    print(f"❌ Error: Could not connect to MongoDB: {e}")
    qa_collection = None
    db = None

# Import and register authentication routes
limiter = None
try:
    from auth import register_auth_routes, token_required
    from auth import register_auth_routes, token_required
    # Pass db (even if None) to auth routes so fallback works
    limiter = register_auth_routes(app, db)
    print("✅ Authentication module loaded - JWT & Rate Limiting enabled!")
    
    if db is None:
        print("⚠️  Warning: Running in Database-less mode (Fallback Auth Only)")
        def token_required(f):
            return f
except Exception as e:
    print(f"⚠️ Auth module not loaded: {e}")
    def token_required(f):
        return f

# Register portfolio API routes (with rate limiting if available)
register_portfolio_routes(app, limiter)

# Import and register analytics routes
try:
    from analytics import register_analytics_routes
    if db is not None:
        register_analytics_routes(app, db)
except Exception as e:
    print(f"⚠️ Analytics module not loaded: {e}")



# Default response when no match is found
DEFAULT_RESPONSE = "I'm not sure about that specific question, but I can tell you about Ankit's skills, projects, education, or how to contact him. What would you like to know?"

def get_response_from_database(user_message):
    """
    Fetch response from MongoDB based on user message.
    Uses keyword matching to find the best response.
    """
    if qa_collection is None:
        return None
    
    try:
        lower_message = user_message.lower().strip()
        
        # Get all Q&As from database
        all_qas = list(qa_collection.find({}))
        
        if not all_qas:
            return None
        
        best_match = None
        best_score = 0
        
        for qa in all_qas:
            question_text = qa.get('question', '').lower()
            answer = qa.get('answer', '')
            
            # Exact phrase match (highest priority)
            if question_text in lower_message:
                return answer
            
            # Check for keyword matches
            question_words = [w for w in question_text.split() if len(w) > 2]
            message_words = lower_message.split()
            
            # Count matching keywords
            matching_count = sum(1 for w in question_words if w in lower_message)
            
            # Calculate match score
            if question_words:
                score = matching_count / len(question_words)
                if score > best_score:
                    best_score = score
                    best_match = answer
        
        # Return best match if score is high enough (at least 50% keywords match)
        if best_score >= 0.5:
            return best_match
        
        return None
        
    except Exception as e:
        print(f"Error fetching from database: {e}")
        return None

def generate_chatbot_response(user_message):
    """Generate response based on user message - 100% database-driven"""
    
    # Try to get response from database
    db_response = get_response_from_database(user_message)
    
    if db_response:
        return db_response
    
    # Return default response if no match found
    return DEFAULT_RESPONSE

@app.route('/')
def home():
    """Serve the React frontend"""
    return render_template('index.html')

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Chatbot API endpoint"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'success': False,
                'error': 'Message is required'
            }), 400
        
        # Generate response from database
        bot_response = generate_chatbot_response(user_message)
        
        return jsonify({
            'success': True,
            'response': bot_response,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============ Q&A Management APIs ============

@app.route('/api/chatbot/qa', methods=['GET'])
def get_all_qa():
    """Get all Q&A pairs from database"""
    try:
        if qa_collection is None:
            return jsonify({
                'success': False,
                'error': 'Database not connected'
            }), 500
        
        qas = list(qa_collection.find({}))
        # Convert ObjectId to string for JSON serialization
        for qa in qas:
            qa['_id'] = str(qa['_id'])
        
        return jsonify({
            'success': True,
            'data': qas,
            'count': len(qas)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/qa', methods=['POST'])
@token_required
def add_qa():
    """Add a new Q&A pair (Admin only - requires authentication)"""
    try:
        if qa_collection is None:
            return jsonify({
                'success': False,
                'error': 'Database not connected'
            }), 500
        
        data = request.get_json()
        question = data.get('question', '').strip()
        answer = data.get('answer', '').strip()
        
        if not question or not answer:
            return jsonify({
                'success': False,
                'error': 'Both question and answer are required'
            }), 400
        
        # Check if similar question already exists
        existing = qa_collection.find_one({
            'question': {'$regex': f"^{question}$", '$options': 'i'}
        })
        if existing:
            return jsonify({
                'success': False,
                'error': 'A similar question already exists'
            }), 409
        
        # Insert new Q&A
        new_qa = {
            'question': question,
            'answer': answer,
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat(),
            'is_default': False
        }
        
        result = qa_collection.insert_one(new_qa)
        new_qa['_id'] = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'message': 'Q&A added successfully',
            'data': new_qa
        }), 201
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/qa/<qa_id>', methods=['DELETE'])
@token_required
def delete_qa(qa_id):
    """Delete a Q&A pair (Admin only - requires authentication)"""
    try:
        if qa_collection is None:
            return jsonify({
                'success': False,
                'error': 'Database not connected'
            }), 500
        
        from bson import ObjectId
        
        result = qa_collection.delete_one({'_id': ObjectId(qa_id)})
        
        if result.deleted_count == 0:
            return jsonify({
                'success': False,
                'error': 'Q&A not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Q&A deleted successfully'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/qa/<qa_id>', methods=['PUT'])
@token_required
def update_qa(qa_id):
    """Update an existing Q&A pair (Admin only - requires authentication)"""
    try:
        if qa_collection is None:
            return jsonify({
                'success': False,
                'error': 'Database not connected'
            }), 500
        
        from bson import ObjectId
        
        data = request.get_json()
        question = data.get('question', '').strip()
        answer = data.get('answer', '').strip()
        
        if not question and not answer:
            return jsonify({
                'success': False,
                'error': 'At least question or answer must be provided'
            }), 400
        
        update_data = {'updated_at': datetime.now().isoformat()}
        if question:
            update_data['question'] = question
        if answer:
            update_data['answer'] = answer
        
        result = qa_collection.update_one(
            {'_id': ObjectId(qa_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({
                'success': False,
                'error': 'Q&A not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Q&A updated successfully'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


