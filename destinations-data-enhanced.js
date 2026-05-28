// Enhanced Destinations Data with API Integration

const destinationsEnhanced = {
    santorini: {
        id: 'santorini',
        name: 'Santorini',
        country: 'Greece',
        continent: 'Europe',
        tagline: 'Sunset Paradise in the Aegean',
        description: 'Experience breathtaking sunsets, white-washed buildings, and crystal blue waters in this iconic Greek island.',
        coordinates: { lat: 36.3932, lon: 25.4615 },
        timezone: 'Europe/Athens',
        currency: 'EUR',
        language: 'Greek',
        basePrice: 1500, // USD
        duration: '7 Days / 6 Nights',
        rating: 4.8,
        reviews: 2847,
        images: {
            main: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
            gallery: []
        },
        highlights: [
            'Iconic Sunset at Oia',
            'Blue Domed Churches',
            'Ancient Akrotiri Ruins',
            'Wine Tasting Tours',
            'Black Sand Beaches'
        ],
        secretSpots: [
            { name: 'Skaros Rock', description: 'Hidden hiking trail with panoramic views', image: '' },
            { name: 'Amoudi Bay', description: 'Secluded fishing village below Oia', image: '' },
            { name: 'Vlychada Beach', description: 'Moon-like landscape beach', image: '' },
            { name: 'Pyrgos Village', description: 'Traditional village away from crowds', image: '' }
        ],
        included: [
            'Round-trip flights',
            'Luxury cave hotel',
            'Daily breakfast',
            'Sunset cruise',
            'Wine tour',
            'Airport transfers'
        ],
        activities: [
            { name: 'Sunset Cruise', price: 80 },
            { name: 'Wine Tasting', price: 60 },
            { name: 'Scuba Diving', price: 120 },
            { name: 'ATV Tour', price: 70 }
        ]
    },
    
    bali: {
        id: 'bali',
        name: 'Bali',
        country: 'Indonesia',
        continent: 'Asia',
        tagline: 'Island of Gods and Beaches',
        description: 'Discover ancient temples, lush rice terraces, pristine beaches, and vibrant culture.',
        coordinates: { lat: -8.4095, lon: 115.1889 },
        timezone: 'Asia/Makassar',
        currency: 'IDR',
        language: 'Indonesian',
        basePrice: 1200,
        duration: '8 Days / 7 Nights',
        rating: 4.9,
        reviews: 3521,
        images: {
            main: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
            gallery: []
        },
        highlights: [
            'Ubud Monkey Forest',
            'Tanah Lot Temple',
            'Rice Terrace Trekking',
            'Beach Club Hopping',
            'Traditional Balinese Dance'
        ],
        secretSpots: [
            { name: 'Tukad Cepung Waterfall', description: 'Hidden waterfall inside a cave', image: '' },
            { name: 'Sidemen Valley', description: 'Untouched rice terraces', image: '' },
            { name: 'Amed Beach', description: 'Black sand beach perfect for snorkeling', image: '' },
            { name: 'Campuhan Ridge', description: 'Scenic jungle walk in Ubud', image: '' }
        ],
        included: [
            'Round-trip flights',
            'Villa with private pool',
            'Daily breakfast',
            'Temple tour',
            'Cooking class',
            'Spa treatments'
        ],
        activities: [
            { name: 'Surf Lessons', price: 50 },
            { name: 'Temple Tour', price: 40 },
            { name: 'Rice Terrace Trek', price: 35 },
            { name: 'Snorkeling Trip', price: 60 }
        ]
    },
    
    iceland: {
        id: 'iceland',
        name: 'Iceland',
        country: 'Iceland',
        continent: 'Europe',
        tagline: 'Land of Fire and Ice',
        description: 'Witness the Northern Lights, explore glaciers, and relax in geothermal hot springs.',
        coordinates: { lat: 64.9631, lon: -19.0208 },
        timezone: 'Atlantic/Reykjavik',
        currency: 'ISK',
        language: 'Icelandic',
        basePrice: 2000,
        duration: '6 Days / 5 Nights',
        rating: 4.9,
        reviews: 2134,
        images: {
            main: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200',
            gallery: []
        },
        highlights: [
            'Northern Lights',
            'Blue Lagoon',
            'Golden Circle Tour',
            'Glacier Hiking',
            'Black Sand Beaches'
        ],
        secretSpots: [
            { name: 'Reykjadalur Hot Spring', description: 'Natural hot river for bathing', image: '' },
            { name: 'Fjaðrárgljúfur Canyon', description: 'Dramatic moss-covered canyon', image: '' },
            { name: 'Kerlingarfjöll', description: 'Colorful geothermal highlands', image: '' },
            { name: 'Hvítserkur Rock', description: 'Elephant-shaped rock formation', image: '' }
        ],
        included: [
            'Round-trip flights',
            'Hotel accommodation',
            'Daily breakfast',
            'Golden Circle tour',
            'Blue Lagoon entry',
            '4x4 vehicle rental'
        ],
        activities: [
            { name: 'Northern Lights Tour', price: 100 },
            { name: 'Glacier Hiking', price: 150 },
            { name: 'Ice Cave Tour', price: 180 },
            { name: 'Whale Watching', price: 120 }
        ]
    },
    
    tokyo: {
        id: 'tokyo',
        name: 'Tokyo',
        country: 'Japan',
        continent: 'Asia',
        tagline: 'Where Tradition Meets Future',
        description: 'Experience the perfect blend of ancient temples, modern technology, and incredible cuisine.',
        coordinates: { lat: 35.6762, lon: 139.6503 },
        timezone: 'Asia/Tokyo',
        currency: 'JPY',
        language: 'Japanese',
        basePrice: 1800,
        duration: '7 Days / 6 Nights',
        rating: 4.8,
        reviews: 4129,
        images: {
            main: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
            gallery: []
        },
        highlights: [
            'Senso-ji Temple',
            'Shibuya Crossing',
            'Mount Fuji Day Trip',
            'Tsukiji Fish Market',
            'Cherry Blossom Gardens'
        ],
        secretSpots: [
            { name: 'Yanaka District', description: 'Traditional old Tokyo neighborhood', image: '' },
            { name: 'Todoroki Valley', description: 'Hidden forest gorge in the city', image: '' },
            { name: 'Omoide Yokocho', description: 'Narrow alley with tiny restaurants', image: '' },
            { name: 'Kagurazaka', description: 'Historic geisha district', image: '' }
        ],
        included: [
            'Round-trip flights',
            'Central Tokyo hotel',
            'Daily breakfast',
            'JR Pass (7 days)',
            'Sumo tournament tickets',
            'Tea ceremony experience'
        ],
        activities: [
            { name: 'Mt. Fuji Tour', price: 90 },
            { name: 'Sushi Making Class', price: 70 },
            { name: 'Robot Restaurant Show', price: 80 },
            { name: 'Kimono Experience', price: 60 }
        ]
    },
    
    maldives: {
        id: 'maldives',
        name: 'Maldives',
        country: 'Maldives',
        continent: 'Asia',
        tagline: 'Tropical Paradise on Earth',
        description: 'Luxury overwater villas, pristine beaches, and world-class diving in crystal clear waters.',
        coordinates: { lat: 3.2028, lon: 73.2207 },
        timezone: 'Indian/Maldives',
        currency: 'MVR',
        language: 'Dhivehi',
        basePrice: 2500,
        duration: '5 Days / 4 Nights',
        rating: 5.0,
        reviews: 1876,
        images: {
            main: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
            gallery: []
        },
        highlights: [
            'Overwater Bungalows',
            'Bioluminescent Beach',
            'Coral Reef Diving',
            'Underwater Restaurant',
            'Private Island Experience'
        ],
        secretSpots: [
            { name: 'Vaadhoo Island', description: 'Famous for glowing beach phenomenon', image: '' },
            { name: 'Banana Reef', description: 'Best diving spot with abundant marine life', image: '' },
            { name: 'Sandbank Picnic', description: 'Private sandbank in the middle of ocean', image: '' },
            { name: 'Manta Point', description: 'Swim with giant manta rays', image: '' }
        ],
        included: [
            'Round-trip flights',
            'Overwater villa',
            'All meals included',
            'Speedboat transfers',
            'Spa treatments',
            'Water sports equipment'
        ],
        activities: [
            { name: 'Scuba Diving', price: 150 },
            { name: 'Dolphin Cruise', price: 100 },
            { name: 'Submarine Tour', price: 200 },
            { name: 'Island Hopping', price: 120 }
        ]
    },
    
    machupicchu: {
        id: 'machupicchu',
        name: 'Machu Picchu',
        country: 'Peru',
        continent: 'South America',
        tagline: 'Lost City of the Incas',
        description: 'Trek to the ancient Inca citadel nestled high in the Andes Mountains.',
        coordinates: { lat: -13.1631, lon: -72.5450 },
        timezone: 'America/Lima',
        currency: 'PEN',
        language: 'Spanish',
        basePrice: 1600,
        duration: '6 Days / 5 Nights',
        rating: 4.9,
        reviews: 3247,
        images: {
            main: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200',
            gallery: []
        },
        highlights: [
            'Machu Picchu Ruins',
            'Inca Trail Trekking',
            'Sacred Valley Tour',
            'Cusco City Exploration',
            'Rainbow Mountain'
        ],
        secretSpots: [
            { name: 'Huayna Picchu', description: 'Steep mountain with panoramic views', image: '' },
            { name: 'Temple of the Moon', description: 'Hidden cave temple complex', image: '' },
            { name: 'Moray Terraces', description: 'Ancient agricultural laboratory', image: '' },
            { name: 'Palcoyo Mountain', description: 'Less crowded rainbow mountain', image: '' }
        ],
        included: [
            'Round-trip flights',
            'Cusco hotel',
            'Daily breakfast',
            'Machu Picchu entry',
            'Train to Aguas Calientes',
            'Professional guide'
        ],
        activities: [
            { name: 'Inca Trail Trek', price: 200 },
            { name: 'Rainbow Mountain Hike', price: 80 },
            { name: 'Zip Line Adventure', price: 90 },
            { name: 'Cooking Class', price: 50 }
        ]
    }
};

// Export data
window.destinationsEnhanced = destinationsEnhanced;
