# Tech Stack Documentation

## 1. Frontend (Client-Side)

- **Framework**: React.js 18
- **Build Tool**: Create React App (Webpack)
- **Routing**: `react-router-dom` v6
- **Styling**:
  - Pure CSS3 (Variables, Flexbox/Grid)
  - Glassmorphism effects
  - Responsive Media Queries
- **Animations**:
  - `framer-motion`: Page transitions and component entry.
  - `gsap`: Advanced sequencing (if used).
  - `lenis`: Smooth scrolling.
- **Icons**: FontAwesome 6 (`@fortawesome/react-fontawesome`)
- **Security**: Cloudflare Turnstile (`@marsidev/react-turnstile`)

## 2. Backend (Server-Side)

- **Runtime**: Python 3.10+
- **Framework**: Flask (Microframework)
- **API Style**: RESTful API
- **Authentication**: JWT (JSON Web Tokens)
- **Security**:
  - `flask_cors`: CORS management.
  - `flask_limiter`: Rate limiting.
  - `bcrypt`: Password hashing.

## 3. Database

- **Primary DB**: MongoDB Atlas (Cloud)
- **Driver**: `pymongo` (Python driver)
- **Connection**: Secure connection using `python-dotenv` and `certifi` (SSL).

## 4. DevOps & Environment

- **Environment Variables**: `.env` (centralized configuration).
- **Version Control**: Git / GitHub.
- **Package Managers**:
  - `npm` (Frontend)
  - `pip` / `venv` (Backend)
- **OS Compatibility**: Windows (Powershell), Linux, macOS.
