# 🔧 Troubleshooting & Common Issues

## 🛑 Frontend Issues

### "Turnstile Widget seem to have hung"

- **Cause**: Network issues, Invalid Site Key in `.env`, or Localhost env not whitelisted in Cloudflare dashboard.
- **Fix**:
  1. Check your internet connection.
  2. Verify `REACT_APP_TURNSTILE_SITE_KEY` in `.env`.
  3. Ensure you are not blocking scripts (AdBlockers).
  4. _Dev Note_: The error is usually harmless in local dev if the key is test-mode.

### "Request for Private Access Token"

- **Cause**: Apple device feature privacy check.
- **Fix**: **Ignore it**. This is a feature, not a bug. It means Cloudflare is validating you using modern privacy protocols instead of a visual CAPTCHA.

### 3D Globe Not appearing / Laggy

- **Cause**: WebGL disabled or GPU driver issues.
- **Fix**: Enable "Hardware Acceleration" in your browser settings.

## 🛑 Backend Issues

### "Connection Refused" / API Errors

- **Cause**: Backend server is not running.
- **Fix**: Ensure you ran `python backend_auth/chatbot.py` and the terminal shows it is active on port 5000.

### "Database not connected"

- **Cause**: MongoDB is not running or URI is wrong.
- **Fix**:
  1. Check `MONGO_URI` in `.env`.
  2. Ensure MongoDB service is started (`mongod`).

### "401 Unauthorized" on Create Post

- **Cause**: Token expired or invalid.
- **Fix**: Log out and Log in again to refresh your JWT token.

---

## 📞 Support

If issues persist, check the browser Console (F12) or the Backend Terminal logs for detailed error messages.
