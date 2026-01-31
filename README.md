# 🚀 Ankit Sahoo - Professional Portfolio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## 🌟 Introduction

Welcome to my professional portfolio repository. This project is a modern, interactive web application designed to showcase my skills, projects, and professional journey as a **Full Stack Enthusiast** and **Computer Science Student**.

Built with a robust **Flask** backend and a dynamic **React** frontend, this portfolio features advanced animations, a custom chatbot, and global connectivity visualizations.

---

## 📸 Visuals & Previews

Here is a glimpse into the visual identity of the portfolio:

|                                    Profile Preview                                     |
| :------------------------------------------------------------------------------------: |
| <img src="frontend/public/images/profile/photo1.jpg" alt="Profile Photo" width="300"/> |

_(More visual assets available in `frontend/public/images/`)_

---

## 🛠️ Project Structure

A high-level overview of the repository structure to help you navigate:

```bash
📂 -nkit_portfolio26/
├── 📂 backend_auth/           # 🤖 Backend logic, Authentication & Chatbot services
│   ├── chatbot.py             #    Main Flask server entry point
│   └── check_contacts.py      #    View contact submissions utility
├── 📂 database_architecture/  # 🗄️ Database connections and schema models
│   ├── connection.py          #    MongoDB Atlas connection
│   ├── models.py              #    Data models (Contact, Projects, etc.)
│   └── portfolio_service.py   #    Business logic for contact forms
├── 📂 frontend/               # ⚛️ React Frontend Application
│   ├── 📂 public/             #    Static assets (Images, Icons)
│   └── 📂 src/                #    Source code
│       ├── 📂 components/     #    Reusable UI components
│       ├── 📂 data/           #    Static data files (globe.json)
│       └── 📜 App.js
├── 📂 docs/                   # 📄 Project documentation
├── 📜 .env                    # 🔐 Environment variables (GitIgnored)
└── 📜 requirements.txt        # 🐍 Python dependencies
```

---

## 🚀 Key Features

- **Interactive UI/UX**: Powered by **Framer Motion** for smooth transitions and **Three.js** (via Solar System) for 3D visualizations.
- **Immersive Visuals**: Features a unique **Aurora Background** and optimized **Gravity Stars** physics engine.
- **Smooth Experience**: Integrated **Lenis Smooth Scroll** with intelligent modal handling for lag-free interactions.
- **Premium Project Grid**: A scalable, glassmorphic grid layout designed to showcase multiple projects with unique 3D tilt effects.
- **Solar System Skills**: Interactive 3D skill visualization with orbiting technology icons.
- **AI Chatbot**: Integrated conversational agent located in `backend_auth`.
- **Secure Contact Form**: Protected by **Cloudflare Turnstile**, saves to MongoDB.
- **Visitor Tracking**: Analytics implementation for monitoring traffic.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Python** (3.8+)
- **Node.js** (16+) & **npm**
- **MongoDB Atlas** URI

### 1. Backend Setup

1.  Navigate to the root directory.
2.  Create a `.env` file with the following:

    ```env
    MONGODB_CONNECTION_STRING=your_mongodb_string
    JWT_SECRET=your_jwt_secret
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=password

    # Cloudflare Turnstile (for contact form security)
    REACT_APP_TURNSTILE_SITE_KEY=your_site_key
    TURNSTILE_SECRET_KEY=your_secret_key
    ```

3.  Install dependencies and run:

    ```bash
    python -m venv venv
    # Windows:
    .\venv\Scripts\activate
    # Mac/Linux:
    source venv/bin/activate

    pip install -r requirements.txt
    python backend_auth/chatbot.py
    ```

    _Server runs on `http://localhost:5000`_

### 2. Frontend Setup

1.  Open a new terminal and navigate to `frontend/`:
    ```bash
    cd frontend
    npm install
    npm start
    ```
    _Client runs on `http://localhost:3000`_

---

## 🌐 Connect with Me

I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.

| Platform        | Link                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **LinkedIn**    | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/ankit-sahoo94) |
| **Twitter / X** | [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://x.com/@AnkitSahoo94)              |
| **Instagram**   | [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://instagram.com/ankitsahoo94) |
| **GitHub**      | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/)                         |

---

_Made with ❤️ by Ankit Sahoo_
