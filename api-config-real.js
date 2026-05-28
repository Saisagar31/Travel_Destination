// Real-time API Configuration for Voyager Travel

const API_KEYS = {
    // OpenWeather API - Get your free key at: https://openweathermap.org/api
    OPENWEATHER: 'YOUR_OPENWEATHER_API_KEY', // Free tier: 1000 calls/day
    
    // Unsplash API - Get your free key at: https://unsplash.com/developers
    UNSPLASH: 'YOUR_UNSPLASH_ACCESS_KEY', // Free tier: 50 requests/hour
    
    // ExchangeRate API - Get your free key at: https://www.exchangerate-api.com/
    EXCHANGE_RATE: 'YOUR_EXCHANGE_RATE_KEY', // Free tier: 1500 requests/month
    
    // Pexels API - Get your free key at: https://www.pexels.com/api/
    PEXELS: 'YOUR_PEXELS_API_KEY', // Free tier: 200 requests/hour
    
    // OpenTripMap API - Get your free key at: https://opentripmap.io/product
    OPENTRIPMAP: 'YOUR_OPENTRIPMAP_API_KEY', // Free tier: 1000 requests/day
};

const API_ENDPOINTS = {
    weather: 'https://api.openweathermap.org/data/2.5/weather',
    unsplash: 'https://api.unsplash.com/search/photos',
    exchangeRate: 'https://api.exchangerate-api.com/v4/latest/USD',
    pexels: 'https://api.pexels.com/v1/search',
    openTripMap: 'https://api.opentripmap.com/0.1/en/places',
};

// Destination coordinates for weather API
const DESTINATION_COORDS = {
    santorini: { lat: 36.3932, lon: 25.4615, country: 'GR' },
    bali: { lat: -8.4095, lon: 115.1889, country: 'ID' },
    iceland: { lat: 64.9631, lon: -19.0208, country: 'IS' },
    tokyo: { lat: 35.6762, lon: 139.6503, country: 'JP' },
    maldives: { lat: 3.2028, lon: 73.2207, country: 'MV' },
    machupicchu: { lat: -13.1631, lon: -72.5450, country: 'PE' }
};

// Base prices in USD (will be converted to INR)
const BASE_PRICES = {
    santorini: {
        package: 1500,
        perNight: 200,
        activities: 150
    },
    bali: {
        package: 1200,
        perNight: 150,
        activities: 100
    },
    iceland: {
        package: 2000,
        perNight: 250,
        activities: 200
    },
    tokyo: {
        package: 1800,
        perNight: 220,
        activities: 180
    },
    maldives: {
        package: 2500,
        perNight: 350,
        activities: 250
    },
    machupicchu: {
        package: 1600,
        perNight: 180,
        activities: 140
    }
};

export { API_KEYS, API_ENDPOINTS, DESTINATION_COORDS, BASE_PRICES };
