# Portfolio Project Setup Guide

This guide describes how to run the portfolio application, which consists of a Flask backend and a React frontend.

## Prerequisites

- **Python** (3.8 or higher)
- **Node.js** (16 or higher) and **npm**
- **MongoDB Atlas** connection string

## 1. Backend Setup

The backend handles authentication, chatbot, and portfolio data.

1. **Navigate to the project root directory.**

2. **Create a `.env` file** in the root directory (same level as this README). Add the following variables:

   ```env
   # Database Configuration
   MONGODB_CONNECTION_STRING=your_mongodb_connection_string_here

   # Security (Optional - Defaults available for dev)
   JWT_SECRET=your_super_secret_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

3. **Set up a Virtual Environment:**

   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

4. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Backend Server:**
   ```bash
   python backend_auth/chatbot.py
   ```
   The backend will start at `http://localhost:5000`.

## 2. Frontend Setup

The frontend is a React application located in the `frontend` folder.

1. **Open a new terminal** and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   _Note: If you encounter legacy dependency issues, try `npm install --legacy-peer-deps`._

3. **Start the Development Server:**
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`.

## Troubleshooting

- **MongoDB Error**: If the backend fails to connect, ensure your network IP is whitelisted in MongoDB Atlas and the `MONGODB_CONNECTION_STRING` in `.env` is correct.
- **CORS Issues**: The backend is configured to accept requests from `http://localhost:3000`. Ensure the frontend is running on that port.
