# Appwrite Email OTP Setup Guide

## Problem
OTP emails are not being sent when users try to login with email authentication.

## Root Cause
Appwrite requires an email service (SMTP) to be configured in your project settings before it can send OTP emails.

## Solution: Configure Email Service in Appwrite

### Step 1: Access Appwrite Console
1. Go to https://cloud.appwrite.io/
2. Log in to your account
3. Select your project: **693c23c300185b1d3ab6**

### Step 2: Enable Email Authentication
1. In the left sidebar, click on **Auth**
2. Click on **Settings** tab
3. Scroll to **Auth Methods**
4. Make sure **Email OTP** is enabled (toggle should be ON)

### Step 3: Configure SMTP Email Provider

#### Option A: Use Appwrite's Built-in Email Service (Recommended for Testing)
1. In the left sidebar, click on **Messaging**
2. Click on **Providers** tab
3. Click **Add Provider** > **Email**
4. Appwrite Cloud provides a default email service for testing
5. Enable the default provider

#### Option B: Configure Your Own SMTP Provider (Recommended for Production)

**Using Gmail:**
1. In Appwrite Console, go to **Messaging** > **Providers**
2. Click **Add Provider** > **Email** > **SMTP**
3. Enter the following details:
   - **Name**: Gmail SMTP
   - **SMTP Host**: smtp.gmail.com
   - **SMTP Port**: 587
   - **SMTP Username**: your-email@gmail.com
   - **SMTP Password**: (Use App Password, not your regular Gmail password)
   - **SMTP Secure**: TLS
   - **From Email**: your-email@gmail.com
   - **From Name**: Your App Name

**To generate Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication if not already enabled
3. Go to https://myaccount.google.com/apppasswords
4. Create a new app password for "Mail"
5. Copy the generated password and use it in Appwrite

**Using SendGrid (Alternative):**
1. Sign up at https://sendgrid.com/ (Free tier: 100 emails/day)
2. Create an API key
3. In Appwrite Console, add SMTP provider:
   - **SMTP Host**: smtp.sendgrid.net
   - **SMTP Port**: 587
   - **SMTP Username**: apikey
   - **SMTP Password**: (Your SendGrid API Key)
   - **From Email**: your-verified-email@yourdomain.com

**Using Mailgun (Alternative):**
1. Sign up at https://www.mailgun.com/ (Free tier: 100 emails/day)
2. Verify your domain or use sandbox domain
3. In Appwrite Console, add SMTP provider:
   - **SMTP Host**: smtp.mailgun.org
   - **SMTP Port**: 587
   - **SMTP Username**: (From Mailgun dashboard)
   - **SMTP Password**: (From Mailgun dashboard)

### Step 4: Set Default Email Templates
1. In Appwrite Console, go to **Messaging** > **Messages**
2. Go to **Templates** tab
3. You should see templates for:
   - **Magic URL**
   - **OTP**
   - **Email Verification**
4. Customize the OTP email template if needed
5. Make sure the template is active

### Step 5: Test Email Delivery
1. Open your website: http://localhost:3000/login-appwrite.html
2. Or use the test page: http://localhost:3000/tmp_rovodev_test_appwrite.html
3. Enter your email address
4. Click "Send OTP"
5. Check your email inbox (and spam/junk folder)
6. You should receive a 6-digit OTP code

### Step 6: Verify Project Settings
1. In Appwrite Console, go to **Settings**
2. Under **General**, verify:
   - Project ID: **693c23c300185b1d3ab6**
   - Project Name is set
3. Under **Domains**, add your domain if using in production:
   - Add: `localhost` for local testing
   - Add your production domain when deploying

## Troubleshooting

### Issue: "Email service not configured" error
**Solution:** Follow Step 3 above to configure SMTP provider

### Issue: OTP email goes to spam
**Solution:** 
- Use a custom domain with SPF, DKIM, and DMARC records
- Use a reputable SMTP provider (SendGrid, Mailgun, etc.)
- Verify your sending domain

### Issue: "Rate limiting" error (429)
**Solution:** 
- Wait a few minutes before trying again
- Appwrite has rate limits: 10 requests per minute for email OTP
- Consider implementing exponential backoff

### Issue: "Invalid project" error (401)
**Solution:**
- Verify Project ID in code matches Appwrite Console
- Check that API endpoint is correct: `https://cloud.appwrite.io/v1`

### Issue: Still not receiving emails
**Check:**
1. Email provider is enabled in Appwrite Console
2. SMTP credentials are correct
3. Spam/junk folder
4. Email address is valid
5. Check Appwrite logs in Console > Logs section

## Code Changes Made

The login code has been updated with:
1. ✅ Better error handling with specific error messages
2. ✅ Email validation
3. ✅ Detailed console logging for debugging
4. ✅ Third parameter `true` added to `createEmailToken()` for OTP mode
5. ✅ Rate limiting detection
6. ✅ Spam folder reminder in success message

## Quick Test

Use the test page to verify setup:
```bash
# Start the server (if not already running)
cd travel-destinations
python -m http.server 3000

# Open in browser
http://localhost:3000/tmp_rovodev_test_appwrite.html
```

## Production Checklist
- [ ] Email SMTP provider configured
- [ ] Email templates customized
- [ ] Domain verified (if using custom domain)
- [ ] SPF/DKIM/DMARC records configured
- [ ] Rate limiting handled in code
- [ ] Error messages are user-friendly
- [ ] Email deliverability tested
- [ ] Spam folder checked

## Additional Resources
- [Appwrite Email Auth Docs](https://appwrite.io/docs/products/auth/email-otp)
- [Appwrite Messaging Docs](https://appwrite.io/docs/products/messaging)
- [SMTP Configuration Guide](https://appwrite.io/docs/products/messaging/smtp)
