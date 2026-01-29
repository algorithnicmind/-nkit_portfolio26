# 📖 Features User Manual

This manual explains how to use the special features of the portfolio website from a user's perspective.

## 🤖 Using the Chatbot

1.  **Open**: Click the **Message/Chat Icon** in the Floating Dock (Desktop or Mobile).
2.  **Interact**: Type a question (e.g., "What are your skills?", "Contact info").
3.  **Response**: The AI will reply instantly based on its database knowledge.
    - _Note: If it doesn't know, it provides a helpful fallback menu._

## 🔐 Admin Login (Owner Only)

1.  **Access**: Click the **Lock Icon** in the Floating Dock.
2.  **Credentials**: Enter your Admin Username and Password.
3.  **Success**: Upon login:
    - You receive a "Welcome Admin" notification.
    - Hidden features (Analytics Dashboard, Create Post) become visible.
    - The "Lock" icon changes to a "Sign Out" icon.

## 📝 Creating a New Post (Softs Feed)

_Requires Admin Login._

1.  **Navigate**: Go to the **Softs** section/page.
2.  **Trigger**: Click the **Large Plus (+)** button.
3.  **Fill Form**:
    - **Category**: Select (Motivation, Research, Hacks, etc.).
    - **Caption**: Write your update.
    - **Media**: Click "Add Photo/Video". On mobile, this opens your **Camera** or Gallery.
4.  **Submit**: Click "Post Update".
5.  **Result**: The post appears immediately in the feed.

## 🚀 Interactive Projects (Card Stack)

1.  **View**: The Projects section displays a **stacked deck** of cards.
2.  **Cycle**: Tap/Click the stack to cycle through projects one by one.
3.  **Details**:
    - The top card features a **"Click Me Here"** button.
    - Click it to open a **Popup Window** with full project details (Images, Description, Links).
    - **Background Scroll**: The main site is locked while the popup is open, so you can easily scroll inside the popup.

## 🌍 Sending a Message (Contact)

1.  **Navigate**: Go to the **Contact** section.
2.  **Fill Form**: Name, Email, Subject, Message.
3.  **Security**: Uses Cloudflare Turnstile to prevent spam.
4.  **Send**: Click "Send Message".
5.  **Globe**: Watch the 3D globe visualization!

### What Happens When a Message is Sent:

1. **Database**: Message is saved to MongoDB `contact_submissions` collection
2. **Console**: Notification appears in backend terminal with all details
3. **WhatsApp**: If CallMeBot API is configured, auto-sends to your WhatsApp

### Admin Tools for Contact Management:

```bash
# View recent contact submissions
python backend_auth/check_contacts.py

# Check WhatsApp notification configuration
python backend_auth/check_whatsapp.py
```

### WhatsApp Notification Setup (Optional):

1. Add CallMeBot to WhatsApp: `+34 644 51 95 23`
2. Send message: `I allow callmebot to send me messages`
3. Add API key to `.env`: `CALLMEBOT_APIKEY=your_key_here`

## 📱 Mobile Navigation

- **The Dot**: On mobile screens, look for the **Floating Dot** in the bottom-right.
- **Menu**: Tap the dot to expand the menu upwards.
- **Icons**: Home, About, Skills, Projects, Contact, Softs.

---

_Next: [Troubleshooting](07_TROUBLESHOOTING.md)._
