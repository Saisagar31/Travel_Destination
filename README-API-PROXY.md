# 🔒 Production-Safe API Proxy Solution

## Executive Summary

Your travel website had **two critical issues**:
1. **CORS errors** - Browser blocked direct API calls to OpenTripMap/Pexels
2. **Exposed API keys** - Keys visible in frontend code (security vulnerability)

**Solution implemented**: Secure Node.js backend proxy that hides keys and eliminates CORS.

---

## 🎯 Why APIs Fail in Browser

### Issue 1: CORS (Cross-Origin Resource Sharing)

```
❌ Browser → api.pexels.com
   ⛔ BLOCKED: "No 'Access-Control-Allow-Origin' header"
```

**Why it happens**: 
- Pexels/OpenTripMap servers don't allow requests from random websites
- Browser security prevents cross-origin API calls
- Even with valid API keys, browser blocks the response

### Issue 2: Exposed API Keys

```javascript
// ❌ INSECURE - in api-config-real.js
const API_KEYS = {
    PEXELS: 'YOUR_PEXELS_API_KEY',
    OPENTRIPMAP: 'YOUR_OPENTRIPMAP_API_KEY'
};
```

**Why it's dangerous**:
- Anyone can view page source and steal your keys
- Malicious users can exhaust your API quota
- Keys can be used on other websites
- Violation of API terms of service

---

## ✅ The Solution: Backend Proxy

### Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Browser   │─────▶│  Your Backend    │─────▶│  External APIs  │
│             │      │  (Express Server)│      │  (Pexels/       │
│ No API keys │      │  Keys in .env ✓  │      │   OpenTripMap)  │
│ No CORS ✓   │◀─────│  CORS enabled ✓  │◀─────│                 │
└─────────────┘      └──────────────────┘      └─────────────────┘
```

### How It Works

1. **Frontend** calls YOUR backend: `http://localhost:3001/api/images?q=santorini`
2. **Backend** validates request, adds API key, calls Pexels
3. **Pexels** returns data to YOUR backend (no CORS issue)
4. **Backend** forwards clean response to frontend

**Result**: Browser never sees API keys, never hits CORS restrictions.

---

## 📦 What Was Implemented

### Backend Files

| File | Purpose |
|------|---------|
| `api-proxy-server.js` | Express server with 4 secure endpoints |
| `.env` | API keys (hidden, gitignored) |
| `.env.example` | Template for team members |
| `.gitignore` | Prevents committing secrets |
| `vercel.json` | Vercel deployment config |
| `start-api-proxy.bat` | Windows quick-start script |

### Frontend Files

| File | Purpose |
|------|---------|
| `api-services-proxy.js` | Frontend service layer (replaces direct API calls) |
| `test-proxy-example.html` | Test page to verify setup |

### Documentation

| File | Purpose |
|------|---------|
| `PROXY-SETUP-GUIDE.md` | Detailed setup instructions |
| `DEPLOYMENT-SUMMARY.md` | Quick deployment reference |
| `README-API-PROXY.md` | This file (comprehensive explanation) |

---

## 🚀 Quick Start (3 Commands)

```bash
# 1. Install dependencies (already done)
cd travel-destinations
npm install

# 2. Start backend proxy
npm run start:api-proxy

# 3. Open test page
# Open test-proxy-example.html in browser (with Live Server)
```

**Expected output:**
```
🚀 Travel API Proxy Server running on port 3001
📍 Environment: development
🔐 API Keys configured: OpenTripMap=true, Pexels=true

📚 Available endpoints:
   GET  /api/health
   GET  /api/places?lat=&lon=
   GET  /api/places/:xid
   GET  /api/images?q=
   GET  /api/rate-limits
```

---

## 📡 API Endpoints

### 1. Health Check
```http
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "apis": {
    "opentripmap": true,
    "pexels": true
  }
}
```

### 2. Search Images (Pexels)
```http
GET /api/images?q=santorini&per_page=12&orientation=landscape

Response:
{
  "photos": [
    {
      "id": 12345,
      "src": {
        "large": "https://...",
        "medium": "https://..."
      },
      "photographer": "John Doe",
      "alt": "Beautiful Santorini sunset"
    }
  ],
  "page": 1,
  "per_page": 12,
  "total_results": 8000
}
```

### 3. Nearby Places (OpenTripMap)
```http
GET /api/places?lat=36.3932&lon=25.4615&radius=5000&limit=10

Response:
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "xid": "W123456789",
        "name": "Ancient Thera",
        "dist": 1234.5,
        "kinds": "historic,archaeological_site"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.4615, 36.3932]
      }
    }
  ]
}
```

### 4. Place Details (OpenTripMap)
```http
GET /api/places/W123456789

Response:
{
  "xid": "W123456789",
  "name": "Ancient Thera",
  "kinds": "historic,archaeological_site",
  "rate": 6,
  "wikipedia_extracts": {
    "text": "Ancient Thera is an archaeological site..."
  },
  "preview": {
    "source": "https://upload.wikimedia.org/..."
  }
}
```

---

## 💻 Frontend Usage Examples

### Old Way (Insecure - DON'T USE)

```javascript
// ❌ Direct API call - exposes key, hits CORS
const response = await fetch('https://api.pexels.com/v1/search?query=santorini', {
    headers: {
        'Authorization': 'YOUR_PEXELS_API_KEY'
    }
});
// Result: CORS error ⛔
```

### New Way (Secure - USE THIS)

```javascript
// ✅ Via proxy - no keys exposed, no CORS
const images = await APIServicesProxy.getPexelsImages('santorini', 12);
// Result: Array of image objects ✓
```

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Santorini Destination Page</title>
</head>
<body>
    <h1>Santorini, Greece</h1>
    <div id="images"></div>
    <div id="attractions"></div>

    <!-- Include proxy service -->
    <script src="api-services-proxy.js"></script>
    
    <script>
        async function loadDestination() {
            try {
                // Check if backend is running
                const isOnline = await APIServicesProxy.checkProxyHealth();
                if (!isOnline) {
                    alert('Backend not running. Start: npm run start:api-proxy');
                    return;
                }

                // Load images via proxy (secure, no CORS)
                const images = await APIServicesProxy.getPexelsImages(
                    'santorini greece travel', 
                    12
                );
                
                // Display images
                document.getElementById('images').innerHTML = images.map(img => `
                    <img src="${img.thumb}" alt="${img.alt}">
                `).join('');

                // Load nearby attractions via proxy
                const attractions = await APIServicesProxy.getNearbyAttractions(
                    36.3932,  // Santorini latitude
                    25.4615,  // Santorini longitude
                    5000      // 5km radius
                );

                // Display attractions
                document.getElementById('attractions').innerHTML = attractions.map(place => `
                    <div>
                        <h3>${place.name}</h3>
                        <p>${place.info}</p>
                        <small>${place.distance}m away</small>
                    </div>
                `).join('');

            } catch (error) {
                console.error('Error loading destination:', error);
            }
        }

        // Load on page ready
        loadDestination();
    </script>
</body>
</html>
```

---

## 🌐 Deployment (Vercel - RECOMMENDED)

### Why Vercel?

| Feature | Vercel | Netlify | Railway | Render |
|---------|--------|---------|---------|--------|
| Setup time | 2 min ⭐ | 5 min | 5 min | 5 min |
| Free tier | 100GB bandwidth | 100GB | Limited | 750hrs |
| Cold starts | ~1-2s | ~1-2s | None | None |
| Auto HTTPS | ✅ | ✅ | ✅ | ✅ |
| Best for | Static + API ⭐ | Static sites | Always-on | Side projects |

### Deployment Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from travel-destinations folder
cd travel-destinations
vercel

# Follow prompts:
# - Project name: travel-api-proxy
# - Settings: Accept defaults
# - Deploy: Yes

# 4. Add environment variables in Vercel dashboard
# Go to: https://vercel.com/your-project/settings/environment-variables
# Add:
#   OPENTRIPMAP_API_KEY = YOUR_OPENTRIPMAP_API_KEY
#   PEXELS_API_KEY = YOUR_PEXELS_API_KEY
#   FRONTEND_URL = https://yourdomain.com

# 5. Redeploy to pick up env vars
vercel --prod

# 6. Get your API URL
# Example: https://travel-api-proxy.vercel.app
```

### Update Frontend for Production

```javascript
// In api-services-proxy.js, line 5:

// Development
const PROXY_BASE_URL = 'http://localhost:3001';

// Production (after deploying to Vercel)
const PROXY_BASE_URL = 'https://travel-api-proxy.vercel.app';

// Best: Use environment detection
const PROXY_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://travel-api-proxy.vercel.app';
```

---

## 🔐 Security Best Practices

### ✅ What We Did Right

1. **Environment Variables**: API keys in `.env`, never in code
2. **Gitignore**: `.env` can't be committed accidentally
3. **CORS Restriction**: Only your frontend can call the proxy
4. **Input Validation**: Lat/lon ranges checked, query params sanitized
5. **Error Handling**: Internal errors don't expose sensitive info
6. **No Key Leakage**: API keys never sent to browser

### 🛡️ Production Hardening

```javascript
// In production .env, restrict CORS to your actual domain
FRONTEND_URL=https://yourdomain.com

// Not this (allows any site to use your proxy)
FRONTEND_URL=*  // ❌ DON'T DO THIS
```

### 🔍 Monitoring API Usage

**Pexels Dashboard**: https://www.pexels.com/api/
- Check requests/hour
- Upgrade if needed ($20/mo for 20k requests/hour)

**OpenTripMap Dashboard**: https://opentripmap.io/profile
- Check requests/day
- Free tier: 1000/day
- Paid tier: $9/mo for 10k/day

---

## 🧪 Testing Checklist

### Local Testing

```bash
# Terminal 1: Start proxy
npm run start:api-proxy

# Terminal 2: Test endpoints
curl http://localhost:3001/api/health
curl "http://localhost:3001/api/images?q=bali&per_page=3"
curl "http://localhost:3001/api/places?lat=36.3932&lon=25.4615"

# Browser: Open test-proxy-example.html
# Should see: ✅ Backend connected
# Click: Test Both APIs
# Should see: Images and attractions loaded
```

### Production Testing

```bash
# After Vercel deployment
curl https://travel-api-proxy.vercel.app/api/health

# Update PROXY_BASE_URL in api-services-proxy.js
# Open your production website
# Check browser console for errors
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"

**Cause**: Dependencies not installed  
**Fix**:
```bash
cd travel-destinations
npm install
```

---

### Issue: CORS error in browser

**Cause**: `FRONTEND_URL` mismatch  
**Fix**: Check `.env` has correct URL
```env
# If using Live Server on port 5500
FRONTEND_URL=http://localhost:5500

# If using different port
FRONTEND_URL=http://localhost:8080

# Production
FRONTEND_URL=https://yourdomain.com
```

---

### Issue: "API key not configured"

**Cause**: `.env` file missing or incorrect  
**Fix**: Verify `.env` exists in `travel-destinations/` folder
```bash
# Check file exists
ls -la travel-destinations/.env

# Verify contents
cat travel-destinations/.env
```

---

### Issue: Backend not starting

**Cause**: Port 3001 already in use  
**Fix**: Change port in `.env`
```env
API_PROXY_PORT=3002
```

Then update `PROXY_BASE_URL` in `api-services-proxy.js`:
```javascript
const PROXY_BASE_URL = 'http://localhost:3002';
```

---

### Issue: Images not loading

**Cause**: Wrong proxy URL  
**Fix**: Verify URL matches backend
```javascript
// Check backend is running on correct port
console.log(APIServicesProxy.PROXY_BASE_URL);

// Should match:
// Development: http://localhost:3001
// Production: https://your-vercel-url.vercel.app
```

---

## 📊 Performance Considerations

### API Rate Limits

| API | Free Tier | Paid Tier | Our Usage |
|-----|-----------|-----------|-----------|
| Pexels | 200 req/hour | 20k req/hour ($20/mo) | ~10-50/hour |
| OpenTripMap | 1000 req/day | 10k req/day ($9/mo) | ~100-500/day |

### Optimization Tips

1. **Cache responses** (future enhancement)
   ```javascript
   // Add Redis or in-memory cache for popular destinations
   ```

2. **Lazy load images** (already optimal)
   ```javascript
   // Pexels returns optimized thumbnails
   ```

3. **Batch requests** (for multiple destinations)
   ```javascript
   // Fetch all attractions in one request instead of multiple
   ```

---

## ✅ Migration Checklist

- [x] Install dependencies: `npm install`
- [x] Create `.env` with API keys
- [x] Create `api-proxy-server.js`
- [x] Create `api-services-proxy.js`
- [ ] Start proxy: `npm run start:api-proxy`
- [ ] Test with `test-proxy-example.html`
- [ ] Update HTML files to include `api-services-proxy.js`
- [ ] Replace direct API calls with `APIServicesProxy.*`
- [ ] Remove `api-config-real.js` (security risk)
- [ ] Deploy to Vercel
- [ ] Update `PROXY_BASE_URL` to production URL
- [ ] Test production deployment
- [ ] Monitor API usage dashboards

---

## 🎓 Key Takeaways

### What You Learned

1. **CORS exists to protect users**, not annoy developers
2. **Never expose API keys in frontend code** - always use backend
3. **Proxy pattern** is production-standard for API integrations
4. **Environment variables** keep secrets out of Git
5. **Vercel serverless** is perfect for small-medium traffic APIs

### Scales Beyond Hackathons

- ✅ Production-ready security
- ✅ Proper error handling
- ✅ Input validation
- ✅ Easy deployment
- ✅ Monitor & scale
- ✅ No hacks or workarounds

---

## 📞 Next Steps

1. **Now**: Test locally (`npm run start:api-proxy`)
2. **Today**: Deploy to Vercel (`vercel`)
3. **This Week**: Integrate into all destination pages
4. **Future**: Add caching, rate limiting, analytics

---

## 🔗 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Express Docs**: https://expressjs.com/
- **Pexels API**: https://www.pexels.com/api/documentation/
- **OpenTripMap API**: https://opentripmap.io/docs

---

**Built with production standards. No shortcuts. No hacks. Just solid engineering.** 🚀
