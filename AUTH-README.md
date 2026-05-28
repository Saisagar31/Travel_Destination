# Session-Based Authentication with Email OTP Verification

## Overview
This implementation provides a complete session-based authentication system with email OTP (One-Time Password) verification for the Voyager travel website.

## Features Implemented ✅

### 1. **Session-Based Login Flow**
- User email input with validation
- Modern, animated UI with glassmorphism design
- Form validation and error handling
- Loading states and user feedback

### 2. **OTP Generation**
- 6-digit random OTP generation
- OTP displayed in console (for demo - in production, send via email service)
- 5-minute expiry time
- Secure random number generation

### 3. **Email OTP Verification**
- 6-digit OTP input with auto-focus
- Auto-advance to next input field
- Paste support (paste 6-digit code)
- Real-time validation
- OTP expiry checking

### 4. **Session Creation on Success**
- Session ID generation
- 24-hour session validity
- localStorage storage (in production, use secure httpOnly cookies)
- Session data includes: email, sessionId, timestamps, expiry

### 5. **Additional Features**
- Resend OTP functionality with 60-second cooldown timer
- Back button to return to login
- Session manager for cross-page authentication
- User menu in navbar showing logged-in user
- Logout functionality
- Session expiry notifications
- Automatic redirect on session expiry
- Responsive design for all screen sizes

## File Structure

```
travel-destinations/
├── login.html              # Login and OTP verification page
├── auth.js                 # Authentication logic
├── auth-styles.css         # Authentication styling
├── session-manager.js      # Session management across pages
├── index.html             # Main page (updated with session check)
├── landing.html           # Landing page (updated CTA)
└── AUTH-README.md         # This documentation
```

## How to Use

### 1. **Access the Login Page**
Navigate to: `login.html`

### 2. **Enter Email**
- Enter any valid email address
- Click "Continue with Email"

### 3. **Verify OTP**
- A 6-digit OTP will be generated (check browser console)
- Enter the OTP in the input fields
- Or paste a 6-digit code directly
- Click "Verify & Continue"

### 4. **Session Created**
- On successful verification, a session is created
- User is redirected to the main destinations page
- Session lasts 24 hours

### 5. **Logout**
- Click on your avatar in the navbar
- Click "Logout" button

## Demo Flow

```
Landing Page (landing.html)
    ↓ Click "Start Exploring"
Login Page (login.html)
    ↓ Enter email
OTP Verification
    ↓ Enter 6-digit OTP (check console)
Success Screen
    ↓ Auto-redirect (3 seconds)
Main Page (index.html) - Authenticated
```

## Session Management

### Session Data Structure
```javascript
{
    sessionId: "sess_abc123xyz...",
    email: "user@example.com",
    createdAt: 1703001234567,
    expiresAt: 1703087634567,
    isAuthenticated: true
}
```

### Session Storage
- Stored in `localStorage` as `voyager_session`
- In production, use secure httpOnly cookies
- Session validated on every page load
- Auto-expires after 24 hours

## Security Notes (For Production)

⚠️ **This is a demo implementation. For production:**

1. **Backend Integration Required**
   - Move OTP generation to backend
   - Send OTP via email service (SendGrid, AWS SES, etc.)
   - Verify OTP on server-side
   - Use secure session storage (Redis, database)

2. **Use Secure Cookies**
   - Replace localStorage with httpOnly, secure cookies
   - Implement CSRF protection
   - Use SameSite cookie attribute

3. **Rate Limiting**
   - Limit OTP requests per email
   - Implement IP-based rate limiting
   - Add captcha for bot prevention

4. **OTP Security**
   - Use cryptographically secure random generation
   - Hash OTPs before storage
   - Implement attempt limits (3-5 tries)
   - Shorter expiry time (2-3 minutes)

5. **Session Security**
   - Generate cryptographically secure session IDs
   - Implement session rotation
   - Add device fingerprinting
   - Monitor for suspicious activity

## Testing

### Test the Full Flow:

1. **Start Fresh**
   ```
   Open: landing.html
   ```

2. **Login**
   ```
   Click "Start Exploring" → login.html
   Enter email: test@example.com
   ```

3. **Get OTP**
   ```
   Open Browser Console (F12)
   Look for: "🔑 Generated OTP: 123456"
   ```

4. **Verify**
   ```
   Enter the 6-digit OTP
   Click "Verify & Continue"
   ```

5. **Check Session**
   ```
   You'll be redirected to index.html
   See your avatar in navbar (top right)
   ```

6. **Logout**
   ```
   Click avatar → Click "Logout"
   ```

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Customization

### Change Session Duration
Edit `auth.js`:
```javascript
const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
// Change to desired duration
```

### Change OTP Expiry
Edit `auth.js`:
```javascript
sessionData.otpExpiry = new Date().getTime() + (5 * 60 * 1000); // 5 minutes
// Change to desired duration
```

### Change Resend Timer
Edit `auth.js`:
```javascript
resendCountdown = 60; // 60 seconds
// Change to desired duration
```

## Styling

The authentication UI features:
- **Glassmorphism** design with backdrop blur
- **Gradient animations** with floating orbs
- **Smooth transitions** and micro-interactions
- **Color scheme** matching the main Voyager theme
- **Responsive** layout for all devices

## Console Commands

For testing in browser console:

```javascript
// Check current session
sessionManager.getSession()

// Check if authenticated
sessionManager.isAuthenticated()

// Get time remaining
sessionManager.formatTimeRemaining()

// Force logout
sessionManager.logout()

// Clear session
sessionManager.clearSession()
```

## Next Steps for Production

1. **Backend API**
   - Create `/api/auth/send-otp` endpoint
   - Create `/api/auth/verify-otp` endpoint
   - Create `/api/auth/logout` endpoint
   - Create `/api/auth/validate-session` endpoint

2. **Email Service Integration**
   - Use SendGrid, Mailgun, or AWS SES
   - Create professional email templates
   - Add retry logic for failed sends

3. **Database**
   - Store sessions in Redis or database
   - Store user accounts
   - Log authentication attempts

4. **Security Enhancements**
   - Add rate limiting middleware
   - Implement CAPTCHA
   - Add 2FA option
   - Monitor for brute force attacks

## Support

For questions or issues, refer to the main project documentation.

---

**Created as part of Brownie Challenge-1**
**Session-Based Authentication + Email OTP Verification**
