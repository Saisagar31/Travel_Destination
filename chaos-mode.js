// 🔥 VOYAGER "CHAOS MODE" — ULTIMATE EDITION
// A deliberate, reversible, performance-safe UI meltdown
// Based on toggle.txt specifications

class ChaosMode {
    constructor() {
        this.isActive = false;
        this.intervals = [];
        this.timeouts = [];
        this.chaosLevel = 0; // Progressive: 0 → 1 → 2 → 3
        this.maxChaosLevel = 3;
        this.escalationTimer = null;
        this.audioEnabled = false;
        this.audioContext = null;
        this.sounds = {};
        this.runawayAttempts = 0;
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.secretMenuOpen = false;
        this.cursorPosition = { x: 0, y: 0 };
        this.init();
    }

    init() {
        // Print ASCII art to console
        this.printASCIIArt();
        // Create chaos mode toggle button
        this.createToggleButton();
        // Create chaos mode styles
        this.injectChaosStyles();
        // Setup Konami code listener
        this.setupKonamiCode();
        // Create secret menu
        this.createSecretMenu();
        // Track cursor position for intelligent runaway buttons
        this.setupCursorTracking();
    }

    setupCursorTracking() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPosition = { x: e.clientX, y: e.clientY };
        });
    }

    printASCIIArt() {
        console.log(`
%c
██╗   ██╗ ██████╗ ██╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
██║   ██║██╔═══██╗╚██╗ ██╔╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
██║   ██║██║   ██║ ╚████╔╝ ███████║██║  ███╗█████╗  ██████╔╝
╚██╗ ██╔╝██║   ██║  ╚██╔╝  ██╔══██║██║   ██║██╔══╝  ██╔══██╗
 ╚████╔╝ ╚██████╔╝   ██║   ██║  ██║╚██████╔╝███████╗██║  ██║
  ╚═══╝   ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                              
         🎉 CHAOS MODE LOADED 🎉
    Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
`, 'color: #667eea; font-weight: bold;');
        console.log('%c🔥 Type chaosMode.activateMaximum() for MAXIMUM CHAOS!', 'color: #e74c3c; font-size: 14px; font-weight: bold;');
    }

    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateKonamiMode();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activateKonamiMode() {
        console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #f093fb; font-size: 20px; font-weight: bold;');
        this.chaosLevel = this.maxChaosLevel;
        this.updateChaosLevelDisplay();
        if (!this.isActive) {
            this.toggle();
        } else {
            this.applyChaosEffects();
        }
        this.showConfetti();
        
        // Show custom alert
        const alertBox = document.createElement('div');
        alertBox.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎮</div>
                <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">KONAMI CODE ACTIVATED!</div>
                <div style="font-size: 16px;">MAXIMUM CHAOS UNLOCKED! 🔥</div>
            </div>
        `;
        alertBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 60px;
            border-radius: 20px;
            font-size: 18px;
            font-weight: bold;
            z-index: 99999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: konamiPulse 0.5s ease-in-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes konamiPulse {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.style.opacity = '0';
            alertBox.style.transform = 'translate(-50%, -50%) scale(0.8)';
            alertBox.style.transition = 'all 0.3s ease-out';
            setTimeout(() => {
                alertBox.remove();
                style.remove();
            }, 300);
        }, 2000);
    }

    createSecretMenu() {
        const menu = document.createElement('div');
        menu.id = 'chaos-secret-menu';
        menu.className = 'chaos-secret-menu hidden';
        menu.innerHTML = `
            <div class="chaos-menu-content">
                <h3>⚙️ Chaos Controls</h3>
                <div class="chaos-level-selector">
                    <label>Chaos Level:</label>
                    <select id="chaos-level">
                        <option value="mild">Mild 😊</option>
                        <option value="medium" selected>Medium 😈</option>
                        <option value="extreme">Extreme 🔥</option>
                        <option value="maximum">MAXIMUM 💀</option>
                    </select>
                </div>
                <div class="chaos-toggles">
                    <label><input type="checkbox" id="toggle-colors"> Techno-Color</label>
                    <label><input type="checkbox" id="toggle-spin"> Spinning</label>
                    <label><input type="checkbox" id="toggle-comic"> Comic Sans</label>
                    <label><input type="checkbox" id="toggle-gravity"> Anti-Gravity</label>
                    <label><input type="checkbox" id="toggle-runaway"> Runaway Buttons</label>
                    <label><input type="checkbox" id="toggle-shake"> Turbulence</label>
                </div>
                <button class="chaos-menu-close">Close</button>
            </div>
        `;
        document.body.appendChild(menu);

        // Add event listeners
        document.getElementById('chaos-level').addEventListener('change', (e) => {
            this.chaosLevel = e.target.value;
            console.log(`%c🎚️ Chaos Level: ${this.chaosLevel.toUpperCase()}`, 'color: #f093fb; font-size: 14px;');
        });

        menu.querySelector('.chaos-menu-close').addEventListener('click', () => {
            this.toggleSecretMenu();
        });
    }

    toggleSecretMenu() {
        const menu = document.getElementById('chaos-secret-menu');
        menu.classList.toggle('hidden');
        this.secretMenuOpen = !this.secretMenuOpen;
    }

    createToggleButton() {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'chaos-toggle';
        toggleBtn.innerHTML = 'CHAOS MODE';
        toggleBtn.className = 'chaos-toggle-btn';
        toggleBtn.addEventListener('click', () => this.toggle());
        
        // Right-click to open secret menu
        toggleBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.toggleSecretMenu();
        });
        
        document.body.appendChild(toggleBtn);
    }

    injectChaosStyles() {
        const style = document.createElement('style');
        style.id = 'chaos-styles';
        style.textContent = `
            /* Chaos Mode Toggle Button */
            .chaos-toggle-btn {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 10000;
                padding: 12px 24px;
                background: #2c3e50;
                color: white;
                border: 2px solid #34495e;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                font-size: 14px;
            }

            .chaos-toggle-btn:hover {
                background: #34495e;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            }

            .chaos-toggle-btn.active {
                background: #e74c3c;
                border-color: #c0392b;
                animation: pulse 1s infinite;
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            /* 1. GLOBAL MELTDOWN EFFECTS */
            
            /* Techno-Color Shift */
            body.chaos-mode {
                animation: hueRotate 5s linear infinite;
            }

            @keyframes hueRotate {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }

            /* The Upside Down */
            body.chaos-mode.upside-down {
                transform: rotate(180deg);
            }

            /* Comic Sans Invasion */
            body.chaos-mode.comic-sans * {
                font-family: 'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', cursive, sans-serif !important;
            }

            /* 2. HOMEPAGE CHAOS EFFECTS */
            
            /* Spinning Compass/Logo */
            body.chaos-mode .nav-logo,
            body.chaos-mode .footer-logo {
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Drunken Navigation */
            body.chaos-mode .nav-links a {
                animation: drunkNav 3s ease-in-out infinite;
            }

            body.chaos-mode .nav-links a:nth-child(1) {
                animation-delay: 0s;
            }

            body.chaos-mode .nav-links a:nth-child(2) {
                animation-delay: 0.5s;
            }

            body.chaos-mode .nav-links a:nth-child(3) {
                animation-delay: 1s;
            }

            body.chaos-mode .nav-links a:nth-child(4) {
                animation-delay: 1.5s;
            }

            @keyframes drunkNav {
                0%, 100% { 
                    transform: translate(0, 0) rotate(0deg);
                }
                25% { 
                    transform: translate(10px, -10px) rotate(5deg);
                }
                50% { 
                    transform: translate(-10px, 10px) rotate(-5deg);
                }
                75% { 
                    transform: translate(5px, 5px) rotate(3deg);
                }
            }

            /* Anti-Gravity Hero Text */
            body.chaos-mode .hero-title span {
                display: inline-block;
                animation: antigravity 4s ease-in-out infinite;
            }

            body.chaos-mode .hero-title span:nth-child(odd) {
                animation-name: floatUp;
            }

            body.chaos-mode .hero-title span:nth-child(even) {
                animation-name: floatDown;
            }

            @keyframes floatUp {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-30px) rotate(10deg); }
            }

            @keyframes floatDown {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(30px) rotate(-10deg); }
            }

            /* 3. TRANSPORTATION PAGE CHAOS */
            
            /* Turbulence Input Shake */
            body.chaos-mode input:focus,
            body.chaos-mode select:focus {
                animation: turbulence 0.5s ease-in-out infinite;
            }

            @keyframes turbulence {
                0%, 100% { transform: translateX(0); }
                10% { transform: translateX(-5px); }
                20% { transform: translateX(5px); }
                30% { transform: translateX(-5px); }
                40% { transform: translateX(5px); }
                50% { transform: translateX(-3px); }
                60% { transform: translateX(3px); }
                70% { transform: translateX(-2px); }
                80% { transform: translateX(2px); }
                90% { transform: translateX(-1px); }
            }

            /* Flying Planes */
            body.chaos-mode .plane-icon,
            body.chaos-mode [class*="icon-plane"] {
                animation: flyAround 8s ease-in-out infinite;
                position: relative;
            }

            @keyframes flyAround {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(100px, -50px) rotate(90deg); }
                50% { transform: translate(200px, 0) rotate(180deg); }
                75% { transform: translate(100px, 50px) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }

            /* 4. DESTINATIONS PAGE CHAOS */
            
            /* Deck Shuffle Effect */
            body.chaos-mode.deck-shuffle .destination-card {
                animation: cardShuffle 3s ease-in-out infinite;
                transform-origin: center;
            }

            @keyframes cardShuffle {
                0%, 100% { 
                    transform: translate(0, 0) rotate(0deg) scale(1);
                }
                50% { 
                    transform: translate(var(--random-x, 20px), var(--random-y, 20px)) 
                               rotate(var(--random-rot, 15deg)) scale(0.95);
                }
            }

            /* Bouncing Pills */
            body.chaos-mode .filter-tab {
                animation: bouncePills 2s ease-in-out infinite;
            }

            body.chaos-mode .filter-tab:nth-child(1) { animation-delay: 0s; }
            body.chaos-mode .filter-tab:nth-child(2) { animation-delay: 0.2s; }
            body.chaos-mode .filter-tab:nth-child(3) { animation-delay: 0.4s; }
            body.chaos-mode .filter-tab:nth-child(4) { animation-delay: 0.6s; }
            body.chaos-mode .filter-tab:nth-child(5) { animation-delay: 0.8s; }

            @keyframes bouncePills {
                0%, 100% { 
                    transform: translate(0, 0);
                }
                25% { 
                    transform: translate(15px, -15px);
                }
                50% { 
                    transform: translate(-15px, 15px);
                }
                75% { 
                    transform: translate(10px, 10px);
                }
            }

            /* Runaway Button */
            body.chaos-mode button.runaway-btn {
                position: relative;
                transition: all 0.3s ease;
            }

            /* Glitch Effect */
            body.chaos-mode.glitch {
                animation: glitch 0.3s infinite;
            }

            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }

            /* Crazy Rotation */
            body.chaos-mode.crazy-rotation * {
                animation: crazyRotate 5s linear infinite;
            }

            @keyframes crazyRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Matrix Rain Effect */
            .matrix-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                pointer-events: none;
                opacity: 0.3;
            }

            /* Secret Menu Styles */
            .chaos-secret-menu {
                position: fixed;
                bottom: 80px;
                left: 20px;
                background: #2c3e50;
                color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                z-index: 10001;
                min-width: 250px;
                transition: all 0.3s ease;
            }

            .chaos-secret-menu.hidden {
                opacity: 0;
                pointer-events: none;
                transform: translateY(20px);
            }

            .chaos-menu-content h3 {
                margin: 0 0 15px 0;
                color: #fff;
                font-size: 1.2rem;
                text-align: center;
            }

            .chaos-level-selector {
                margin-bottom: 15px;
            }

            .chaos-level-selector label {
                display: block;
                margin-bottom: 5px;
                font-size: 0.9rem;
            }

            .chaos-level-selector select {
                width: 100%;
                padding: 8px;
                border-radius: 5px;
                border: none;
                background: #34495e;
                color: white;
                cursor: pointer;
            }

            .chaos-toggles {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 15px;
            }

            .chaos-toggles label {
                display: flex;
                align-items: center;
                cursor: pointer;
                font-size: 0.9rem;
            }

            .chaos-toggles input[type="checkbox"] {
                margin-right: 10px;
                cursor: pointer;
            }

            .chaos-menu-close {
                width: 100%;
                padding: 10px;
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }

            .chaos-menu-close:hover {
                background: #c0392b;
            }

            /* Confetti */
            .confetti {
                position: fixed;
                width: 10px;
                height: 10px;
                background: #f0f;
                position: absolute;
                animation: confetti-fall 3s linear forwards;
                z-index: 10000;
            }

            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }

            /* World Wobble Animation */
            @keyframes worldWobble {
                0%, 100% { transform: rotateZ(0deg); }
                25% { transform: rotateZ(2deg); }
                75% { transform: rotateZ(-2deg); }
            }

            /* Fade In Out for Taunts */
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }

            /* Enhanced Spectral Shift */
            @keyframes spectrum {
                0% { filter: hue-rotate(0deg) saturate(1) contrast(1); }
                50% { filter: hue-rotate(180deg) saturate(2) contrast(1.2); }
                100% { filter: hue-rotate(360deg) saturate(1) contrast(1); }
            }

            body.chaos-mode {
                animation: spectrum 5s linear infinite;
            }

            /* Chaos Level Display Styles */
            .chaos-level-display {
                margin-bottom: 15px;
                padding: 10px;
                background: rgba(52, 73, 94, 0.5);
                border-radius: 5px;
            }

            .chaos-level-display label {
                display: block;
                margin-bottom: 5px;
                font-size: 0.9rem;
                color: #ecf0f1;
            }

            .chaos-level-indicator {
                font-size: 1.5rem;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 5px;
            }

            .chaos-progress-bar {
                width: 100%;
                height: 10px;
                background: #34495e;
                border-radius: 5px;
                overflow: hidden;
                margin-top: 5px;
            }

            .chaos-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #e74c3c);
                width: 0%;
                transition: width 0.5s ease;
            }

            .chaos-level-display small {
                display: block;
                margin-top: 5px;
                color: #95a5a6;
                font-size: 0.8rem;
            }

            .chaos-actions {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }

            .chaos-reset-btn, .chaos-max-btn {
                flex: 1;
                padding: 8px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                font-size: 0.85rem;
            }

            .chaos-reset-btn {
                background: #3498db;
                color: white;
            }

            .chaos-reset-btn:hover {
                background: #2980b9;
            }

            .chaos-max-btn {
                background: #e74c3c;
                color: white;
            }

            .chaos-max-btn:hover {
                background: #c0392b;
            }
        `;
        document.head.appendChild(style);
    }

    initAudio() {
        // Initialize Web Audio API for sound effects
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('%c🔊 Audio system initialized', 'color: #3498db;');
        } catch (e) {
            console.log('%c🔇 Audio not available', 'color: #95a5a6;');
        }
    }

    playChaosSounds() {
        if (!this.audioEnabled || !this.audioContext) return;
        
        // Play different sounds based on chaos level
        const frequency = [440, 554, 659, 880][this.chaosLevel]; // Musical notes
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('%c🔇 Audio playback error', 'color: #e74c3c;');
        }
    }

    toggle() {
        this.isActive = !this.isActive;
        const btn = document.getElementById('chaos-toggle');
        
        if (this.isActive) {
            btn.classList.add('active');
            this.activate();
        } else {
            btn.classList.remove('active');
            this.deactivate();
        }
    }

    activate() {
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea; font-weight: bold;');
        console.log('%c🎉 CHAOS MODE ACTIVATED! 🎉', 'color: #e74c3c; font-size: 18px; font-weight: bold;');
        console.log('%c🔥 ULTIMATE EDITION - Progressive Chaos Engine', 'color: #f093fb; font-size: 14px;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea; font-weight: bold;');
        
        // Reset chaos level and start progressive escalation
        this.chaosLevel = 0;
        this.updateChaosLevelDisplay();
        
        // Show confetti
        this.showConfetti();
        
        // Add chaos mode class
        document.body.classList.add('chaos-mode');
        
        // Apply initial chaos effects
        this.applyChaosEffects();
        
        // Split hero text into spans for animation
        this.splitHeroText();
        
        // Start progressive escalation (every 5 seconds)
        this.startEscalation();
        
        console.log('%c⚡ Chaos will escalate every 5 seconds! (0 → 1 → 2 → 3)', 'color: #3498db; font-style: italic;');
        console.log('%c⚡ Right-click the button for advanced controls!', 'color: #3498db; font-style: italic;');
    }

    startEscalation() {
        if (this.escalationTimer) {
            clearInterval(this.escalationTimer);
        }
        
        this.escalationTimer = setInterval(() => {
            if (!this.isActive) {
                clearInterval(this.escalationTimer);
                return;
            }
            
            // Check if auto-escalate is enabled
            const autoEscalate = document.getElementById('toggle-auto-escalate');
            if (autoEscalate && !autoEscalate.checked) {
                return;
            }
            
            if (this.chaosLevel < this.maxChaosLevel) {
                this.chaosLevel++;
                this.updateChaosLevelDisplay();
                console.log(`%c⬆️ CHAOS ESCALATING TO LEVEL ${this.chaosLevel}!`, 'color: #e67e22; font-size: 16px; font-weight: bold;');
                this.applyChaosEffects();
            } else {
                console.log('%c🔥 MAXIMUM CHAOS REACHED! 🔥', 'color: #c0392b; font-size: 18px; font-weight: bold;');
            }
        }, 5000); // Escalate every 5 seconds
        
        this.intervals.push(this.escalationTimer);
    }

    deactivate() {
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #95a5a6;');
        console.log('%c😌 Chaos Mode Deactivating...', 'color: #95a5a6; font-size: 16px;');
        console.log('%c"Chaos resolved. Welcome back, traveler."', 'color: #7f8c8d; font-style: italic;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #95a5a6;');
        
        // Show exit toast
        this.showExitToast();
        
        // Smooth exit: Reverse animations
        document.body.style.transition = 'all 0.5s ease-out';
        
        // Stop escalation timer
        if (this.escalationTimer) {
            clearInterval(this.escalationTimer);
            this.escalationTimer = null;
        }
        
        // Gradually remove effects
        setTimeout(() => {
            // Remove chaos mode class
            document.body.classList.remove('chaos-mode', 'upside-down', 'comic-sans', 
                                           'deck-shuffle', 'glitch', 'crazy-rotation',
                                           'chaos-level-0', 'chaos-level-1', 'chaos-level-2', 'chaos-level-3');
            
            // Clear body animations
            document.body.style.animation = '';
            document.body.style.transform = '';
            
            // Remove font mutiny styles
            document.querySelectorAll('.chaos-font-mutiny').forEach(el => el.remove());
            
            // Clear all intervals and timeouts
            this.intervals.forEach(id => clearInterval(id));
            this.timeouts.forEach(id => clearTimeout(id));
            this.intervals = [];
            this.timeouts = [];
            
            // Remove event listeners
            this.removeRunawayButtons();
            this.removeTurbulenceInputs();
            
            // Restore hero text
            this.restoreHeroText();
            
            // Remove matrix canvas if exists
            const canvas = document.querySelector('.matrix-canvas');
            if (canvas) {
                canvas.style.opacity = '0';
                setTimeout(() => canvas.remove(), 500);
            }
            
            // Remove confetti
            document.querySelectorAll('.confetti').forEach(c => {
                c.style.opacity = '0';
                setTimeout(() => c.remove(), 300);
            });
            
            // Reset chaos level
            this.chaosLevel = 0;
            this.runawayAttempts = 0;
            this.updateChaosLevelDisplay();
            
        }, 100);
    }

    showExitToast() {
        const toast = document.createElement('div');
        toast.textContent = '✨ Chaos resolved. Welcome back, traveler.';
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 500;
            z-index: 99999;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: slideUpFade 3s ease-in-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUpFade {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                10% { opacity: 1; transform: translateX(-50%) translateY(0); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 3000);
    }

    removeTurbulenceInputs() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.animation = '';
            if (input.dataset.originalPlaceholder) {
                input.setAttribute('placeholder', input.dataset.originalPlaceholder);
                delete input.dataset.originalPlaceholder;
            }
        });
    }

    applyChaosEffects() {
        // Apply progressive chaos effects based on current level
        console.log(`%c🎚️ Applying LEVEL ${this.chaosLevel} chaos effects...`, 'color: #9b59b6; font-weight: bold;');
        
        // Remove all previous chaos classes
        document.body.classList.remove('chaos-level-0', 'chaos-level-1', 'chaos-level-2', 'chaos-level-3');
        document.body.classList.remove('upside-down', 'comic-sans', 'deck-shuffle', 'glitch', 'crazy-rotation');
        
        // Add current level class
        document.body.classList.add(`chaos-level-${this.chaosLevel}`);
        
        switch(this.chaosLevel) {
            case 0:
                // Level 0: Hyper-Spectral Branding (hue-rotate animation already in CSS)
                console.log('%c🎨 Level 0: Hyper-Spectral Branding Shift', 'color: #3498db;');
                break;
                
            case 1:
                // Level 1: Add World Tilt + Font Mutiny
                console.log('%c🌀 Level 1: World Tilt + Font Mutiny', 'color: #f39c12;');
                this.applyWorldTilt();
                this.applyFontMutiny();
                this.applyDrunkenNavigation();
                break;
                
            case 2:
                // Level 2: Add Transportation Chaos
                console.log('%c✈️ Level 2: Transportation Chaos + Runaway Buttons', 'color: #e67e22;');
                this.applyWorldTilt();
                this.applyFontMutiny();
                this.applyDrunkenNavigation();
                this.makeButtonsRunaway();
                this.applyTurbulenceInputs();
                this.animatePlanes();
                break;
                
            case 3:
                // Level 3: MAXIMUM CHAOS - Everything!
                console.log('%c🔥 Level 3: MAXIMUM CHAOS - ALL EFFECTS!', 'color: #c0392b; font-size: 16px; font-weight: bold;');
                this.applyWorldTilt();
                this.applyFontMutiny();
                this.applyDrunkenNavigation();
                this.makeButtonsRunaway();
                this.applyTurbulenceInputs();
                this.animatePlanes();
                document.body.classList.add('deck-shuffle', 'glitch');
                this.shuffleDestinationImages();
                this.createMatrixRain();
                this.shakeScreen();
                this.showConfetti();
                
                // Dramatic upside down at max level
                setTimeout(() => {
                    if (this.isActive && this.chaosLevel === 3) {
                        document.body.classList.add('upside-down');
                    }
                }, 2000);
                break;
        }
        
        // Play audio feedback if enabled
        if (this.audioEnabled) {
            this.playChaosSounds();
        }
    }

    applyWorldTilt() {
        // Gradual wobble effect
        document.body.style.animation = 'worldWobble 3s ease-in-out infinite';
    }

    applyFontMutiny() {
        // Context-aware font changes
        document.body.classList.add('comic-sans');
        
        // Apply different fonts to different elements
        const style = document.createElement('style');
        style.className = 'chaos-font-mutiny';
        style.textContent = `
            body.chaos-mode h1, body.chaos-mode h2, body.chaos-mode h3 {
                font-family: 'Comic Sans MS', cursive !important;
            }
            body.chaos-mode button {
                font-family: 'Papyrus', fantasy !important;
            }
            body.chaos-mode .price, body.chaos-mode [class*="price"] {
                font-family: 'Impact', sans-serif !important;
            }
            body.chaos-mode p, body.chaos-mode span {
                font-family: 'Courier New', monospace !important;
            }
        `;
        document.head.appendChild(style);
    }

    applyDrunkenNavigation() {
        // Already handled by CSS animations
    }

    applyTurbulenceInputs() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', this.turbulenceHandler);
            input.addEventListener('input', this.fastTypingHandler);
        });
    }

    turbulenceHandler(e) {
        e.target.style.animation = 'turbulence 0.5s ease-in-out infinite';
    }

    fastTypingHandler(e) {
        const input = e.target;
        const placeholder = input.getAttribute('placeholder');
        const chaosPlaceholders = [
            'Are you sure?',
            'Fasten seatbelt',
            'Turbulence ahead!',
            'Hold on tight!'
        ];
        
        if (placeholder && !input.dataset.originalPlaceholder) {
            input.dataset.originalPlaceholder = placeholder;
        }
        
        input.setAttribute('placeholder', chaosPlaceholders[Math.floor(Math.random() * chaosPlaceholders.length)]);
    }

    animatePlanes() {
        // Already handled by CSS animations
    }

    splitHeroText() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        // Store original text
        if (!heroTitle.dataset.originalText) {
            heroTitle.dataset.originalText = heroTitle.textContent;
        }
        
        const text = heroTitle.dataset.originalText;
        const words = text.split(' ');
        
        heroTitle.innerHTML = words.map(word => 
            `<span>${word}</span>`
        ).join(' ');
    }

    restoreHeroText() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && heroTitle.dataset.originalText) {
            heroTitle.textContent = heroTitle.dataset.originalText;
        }
    }

    makeButtonsRunaway() {
        const buttons = document.querySelectorAll('button:not(#chaos-toggle):not(.chaos-menu-close):not(.chaos-reset-btn):not(.chaos-max-btn)');
        
        buttons.forEach(btn => {
            btn.classList.add('runaway-btn');
            
            // Store previous cursor position for prediction
            let prevX = 0, prevY = 0;
            let velocityX = 0, velocityY = 0;
            
            const runawayHandler = (e) => {
                if (!this.isActive || this.chaosLevel < 2) return;
                
                // Calculate cursor velocity (direction and speed)
                velocityX = e.clientX - prevX;
                velocityY = e.clientY - prevY;
                prevX = e.clientX;
                prevY = e.clientY;
                
                const rect = btn.getBoundingClientRect();
                const btnCenterX = rect.left + rect.width / 2;
                const btnCenterY = rect.top + rect.height / 2;
                
                // Distance from cursor to button center
                const distX = e.clientX - btnCenterX;
                const distY = e.clientY - btnCenterY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                // If cursor is approaching (within 100px), predict and escape
                if (distance < 100) {
                    // Predict where cursor will be
                    const predictedX = e.clientX + velocityX * 3;
                    const predictedY = e.clientY + velocityY * 3;
                    
                    // Calculate escape direction (opposite of predicted cursor)
                    const escapeX = btnCenterX - predictedX;
                    const escapeY = btnCenterY - predictedY;
                    
                    // Normalize and apply escape
                    const escapeMagnitude = Math.sqrt(escapeX * escapeX + escapeY * escapeY);
                    const escapeDistance = 80 + (100 - distance); // Further escape when closer
                    
                    if (escapeMagnitude > 0) {
                        const normalizedX = (escapeX / escapeMagnitude) * escapeDistance;
                        const normalizedY = (escapeY / escapeMagnitude) * escapeDistance;
                        
                        btn.style.transform = `translate(${normalizedX}px, ${normalizedY}px)`;
                        btn.style.transition = 'transform 0.3s ease-out';
                        
                        // Track attempts
                        this.runawayAttempts++;
                        
                        // After 3 attempts, taunt the user
                        if (this.runawayAttempts === 3) {
                            const taunt = document.createElement('div');
                            taunt.textContent = 'Nice try 😏';
                            taunt.style.cssText = `
                                position: fixed;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                background: rgba(0, 0, 0, 0.8);
                                color: white;
                                padding: 20px 40px;
                                border-radius: 10px;
                                font-size: 24px;
                                font-weight: bold;
                                z-index: 99999;
                                animation: fadeInOut 2s ease-in-out;
                            `;
                            document.body.appendChild(taunt);
                            
                            setTimeout(() => taunt.remove(), 2000);
                            this.runawayAttempts = 0; // Reset
                        }
                    }
                } else {
                    // Reset position when cursor moves away
                    btn.style.transform = '';
                }
            };
            
            btn.addEventListener('mousemove', runawayHandler);
            document.addEventListener('mousemove', runawayHandler);
            btn.dataset.chaosHandler = 'true';
        });
    }

    removeRunawayButtons() {
        const buttons = document.querySelectorAll('.runaway-btn');
        buttons.forEach(btn => {
            btn.classList.remove('runaway-btn');
            btn.style.transform = '';
        });
    }

    shuffleDestinationImages() {
        const cards = document.querySelectorAll('.destination-card');
        if (cards.length === 0) return;
        
        // Get all background images
        const images = Array.from(cards).map(card => {
            const style = window.getComputedStyle(card);
            return style.backgroundImage;
        });
        
        // Shuffle images
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        
        // Apply shuffled images (but keep text)
        cards.forEach((card, index) => {
            card.style.backgroundImage = shuffled[index];
        });
    }

    playChaosSounds() {
        // Optional: Add sound effects
        // You could use the Web Audio API here
        console.log('🎵 Chaos sounds would play here!');
    }

    showConfetti() {
        const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'];
        // Progressive confetti based on chaos level
        const confettiCount = [30, 60, 100, 200][this.chaosLevel] || 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(confetti);
            
            const timeout = setTimeout(() => confetti.remove(), 5000);
            this.timeouts.push(timeout);
        }
    }

    shakeScreen() {
        let shakeCount = 0;
        const shakeInterval = setInterval(() => {
            document.body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            shakeCount++;
            if (shakeCount > 20) {
                clearInterval(shakeInterval);
                document.body.style.transform = '';
            }
        }, 50);
        this.intervals.push(shakeInterval);
    }

    updateChaosLevelDisplay() {
        const btn = document.getElementById('chaos-toggle');
        if (btn) {
            const levelEmojis = ['😊', '😈', '🔥', '💀'];
            const levelNames = ['MILD', 'MEDIUM', 'EXTREME', 'MAXIMUM'];
            btn.setAttribute('data-chaos-level', this.chaosLevel);
            btn.title = `Chaos Level: ${levelNames[this.chaosLevel]} ${levelEmojis[this.chaosLevel]}`;
        }
    }

    // Public method for console activation
    activateMaximum() {
        console.log('%c💀 ACTIVATING MAXIMUM CHAOS! 💀', 'color: #c0392b; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
        this.chaosLevel = this.maxChaosLevel;
        this.updateChaosLevelDisplay();
        if (!this.isActive) {
            this.toggle();
        } else {
            this.applyChaosEffects();
        }
    }

    // Additional chaos effects
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            if (!this.isActive) return;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            drops.forEach((y, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                ctx.fillText(text, x, y * fontSize);
                
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };
        
        const interval = setInterval(draw, 33);
        this.intervals.push(interval);
    }
}

// Initialize Chaos Mode when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chaosMode = new ChaosMode();
    console.log('🎉 Chaos Mode Ready! Click the button in the top-right to activate!');
});
