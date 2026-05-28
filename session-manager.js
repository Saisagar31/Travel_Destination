// Session Manager - Handles session validation and user state across the website

class SessionManager {
    constructor() {
        this.sessionKey = 'voyager_session';
        this.session = null;
        this.init();
    }

    init() {
        this.loadSession();
        this.setupSessionCheck();
        this.displayUserInfo();
    }

    // Load session from localStorage
    loadSession() {
        try {
            const sessionData = localStorage.getItem(this.sessionKey);
            if (sessionData) {
                this.session = JSON.parse(sessionData);
                
                // Validate session
                if (!this.isSessionValid()) {
                    console.log('⏰ Session expired or invalid');
                    this.clearSession();
                } else {
                    console.log('✅ Valid session loaded:', this.session.email);
                }
            }
        } catch (error) {
            console.error('Error loading session:', error);
            this.clearSession();
        }
    }

    // Check if session is valid
    isSessionValid() {
        if (!this.session) return false;
        
        const now = new Date().getTime();
        return this.session.expiresAt && this.session.expiresAt > now;
    }

    // Get current session
    getSession() {
        return this.session;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.session && this.isSessionValid();
    }

    // Clear session
    clearSession() {
        this.session = null;
        localStorage.removeItem(this.sessionKey);
    }

    // Logout
    logout() {
        console.log('👋 Logging out user');
        this.clearSession();
        window.location.href = 'login.html';
    }

    // Setup periodic session check
    setupSessionCheck() {
        // Check session validity every minute
        setInterval(() => {
            if (!this.isSessionValid() && this.session) {
                console.log('⏰ Session expired');
                this.clearSession();
                this.showSessionExpiredNotification();
            }
        }, 60000); // Check every minute
        
        // Update session time display every second
        setInterval(() => {
            this.updateSessionTimeDisplay();
        }, 1000);
    }

    // Display user info in navbar
    displayUserInfo() {
        if (this.isAuthenticated()) {
            this.addUserMenu();
        }
    }

    // Add user menu to navbar
    addUserMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Check if user menu already exists
        if (document.getElementById('user-menu')) return;

        const email = this.session.email;
        const userInitial = email.charAt(0).toUpperCase();

        const userMenu = document.createElement('li');
        userMenu.id = 'user-menu';
        userMenu.className = 'user-menu-item';
        userMenu.innerHTML = `
            <div class="user-avatar" title="${email}">
                <span class="user-initial">${userInitial}</span>
            </div>
            <div class="user-dropdown">
                <div class="user-info">
                    <div class="user-email">${email}</div>
                    <div class="session-status">
                        <span class="status-dot"></span>
                        <span>Active Session</span>
                    </div>
                    <div class="session-time" id="session-time-display">
                        <span class="time-icon">⏱️</span>
                        <span id="time-remaining">Loading...</span>
                    </div>
                </div>
                <button class="logout-btn" onclick="sessionManager.logout()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        `;

        // Insert before the contact button
        const contactBtn = navLinks.querySelector('a.nav-btn');
        if (contactBtn && contactBtn.parentElement) {
            navLinks.insertBefore(userMenu, contactBtn.parentElement);
        } else {
            navLinks.appendChild(userMenu);
        }

        // Add styles if not already added
        this.addUserMenuStyles();
    }

    // Add user menu styles
    addUserMenuStyles() {
        if (document.getElementById('user-menu-styles')) return;

        const style = document.createElement('style');
        style.id = 'user-menu-styles';
        style.textContent = `
            .user-menu-item {
                position: relative;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
            }

            .user-avatar:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.5);
            }

            .user-initial {
                font-size: 16px;
                font-weight: 700;
                color: white;
            }

            .user-dropdown {
                position: absolute;
                top: calc(100% + 16px);
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                min-width: 260px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 1000;
                border: 1px solid rgba(212, 175, 55, 0.2);
            }

            .user-menu-item:hover .user-dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .user-info {
                padding-bottom: 16px;
                border-bottom: 1px solid rgba(26, 35, 50, 0.1);
                margin-bottom: 16px;
            }

            .user-email {
                font-size: 14px;
                font-weight: 600;
                color: #1a2332;
                margin-bottom: 8px;
                word-break: break-word;
            }

            .session-status {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                color: #6c757d;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #4ecdc4;
                animation: pulse-dot 2s ease infinite;
            }

            @keyframes pulse-dot {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .session-time {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                color: #6c757d;
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px solid rgba(26, 35, 50, 0.1);
            }

            .time-icon {
                font-size: 14px;
            }

            #time-remaining {
                font-weight: 600;
                color: #d4af37;
            }

            .logout-btn {
                width: 100%;
                padding: 12px 16px;
                background: rgba(255, 107, 107, 0.1);
                color: #ff6b6b;
                border: 1px solid rgba(255, 107, 107, 0.2);
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-family: 'Montserrat', sans-serif;
            }

            .logout-btn svg {
                width: 18px;
                height: 18px;
            }

            .logout-btn:hover {
                background: rgba(255, 107, 107, 0.2);
                transform: translateY(-2px);
            }

            /* Dark theme support */
            .dark-theme .user-dropdown {
                background: rgba(26, 35, 50, 0.98);
                border-color: rgba(212, 175, 55, 0.3);
            }

            .dark-theme .user-email {
                color: #ffffff;
            }

            .dark-theme .session-status {
                color: #b0b8c1;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .user-dropdown {
                    right: -20px;
                    min-width: 240px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Show session expired notification
    showSessionExpiredNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'session-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">⏰</div>
                <div class="notification-text">
                    <div class="notification-title">Session Expired</div>
                    <div class="notification-message">Please login again to continue</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Add notification styles
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .session-notification {
                    position: fixed;
                    top: 24px;
                    right: 24px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 20px;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    animation: slideInRight 0.5s ease;
                    border-left: 4px solid #ff6b6b;
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .notification-content {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                }

                .notification-icon {
                    font-size: 32px;
                }

                .notification-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1a2332;
                    margin-bottom: 4px;
                }

                .notification-message {
                    font-size: 14px;
                    color: #6c757d;
                }
            `;
            document.head.appendChild(style);
        }

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    // Get session time remaining
    getTimeRemaining() {
        if (!this.session) return 0;
        
        const now = new Date().getTime();
        const remaining = this.session.expiresAt - now;
        return Math.max(0, remaining);
    }

    // Format time remaining
    formatTimeRemaining() {
        const ms = this.getTimeRemaining();
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    }

    // Update session time display
    updateSessionTimeDisplay() {
        const timeDisplay = document.getElementById('time-remaining');
        if (timeDisplay && this.isAuthenticated()) {
            timeDisplay.textContent = this.formatTimeRemaining();
        }
    }
}

// Initialize session manager
const sessionManager = new SessionManager();

// Make it globally available
window.sessionManager = sessionManager;

// Console log
console.log(
    '%c🔒 Session Manager Initialized',
    'color: #4ecdc4; font-size: 14px; font-weight: bold;'
);
