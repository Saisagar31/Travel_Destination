// Professional destination data with color themes
const destinationsData = {
    santorini: {
        name: "Santorini",
        location: "Greece",
        category: "Beach",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&h=800&fit=crop",
        colorPrimary: "#0099FF",
        colorSecondary: "#00D4FF",
        colorAccent: "#FFD700",
        glassColor: "rgba(0, 153, 255, 0.2)",
        animation: "wave",
        secretSpots: [
            { name: "Oia Sunset Point", icon: "🌅", description: "Best sunset views in the world" },
            { name: "Red Beach", icon: "🏖️", description: "Unique volcanic red sand" },
            { name: "Akrotiri Ruins", icon: "🏛️", description: "Ancient Minoan city preserved in ash" },
            { name: "Santo Winery", icon: "🍷", description: "Cliffside wine tasting with caldera views" }
        ],
        description: "Perched on dramatic volcanic cliffs overlooking the sparkling Aegean Sea, Santorini is a jewel of the Greek Cyclades. This iconic destination captivates visitors with its pristine white-washed architecture, brilliant blue-domed churches, and breathtaking sunsets that paint the sky in shades of gold and crimson. Experience luxury, romance, and timeless beauty in this Mediterranean paradise.",
        highlights: [
            "Watch the world-renowned sunset from Oia's clifftop terraces",
            "Explore ancient Akrotiri, the 'Pompeii of the Aegean'",
            "Sample exquisite wines at volcanic vineyards overlooking the caldera",
            "Discover unique red and black sand beaches formed by volcanic activity",
            "Cruise around the caldera and swim in therapeutic hot springs",
            "Savor authentic Greek cuisine in traditional cliffside tavernas"
        ]
    },
    
    bali: {
        name: "Bali",
        location: "Indonesia",
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=800&fit=crop",
        colorPrimary: "#00C853",
        colorSecondary: "#76FF03",
        colorAccent: "#FFEA00",
        glassColor: "rgba(0, 200, 83, 0.2)",
        animation: "palm-sway",
        secretSpots: [
            { name: "Tegallalang Rice Terraces", icon: "🌾", description: "Instagram-famous emerald terraces" },
            { name: "Tirta Empul Temple", icon: "⛩️", description: "Sacred water purification ritual" },
            { name: "Nungnung Waterfall", icon: "💧", description: "Hidden 70m cascade through jungle" },
            { name: "Jatiluwih Rice Fields", icon: "🌿", description: "UNESCO heritage terraces" }
        ],
        description: "Known as the 'Island of the Gods,' Bali is a harmonious blend of spiritual culture, lush natural beauty, and warm hospitality. From the emerald rice terraces of Ubud to the pristine beaches of Seminyak, this Indonesian paradise offers a transformative journey through ancient temples, sacred rituals, and world-class wellness retreats. Discover inner peace while surrounded by breathtaking tropical landscapes.",
        highlights: [
            "Trek through the iconic Tegallalang rice terraces at sunrise",
            "Experience spiritual awakening at ancient temples like Tanah Lot and Uluwatu",
            "Witness mesmerizing traditional Balinese dance performances",
            "Surf world-renowned breaks along the island's stunning coastline",
            "Indulge in holistic wellness at luxury yoga and spa retreats",
            "Explore vibrant coral reefs and encounter diverse marine life"
        ]
    },
    
    iceland: {
        name: "Iceland",
        location: "Nordic Europe",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&h=800&fit=crop",
        colorPrimary: "#00E5FF",
        colorSecondary: "#B388FF",
        colorAccent: "#69F0AE",
        glassColor: "rgba(0, 229, 255, 0.2)",
        animation: "aurora",
        secretSpots: [
            { name: "Jökulsárlón Glacier Lagoon", icon: "🧊", description: "Floating icebergs in crystal water" },
            { name: "Reynisfjara Black Beach", icon: "🌊", description: "Dramatic basalt columns and caves" },
            { name: "Sólheimasandur Plane Wreck", icon: "✈️", description: "Abandoned DC-3 on black sands" },
            { name: "Seljalandsfoss", icon: "💦", description: "Walk behind the waterfall" }
        ],
        description: "A land of extraordinary contrasts where fire meets ice, Iceland showcases nature's most dramatic spectacles. From dancing Northern Lights to powerful glaciers, cascading waterfalls to geothermal hot springs, this Nordic island nation offers experiences found nowhere else on Earth. Journey through otherworldly landscapes that have remained virtually unchanged for millennia.",
        highlights: [
            "Witness the ethereal Northern Lights dancing across Arctic skies",
            "Relax in the milky-blue waters of the world-famous Blue Lagoon",
            "Explore crystal ice caves beneath ancient glaciers",
            "Marvel at the raw power of Gullfoss and Skógafoss waterfalls",
            "Drive the scenic Golden Circle route through volcanic landscapes",
            "Encounter whales, puffins, and Arctic wildlife in their natural habitat"
        ]
    },
    
    tokyo: {
        name: "Tokyo",
        location: "Japan",
        category: "Urban",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
        colorPrimary: "#FF1744",
        colorSecondary: "#E040FB",
        colorAccent: "#FFEA00",
        glassColor: "rgba(255, 23, 68, 0.2)",
        animation: "neon-pulse",
        secretSpots: [
            { name: "Omoide Yokocho", icon: "🏮", description: "Tiny izakaya alley in Shinjuku" },
            { name: "TeamLab Borderless", icon: "🎨", description: "Immersive digital art museum" },
            { name: "Nakameguro Canal", icon: "🌸", description: "Cherry blossom-lined waterway" },
            { name: "Golden Gai", icon: "🍶", description: "200+ micro-bars in tiny alleys" }
        ],
        description: "Tokyo is where 400 years of history seamlessly merges with cutting-edge innovation. This dynamic metropolis offers an intoxicating blend of ancient temples and neon-lit streets, serene gardens and bustling markets, traditional tea ceremonies and robot restaurants. Experience the perfect harmony of old and new in one of the world's most fascinating cities.",
        highlights: [
            "Experience the electrifying energy of Shibuya Crossing",
            "Find tranquility at historic temples like Senso-ji in Asakusa",
            "Enjoy panoramic city views from Tokyo Skytree",
            "Explore unique neighborhoods from fashionable Harajuku to tech-savvy Akihabara",
            "Indulge in world-class sushi at the legendary Tsukiji fish market",
            "Witness the ephemeral beauty of cherry blossoms in spring"
        ]
    },
    
    maldives: {
        name: "Maldives",
        location: "Indian Ocean",
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop",
        colorPrimary: "#00E5D4",
        colorSecondary: "#18FFFF",
        colorAccent: "#FF6E40",
        glassColor: "rgba(0, 229, 212, 0.2)",
        animation: "bubble-float",
        secretSpots: [
            { name: "Vaadhoo Island", icon: "✨", description: "Bioluminescent beach at night" },
            { name: "Banana Reef", icon: "🐠", description: "Premier diving spot with marine life" },
            { name: "Fulhadhoo Island", icon: "🏝️", description: "Untouched local island paradise" },
            { name: "Hanifaru Bay", icon: "🦈", description: "Manta ray feeding frenzy" }
        ],
        description: "A tropical paradise consisting of 1,190 coral islands scattered across the Indian Ocean, the Maldives epitomizes luxury and natural beauty. Crystal-clear turquoise waters, powder-white beaches, and some of the world's most spectacular marine life create an idyllic sanctuary for romance and relaxation. Stay in overwater villas where the ocean is your front yard and paradise is your everyday reality.",
        highlights: [
            "Stay in luxurious overwater bungalows with direct ocean access",
            "Dive or snorkel with majestic manta rays and gentle whale sharks",
            "Enjoy intimate candlelit dinners on private sandbanks under the stars",
            "Experience the magical glow of bioluminescent plankton at night",
            "Explore vibrant coral gardens teeming with tropical marine life",
            "Indulge in world-class spa treatments with ocean views"
        ]
    },
    
    machupicchu: {
        name: "Machu Picchu",
        location: "Peru",
        category: "Historic",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&h=800&fit=crop",
        colorPrimary: "#FF6F00",
        colorSecondary: "#FFB300",
        colorAccent: "#8D6E63",
        glassColor: "rgba(255, 111, 0, 0.2)",
        animation: "mountain-rise",
        secretSpots: [
            { name: "Huayna Picchu Peak", icon: "⛰️", description: "Steep climb with panoramic views" },
            { name: "Temple of the Moon", icon: "🌙", description: "Hidden cave temple complex" },
            { name: "Inca Bridge", icon: "🌉", description: "Secret mountain pass entrance" },
            { name: "Rainbow Mountain", icon: "🌈", description: "Vibrant striped peaks nearby" }
        ],
        description: "Hidden high in the Peruvian Andes at 2,430 meters above sea level, Machu Picchu stands as one of humanity's greatest architectural achievements. This 15th-century Incan citadel, shrouded in morning mist and surrounded by soaring peaks, offers a profound connection to ancient civilizations. Walk in the footsteps of the Incas and experience the mystery and majesty of this UNESCO World Heritage wonder.",
        highlights: [
            "Trek the legendary Inca Trail through cloud forests and mountain passes",
            "Explore the sophisticated stone architecture of the ancient citadel",
            "Marvel at the precision of Incan construction without mortar",
            "Climb Huayna Picchu for breathtaking panoramic views",
            "Learn about Incan astronomy, agriculture, and engineering",
            "Discover the Sacred Valley and the historic city of Cusco"
        ]
    }
};
