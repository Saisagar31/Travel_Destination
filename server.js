// Backend Server for Email OTP Authentication
// Using Brevo (Sendinblue) API - 300 FREE emails per day!

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// ⚡ BREVO API CONFIGURATION
// Get your API key from: https://app.brevo.com/settings/keys/api
const BREVO_API_KEY = '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';
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Generate random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send email via Brevo API
async function sendOTPEmail(toEmail, otp) {
    const emailData = {
        sender: {
            name: "Voyager Travel",
            email: "vaishnavvenkat48@gmail.com"
        },
        to: [
            {
                email: toEmail,
                name: toEmail.split('@')[0]
            }
        ],
        subject: "Your Voyager Travel Login Code - " + otp,
        htmlContent: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
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
                                Voyager staff will never ask for your OTP.
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
    };

    try {
        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Email sent successfully via Brevo');
            return { success: true, messageId: result.messageId };
        } else {
            console.error('❌ Brevo API error:', result);
            return { success: false, error: result };
        }
    } catch (error) {
        console.error('❌ Error calling Brevo API:', error);
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
        const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

        // Store OTP
        otpStore.set(email, { otp, expiresAt });

        // Send email via Brevo
        const emailResult = await sendOTPEmail(email, otp);

        if (emailResult.success) {
            console.log(`✅ OTP sent to ${email}: ${otp}`);
            res.json({
                success: true,
                message: 'OTP sent successfully to your email'
            });
        } else {
            console.error('Failed to send email:', emailResult.error);
            res.status(500).json({
                success: false,
                message: 'Failed to send OTP. Please try again.',
                error: emailResult.error
            });
        }

    } catch (error) {
        console.error('Error in send-otp endpoint:', error);
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

        // Get stored OTP
        const storedData = otpStore.get(email);

        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'OTP not found or expired'
            });
        }

        // Check expiry
        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({
                success: false,
                message: 'OTP has expired'
            });
        }

        // Verify OTP
        if (storedData.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        // OTP verified successfully
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

// Serve the HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║     🚀 VOYAGER AUTHENTICATION SERVER                   ║
╠════════════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                        ║
║  Email Provider: Brevo API (300 emails/day FREE)       ║
║  Status: ${BREVO_API_KEY !== 'YOUR_BREVO_API_KEY_HERE' ? '✅ Ready to send OTPs' : '⚠️  Add API key in server.js'}                       ║
╚════════════════════════════════════════════════════════╝

${BREVO_API_KEY === 'YOUR_BREVO_API_KEY_HERE' ? `
⚠️  ACTION REQUIRED:
   1. Sign up at: https://www.brevo.com/
   2. Get API key from: https://app.brevo.com/settings/keys/api
   3. Add it to server.js line 18
   4. Restart server
` : '✅ Server ready! Open http://localhost:8080 to test'}
    `);
});

// Clean up expired OTPs every minute
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
            console.log(`🗑️ Expired OTP removed for ${email}`);
        }
    }
}, 60000);
