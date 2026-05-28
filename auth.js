// Authentication System with Session-based Login and Email OTP Verification

// Session storage for demo purposes (in production, use backend session management)
let sessionData = {
    email: null,
    otp: null,
    otpExpiry: null,
    sessionId: null,
    isAuthenticated: false
};

// Resend timer
let resendTimer = null;
let resendCountdown = 60;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Authentication system initialized');
    
    // Check if already authenticated
    checkExistingSession();
    
    // Setup OTP inputs
    setupOTPInputs();
});

// Check for existing session
function checkExistingSession() {
    const existingSession = localStorage.getItem('voyager_session');
    if (existingSession) {
        const session = JSON.parse(existingSession);
        const now = new Date().getTime();
        
        // Check if session is still valid (24 hours)
        if (session.expiresAt && session.expiresAt > now) {
            console.log('✅ Valid session found');
            // Redirect to main page
            window.location.href = 'index.html';
        } else {
            console.log('⏰ Session expired');
            localStorage.removeItem('voyager_session');
        }
    }
}

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const loginBtn = document.getElementById('login-btn');
    const messageDiv = document.getElementById('login-message');
    
    // Validate email
    if (!isValidEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    messageDiv.classList.remove('show');
    
    // Send OTP via backend
    setTimeout(async () => {
        try {
            // Send OTP via email
            const result = await sendOTPEmail(email, null);
            
            if (result.success) {
                // Backend sends OTP, we don't store it here
                sessionData.email = email;
                sessionData.otpExpiry = new Date().getTime() + (5 * 60 * 1000);
                
                // Show success message
                showMessage(messageDiv, 'OTP sent to your email! Check your inbox.', 'success');
            } else if (result.demo) {
                // Demo mode - generate OTP locally
                const otp = generateOTP();
                sessionData.email = email;
                sessionData.otp = otp;
                sessionData.otpExpiry = new Date().getTime() + (5 * 60 * 1000);
                
                showMessage(messageDiv, 'Demo Mode: Check console for OTP', 'info');
            } else {
                showMessage(messageDiv, 'Failed to send OTP. Please try again.', 'error');
                loginBtn.classList.remove('loading');
                return;
            }
            
            // Remove loading state
            loginBtn.classList.remove('loading');
            
            // Switch to OTP form after 1 second
            setTimeout(() => {
                switchToOTPForm(email);
            }, 1000);
            
        } catch (error) {
            console.error('Error:', error);
            showMessage(messageDiv, 'An error occurred. Please try again.', 'error');
            loginBtn.classList.remove('loading');
        }
    }, 1500);
}

// Switch to OTP Form
function switchToOTPForm(email) {
    const loginForm = document.getElementById('login-form');
    const otpForm = document.getElementById('otp-form');
    const userEmailSpan = document.getElementById('user-email');
    
    // Hide login form
    loginForm.classList.add('hidden');
    
    // Show OTP form
    otpForm.classList.remove('hidden');
    userEmailSpan.textContent = email;
    
    // Focus first OTP input
    const firstInput = document.querySelector('.otp-input[data-index="0"]');
    if (firstInput) firstInput.focus();
    
    // Start resend timer
    startResendTimer();
}

// Back to Login
function backToLogin() {
    const loginForm = document.getElementById('login-form');
    const otpForm = document.getElementById('otp-form');
    
    otpForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
    
    // Clear session data
    sessionData.otp = null;
    sessionData.otpExpiry = null;
    
    // Clear timer
    if (resendTimer) {
        clearInterval(resendTimer);
        resendTimer = null;
    }
}

// Setup OTP Inputs (auto-focus next input)
function setupOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');
    
    inputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Move to next input
            if (value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
        
        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();
            
            // Check if it's a 6-digit number
            if (/^\d{6}$/.test(pastedData)) {
                pastedData.split('').forEach((char, i) => {
                    if (inputs[i]) inputs[i].value = char;
                });
                inputs[5].focus();
            }
        });
    });
}

// Handle OTP Verification
function handleOTPVerification(event) {
    event.preventDefault();
    
    const verifyBtn = document.getElementById('verify-btn');
    const messageDiv = document.getElementById('otp-message');
    
    // Get OTP from inputs
    const otpInputs = document.querySelectorAll('.otp-input');
    let enteredOTP = '';
    otpInputs.forEach(input => enteredOTP += input.value);
    
    // Validate OTP length
    if (enteredOTP.length !== 6) {
        showMessage(messageDiv, 'Please enter the complete 6-digit code', 'error');
        return;
    }
    
    // Show loading state
    verifyBtn.classList.add('loading');
    messageDiv.classList.remove('show');
    
    // Verify OTP via backend
    setTimeout(async () => {
        try {
            // Check if OTP is expired
            const now = new Date().getTime();
            if (now > sessionData.otpExpiry) {
                verifyBtn.classList.remove('loading');
                showMessage(messageDiv, 'OTP has expired. Please request a new one.', 'error');
                return;
            }
            
            // Try backend verification first
            const response = await fetch('http://localhost:3000/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: sessionData.email,
                    otp: enteredOTP
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('✅ OTP verified successfully via backend');
                
                // Create session
                createSession(sessionData.email);
                
                // Show success state
                showSuccessState();
            } else {
                verifyBtn.classList.remove('loading');
                showMessage(messageDiv, data.message || 'Invalid OTP. Please try again.', 'error');
                
                // Clear inputs
                otpInputs.forEach(input => input.value = '');
                otpInputs[0].focus();
            }
        } catch (error) {
            // Fallback to local verification (demo mode)
            console.log('⚠️ Using demo mode verification');
            
            if (enteredOTP === sessionData.otp) {
                console.log('✅ OTP verified successfully (demo)');
                
                // Create session
                createSession(sessionData.email);
                
                // Show success state
                showSuccessState();
            } else {
                verifyBtn.classList.remove('loading');
                showMessage(messageDiv, 'Invalid OTP. Please try again.', 'error');
                
                // Clear inputs
                otpInputs.forEach(input => input.value = '');
                otpInputs[0].focus();
            }
        }
    }, 1500);
}

// Create Session
function createSession(email) {
    const sessionId = generateSessionId();
    const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
    
    const session = {
        sessionId: sessionId,
        email: email,
        createdAt: new Date().getTime(),
        expiresAt: expiresAt,
        isAuthenticated: true
    };
    
    // Store in localStorage (in production, use secure httpOnly cookies)
    localStorage.setItem('voyager_session', JSON.stringify(session));
    
    sessionData = session;
    
    console.log('🎉 Session created:', sessionId);
}

// Show Success State
function showSuccessState() {
    const otpForm = document.getElementById('otp-form');
    const successState = document.getElementById('success-state');
    
    otpForm.classList.add('hidden');
    successState.classList.remove('hidden');
    
    // Show session info badge
    const sessionInfo = document.getElementById('session-info');
    sessionInfo.classList.add('show');
    
    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

// Resend OTP
async function resendOTP() {
    const messageDiv = document.getElementById('otp-message');
    const resendBtn = document.getElementById('resend-btn');
    
    // Disable button during cooldown
    if (resendBtn.disabled) return;
    
    try {
        // Send OTP via backend
        const result = await sendOTPEmail(sessionData.email, null);
        
        if (result.success) {
            // Update expiry
            sessionData.otpExpiry = new Date().getTime() + (5 * 60 * 1000);
            showMessage(messageDiv, 'New OTP sent to your email!', 'success');
        } else if (result.demo) {
            // Demo mode
            const otp = generateOTP();
            sessionData.otp = otp;
            sessionData.otpExpiry = new Date().getTime() + (5 * 60 * 1000);
            showMessage(messageDiv, 'Demo Mode: Check console for new OTP', 'info');
        } else {
            showMessage(messageDiv, 'Failed to resend OTP. Please try again.', 'error');
            return;
        }
    } catch (error) {
        // Fallback to demo mode
        const otp = generateOTP();
        sessionData.otp = otp;
        sessionData.otpExpiry = new Date().getTime() + (5 * 60 * 1000);
        showMessage(messageDiv, 'Demo Mode: Check console for new OTP', 'info');
    }
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
    document.querySelector('.otp-input[data-index="0"]').focus();
    
    // Restart timer
    startResendTimer();
}

// Start Resend Timer
function startResendTimer() {
    const resendBtn = document.getElementById('resend-btn');
    const timerSpan = document.getElementById('resend-timer');
    
    resendCountdown = 60;
    resendBtn.disabled = true;
    
    // Clear existing timer
    if (resendTimer) clearInterval(resendTimer);
    
    resendTimer = setInterval(() => {
        resendCountdown--;
        timerSpan.textContent = `(${resendCountdown}s)`;
        
        if (resendCountdown <= 0) {
            clearInterval(resendTimer);
            resendTimer = null;
            resendBtn.disabled = false;
            timerSpan.textContent = '';
        }
    }, 1000);
}

// Utility Functions

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'form-message show ' + type;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            element.classList.remove('show');
        }, 3000);
    }
}

// Send OTP via Email
async function sendOTPEmail(email, otp) {
    console.log('📧 Sending OTP to:', email);
    
    try {
        // Call backend API to send OTP
        const response = await fetch('http://localhost:3000/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Email sent successfully!');
            console.log(`
╔════════════════════════════════════════════╗
║          OTP EMAIL SENT                    ║
╠════════════════════════════════════════════╣
║  To: ${email.padEnd(37)}║
║  From: vaishnavvenkat48@gmail.com          ║
║  Status: Delivered                         ║
║  Valid for: 5 minutes                      ║
╚════════════════════════════════════════════╝
            `);
        } else {
            console.error('❌ Failed to send email:', data.message);
        }
        
        return data;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.log('⚠️ Server not running. Starting in demo mode...');
        console.log(`
╔════════════════════════════════════════════╗
║          DEMO MODE - OTP                   ║
╠════════════════════════════════════════════╣
║  To: ${email.padEnd(37)}║
║  OTP: ${otp}                               ║
║  Note: Start server for real emails        ║
╚════════════════════════════════════════════╝
        `);
        return { success: false, demo: true };
    }
}

// Console styling
console.log(
    '%c🔐 Authentication System Ready',
    'color: #d4af37; font-size: 16px; font-weight: bold;'
);
