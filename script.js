// Professional Travel Website - Main JavaScript

// Current active filter
let currentFilter = 'all';

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log('Theme switched to:', isDark ? 'dark' : 'light');
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Toggle secret spots
function toggleSecretSpots(event, destination) {
    event.stopPropagation(); // Prevent card click
    
    const spotsList = document.getElementById(`spots-${destination}`);
    const data = destinationsData[destination];
    
    if (!data || !data.secretSpots) return;
    
    // Toggle active class
    if (spotsList.classList.contains('active')) {
        spotsList.classList.remove('active');
        spotsList.innerHTML = '';
    } else {
        // Close other open lists
        document.querySelectorAll('.secret-spots-list.active').forEach(list => {
            list.classList.remove('active');
            list.innerHTML = '';
        });
        
        // Open this list
        spotsList.classList.add('active');
        
        // Populate with secret spots
        data.secretSpots.forEach(spot => {
            const spotItem = document.createElement('div');
            spotItem.className = 'secret-spot-item';
            spotItem.innerHTML = `
                <div class="spot-icon">${spot.icon}</div>
                <div class="spot-info">
                    <div class="spot-name">${spot.name}</div>
                    <div class="spot-description">${spot.description}</div>
                </div>
            `;
            spotsList.appendChild(spotItem);
        });
    }
}

// Filter destinations function
function filterDestinations(category) {
    console.log('Filtering by:', category);
    currentFilter = category;
    
    // Update active tab
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-filter') === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Filter cards
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden', 'fade-out');
            card.classList.add('fade-in');
            card.style.display = 'block';
        } else {
            card.classList.add('fade-out');
            setTimeout(() => {
                card.classList.add('hidden');
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Apply theme if specific category is selected
    if (category !== 'all') {
        applyFilterTheme(category);
    } else {
        removeFilterTheme();
    }
}

// Apply theme based on category
function applyFilterTheme(category) {
    // Find a destination with this category to get colors
    let themeData = null;
    for (const key in destinationsData) {
        if (destinationsData[key].category === category) {
            themeData = destinationsData[key];
            break;
        }
    }
    
    if (themeData) {
        document.documentElement.style.setProperty('--theme-primary', themeData.colorPrimary);
        document.documentElement.style.setProperty('--theme-secondary', themeData.colorSecondary);
        document.documentElement.style.setProperty('--theme-glass-color', themeData.glassColor);
        document.documentElement.style.setProperty('--theme-shadow', `${themeData.colorPrimary}33`);
        document.documentElement.style.setProperty('--theme-shadow-intense', `${themeData.colorPrimary}66`);
        
        // Add themed class to filter tabs
        const filterTabs = document.querySelector('.filter-tabs');
        if (filterTabs) filterTabs.classList.add('themed');
    }
}

// Remove filter theme
function removeFilterTheme() {
    const filterTabs = document.querySelector('.filter-tabs');
    if (filterTabs) filterTabs.classList.remove('themed');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize destination cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Voyager Travel Website Loaded');
    
    // Add click handlers to destination cards
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            openDestinationModal(destination);
        });
        
        // Add accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const destination = this.getAttribute('data-destination');
                openDestinationModal(destination);
            }
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe destination cards
    destinationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Open destination modal
function openDestinationModal(destination) {
    const modal = document.getElementById('destination-modal');
    const modalContent = document.querySelector('.modal-content');
    const data = destinationsData[destination];
    
    if (!data) {
        console.error('Destination data not found:', destination);
        return;
    }
    
    console.log('Opening destination:', data.name);
    
    // Apply destination theme to modal
    applyModalTheme(data);
    
    // Update modal content
    document.getElementById('modal-title').textContent = data.name;
    document.getElementById('modal-location').textContent = data.location;
    document.getElementById('modal-description').textContent = data.description;
    document.getElementById('modal-image').src = data.image;
    document.getElementById('modal-image').alt = data.name;
    
    // Update highlights
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Apply destination theme to modal
function applyModalTheme(data) {
    const modalContent = document.querySelector('.modal-content');
    
    // Set CSS custom properties for theming
    document.documentElement.style.setProperty('--theme-primary', data.colorPrimary);
    document.documentElement.style.setProperty('--theme-secondary', data.colorSecondary);
    document.documentElement.style.setProperty('--theme-accent', data.colorAccent);
    document.documentElement.style.setProperty('--theme-glass-color', data.glassColor);
    
    // Calculate rgba values for shadows
    const primaryRgb = hexToRgb(data.colorPrimary);
    if (primaryRgb) {
        document.documentElement.style.setProperty('--theme-shadow', `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.2)`);
        document.documentElement.style.setProperty('--theme-shadow-intense', `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.4)`);
    }
    
    // Add themed class
    modalContent.classList.add('themed');
    
    // Apply glass overlay with destination color
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.background = `linear-gradient(135deg, ${data.colorPrimary}aa, ${data.colorSecondary}aa)`;
    }
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Close modal
function closeModal() {
    const modal = document.getElementById('destination-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    modal.classList.remove('active');
    modalContent.classList.remove('themed');
    document.body.style.overflow = 'auto';
    
    // Reset overlay background
    if (modalOverlay) {
        modalOverlay.style.background = 'rgba(26, 35, 50, 0.95)';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('destination-modal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuBtn.classList.toggle('active');
}

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Console styling
console.log(
    '%c✈️ VOYAGER %c- Luxury Travel Experiences',
    'color: #d4af37; font-size: 20px; font-weight: bold; font-family: serif;',
    'color: #1a2332; font-size: 16px; font-family: sans-serif;'
);
