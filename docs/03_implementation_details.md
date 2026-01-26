# Implementation Details

## 1. Directory Structure

- **root/**: Project configuration (`.env`, `.gitignore`).
- **frontend/**: React application.
  - `src/components/`: Reusable UI components (Chatbot, Modal, Navbar).
  - `src/styles.css`: Global design system.
- **backend_auth/**: Backend logic.
  - `auth.py`: User authentication endpoints.
  - `chatbot.py`: Chatbot logic and API endpoints.
  - `setup_admin.py`: Script to initialize admin user.
- **database_architecture/**: Database handling.
  - `connection.py`: MongoDB connection factory.
  - `portfolio_api.py`: General data routes.

## 2. Key Algorithms / Logic

- **Chatbot Logic**:
  - Keyword matching algorithm in `chatbot.py`.
  - Falls back to database query for dynamic Q&A.
- **Authentication**:
  - Login returns a JWT access token.
  - `@token_required` decorator secures Admin routes.

## 3. Security Measures

- **Environment Variables**: Secrets are NOT hardcoded.
- **Turnstile**: Prevents bot spam on contact forms.
- **Rate Limiting**: Applied to login and API endpoints.
- **Input Validation**: Backend sanitizes inputs.

## 4. Future Roadmap

- Integration with OpenAI for LLM-based responses.
- Analytics dashboard visualization.
- Blog section with Markdown support.
