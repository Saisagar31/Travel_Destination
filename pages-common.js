// Common functionality for all pages

// Load destinations dynamically for destinations page
function loadDestinationsPage() {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    const destinations = [
        {
            id: 'santorini',
            name: 'Santorini',
            location: 'Greece',
            category: 'Beach',
            description: 'Iconic whitewashed villages perched on volcanic cliffs overlooking the azure Aegean Sea',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop'
        },
        {
            id: 'bali',
            name: 'Bali',
            location: 'Indonesia',
            category: 'Adventure',
            description: 'Lush rice terraces, ancient temples, and pristine beaches create a tropical paradise',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop'
        },
        {
            id: 'iceland',
            name: 'Iceland',
            location: 'Nordic Europe',
            category: 'Nature',
            description: 'Witness the mesmerizing Northern Lights dance across glaciers and volcanic landscapes',
            image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop'
        },
        {
            id: 'tokyo',
            name: 'Tokyo',
            location: 'Japan',
            category: 'Urban',
            description: 'Where ancient traditions harmonize with cutting-edge innovation in a vibrant metropolis',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop'
        },
        {
            id: 'maldives',
            name: 'Maldives',
            location: 'Indian Ocean',
            category: 'Luxury',
            description: 'Luxurious overwater villas surrounded by crystal-clear turquoise waters',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop'
        },
        {
            id: 'machupicchu',
            name: 'Machu Picchu',
            location: 'Peru',
            category: 'Historic',
            description: 'Ancient Incan citadel nestled high in the mystical Andes Mountains',
            image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop'
        },
        {
            id: 'paris',
            name: 'Paris',
            location: 'France',
            category: 'Urban',
            description: 'The City of Light enchants with timeless romance and architectural grandeur',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop'
        },
        {
            id: 'swiss',
            name: 'Swiss Alps',
            location: 'Switzerland',
            category: 'Nature',
            description: 'Majestic peaks, pristine lakes, and charming alpine villages',
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop'
        },
        {
            id: 'dubai',
            name: 'Dubai',
            location: 'UAE',
            category: 'Luxury',
            description: 'Futuristic skyline meets Arabian tradition in this desert oasis',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'
        }
    ];

    grid.innerHTML = destinations.map(dest => `
        <article class="destination-card" data-destination="${dest.id}" data-category="${dest.category}">
            <div class="card-image-wrapper">
                <img src="${dest.image}" 
                     alt="${dest.name}" 
                     class="card-image"
                     loading="lazy">
                <div class="card-overlay"></div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${dest.name}</h3>
                    <span class="card-location">${dest.location}</span>
                </div>
                <p class="card-description">
                    ${dest.description}
                </p>
                <div class="card-footer">
                    <button class="book-now-btn" onclick="handleBooking('${dest.name}')">Book Now</button>
                    <span class="card-link">Learn More →</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on destinations page
    if (document.getElementById('destinations-grid')) {
        loadDestinationsPage();
    }
});
