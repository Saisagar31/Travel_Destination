// CSS-based animations for each destination
// Each destination gets unique animated elements based on its theme

function createAnimation(destination, container) {
    container.innerHTML = ''; // Clear previous content
    
    const data = destinationsData[destination];
    
    // Apply gradient background
    container.style.background = data.gradient;
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    
    switch(destination) {
        case 'santorini':
            createSantoriniAnimation(container);
            break;
        case 'bali':
            createBaliAnimation(container);
            break;
        case 'iceland':
            createIcelandAnimation(container);
            break;
        case 'tokyo':
            createTokyoAnimation(container);
            break;
        case 'maldives':
            createMaldivesAnimation(container);
            break;
        case 'machupicchu':
            createMachuPicchuAnimation(container);
            break;
    }
}

// Santorini - Floating buildings and sun
function createSantoriniAnimation(container) {
    // Sun
    const sun = document.createElement('div');
    sun.className = 'animated-sun';
    sun.innerHTML = '☀️';
    container.appendChild(sun);
    
    // Buildings
    for (let i = 0; i < 5; i++) {
        const building = document.createElement('div');
        building.className = 'floating-building';
        building.innerHTML = i % 2 === 0 ? '🏛️' : '⛪';
        building.style.left = `${20 + i * 15}%`;
        building.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(building);
    }
    
    addStyles(`
        .animated-sun {
            position: absolute;
            top: 20%;
            right: 20%;
            font-size: 5rem;
            animation: sunPulse 3s ease-in-out infinite;
        }
        
        @keyframes sunPulse {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.1); filter: brightness(1.2); }
        }
        
        .floating-building {
            position: absolute;
            bottom: 20%;
            font-size: 3rem;
            animation: floatBuilding 4s ease-in-out infinite;
        }
        
        @keyframes floatBuilding {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    `);
}

// Bali - Palm trees and waves
function createBaliAnimation(container) {
    // Palm trees
    for (let i = 0; i < 4; i++) {
        const palm = document.createElement('div');
        palm.className = 'palm-tree';
        palm.innerHTML = '🌴';
        palm.style.left = `${15 + i * 25}%`;
        palm.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(palm);
    }
    
    // Waves
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = `wave wave-${i}`;
        container.appendChild(wave);
    }
    
    addStyles(`
        .palm-tree {
            position: absolute;
            bottom: 30%;
            font-size: 4rem;
            animation: sway 3s ease-in-out infinite;
            transform-origin: bottom center;
        }
        
        @keyframes sway {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
        }
        
        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50% 50% 0 0;
            animation: waveMove 4s ease-in-out infinite;
        }
        
        .wave-1 { opacity: 0.3; animation-delay: 0s; }
        .wave-2 { opacity: 0.2; animation-delay: 0.5s; height: 80px; }
        .wave-3 { opacity: 0.1; animation-delay: 1s; height: 60px; }
        
        @keyframes waveMove {
            0%, 100% { transform: translateX(-50px) translateY(0); }
            50% { transform: translateX(50px) translateY(-10px); }
        }
    `);
}

// Iceland - Aurora, snowflakes, and mountains
function createIcelandAnimation(container) {
    // Aurora effect
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    container.appendChild(aurora);
    
    // Snowflakes
    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄️';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;
        container.appendChild(snowflake);
    }
    
    // Mountains
    const mountains = document.createElement('div');
    mountains.className = 'mountains';
    mountains.innerHTML = '⛰️';
    container.appendChild(mountains);
    
    addStyles(`
        .aurora {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 60%;
            background: linear-gradient(180deg, 
                rgba(156, 39, 176, 0.3) 0%,
                rgba(0, 188, 212, 0.3) 50%,
                transparent 100%);
            animation: auroraFlow 8s ease-in-out infinite;
        }
        
        @keyframes auroraFlow {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 0.6; transform: translateY(-20px); }
        }
        
        .snowflake {
            position: absolute;
            top: -50px;
            font-size: 1.5rem;
            animation: snowfall linear infinite;
            opacity: 0.8;
        }
        
        @keyframes snowfall {
            to { transform: translateY(600px) rotate(360deg); }
        }
        
        .mountains {
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 6rem;
            opacity: 0.6;
        }
    `);
}

// Tokyo - Neon signs and cityscape
function createTokyoAnimation(container) {
    // Neon signs
    const neonElements = ['🗼', '🏙️', '🚇', '🎌', '🍜'];
    neonElements.forEach((emoji, i) => {
        const neon = document.createElement('div');
        neon.className = 'neon-sign';
        neon.innerHTML = emoji;
        neon.style.left = `${15 + i * 18}%`;
        neon.style.top = `${30 + (i % 2) * 20}%`;
        neon.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(neon);
    });
    
    // Grid background
    const grid = document.createElement('div');
    grid.className = 'cyber-grid';
    container.appendChild(grid);
    
    addStyles(`
        .cyber-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(233, 30, 99, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(233, 30, 99, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridScroll 20s linear infinite;
        }
        
        @keyframes gridScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
        }
        
        .neon-sign {
            position: absolute;
            font-size: 3rem;
            animation: neonGlow 2s ease-in-out infinite;
            filter: drop-shadow(0 0 10px currentColor);
        }
        
        @keyframes neonGlow {
            0%, 100% { opacity: 1; filter: brightness(1) drop-shadow(0 0 10px currentColor); }
            50% { opacity: 0.7; filter: brightness(1.5) drop-shadow(0 0 20px currentColor); }
        }
    `);
}

// Maldives - Fish, waves, and tropical elements
function createMaldivesAnimation(container) {
    // Fish
    for (let i = 0; i < 6; i++) {
        const fish = document.createElement('div');
        fish.className = 'swimming-fish';
        fish.innerHTML = '🐠';
        fish.style.top = `${20 + i * 12}%`;
        fish.style.animationDelay = `${i * 0.8}s`;
        fish.style.animationDuration = `${8 + i * 2}s`;
        container.appendChild(fish);
    }
    
    // Bubbles
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 3}s`;
        bubble.style.width = `${10 + Math.random() * 20}px`;
        bubble.style.height = bubble.style.width;
        container.appendChild(bubble);
    }
    
    addStyles(`
        .swimming-fish {
            position: absolute;
            left: -50px;
            font-size: 2.5rem;
            animation: swim linear infinite;
        }
        
        @keyframes swim {
            0% { left: -50px; transform: scaleX(1); }
            48% { transform: scaleX(1); }
            50% { transform: scaleX(-1); }
            100% { left: 110%; transform: scaleX(-1); }
        }
        
        .bubble {
            position: absolute;
            bottom: -50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: bubbleRise 6s ease-in infinite;
        }
        
        @keyframes bubbleRise {
            0% { bottom: -50px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { bottom: 110%; opacity: 0; transform: translateX(100px); }
        }
    `);
}

// Machu Picchu - Mountains and clouds
function createMachuPicchuAnimation(container) {
    // Mountain peaks
    const peaks = document.createElement('div');
    peaks.className = 'mountain-peaks';
    peaks.innerHTML = '⛰️⛰️⛰️';
    container.appendChild(peaks);
    
    // Clouds
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.innerHTML = '☁️';
        cloud.style.top = `${20 + i * 15}%`;
        cloud.style.animationDelay = `${i * 2}s`;
        cloud.style.animationDuration = `${15 + i * 3}s`;
        container.appendChild(cloud);
    }
    
    // Sun
    const sun = document.createElement('div');
    sun.className = 'mountain-sun';
    sun.innerHTML = '🌞';
    container.appendChild(sun);
    
    addStyles(`
        .mountain-peaks {
            position: absolute;
            bottom: 15%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 5rem;
            opacity: 0.7;
        }
        
        .cloud {
            position: absolute;
            left: -100px;
            font-size: 2rem;
            opacity: 0.6;
            animation: cloudDrift linear infinite;
        }
        
        @keyframes cloudDrift {
            from { left: -100px; }
            to { left: 110%; }
        }
        
        .mountain-sun {
            position: absolute;
            top: 15%;
            right: 15%;
            font-size: 4rem;
            animation: sunRotate 20s linear infinite;
        }
        
        @keyframes sunRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `);
}

// Helper function to add styles dynamically
function addStyles(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
