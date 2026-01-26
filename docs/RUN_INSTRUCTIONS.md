# Project Run Instructions

This document provides a step-by-step guide on how to run the project, specifically detailing which folders you need to be in for each command.

## Project Structure Overview

- **Root Directory**: `c:\Users\ankit\OneDrive\Documents\GitHub\-nkit_portfolio26`
- **Frontend Directory**: `c:\Users\ankit\OneDrive\Documents\GitHub\-nkit_portfolio26\frontend`

---

## Step 1: Backend Setup & Run

**Where to run this:** Root Directory (`.../-nkit_portfolio26`)

1.  **Open your terminal** and ensure you are in the root folder:

    ```powershell
    cd c:\Users\ankit\OneDrive\Documents\GitHub\-nkit_portfolio26
    ```

2.  **Create/Check `.env` file**:
    Ensure you have a `.env` file in this root folder with your MongoDB connection string:

    ```env
    MONGODB_CONNECTION_STRING=your_connection_string...
    ```

3.  **Activate Virtual Environment**:

    ```powershell
    # If using Windows PowerShell
    .\venv\Scripts\activate
    ```

    _(If you haven't created it yet: `python -m venv venv` and install deps: `pip install -r requirements.txt`)_

4.  **Run the Server**:
    Run the chatbot python script from the root folder:
    ```powershell
    python backend_auth/chatbot.py
    ```
    > You should see "Running on http://127.0.0.1:5000"

---

## Step 2: Frontend Setup & Run

**Where to run this:** Frontend Directory (`.../-nkit_portfolio26/frontend`)

1.  **Open a NEW terminal** (keep the backend running in the first one).

2.  **Navigate to the frontend folder**:

    ```powershell
    cd directory/to/project
    cd frontend
    # Full path example:
    # cd c:\Users\ankit\OneDrive\Documents\GitHub\-nkit_portfolio26\frontend
    ```

3.  **Install Dependencies** (Important: use this exact command):

    ```powershell
    npm install --legacy-peer-deps
    ```

    > **Note:** We use `--legacy-peer-deps` to resolve a known conflict between `react-scripts` and the latest `typescript` version. If you see "ERESOLVE" errors, this flag fixes them.

4.  **Start the React App**:
    ```powershell
    npm start
    ```
    > This will open your browser to http://localhost:3000

---

## Summary

- **Terminal 1 (Backend)**: stay in **Root**, run `python backend_auth/chatbot.py`
- **Terminal 2 (Frontend)**: go to **frontend/**, run `npm start`
