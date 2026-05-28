// Appwrite Authentication System
import { account } from './appwrite-config.js';

let currentEmail = '';
let userId = '';

// Handle Login - Send OTP
async function handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const loginBtn = document.getElementById('login-btn');
    const loginMessage = document.getElementById('login-message');
    
    currentEmail = emailInput.value.trim();
    
    if (!currentEmail) {
        showMessage(loginMessage, 'Please enter your email address.', 'error');
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    loginMessage.textContent = '';
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail)) {
        showMessage(loginMessage, 'Please enter a valid email address.', 'error');
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        return;
    }
    
    try {
        console.log('Sending OTP to:', currentEmail);
        
        // Create email OTP session with Appwrite
        // Note: Third parameter should be 'true' for OTP mode in some Appwrite versions
        const token = await account.createEmailToken(
            'unique()', // Let Appwrite generate unique ID
            currentEmail,
            true // phrase parameter - set to true for OTP
        );
        
        userId = token.userId;
        console.log('OTP sent successfully. User ID:', userId);
        
        // Show success and move to OTP form
        showMessage(loginMessage, 'OTP sent! Check your email inbox (and spam folder).', 'success');
        
        setTimeout(() => {
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('otp-form').classList.remove('hidden');
            document.getElementById('user-email').textContent = currentEmail;
            
            // Focus first OTP input
            document.querySelector('.otp-input[data-index="0"]').focus();
            
            // Start resend timer
            startResendTimer();
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        console.error('Error details:', {
            message: error.message,
            type: error.type,
            code: error.code,
            response: error.response
        });
        
        // Provide more specific error messages
        let errorMessage = 'Failed to send OTP. ';
        
        if (error.code === 401) {
            errorMessage += 'Invalid project configuration. Please check your Appwrite setup.';
        } else if (error.code === 429) {
            errorMessage += 'Too many requests. Please wait a few minutes and try again.';
        } else if (error.message && (error.message.includes('SMTP') || error.message.includes('email'))) {
            errorMessage += 'Email service not configured. Please set up email service in Appwrite Console.';
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Please check your internet connection and try again.';
        }
        
        showMessage(loginMessage, errorMessage, 'error');
    } finally {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
}

// Handle OTP Verification
async function handleOTPVerification(event) {
    event.preventDefault();
    
    const verifyBtn = document.getElementById('verify-btn');
    const otpMessage = document.getElementById('otp-message');
    
    // Get OTP from inputs
    const otpInputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        showMessage(otpMessage, 'Please enter the complete 6-digit code.', 'error');
        return;
    }
    
    // Show loading state
    verifyBtn.classList.add('loading');
    verifyBtn.disabled = true;
    otpMessage.textContent = '';
    
    try {
        // Verify OTP with Appwrite
        const session = await account.createSession(userId, otp);
        
        // Show success state
        document.getElementById('otp-form').classList.add('hidden');
        document.getElementById('success-state').classList.remove('hidden');
        
        // Redirect to main page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Verification error:', error);
        showMessage(otpMessage, error.message || 'Invalid OTP. Please try again.', 'error');
        
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
    } finally {
        verifyBtn.classList.remove('loading');
        verifyBtn.disabled = false;
    }
}

// Resend OTP
async function resendOTP() {
    const resendBtn = document.getElementById('resend-btn');
    const otpMessage = document.getElementById('otp-message');
    
    if (resendBtn.disabled) return;
    
    resendBtn.disabled = true;
    
    try {
        console.log('Resending OTP to:', currentEmail);
        
        // Create new email token
        const token = await account.createEmailToken(
            'unique()',
            currentEmail,
            true // phrase parameter - set to true for OTP
        );
        
        userId = token.userId;
        console.log('New OTP sent. User ID:', userId);
        
        showMessage(otpMessage, 'New OTP sent! Check your email inbox (and spam folder).', 'success');
        startResendTimer();
        
        // Clear old OTP inputs
        document.querySelectorAll('.otp-input').forEach(input => input.value = '');
        document.querySelector('.otp-input[data-index="0"]').focus();
        
    } catch (error) {
        console.error('Resend error:', error);
        console.error('Error details:', {
            message: error.message,
            type: error.type,
            code: error.code
        });
        
        let errorMessage = 'Failed to resend OTP. ';
        if (error.code === 429) {
            errorMessage += 'Too many requests. Please wait a few minutes.';
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Please try again later.';
        }
        
        showMessage(otpMessage, errorMessage, 'error');
        resendBtn.disabled = false;
    }
}

// Back to login
function backToLogin() {
    document.getElementById('otp-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
    
    // Clear messages
    document.getElementById('login-message').textContent = '';
    document.getElementById('otp-message').textContent = '';
}

// Show message helper
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'form-message';
    
    if (type === 'error') {
        element.classList.add('error');
    } else if (type === 'success') {
        element.classList.add('success');
    }
}

// Resend timer
function startResendTimer() {
    const resendBtn = document.getElementById('resend-btn');
    const resendTimer = document.getElementById('resend-timer');
    
    let timeLeft = 60; // 60 seconds
    resendBtn.disabled = true;
    
    const timer = setInterval(() => {
        timeLeft--;
        resendTimer.textContent = `(${timeLeft}s)`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            resendTimer.textContent = '';
            resendBtn.disabled = false;
        }
    }, 1000);
}

// OTP input handling
document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        // Auto-focus next input
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Only allow numbers
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    });
});

// Check if user is already logged in
async function checkAuth() {
    try {
        const user = await account.get();
        // User is logged in, redirect to main page
        window.location.href = 'index.html';
    } catch (error) {
        // User is not logged in, stay on login page
        console.log('User not authenticated');
    }
}

// Check auth on page load
if (window.location.pathname.includes('login.html')) {
    checkAuth();
}

// Make functions globally available
window.handleLogin = handleLogin;
window.handleOTPVerification = handleOTPVerification;
window.resendOTP = resendOTP;
window.backToLogin = backToLogin;
