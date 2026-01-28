# 🚀 Getting Started Guide

This guide details how to set up, install, and run the project locally.

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

1.  **Node.js** (v16 or higher) & **npm**.
2.  **Python** (v3.8 or higher).
3.  **MongoDB** (Local or Atlas URI).
4.  **Git**.

## 📥 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd -nkit_portfolio26
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

_Note: This installs React, Framer Motion, Three.js, and other UI libraries._

### 3. Backend Setup

Navigate to the backend directory and set up the Python environment:

```bash
cd ../backend_auth
# Optional: Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r ../requirements.txt
```

_(Note: If `requirements.txt` is in the root, run pip from there)._

## ⚙️ Configuration (.env)

Create a `.env` file in the root directory (or `backend_auth` depending on setup) with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/portfolio_db

# Security
SECRET_KEY=your_super_secret_jwt_key
REACT_APP_TURNSTILE_SITE_KEY=your_cloudflare_site_key
TURNSTILE_SECRET_KEY=your_cloudflare_secret_key

# Frontend Config (if needed)
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Running the Project

### Start Backend (API Server)

Run the Flask server. It will listen on **Port 5000**.

```bash
# In Root or backend_auth directory
python backend_auth/chatbot.py
```

_You should see logs indicating "Authentication module loaded" and "Running on http://0.0.0.0:5000"._

### Start Frontend (Client)

Run the React development server. It will open on **Port 3000**.

```bash
# In frontend directory
npm start
```

## 🌐 Accessing the App

Open your browser and navigate to:
**http://localhost:3000**

- **API URL**: http://localhost:5000
- **Admin Login**: http://localhost:3000 (Click the Key/Lock icon in the Floating Dock).

---

_Next: Explore the [Project Structure](03_PROJECT_STRUCTURE.md)._
