// Real-time API Services

// Exchange rate cache
let exchangeRates = null;
let lastFetchTime = null;
const CACHE_DURATION = 3600000; // 1 hour

// Get Exchange Rates (USD to INR)
async function getExchangeRates() {
    // Check cache
    if (exchangeRates && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return exchangeRates;
    }
    
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
        lastFetchTime = Date.now();
        return exchangeRates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Return fallback rate
        return { INR: 83.0 };
    }
}

// Convert USD to INR
async function convertToINR(usdAmount) {
    const rates = await getExchangeRates();
    const inrRate = rates.INR || 83.0;
    return Math.round(usdAmount * inrRate);
}

// Format currency in INR
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Get Weather Data
async function getWeatherData(lat, lon, apiKey) {
    if (!apiKey || apiKey === 'YOUR_OPENWEATHER_API_KEY') {
        // Return mock data if no API key
        return getMockWeather();
    }
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        
        return {
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind_speed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            pressure: data.main.pressure
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return getMockWeather();
    }
}

// Mock weather data (fallback)
function getMockWeather() {
    return {
        temp: 25,
        feels_like: 27,
        description: 'Clear sky',
        icon: '01d',
        humidity: 65,
        wind_speed: 15,
        pressure: 1013
    };
}

// Get Pexels Images (Primary)
async function getPexelsImages(query, count = 5, apiKey) {
    if (!apiKey || apiKey === 'YOUR_PEXELS_API_KEY') {
        return getMockImages(query, count);
    }
    
    try {
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
            return data.photos.map(img => ({
                url: img.src.large,
                thumb: img.src.medium,
                alt: img.alt || query,
                photographer: img.photographer,
                photographer_url: img.photographer_url,
                source: 'Pexels'
            }));
        }
        return getMockImages(query, count);
    } catch (error) {
        console.error('Error fetching Pexels images:', error);
        return getMockImages(query, count);
    }
}

// Get Unsplash Images (Fallback)
async function getUnsplashImages(query, count = 5, apiKey) {
    if (!apiKey || apiKey === 'YOUR_UNSPLASH_ACCESS_KEY') {
        return getMockImages(query, count);
    }
    
    try {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${apiKey}`
            }
        });
        const data = await response.json();
        
        return data.results.map(img => ({
            url: img.urls.regular,
            thumb: img.urls.small,
            alt: img.alt_description,
            photographer: img.user.name,
            photographer_url: img.user.links.html,
            source: 'Unsplash'
        }));
    } catch (error) {
        console.error('Error fetching Unsplash images:', error);
        return getMockImages(query, count);
    }
}

// Mock images (fallback)
function getMockImages(query, count) {
    const mockImages = [];
    // Enhanced search terms for better location-specific images
    const categories = ['landmark', 'city', 'tourist-attraction', 'architecture', 'skyline', 'aerial-view'];
    
    for (let i = 0; i < count; i++) {
        // Rotate through different categories to get diverse, relevant images
        const category = categories[i % categories.length];
        const searchQuery = `${encodeURIComponent(query)},${category}`;
        
        mockImages.push({
            url: `https://source.unsplash.com/800x600/?${searchQuery},${i}`,
            thumb: `https://source.unsplash.com/400x300/?${searchQuery},${i}`,
            alt: `${query} ${category}`,
            photographer: 'Unsplash',
            photographer_url: 'https://unsplash.com',
            source: 'Unsplash Source'
        });
    }
    return mockImages;
}

// Get local time at destination
function getLocalTime(timezone) {
    return new Date().toLocaleString('en-US', { 
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Calculate best time to visit
function getBestTimeToVisit(destination) {
    const bestTimes = {
        santorini: { months: 'April - October', reason: 'Warm weather, less rain' },
        bali: { months: 'April - October', reason: 'Dry season, perfect beach weather' },
        iceland: { months: 'June - August', reason: 'Midnight sun, warmest weather' },
        tokyo: { months: 'March - May, Sept - Nov', reason: 'Cherry blossoms or autumn colors' },
        maldives: { months: 'November - April', reason: 'Dry season, calm seas' },
        machupicchu: { months: 'May - September', reason: 'Dry season, best hiking conditions' }
    };
    
    return bestTimes[destination] || { months: 'Year-round', reason: 'Always beautiful' };
}

// Get nearby attractions using OpenTripMap API
async function getNearbyAttractions(lat, lon, radius = 5000, apiKey) {
    if (!apiKey || apiKey === 'YOUR_OPENTRIPMAP_API_KEY') {
        return getMockAttractions();
    }
    
    try {
        // Get places within radius
        const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=interesting_places,tourist_facilities,cultural,natural,historic&limit=10&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            // Get details for each place
            const attractions = await Promise.all(
                data.features.slice(0, 6).map(async (feature) => {
                    try {
                        const xid = feature.properties.xid;
                        const detailUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`;
                        const detailResponse = await fetch(detailUrl);
                        const details = await detailResponse.json();
                        
                        return {
                            name: details.name || feature.properties.name || 'Attraction',
                            kinds: details.kinds || feature.properties.kinds || '',
                            distance: feature.properties.dist || 0,
                            info: details.wikipedia_extracts?.text?.slice(0, 150) || details.info?.descr || 'Interesting place to visit',
                            image: details.preview?.source || details.image || null,
                            rating: details.rate || 0
                        };
                    } catch (error) {
                        return null;
                    }
                })
            );
            
            return attractions.filter(a => a !== null && a.name && a.name !== 'Attraction');
        }
        return getMockAttractions();
    } catch (error) {
        console.error('Error fetching OpenTripMap attractions:', error);
        return getMockAttractions();
    }
}

// Mock attractions (fallback)
function getMockAttractions() {
    return [
        { name: 'Local Museum', kinds: 'cultural,museums', distance: 500, info: 'Explore local history and culture', rating: 4 },
        { name: 'Historic Temple', kinds: 'historic,religion', distance: 800, info: 'Ancient religious site', rating: 5 },
        { name: 'Natural Park', kinds: 'natural,park', distance: 1200, info: 'Beautiful natural landscapes', rating: 4 },
        { name: 'City Square', kinds: 'tourist_facilities', distance: 300, info: 'Central gathering place', rating: 3 }
    ];
}

// Export functions
window.APIServices = {
    getExchangeRates,
    convertToINR,
    formatINR,
    getWeatherData,
    getPexelsImages,
    getUnsplashImages,
    getLocalTime,
    getBestTimeToVisit,
    getNearbyAttractions
};
