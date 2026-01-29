# 📂 Project Structure & File Guide

This document provides a comprehensive, file-by-file breakdown of the entire project.

## 📂 Root Directory

| File / Folder            | Description                                                                         |
| :----------------------- | :---------------------------------------------------------------------------------- |
| `.env`                   | **CRITICAL**. Environment variables for Database URL, JWT Secrets, and Admin creds. |
| `requirements.txt`       | Python dependencies for the backend (Flask, PyMongo, etc.).                         |
| `TODO.md`                | Task tracking and roadmap for the project.                                          |
| `backend_auth/`          | Folder containing the core Flask backend application.                               |
| `database_architecture/` | Folder containing database logic and API routes.                                    |
| `docs/`                  | Folder containing project documentation.                                            |
| `frontend/`              | Folder containing the React frontend application.                                   |

---

## 📂 Backend: `backend_auth/`

Core Server Logic.

| File                      | Description                                                                               |
| :------------------------ | :---------------------------------------------------------------------------------------- |
| `analytics.py`            | Tracks visitor data (IP, Location, Device) and provides stats for the dashboard.          |
| `auth.py`                 | Handles Admin Authentication, JWT Token generation, and Rate Limiting.                    |
| `chatbot.py`              | **MAIN SERVER ENTRY POINT**. Initializes Flask, connects routes, and handles Chatbot API. |
| `whatsapp_service.py`     | **NEW** WhatsApp notification service for contact form submissions.                       |
| `check_contacts.py`       | **NEW** Utility script to view recent contact form submissions from database.             |
| `check_whatsapp.py`       | **NEW** Utility script to check WhatsApp notification configuration status.               |
| `migrate_chatbot_data.py` | Utility script to seed the MongoDB database with initial Q&A pairs.                       |
| `setup_admin.py`          | Utility script to manually create an admin user in the database.                          |
| `test_db.py`              | Simple script to test if the MongoDB connection is working.                               |
| `__pycache__/`            | (Directory) Compiled Python files (automatically generated).                              |

---

## 📂 Database: `database_architecture/`

Data Persistence & Business Logic.

| File                   | Description                                                              |
| :--------------------- | :----------------------------------------------------------------------- |
| `__init__.py`          | Marks directory as a Python package.                                     |
| `admin_utils.py`       | Helper functions for administrative tasks.                               |
| `check_database.py`    | Diagnostic script to verify database integrity.                          |
| `connection.py`        | **CORE**. Establishes the connection to MongoDB Atlas.                   |
| `models.py`            | Defines data schemas/structures for Collections (Users, Q&A, Visitors).  |
| `portfolio_api.py`     | Defines specific API endpoints (Contact Form, File Uploads, Soft Posts). |
| `portfolio_service.py` | Service layer handling business logic for portfolio operations.          |

---

## 📂 Documentation: `docs/`

| File                      | Description                                                 |
| :------------------------ | :---------------------------------------------------------- |
| `01_INTRODUCTION.md`      | General introduction to the portfolio's goals and features. |
| `02_GETTING_STARTED.md`   | Detailed list of technologies used and installation guide.  |
| `03_PROJECT_STRUCTURE.md` | **(This File)** Complete file inventory.                    |
| `04_FRONTEND_GUIDE.md`    | Guide to React components and styling.                      |
| `05_BACKEND_GUIDE.md`     | Guide to Flask API and database.                            |
| `06_FEATURES_MANUAL.md`   | User manual for features.                                   |
| `07_TROUBLESHOOTING.md`   | Common issues and fixes.                                    |

---

## 📂 Frontend: `frontend/`

React Application.

### Root Files

| File           | Description                                           |
| :------------- | :---------------------------------------------------- |
| `package.json` | Node.js dependencies configuration and build scripts. |
| `public/`      | Static assets directory (images, icons, etc.).        |
| `src/`         | Source code directory.                                |

### `frontend/public/`

| File                      | Description                                                     |
| :------------------------ | :-------------------------------------------------------------- |
| `Ankit_Resume (1).pdf`    | Resume file available for download.                             |
| `favicon.ico`             | Browser tab icon.                                               |
| `index.html`              | **HTML ENTRY POINT**. The main HTML file loaded by the browser. |
| `logo192.png` / `512.png` | App icons for PWAs/Mobile.                                      |
| `manifest.json`           | Web App Manifest configuration.                                 |
| `robots.txt`              | SEO instructions for web crawlers.                              |
| `uploads/`                | (Directory) Dynamic folder for user-uploaded content.           |
| `images/`                 | (Directory) Project and Profile images.                         |
| `images/profile/`         | Contains `photo1.jpg` through `photo6.jpg` (User photos).       |

### `frontend/src/`

| File           | Description                                                                |
| :------------- | :------------------------------------------------------------------------- |
| `App.js`       | **MAIN REACT COMPONENT**. Sets up the page layout and combines components. |
| `index.js`     | Web entry point; mounts React to the DOM.                                  |
| `styles.css`   | Global CSS styles (Tailwind or custom CSS).                                |
| `lib/utils.ts` | Utility functions (likely for class name merging).                         |

### `frontend/src/components/`

Reusable UI Elements.

| File                         | Description                                            |
| :--------------------------- | :----------------------------------------------------- |
| `AnalyticsPage.jsx`          | Admin panel view showing visitor stats and graphs.     |
| `Chatbot.jsx`                | Floating AI Assistant widget.                          |
| `CreatePostModal.jsx`        | Admin modal for creating new content.                  |
| `Educations.jsx`             | Section displaying academic background.                |
| `Experience.jsx`             | Section displaying work history.                       |
| `FallingStars.jsx`           | Animation background effect.                           |
| `FloatingDock.jsx`           | Navigation menu component (Desktop Dock + Mobile Dot). |
| `Footer.jsx`                 | Site footer.                                           |
| `GravityStarsBackground.jsx` | Complex background animation.                          |
| `LoginModal.jsx`             | Admin login form popup.                                |
| `ModernAbout.jsx`            | "About Me" section.                                    |
| `ModernContact.jsx`          | Contact form with validation and Turnstile.            |
| `ModernHero.jsx`             | Top "Hero" section with typing effect.                 |
| `ModernProjects.jsx`         | Grid display of portfolio projects.                    |
| `ModernSkills.jsx`           | Skills visualization section.                          |
| `SimpleNavbar.jsx`           | Basic top navigation bar.                              |
| `Softs.jsx`                  | "Soft Skills" or "Updates" section.                    |
| `Timeline.jsx`               | Vertical timeline component.                           |
| `VisitorTracker.jsx`         | Invisible component that tracks user visits.           |

### `frontend/src/components/ui/`

Specialized UI Library Components.

| File                     | Description                          |
| :----------------------- | :----------------------------------- |
| `BackgroundGradient.jsx` | Fancy gradient background container. |
| `beams-background.tsx`   | Rays/Beams light effect background.  |
| `CardStack.jsx`          | Stacked card animation component.    |
| `Globe.jsx`              | 3D Interactive World Globe.          |
