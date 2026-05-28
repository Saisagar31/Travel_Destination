# 🌟 API Setup Guide for Voyager Travel

## Free APIs to Integrate (All FREE Tier)

### 1. ✅ OpenWeather API (Weather Data)
**What it does:** Real-time weather for all destinations

**Setup:**
1. Go to: https://openweathermap.org/api
2. Click "Sign Up" (FREE)
3. Verify your email
4. Go to "API Keys" section
5. Copy your API key
6. **Free Tier:** 1000 calls/day, 60 calls/minute

**Features:**
- Current temperature
- Weather conditions
- Humidity, wind speed
- 5-day forecast

---

### 2. ✅ Unsplash API (High-Quality Images)
**What it does:** Beautiful destination and secret spot images

**Setup:**
1. Go to: https://unsplash.com/developers
2. Click "Register as a developer"
3. Create a new app
4. Copy your "Access Key"
5. **Free Tier:** 50 requests/hour

**Features:**
- 3+ million high-quality photos
- Destination images
- Secret spot images
- Photographer credits

---

### 3. ✅ ExchangeRate API (Currency Conversion)
**What it does:** Convert USD to INR in real-time

**Setup:**
1. Go to: https://www.exchangerate-api.com/
2. Click "Get Free Key"
3. Enter your email
4. Copy API key from email
5. **Free Tier:** 1500 requests/month

**Features:**
- Real-time USD to INR conversion
- 160+ currencies supported
- Updates every 24 hours

---

### 4. ✅ Pexels API (Additional Images/Videos)
**What it does:** More free images and videos

**Setup:**
1. Go to: https://www.pexels.com/api/
2. Click "Get Started"
3. Create account
4. Copy your API key
5. **Free Tier:** 200 requests/hour

**Features:**
- Free stock photos
- HD videos
- No attribution required

---

## 🚀 Recommended Premium APIs (Optional)

### 5. Google Maps Platform
**What it does:** Interactive maps, places, directions

**Setup:**
1. Go to: https://cloud.google.com/maps-platform
2. Start free trial ($200 credit)
3. Enable Maps JavaScript API
4. Copy API key

**Features:**
- Interactive maps on destination pages
- Place reviews and ratings
- Directions and navigation
- Street View integration

**Pricing:** $7 per 1000 requests (after free credit)

---

### 6. Amadeus Travel API
**What it does:** Real flight prices, hotel bookings

**Setup:**
1. Go to: https://developers.amadeus.com/
2. Sign up for free account
3. Create app
4. Copy API credentials

**Features:**
- Real-time flight prices
- Hotel availability and prices
- Airport information
- Travel recommendations

**Free Tier:** 2000 calls/month

---

### 7. TripAdvisor API
**What it does:** Reviews, ratings, attractions

**Setup:**
1. Go to: https://www.tripadvisor.com/developers
2. Apply for API access
3. Wait for approval (3-5 days)

**Features:**
- User reviews and ratings
- Things to do
- Restaurant recommendations
- Hotel reviews

**Note:** Approval required

---

### 8. Geoapify API (Geocoding & Maps)
**What it does:** Convert addresses to coordinates, maps

**Setup:**
1. Go to: https://www.geoapify.com/
2. Sign up free
3. Copy API key

**Features:**
- Address to coordinates
- Place search
- Routing and directions
- Map tiles

**Free Tier:** 3000 requests/day

---

### 9. WorldTime API (Time Zones)
**What it does:** Get current time at destinations

**Setup:**
- No API key required!
- Just use: http://worldtimeapi.org/

**Features:**
- Current time at any location
- Timezone information
- Completely free, no limits

---

### 10. REST Countries API
**What it does:** Country information, flags, currencies

**Setup:**
- No API key required!
- Just use: https://restcountries.com/

**Features:**
- Country details
- Currencies
- Languages
- Flags and emblems

---

## 📝 How to Add Your API Keys

### Option 1: Update api-config-real.js
```javascript
const API_KEYS = {
    OPENWEATHER: 'paste_your_openweather_key_here',
    UNSPLASH: 'paste_your_unsplash_key_here',
    EXCHANGE_RATE: 'paste_your_exchange_rate_key_here',
    PEXELS: 'paste_your_pexels_key_here',
};
```

### Option 2: Environment Variables (Production)
Create a `.env` file:
```
OPENWEATHER_API_KEY=your_key_here
UNSPLASH_ACCESS_KEY=your_key_here
EXCHANGE_RATE_KEY=your_key_here
PEXELS_API_KEY=your_key_here
```

---

## 🎯 Priority APIs to Get First

**Start with these 3 FREE APIs:**
1. ✅ **ExchangeRate API** - For INR prices (ESSENTIAL)
2. ✅ **OpenWeather API** - For weather info (HIGH PRIORITY)
3. ✅ **Unsplash API** - For beautiful images (NICE TO HAVE)

**The website will work with mock data if you don't add API keys!**

---

## 🧪 Testing Your APIs

1. Get your API keys
2. Update `api-config-real.js`
3. Refresh the website
4. Check browser console for any errors
5. Prices should show in ₹ (INR)
6. Weather should show real data
7. Images should load from Unsplash

---

## 💡 Features You'll Get

✅ **Real-time prices in INR (₹)**
✅ **Live weather at each destination**
✅ **High-quality destination images**
✅ **Secret spot images**
✅ **Currency conversion**
✅ **Local time at destinations**
✅ **Best time to visit info**
✅ **Activity prices in rupees**

---

## 🆘 Need Help?

- **API not working?** Check browser console (F12) for errors
- **Rate limit exceeded?** Wait 1 hour or use different API
- **Invalid key?** Regenerate key in API dashboard
- **CORS error?** APIs should work, but contact support if needed

---

## 📊 API Usage Limits Summary

| API | Free Tier | Limit Reset |
|-----|-----------|-------------|
| OpenWeather | 1000/day | Daily |
| Unsplash | 50/hour | Hourly |
| ExchangeRate | 1500/month | Monthly |
| Pexels | 200/hour | Hourly |
| WorldTime | Unlimited | - |
| REST Countries | Unlimited | - |

---

## 🎉 You're Ready!

Get your free API keys and make your travel website come alive with real-time data!
