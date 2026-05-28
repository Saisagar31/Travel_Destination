# 🚀 Deployment Quick Reference

## Why This Solution?

**Problem Solved:**
1. ❌ CORS errors when calling OpenTripMap/Pexels from browser
2. ❌ Exposed API keys in frontend code (security risk)

**Solution:**
1. ✅ Backend proxy hides API keys server-side
2. ✅ No CORS issues (your backend makes the API calls)
3. ✅ Production-ready architecture

---

## 🏗️ Architecture

```
Browser → api-services-proxy.js → api-proxy-server.js → OpenTripMap/Pexels
         (localhost:5500)         (localhost:3001)      (no CORS, keys hidden)
```

---

## 📦 Files Created

### Backend
- **`api-proxy-server.js`** - Express server that proxies API requests
- **`.env`** - API keys (NEVER commit to Git)
- **`.env.example`** - Template for other developers
- **`.gitignore`** - Protects `.env` from being committed
- **`vercel.json`** - Vercel deployment configuration

### Frontend
- **`api-services-proxy.js`** - Frontend service that calls your proxy

### Documentation
- **`PROXY-SETUP-GUIDE.md`** - Full setup instructions
- **`DEPLOYMENT-SUMMARY.md`** - This file

---

## 🎯 Local Development Setup (3 Steps)

### 1. Install Dependencies
```bash
cd travel-destinations
npm install
```

Installs: `express`, `cors`, `dotenv`, `node-fetch`

### 2. Start API Proxy Server
```bash
npm run start:api-proxy
```

Server runs on: `http://localhost:3001`

### 3. Update Frontend HTML
```html
<!-- Add BEFORE your existing scripts -->
<script src="api-services-proxy.js"></script>

<!-- Then use in your code -->
<script>
  // Old way (direct API calls - DON'T USE)
  // const images = await fetch('https://api.pexels.com/...');
  
  // New way (via proxy - SECURE)
  const images = await APIServicesProxy.getPexelsImages('santorini', 12);
  const places = await APIServicesProxy.getNearbyAttractions(36.39, 25.46);
</script>
```

---

## 🌐 Production Deployment

### Option 1: Vercel (RECOMMENDED) ⭐

**Why**: Simplest, free tier, auto-scaling, zero config

**Steps:**
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd travel-destinations
vercel

# 3. Add environment variables in Vercel dashboard:
#    - OPENTRIPMAP_API_KEY
#    - PEXELS_API_KEY
#    - FRONTEND_URL (your production domain)

# 4. Update frontend
# In api-services-proxy.js, change:
const PROXY_BASE_URL = 'https://your-project.vercel.app';
```

**Free Tier**: 100GB bandwidth, unlimited functions, perfect for travel site

---

### Option 2: Netlify Functions

**Steps:**
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Create netlify/functions/api.js:
const serverless = require('serverless-http');
const app = require('../../api-proxy-server');
module.exports.handler = serverless(app);

# 3. Deploy
netlify deploy --prod

# 4. Add env vars in Netlify dashboard
```

---

### Option 3: Railway

**Steps:**
1. Sign up at [railway.app](https://railway.app)
2. "New Project" → Deploy from GitHub
3. Railway auto-detects Node.js
4. Add environment variables in dashboard
5. Get URL: `https://your-app.railway.app`

**Pros**: No cold starts, always-on server

---

## 🔐 Security Checklist

✅ `.env` is in `.gitignore`  
✅ API keys never in frontend code  
✅ CORS restricted to your domain  
✅ Input validation in proxy endpoints  
✅ Error messages don't expose internals  

---

## 🧪 Testing Your Setup

### Test 1: Backend Health Check
```bash
# Terminal 1: Start proxy
npm run start:api-proxy

# Terminal 2: Test
curl http://localhost:3001/api/health
# Should return: {"status":"ok", "apis": {"opentripmap":true,"pexels":true}}
```

### Test 2: Pexels Images
```bash
curl "http://localhost:3001/api/images?q=santorini&per_page=6"
# Should return JSON with photos array
```

### Test 3: OpenTripMap Places
```bash
curl "http://localhost:3001/api/places?lat=36.3932&lon=25.4615&radius=5000"
# Should return JSON with features array
```

### Test 4: Frontend Integration
```javascript
// Open browser console on your website
await APIServicesProxy.checkProxyHealth(); // true
await APIServicesProxy.getPexelsImages('bali', 6); // array of images
await APIServicesProxy.getNearbyAttractions(36.39, 25.46); // array of places
```

---

## 📊 API Rate Limits

| API          | Free Tier Limit      | Monitor                |
|--------------|---------------------|------------------------|
| Pexels       | 200 requests/hour   | pexels.com/api         |
| OpenTripMap  | 1000 requests/day   | opentripmap.io/profile |

Check limits: `GET /api/rate-limits`

---

## 🐛 Common Issues

### "Cannot find module 'node-fetch'"
```bash
npm install node-fetch@2.7.0
```

### CORS error still happening
Check `.env` has correct `FRONTEND_URL`:
```env
FRONTEND_URL=http://localhost:5500  # For Live Server
FRONTEND_URL=http://127.0.0.1:5500  # Alternative
FRONTEND_URL=https://yourdomain.com # Production
```

### "API key not configured"
Verify `.env` exists and has both keys:
```env
OPENTRIPMAP_API_KEY=YOUR_OPENTRIPMAP_API_KEY
PEXELS_API_KEY=YOUR_PEXELS_API_KEY
```

### Images not loading
Update `PROXY_BASE_URL` in `api-services-proxy.js`:
```javascript
// Development
const PROXY_BASE_URL = 'http://localhost:3001';

// Production
const PROXY_BASE_URL = 'https://your-project.vercel.app';
```

---

## 🎓 Example Frontend Usage

```javascript
// Example: Destination Details Page
async function loadDestinationData(lat, lon, name) {
    try {
        // Load images via proxy (no CORS, no exposed keys)
        const images = await APIServicesProxy.getPexelsImages(
            `${name} travel destination`, 
            12
        );
        
        // Load nearby attractions via proxy
        const attractions = await APIServicesProxy.getNearbyAttractions(
            lat, 
            lon, 
            5000  // 5km radius
        );
        
        // Render to page
        displayImages(images);
        displayAttractions(attractions);
        
    } catch (error) {
        console.error('Failed to load data:', error);
        showFallbackContent();
    }
}

// Call it
loadDestinationData(36.3932, 25.4615, 'Santorini Greece');
```

---

## ✅ Migration Checklist

- [ ] Install dependencies: `npm install`
- [ ] Start proxy server: `npm run start:api-proxy`
- [ ] Add `api-services-proxy.js` to HTML
- [ ] Replace direct API calls with `APIServicesProxy.*`
- [ ] Test locally (all 4 tests above)
- [ ] Remove `api-config-real.js` (security risk)
- [ ] Deploy to Vercel
- [ ] Update `PROXY_BASE_URL` to production URL
- [ ] Test production deployment
- [ ] Monitor API usage dashboards

---

## 🔄 Next Steps

1. **Now**: Test locally with `npm run start:api-proxy`
2. **Next**: Deploy to Vercel with `vercel`
3. **Then**: Update frontend to use production URL
4. **Finally**: Remove old insecure API code

---

**🎉 You now have a production-ready, scalable API proxy that works beyond hackathons!**
