// Frontend API Services - Uses Backend Proxy
// Replace direct API calls with proxy calls

// Configuration
const PROXY_BASE_URL = 'http://localhost:3001'; // Change to your deployed backend URL in production

/**
 * Fetch images from Unsplash via proxy
 * @param {string} query - Search query (e.g., "santorini greece")
 * @param {number} count - Number of images to fetch
 * @returns {Promise<Array>} Array of image objects
 */
async function getPexelsImages(query, count = 12) {
    try {
        const response = await fetch(
            `${PROXY_BASE_URL}/api/images?q=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`
        );

        if (!response.ok) {
            throw new Error(`Proxy returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        return data.photos.map(photo => ({
            id: photo.id,
            url: photo.url || photo.src.large,
            thumb: photo.src.medium,
            photographer: photo.photographer,
            alt: photo.alt || query
        }));
    } catch (error) {
        console.error('Error fetching Unsplash images via proxy:', error);
        return [];
    }
}

/**
 * Fetch nearby attractions from OpenTripMap via proxy
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} radius - Search radius in meters
 * @returns {Promise<Array>} Array of attraction objects
 */
async function getNearbyAttractions(lat, lon, radius = 5000) {
    try {
        const response = await fetch(
            `${PROXY_BASE_URL}/api/places?lat=${lat}&lon=${lon}&radius=${radius}&limit=10&kinds=interesting_places,tourist_facilities,cultural,natural,historic`
        );

        if (!response.ok) {
            throw new Error(`Proxy returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Process features and fetch details for each
        if (data.features && data.features.length > 0) {
            const attractions = await Promise.all(
                data.features.slice(0, 8).map(async (feature) => {
                    try {
                        const xid = feature.properties.xid;
                        if (!xid) return null;

                        // Fetch detailed information for this place
                        const detailResponse = await fetch(`${PROXY_BASE_URL}/api/places/${xid}`);
                        
                        if (!detailResponse.ok) return null;
                        
                        const details = await detailResponse.json();
                        
                        return {
                            name: details.name || feature.properties.name || 'Attraction',
                            kinds: details.kinds || feature.properties.kinds || '',
                            distance: Math.round(feature.properties.dist || 0),
                            info: details.wikipedia_extracts?.text?.slice(0, 150) || 
                                  details.info?.descr || 
                                  'Interesting place to visit',
                            image: details.preview?.source || details.image || null,
                            rating: details.rate || 0,
                            coordinates: {
                                lat: feature.geometry.coordinates[1],
                                lon: feature.geometry.coordinates[0]
                            }
                        };
                    } catch (error) {
                        console.error('Error fetching place details:', error);
                        return null;
                    }
                })
            );
            
            return attractions.filter(a => a !== null && a.name && a.name !== 'Attraction');
        }
        
        return getMockAttractions();
    } catch (error) {
        console.error('Error fetching OpenTripMap attractions via proxy:', error);
        return getMockAttractions();
    }
}

/**
 * Check if the backend proxy is available
 * @returns {Promise<boolean>}
 */
async function checkProxyHealth() {
    try {
        const response = await fetch(`${PROXY_BASE_URL}/api/health`);
        const data = await response.json();
        return data.status === 'ok';
    } catch (error) {
        console.error('Proxy health check failed:', error);
        return false;
    }
}

// Mock attractions (fallback)
function getMockAttractions() {
    return [
        { 
            name: 'Local Museum', 
            kinds: 'cultural,museums', 
            distance: 500, 
            info: 'Explore local history and culture', 
            rating: 4,
            image: null 
        },
        { 
            name: 'Historic Temple', 
            kinds: 'historic,religion', 
            distance: 800, 
            info: 'Ancient religious site', 
            rating: 5,
            image: null 
        },
        { 
            name: 'Natural Park', 
            kinds: 'natural,park', 
            distance: 1200, 
            info: 'Beautiful natural landscapes', 
            rating: 4,
            image: null 
        },
        { 
            name: 'City Square', 
            kinds: 'tourist_facilities', 
            distance: 300, 
            info: 'Central gathering place', 
            rating: 3,
            image: null 
        }
    ];
}

// Export functions
window.APIServicesProxy = {
    getPexelsImages,
    getNearbyAttractions,
    checkProxyHealth,
    PROXY_BASE_URL
};
