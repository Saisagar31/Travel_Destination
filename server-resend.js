// Backend Server with Resend Email API
// FREE: 100 emails per day - Super simple & modern!

const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Store OTPs temporarily
const otpStore = new Map();

// Resend Configuration
const RESEND_API_KEY = 'YOUR_RESEND_API_KEY_HERE'; // Get from https://resend.com/api-keys
const resend = new Resend(RESEND_API_KEY);

// Generate random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send email via Resend
async function sendEmailWithResend(toEmail, otp) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Voyager Travel <onboarding@resend.dev>', // Use resend.dev or your verified domain
            to: [toEmail],
            subject: 'Your Voyager Login OTP',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            background: white;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            padding: 30px;
                            text-align: center;
                            color: white;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 28px;
                        }
                        .content {
                            padding: 40px 30px;
                            text-align: center;
                        }
                        .otp-box {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            font-size: 36px;
                            font-weight: bold;
                            padding: 20px;
                            border-radius: 10px;
                            letter-spacing: 8px;
                            margin: 30px 0;
                            display: inline-block;
                        }
                        .message {
                            color: #333;
                            font-size: 16px;
                            line-height: 1.6;
                            margin: 20px 0;
                        }
                        .warning {
                            background: #fff3cd;
                            border: 1px solid #ffc107;
                            color: #856404;
                            padding: 15px;
                            border-radius: 5px;
                            font-size: 14px;
                            margin-top: 20px;
                        }
                        .footer {
                            background: #f8f9fa;
                            padding: 20px;
                            text-align: center;
                            color: #6c757d;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🌍 Voyager Travel</h1>
                        </div>
                        <div class="content">
                            <p class="message">Hello!</p>
                            <p class="message">Your One-Time Password (OTP) for login is:</p>
                            <div class="otp-box">${otp}</div>
                            <p class="message">This OTP is valid for <strong>5 minutes</strong>.</p>
                            <p class="message">Please enter this code to complete your login.</p>
                            <div class="warning">
                                ⚠️ <strong>Security Note:</strong> Never share this OTP with anyone.
                            </div>
                        </div>
                        <div class="footer">
                            <p>This is an automated email from Voyager Travel.</p>
                            <p>If you didn't request this OTP, please ignore this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        if (error) {
            console.error('❌ Resend error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Email sent successfully via Resend:', data.id);
        return { success: true, messageId: data.id };

    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
}

// API Endpoint: Send OTP
app.post('/api/send-otp', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = Date.now() + (5 * 60 * 1000);

        // Store OTP
        otpStore.set(email, { otp, expiresAt });

        // Send email via Resend
        const emailResult = await sendEmailWithResend(email, otp);

        if (emailResult.success) {
            console.log(`✅ OTP sent to ${email}: ${otp}`);
            res.json({
                success: true,
                message: 'OTP sent successfully to your email'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send OTP',
                error: emailResult.error
            });
        }

    } catch (error) {
        console.error('Error in send-otp:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.message
        });
    }
});

// API Endpoint: Verify OTP
app.post('/api/verify-otp', (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const storedData = otpStore.get(email);

        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'OTP not found or expired'
            });
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({
                success: false,
                message: 'OTP has expired'
            });
        }

        if (storedData.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        otpStore.delete(email);
        console.log(`✅ OTP verified for ${email}`);

        res.json({
            success: true,
            message: 'OTP verified successfully',
            sessionId: 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: error.message
        });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║     🚀 VOYAGER SERVER - RESEND API                     ║
╠════════════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                        ║
║  Email Provider: Resend (100 emails/day FREE)          ║
║  Status: Ready to send OTPs                            ║
╚════════════════════════════════════════════════════════╝
    `);
});

// Clean up expired OTPs
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
            console.log(`🗑️ Expired OTP removed for ${email}`);
        }
    }
}, 60000);
