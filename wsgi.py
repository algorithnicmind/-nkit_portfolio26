import sys
import os

# Add backend_auth to path to allow imports of modules inside it (like auth.py, analytics.py)
# when they are imported by chatbot.py using 'import auth' style.
# This mimics the behavior of running 'python backend_auth/chatbot.py' from the root.
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend_auth'))

from backend_auth.chatbot import app

if __name__ == "__main__":
    app.run()
