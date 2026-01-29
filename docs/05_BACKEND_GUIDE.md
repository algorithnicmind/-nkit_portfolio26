# 🐍 Backend & API Developer Guide

This guide details the Python Flask backend, the API endpoints available, and the Database integration.

## 🏗️ Backend Architecture

The backend is a **RESTful API** built with **Flask**. It is stateless and uses JWT (JSON Web Tokens) for authentication.

### Core Modules

- **`chatbot.py`**: The application factory. Initializes Flask, CORS, and registers Blueprints/Routes.
- **`auth.py`**: Security module.
  - `login()`: Validates credentials against DB.
  - `token_required`: Decorator to protect routes.
- **`analytics.py`**: Tracks endpoint usage and visitor metadata.

## 📡 API Endpoints

### 1. Chatbot (`/api/chatbot`)

- **POST** `/`
  - **Body**: `{ "message": "Who are you?" }`
  - **Response**: `{ "response": "I am Ankit's AI assistant..." }`
  - **Logic**: Searches MongoDB `qa_collection` for keyword matches. Falls back to default response.

### 2. Authentication (`/api/auth`)

- **POST** `/login`
  - **Body**: `{ "username": "admin", "password": "..." }`
  - **Response**: `{ "token": "ey...", "user": {...} }`
- **GET** `/verify`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: Validates token validity.

### 3. Posts / Softs (`/api/soft-posts`)

- **GET** `/`
  - **Query Params**: `category` (optional), `page`, `limit`.
  - **Response**: List of posts.
- **POST** `/` (Protected)
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ "caption": "...", "category": "...", "mediaUrl": "..." }`
  - **Action**: Creates a new post in `posts` collection.

### 4. Contact (`/api/contact`)

- **POST** `/`
  - **Body**: `{ "name": "...", "email": "...", "message": "...", "turnstileToken": "..." }`
  - **Logic**:
    1. Validates Turnstile CAPTCHA to prevent spam
    2. Saves message to MongoDB `contact_submissions` collection
    3. Sends WhatsApp notification (if CallMeBot API key is configured)
    4. Logs notification to console with WhatsApp click-to-chat link
  - **Response**: `{ "success": true, "message": "Thank you...", "whatsapp_notified": true/false }`

## 🗄️ Database (MongoDB)

The backend expects a MongoDB connection. The schema is flexible (NoSQL), but generally follows:

### Collections

- **`users`**: Stores Admin credentials (Username, Hashed Password).
- **`posts`**: Stores Softs/Feed items.
- **`custom_qa`**: Stores Chatbot Question/Answer pairs.
- **`messages`**: Stores Contact form submissions.
- **`analytics`**: Stores visitor logs.

## 🛡️ Security Features

1.  **JWT**: Tokens expire (e.g., 24 hours). Used for stateless auth.
2.  **Password Hashing**: Passwords should never be stored in plain text (uses `werkzeug.security` or `bcrypt`).
3.  **CORS**: Restricted to frontend origins (e.g., `localhost:3000`).
4.  **Rate Limiting**: (If enabled) limits method calls per minute to prevent abuse.

---

_Next: [Features Manual](06_FEATURES_MANUAL.md) for user instructions._
