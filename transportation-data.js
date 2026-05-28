// Transportation Data & Functions

// Sample Flight Data
const flightData = [
    {
        from: 'New York',
        to: 'Paris',
        departure: '10:00 AM',
        arrival: '11:45 PM',
        duration: '7h 45m',
        price: 450,
        airline: 'Air France',
        features: ['WiFi', 'Meals', 'Entertainment', 'USB Charging']
    },
    {
        from: 'London',
        to: 'Tokyo',
        departure: '01:00 PM',
        arrival: '09:30 AM +1',
        duration: '11h 30m',
        price: 680,
        airline: 'British Airways',
        features: ['WiFi', 'Meals', 'Lie-flat Seats', 'Entertainment']
    },
    {
        from: 'Los Angeles',
        to: 'Bali',
        departure: '11:00 PM',
        arrival: '06:30 AM +2',
        duration: '16h 30m',
        price: 520,
        airline: 'Singapore Airlines',
        features: ['WiFi', 'Premium Meals', 'Entertainment', 'Comfort Kit']
    },
    {
        from: 'Miami',
        to: 'Santorini',
        departure: '08:00 AM',
        arrival: '11:15 PM',
        duration: '12h 15m',
        price: 590,
        airline: 'Aegean Airlines',
        features: ['Meals', 'Entertainment', 'USB Charging']
    },
    {
        from: 'Chicago',
        to: 'Iceland',
        departure: '06:00 PM',
        arrival: '05:30 AM +1',
        duration: '6h 30m',
        price: 420,
        airline: 'Icelandair',
        features: ['WiFi', 'Snacks', 'Entertainment']
    },
    {
        from: 'Sydney',
        to: 'Maldives',
        departure: '09:00 AM',
        arrival: '03:45 PM',
        duration: '10h 45m',
        price: 750,
        airline: 'Emirates',
        features: ['WiFi', 'Gourmet Meals', 'Lie-flat Seats', 'Lounge Access']
    }
];

// Sample Bus Data
const busData = [
    {
        from: 'Tokyo',
        to: 'Kyoto',
        departure: '08:00 AM',
        arrival: '10:30 AM',
        duration: '2h 30m',
        price: 45,
        operator: 'JR Highway Bus',
        features: ['WiFi', 'AC', 'USB Charging', 'Reclining Seats']
    },
    {
        from: 'Paris',
        to: 'London',
        departure: '10:00 AM',
        arrival: '05:15 PM',
        duration: '7h 15m',
        price: 65,
        operator: 'FlixBus',
        features: ['WiFi', 'Toilet', 'Snacks', 'Entertainment']
    },
    {
        from: 'Barcelona',
        to: 'Madrid',
        departure: '09:00 AM',
        arrival: '04:30 PM',
        duration: '7h 30m',
        price: 38,
        operator: 'ALSA',
        features: ['WiFi', 'AC', 'Movies', 'USB Charging']
    },
    {
        from: 'New York',
        to: 'Boston',
        departure: '07:00 AM',
        arrival: '11:30 AM',
        duration: '4h 30m',
        price: 25,
        operator: 'Greyhound',
        features: ['WiFi', 'Power Outlets', 'Reclining Seats']
    },
    {
        from: 'Bangkok',
        to: 'Phuket',
        departure: '06:00 PM',
        arrival: '06:00 AM +1',
        duration: '12h',
        price: 35,
        operator: 'Transport Co.',
        features: ['Sleeper', 'AC', 'Toilet', 'Blanket']
    },
    {
        from: 'Berlin',
        to: 'Prague',
        departure: '08:30 AM',
        arrival: '01:15 PM',
        duration: '4h 45m',
        price: 28,
        operator: 'FlixBus',
        features: ['WiFi', 'USB', 'Snacks', 'AC']
    }
];

// Sample Cab/Taxi Data
const cabData = [
    {
        type: 'Economy',
        service: 'UberX / Lyft',
        capacity: '4 passengers',
        pricePerKm: 1.5,
        basePrice: 5,
        features: ['AC', 'GPS Tracking', '24/7 Available'],
        description: 'Affordable rides for everyday travel'
    },
    {
        type: 'Sedan',
        service: 'Uber Comfort / Lyft Plus',
        capacity: '4 passengers',
        pricePerKm: 2.0,
        basePrice: 8,
        features: ['AC', 'Premium Cars', 'Extra Legroom', 'GPS Tracking'],
        description: 'More comfortable rides with newer cars'
    },
    {
        type: 'SUV',
        service: 'UberXL / Lyft XL',
        capacity: '6 passengers',
        pricePerKm: 2.5,
        basePrice: 10,
        features: ['AC', 'Spacious', 'Luggage Space', 'GPS Tracking'],
        description: 'Perfect for groups and families'
    },
    {
        type: 'Luxury',
        service: 'Uber Black / Lyft Lux',
        capacity: '4 passengers',
        pricePerKm: 4.0,
        basePrice: 15,
        features: ['AC', 'Luxury Cars', 'Professional Drivers', 'Premium Service'],
        description: 'High-end vehicles for special occasions'
    },
    {
        type: 'Airport Transfer',
        service: 'Private Car Service',
        capacity: '4 passengers',
        pricePerKm: 3.0,
        basePrice: 50,
        features: ['Meet & Greet', 'Flight Tracking', 'Luggage Assistance', 'AC'],
        description: 'Reliable airport transportation'
    },
    {
        type: 'Shared Ride',
        service: 'Uber Pool / Lyft Shared',
        capacity: '2 passengers',
        pricePerKm: 1.0,
        basePrice: 3,
        features: ['AC', 'Eco-Friendly', 'Budget Option'],
        description: 'Share your ride and save money'
    }
];

// Switch between transport modes
function switchTransport(mode) {
    // Remove active class from all tabs
    document.querySelectorAll('.transport-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    event.target.closest('.transport-tab').classList.add('active');
    
    // Hide all content sections
    document.querySelectorAll('.transport-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected content
    document.getElementById(`${mode}-content`).classList.add('active');
    
    // Load data for selected mode
    loadTransportData(mode);
}

// Load transport data
function loadTransportData(mode) {
    const resultsContainer = document.getElementById(`${mode}-results`);
    
    if (mode === 'flights') {
        resultsContainer.innerHTML = flightData.map(flight => `
            <div class="result-card" onclick="bookTransport('flight', '${flight.from}', '${flight.to}', ${flight.price})">
                <div class="result-header">
                    <span class="result-route">${flight.from}</span>
                    <span class="result-arrow">✈️</span>
                    <span class="result-route">${flight.to}</span>
                </div>
                <div class="result-details">
                    <div class="detail-row">
                        <span class="detail-label">✈️ Airline</span>
                        <span class="detail-value">${flight.airline}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">⏱️ Duration</span>
                        <span class="detail-value">${flight.duration}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">🛫 Departure</span>
                        <span class="detail-value">${flight.departure}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">🛬 Arrival</span>
                        <span class="detail-value">${flight.arrival}</span>
                    </div>
                </div>
                <div class="result-features">
                    ${flight.features.map(f => `<span class="feature-badge">${f}</span>`).join('')}
                </div>
                <div class="result-footer">
                    <div class="price-amount">$${flight.price}</div>
                    <button class="book-btn" onclick="event.stopPropagation(); bookTransport('flight', '${flight.from}', '${flight.to}', ${flight.price})">
                        Book Flight
                    </button>
                </div>
            </div>
        `).join('');
    } else if (mode === 'buses') {
        resultsContainer.innerHTML = busData.map(bus => `
            <div class="result-card" onclick="bookTransport('bus', '${bus.from}', '${bus.to}', ${bus.price})">
                <div class="result-header">
                    <span class="result-route">${bus.from}</span>
                    <span class="result-arrow">🚌</span>
                    <span class="result-route">${bus.to}</span>
                </div>
                <div class="result-details">
                    <div class="detail-row">
                        <span class="detail-label">🚌 Operator</span>
                        <span class="detail-value">${bus.operator}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">⏱️ Duration</span>
                        <span class="detail-value">${bus.duration}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">🕐 Departure</span>
                        <span class="detail-value">${bus.departure}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">🕐 Arrival</span>
                        <span class="detail-value">${bus.arrival}</span>
                    </div>
                </div>
                <div class="result-features">
                    ${bus.features.map(f => `<span class="feature-badge">${f}</span>`).join('')}
                </div>
                <div class="result-footer">
                    <div class="price-amount">$${bus.price}</div>
                    <button class="book-btn" onclick="event.stopPropagation(); bookTransport('bus', '${bus.from}', '${bus.to}', ${bus.price})">
                        Book Bus
                    </button>
                </div>
            </div>
        `).join('');
    } else if (mode === 'cabs') {
        resultsContainer.innerHTML = cabData.map(cab => `
            <div class="result-card" onclick="bookTransport('cab', '${cab.type}', '', ${cab.basePrice})">
                <div class="result-header">
                    <span class="result-route">${cab.type}</span>
                </div>
                <div class="result-details">
                    <div class="detail-row">
                        <span class="detail-label">🚕 Service</span>
                        <span class="detail-value">${cab.service}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">👥 Capacity</span>
                        <span class="detail-value">${cab.capacity}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">💵 Base Fare</span>
                        <span class="detail-value">$${cab.basePrice}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📏 Per Km</span>
                        <span class="detail-value">$${cab.pricePerKm}</span>
                    </div>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    ${cab.description}
                </p>
                <div class="result-features">
                    ${cab.features.map(f => `<span class="feature-badge">${f}</span>`).join('')}
                </div>
                <div class="result-footer">
                    <div class="price-amount">From $${cab.basePrice}</div>
                    <button class="book-btn" onclick="event.stopPropagation(); bookTransport('cab', '${cab.type}', '', ${cab.basePrice})">
                        Book Cab
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Search functions
function searchFlights(event) {
    event.preventDefault();
    alert('🔍 Searching for flights...\n\nThis will connect to Amadeus Flight API for real-time results!');
}

function searchBuses(event) {
    event.preventDefault();
    alert('🔍 Searching for buses...\n\nThis will connect to Rome2rio or RedBus API for real-time results!');
}

function searchCabs(event) {
    event.preventDefault();
    alert('🔍 Finding available cabs...\n\nThis will connect to Uber/Lyft API or local taxi services!');
}

// Book transport
function bookTransport(type, from, to, price) {
    const typeEmoji = type === 'flight' ? '✈️' : type === 'bus' ? '🚌' : '🚕';
    const route = to ? `${from} to ${to}` : from;
    alert(`${typeEmoji} Booking ${type}!\n\nRoute: ${route}\nPrice: $${price}\n\nRedirecting to payment...`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTransportData('flights');
});
