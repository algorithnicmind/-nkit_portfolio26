# 🎨 Frontend Developer Guide

This guide details the Frontend architecture, specifically focusing on the Components, Styling, and specialized features like the 3D Globe and Floating Dock.

## 🏗️ Component Architecture

The application is built as a **Single Page Application (SPA)** using React. It generally follows a vertically stacked "Section" layout, with floating overlays for Navigation and Chat.

### Key Components Explained

#### 1. ModernHero (`ModernHero.jsx`)

- **Purpose**: First impression / Landing screen.
- **Tech**: Uses `framer-motion` for text entrance animations. Background often includes `GravityStarsBackground` or similar particle effects.

#### 2. Softs / Personal Growth Hub (`Softs.jsx`)

- **Purpose**: A dynamic feed of updates, research, and achievements.
- **Features**:
  - Displays cards with Categories (Motivation, Research, Hacks).
  - "Load More" functionality for pagination.
  - **Admin Feature**: If logged in, displays a "+" button to open `CreatePostModal`.

#### 3. Floating Dock (`FloatingDock.jsx`)

- **Desktop**: A MacOS-inspired bottom dock that expands on hover.
- **Mobile**: A "Floating Dot" (FAB) in the bottom-right corner. Expands vertically when tapped.
- **Icons**: Uses FontAwesome.
- **Logic**: Handles scrolling to sections (`#about`, `#contact`) and routing to pages (`/softs`).

#### 4. Contact Form (`ModernContact.jsx`)

- **Security**: Integrates **Cloudflare Turnstile** to prevent spam.
- **Visualization**: Renders a 3D Globe (`ui/Globe.jsx`) showing arcs connecting locations.
- **State**: Manages form data and submission status.

#### 5. Admin Login (`LoginModal.jsx`)

- **Access**: Triggered by the "Lock/Key" icon in the dock.
- **Flow**: Sends username/password to `/api/auth/login`. On success, saves token and updates root App state (`adminUser`).

## 🖌️ Styling & CSS (`styles.css`)

We use **Vanilla CSS** with modern features, utilizing a single global stylesheet for consistency.

- **Variables**: Colors are defined in `:root` (e.g., `--primary-color`, `--card-bg`).
- **Glassmorphism**: Heavy use of `backdrop-filter: blur()`, semi-transparent backgrounds (`rgba`), and thin borders.
- **Responsiveness**: Media queries (e.g., `@media (max-width: 768px)`) handle layout shifts (Grid -> Stack).
- **Animations**: CSS Keyframes (`@keyframes`) are used for marquees and simple fades. Complex animations use `framer-motion` in JS.

## 🌍 3D Globe Implementation

Located in `components/ui/Globe.jsx`.

- **Library**: `react-globe.gl` or `react-three-fiber` + `three-globe`.
- **Optimization**: The globe is resource-intensive. It creates a WebGL context.
- **Data**: Arcs, points, and labels are fed via `props` (often from `globe.json` or hardcoded samples in `ModernContact`).

## 📱 Mobile Optimization

The site is fully responsive. Key mobile adaptations:

- **Grid Layouts**: Switch to Single Column (1fr).
- **Navigation**: Desktop Dock hides; Mobile Dot appears.
- **Touch Targets**: Buttons and Inputs are sized for touch (min 44px height).
- **Camera Capture**: The "Create Post" file input supports `capture="environment"` for direct camera access.

---

_Next: Detailed [Backend Guide](05_BACKEND_GUIDE.md)._
