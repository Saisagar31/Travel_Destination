// Production-Ready API Proxy Server
// Securely proxies OpenTripMap and Pexels API requests

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.API_PROXY_PORT || 3001;

// CORS configuration - allow all origins for development
const corsOptions = {
    origin: '*', // Allow all origins in development
    credentials: false,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Additional CORS headers for browsers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        apis: {
            opentripmap: !!process.env.OPENTRIPMAP_API_KEY,
            unsplash: !!process.env.UNSPLASH_ACCESS_KEY
        }
    });
});

// OpenTripMap Places Proxy
// GET /api/places?lat=36.3932&lon=25.4615&radius=5000&limit=10
app.get('/api/places', async (req, res) => {
    try {
        const { lat, lon, radius = 5000, limit = 10, kinds = 'interesting_places,tourist_facilities,cultural,natural,historic' } = req.query;

        // Validation
        if (!lat || !lon) {
            return res.status(400).json({ 
                error: 'Missing required parameters: lat and lon' 
            });
        }

        if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            return res.status(400).json({ 
                error: 'Invalid coordinates. Latitude must be -90 to 90, longitude -180 to 180' 
            });
        }

        const apiKey = process.env.OPENTRIPMAP_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'OpenTripMap API key not configured' 
            });
        }

        // Proxy request to OpenTripMap
        const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=${kinds}&limit=${limit}&apikey=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`OpenTripMap API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Return sanitized response (remove API key from any URLs if present)
        res.json(data);

    } catch (error) {
        console.error('Error proxying OpenTripMap request:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch places data',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// OpenTripMap Place Details Proxy
// GET /api/places/:xid
app.get('/api/places/:xid', async (req, res) => {
    try {
        const { xid } = req.params;

        if (!xid) {
            return res.status(400).json({ 
                error: 'Missing required parameter: xid' 
            });
        }

        const apiKey = process.env.OPENTRIPMAP_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'OpenTripMap API key not configured' 
            });
        }

        const url = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`OpenTripMap API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error proxying OpenTripMap details request:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch place details',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Unsplash Images Proxy
// GET /api/images?q=santorini&per_page=12&orientation=landscape
app.get('/api/images', async (req, res) => {
    try {
        const { q, per_page = 12, orientation = 'landscape', page = 1 } = req.query;

        // Validation
        if (!q) {
            return res.status(400).json({ 
                error: 'Missing required parameter: q (query)' 
            });
        }

        const apiKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'Unsplash API key not configured' 
            });
        }

        // Proxy request to Unsplash
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${per_page}&orientation=${orientation}&page=${page}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Unsplash API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Transform Unsplash response to match Pexels format (for compatibility)
        const transformedData = {
            total_results: data.total,
            page: page,
            per_page: per_page,
            photos: data.results.map(photo => ({
                id: photo.id,
                width: photo.width,
                height: photo.height,
                url: photo.urls.regular,
                photographer: photo.user.name,
                photographer_url: photo.user.links.html,
                src: {
                    original: photo.urls.full,
                    large: photo.urls.regular,
                    medium: photo.urls.small,
                    small: photo.urls.thumb
                },
                alt: photo.alt_description || q
            }))
        };
        
        res.json(transformedData);

    } catch (error) {
        console.error('Error proxying Unsplash request:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch images',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Rate limiting info endpoint (optional - helps with debugging)
app.get('/api/rate-limits', (req, res) => {
    res.json({
        unsplash: {
            limit: '50 requests/hour (demo/free tier)',
            docs: 'https://unsplash.com/documentation'
        },
        opentripmap: {
            limit: '1000 requests/day (free tier)',
            docs: 'https://opentripmap.io/docs'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /api/health',
            'GET /api/places?lat=&lon=&radius=&limit=&kinds=',
            'GET /api/places/:xid',
            'GET /api/images?q=&per_page=&orientation=',
            'GET /api/rate-limits'
        ]
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Travel API Proxy Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 API Keys configured: OpenTripMap=${!!process.env.OPENTRIPMAP_API_KEY}, Unsplash=${!!process.env.UNSPLASH_ACCESS_KEY}`);
    console.log(`\n📚 Available endpoints:`);
    console.log(`   GET  /api/health`);
    console.log(`   GET  /api/places?lat=&lon=`);
    console.log(`   GET  /api/places/:xid`);
    console.log(`   GET  /api/images?q= (Unsplash)`);
    console.log(`   GET  /api/rate-limits\n`);
});

module.exports = app; // Export for testing or serverless deployment
