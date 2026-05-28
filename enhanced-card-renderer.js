// Enhanced Destination Card Renderer with Real-time API Data

// Initialize API data on page load
let pricesInINR = {};
let weatherData = {};

// Load all destination data
async function loadDestinationData() {
    console.log('🚀 Loading real-time destination data...');
    
    // Convert all prices to INR
    for (const [key, dest] of Object.entries(destinationsEnhanced)) {
        try {
            const packagePriceINR = await APIServices.convertToINR(dest.basePrice);
            const activityPricesINR = await Promise.all(
                dest.activities.map(async (activity) => ({
                    ...activity,
                    priceINR: await APIServices.convertToINR(activity.price)
                }))
            );
            
            pricesInINR[key] = {
                package: packagePriceINR,
                activities: activityPricesINR
            };
        } catch (error) {
            console.error(`Error converting prices for ${key}:`, error);
        }
    }
    
    console.log('✅ Prices converted to INR:', pricesInINR);
    
    // Update destination cards with prices
    updateDestinationCards();
}

// Update all destination cards with enhanced data
function updateDestinationCards() {
    for (const [key, dest] of Object.entries(destinationsEnhanced)) {
        updateSingleCard(key, dest);
    }
}

// Update a single destination card
function updateSingleCard(key, dest) {
    const card = document.querySelector(`[data-destination="${key}"]`);
    if (!card) return;
    
    // Add price badge
    const priceData = pricesInINR[key];
    if (priceData) {
        const priceHTML = `
            <div class="price-badge">
                <div class="price-label">Starting from</div>
                <div class="price-amount">${APIServices.formatINR(priceData.package)}</div>
                <div class="price-duration">${dest.duration}</div>
            </div>
        `;
        
        // Find card body and prepend price
        const cardBody = card.querySelector('.card-body');
        if (cardBody && !cardBody.querySelector('.price-badge')) {
            cardBody.insertAdjacentHTML('afterbegin', priceHTML);
        }
    }
    
    // Add rating and reviews
    const ratingHTML = `
        <div class="destination-rating">
            <span class="stars">${'⭐'.repeat(Math.floor(dest.rating))}</span>
            <span class="rating-text">${dest.rating}</span>
            <span class="reviews-text">(${dest.reviews.toLocaleString()} reviews)</span>
        </div>
    `;
    
    const cardBody = card.querySelector('.card-body');
    if (cardBody && !cardBody.querySelector('.destination-rating')) {
        cardBody.insertAdjacentHTML('beforeend', ratingHTML);
    }
    
    // Load weather data
    loadWeatherForDestination(key, dest);
}

// Load weather for a destination
async function loadWeatherForDestination(key, dest) {
    const card = document.querySelector(`[data-destination="${key}"]`);
    if (!card) return;
    
    try {
        const weather = await APIServices.getWeatherData(
            dest.coordinates.lat,
            dest.coordinates.lon,
            'demo' // Will use mock data for now
        );
        
        const weatherHTML = `
            <div class="weather-widget">
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
                </div>
                <div class="weather-info">
                    <div class="weather-temp">${weather.temp}°C</div>
                    <div class="weather-desc">${weather.description}</div>
                </div>
                <div class="weather-extra">
                    <div>💧 ${weather.humidity}%</div>
                    <div>💨 ${weather.wind_speed} km/h</div>
                </div>
            </div>
        `;
        
        const cardBody = card.querySelector('.card-body');
        if (cardBody && !cardBody.querySelector('.weather-widget')) {
            cardBody.insertAdjacentHTML('beforeend', weatherHTML);
        }
        
        weatherData[key] = weather;
    } catch (error) {
        console.error(`Error loading weather for ${key}:`, error);
    }
}

// Load Pexels image for destination card
async function loadPexelsImageForCard(key, dest) {
    const card = document.querySelector(`[data-destination="${key}"]`);
    if (!card) return;
    
    try {
        // Get API key from window if available
        const apiKey = window.API_KEYS?.PEXELS || 'YOUR_PEXELS_API_KEY';
        const photos = await APIServices.getPexelsImages(`${dest.name} travel destination`, 1, apiKey);
        
        if (photos && photos.length > 0) {
            const cardImage = card.querySelector('.card-image, img');
            if (cardImage) {
                cardImage.src = photos[0].url;
                cardImage.alt = photos[0].alt;
            }
        }
    } catch (error) {
        console.error(`Error loading Pexels image for ${key}:`, error);
    }
}

// Enhanced booking modal with prices
function showBookingModal(destinationKey) {
    const dest = destinationsEnhanced[destinationKey];
    const prices = pricesInINR[destinationKey];
    
    if (!dest || !prices) return;
    
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="booking-modal-content">
            <button class="modal-close" onclick="closeBookingModal()">✕</button>
            
            <div class="modal-header">
                <h2>${dest.name}, ${dest.country}</h2>
                <p class="modal-tagline">${dest.tagline}</p>
            </div>
            
            <div class="modal-body">
                <div class="package-details">
                    <h3>Package Details</h3>
                    <div class="detail-row">
                        <span>Duration:</span>
                        <strong>${dest.duration}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Package Price:</span>
                        <strong class="price-highlight">${APIServices.formatINR(prices.package)}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Rating:</span>
                        <strong>${'⭐'.repeat(Math.floor(dest.rating))} ${dest.rating}/5</strong>
                    </div>
                </div>
                
                <div class="included-section">
                    <h3>What's Included</h3>
                    <ul class="included-list">
                        ${dest.included.map(item => `<li>✓ ${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="activities-section">
                    <h3>Optional Activities</h3>
                    <div class="activities-list">
                        ${prices.activities.map(activity => `
                            <div class="activity-item">
                                <span>${activity.name}</span>
                                <span class="activity-price">${APIServices.formatINR(activity.priceINR)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${weatherData[destinationKey] ? `
                    <div class="weather-section">
                        <h3>Current Weather</h3>
                        <div class="modal-weather">
                            <img src="https://openweathermap.org/img/wn/${weatherData[destinationKey].icon}@4x.png" alt="weather">
                            <div>
                                <div class="temp-large">${weatherData[destinationKey].temp}°C</div>
                                <div>${weatherData[destinationKey].description}</div>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="best-time-section">
                    <h3>Best Time to Visit</h3>
                    <div class="best-time-info">
                        <strong>📅 ${APIServices.getBestTimeToVisit(destinationKey).months}</strong>
                        <p>${APIServices.getBestTimeToVisit(destinationKey).reason}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <div class="total-price">
                    <span>Total Package Price:</span>
                    <span class="total-amount">${APIServices.formatINR(prices.package)}</span>
                </div>
                <button class="btn-book-now" onclick="confirmBooking('${destinationKey}')">
                    Book Now
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function confirmBooking(destinationKey) {
    const dest = destinationsEnhanced[destinationKey];
    alert(`🎉 Booking confirmed for ${dest.name}!\n\nThank you for choosing Voyager Travel.\n\nA confirmation email will be sent shortly.`);
    closeBookingModal();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof destinationsEnhanced !== 'undefined' && typeof APIServices !== 'undefined') {
        loadDestinationData();
    }
});

// Export functions
window.EnhancedCards = {
    loadDestinationData,
    showBookingModal,
    closeBookingModal,
    confirmBooking
};
