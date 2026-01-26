# How to Run the Project

This project consists of a React frontend and a Python/Flask backend. You need to run both simultaneously for the full experience.

## Prerequisites

- **Node.js** (v16+ recommended)
- **Python** (v3.8+ recommended)
- **MongoDB** (Atlas or local) - _Optional for basic usage, required for Chatbot/Auth_

## 1. Setup Environment Variables

Ensure you have a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection (Required for Chatbot & Admin Panel)
MONGODB_CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Authentication (Optional - defaults provided in code)
JWT_SECRET=your_super_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

> **Note:** If you don't connect a database, the app will run in "Database-less mode" with limited functionality (fallback auth only).

## 2. Start the Backend (API & Chatbot)

The backend runs on port `5000`.

1. Open a terminal in the root directory.
2. Create/Activate a virtual environment (optional but recommended):

   ```bash
   # Windows
   python -m venv backend_auth/venv
   backend_auth\venv\Scripts\activate

   # Mac/Linux
   python3 -m venv backend_auth/venv
   source backend_auth/venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python backend_auth/chatbot.py
   ```
   You should see: `Running on http://0.0.0.0:5000`

## 3. Start the Frontend (React App)

The frontend runs on port `3000`.

1. Open a **new** terminal.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies (first time only):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   This will automatically open `http://localhost:3000` in your browser.

## Default Admin Credentials

If you haven't set up a database user, use these fallback credentials to access the Admin Panel:

- **Username:** `admin`
- **Password:** `admin123`

## Troubleshooting

- **Port Conflicts:** Ensure ports `3000` and `5000` are free.
- **CORS Errors:** If the frontend can't talk to the backend, check that the backend is running and `CORS` is enabled in `chatbot.py` (it is enabled for `localhost:3000` by default).
