// Enhanced Card Renderer with INR Pricing and API Integration

async function renderEnhancedDestinations() {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    // Import API configuration
    const { API_KEYS, DESTINATION_COORDS, BASE_PRICES } = window;
    
    // Show loading state
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px;"><div class="loading-spinner"></div><p style="margin-top: 20px; color: var(--text-secondary);">Loading destinations with live pricing...</p></div>';

    try {
        // Simple INR conversion (USD to INR rate ~83)
        const USD_TO_INR = 83;
        
        const cards = [];
        
        for (const [key, destination] of Object.entries(destinationsData)) {
            const prices = BASE_PRICES[key];
            
            // Convert to INR
            const packageINR = Math.round(prices.package * USD_TO_INR);
            const perNightINR = Math.round(prices.perNight * USD_TO_INR);
            
            const card = `
                <div class="destination-card enhanced-card" 
                     data-category="${destination.category}" 
                     data-destination="${key}"
                     onclick="window.location.href='destination-details.html?id=${key}'">
                    
                    <div class="card-image-wrapper">
                        <img src="${destination.image}" alt="${destination.name}" class="card-image">
                        <div class="card-badge">${destination.category}</div>
                        <div class="card-overlay"></div>
                    </div>
                    
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="card-title">${destination.name}</h3>
                            <p class="card-location">📍 ${destination.location}</p>
                        </div>
                        
                        <p class="card-description">${destination.description.substring(0, 120)}...</p>
                        
                        <!-- Highlights Preview -->
                        <div class="card-highlights">
                            <div class="highlight-badge">🌟 ${destination.highlights.length} Experiences</div>
                            <div class="highlight-badge">🎯 ${destination.secretSpots.length} Hidden Gems</div>
                        </div>
                        
                        <!-- Pricing in INR -->
                        <div class="card-pricing">
                            <div class="price-main">
                                <span class="price-label">Starting from</span>
                                <span class="price-amount">₹${packageINR.toLocaleString('en-IN')}</span>
                            </div>
                            <div class="price-detail">
                                ₹${perNightINR.toLocaleString('en-IN')}/night
                            </div>
                        </div>
                        
                        <div class="card-footer">
                            <button class="btn-view-details" onclick="event.stopPropagation(); window.location.href='destination-details.html?id=${key}'">
                                View Details →
                            </button>
                            <button class="btn-secret-spots" onclick="event.stopPropagation(); toggleSecretSpots(event, '${key}')">
                                🔍 Hidden Gems
                            </button>
                        </div>
                        
                        <!-- Secret Spots List (Initially Hidden) -->
                        <div class="secret-spots-list" id="spots-${key}"></div>
                    </div>
                </div>
            `;
            
            cards.push(card);
        }
        
        grid.innerHTML = cards.join('');
        
        // Add hover effects and animations
        addCardAnimations();
        
    } catch (error) {
        console.error('Error rendering destinations:', error);
        grid.innerHTML = '<p style="text-align: center; color: red;">Error loading destinations. Please refresh the page.</p>';
    }
}

// Add animations to cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Load styles for enhanced cards
function loadEnhancedCardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .enhanced-card {
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .enhanced-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .card-image-wrapper {
            position: relative;
            height: 250px;
            overflow: hidden;
            border-radius: 20px 20px 0 0;
        }
        
        .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .enhanced-card:hover .card-image {
            transform: scale(1.1);
        }
        
        .card-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.95);
            color: #1a2332;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            backdrop-filter: blur(10px);
            z-index: 2;
        }
        
        .card-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
        }
        
        .card-highlights {
            display: flex;
            gap: 10px;
            margin: 15px 0;
            flex-wrap: wrap;
        }
        
        .highlight-badge {
            background: var(--bg-secondary);
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 12px;
            color: var(--text-secondary);
        }
        
        .card-pricing {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 15px 0;
        }
        
        .price-main {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .price-label {
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .price-amount {
            font-size: 24px;
            font-weight: 700;
        }
        
        .price-detail {
            font-size: 14px;
            margin-top: 8px;
            opacity: 0.9;
        }
        
        .card-footer {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .btn-view-details {
            flex: 1;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        .btn-view-details:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn-secret-spots {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        .btn-secret-spots:hover {
            background: var(--primary-gold);
            color: white;
        }
        
        .secret-spots-list {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            margin-top: 15px;
        }
        
        .secret-spots-list.active {
            max-height: 500px;
        }
        
        .secret-spot-item {
            display: flex;
            gap: 15px;
            padding: 12px;
            background: var(--bg-secondary);
            border-radius: 10px;
            margin-bottom: 10px;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .spot-icon {
            font-size: 32px;
            flex-shrink: 0;
        }
        
        .spot-info {
            flex: 1;
        }
        
        .spot-name {
            font-weight: 600;
            color: var(--primary-gold);
            margin-bottom: 5px;
        }
        
        .spot-description {
            font-size: 13px;
            color: var(--text-secondary);
        }
        
        .loading-spinner {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 4px solid rgba(102, 126, 234, 0.3);
            border-top-color: #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .card-footer {
                flex-direction: column;
            }
            
            .btn-secret-spots {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
function initializeEnhancedCards() {
    console.log('🚀 Initializing enhanced cards...');
    loadEnhancedCardStyles();
    
    // Show loading message immediately
    const grid = document.getElementById('destinations-grid');
    if (grid) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px;"><div class="loading-spinner"></div><p style="margin-top: 20px; color: var(--text-secondary);">Loading destinations with INR pricing...</p></div>';
    }
    
    // Wait for all dependencies
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds
    
    const checkDependencies = setInterval(() => {
        attempts++;
        
        const hasAPIServices = typeof window.APIServices !== 'undefined';
        const hasDestinations = typeof destinationsData !== 'undefined';
        const hasBasePrices = typeof window.BASE_PRICES !== 'undefined';
        const hasAPIConfig = window.API_CONFIG_READY === true;
        
        console.log(`Checking dependencies (attempt ${attempts}):`, {
            APIServices: hasAPIServices ? '✓' : '✗',
            destinationsData: hasDestinations ? '✓' : '✗',
            BASE_PRICES: hasBasePrices ? '✓' : '✗',
            API_CONFIG: hasAPIConfig ? '✓' : '✗'
        });
        
        if (hasAPIServices && hasDestinations && hasBasePrices && hasAPIConfig) {
            clearInterval(checkDependencies);
            console.log('✅ All dependencies loaded! Rendering destinations...');
            renderEnhancedDestinations();
        } else if (attempts >= maxAttempts) {
            clearInterval(checkDependencies);
            console.error('❌ Failed to load all dependencies:', {
                APIServices: hasAPIServices,
                destinationsData: hasDestinations,
                BASE_PRICES: hasBasePrices,
                API_CONFIG: hasAPIConfig
            });
            if (grid) {
                grid.innerHTML = '<p style="text-align: center; padding: 40px; color: red;">Error loading destinations. Please refresh the page or check the console for details.</p>';
            }
        }
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedCards);
} else {
    initializeEnhancedCards();
}

// Export for use in other scripts
window.renderEnhancedDestinations = renderEnhancedDestinations;
