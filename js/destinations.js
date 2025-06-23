// Destinations Page JavaScript
class DestinationsPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupMapInteractivity();
        this.setupCardAnimations();
        this.setupCTAButtons();
    }

    // Filter functionality
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const destinationCards = document.querySelectorAll('.destination-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                
                destinationCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else if (filter === 'popular') {
                        if (card.classList.contains('popular')) {
                            card.classList.remove('hidden');
                            card.style.display = 'block';
                        } else {
                            card.classList.add('hidden');
                            card.style.display = 'none';
                        }
                    } else {
                        if (card.getAttribute('data-category') === filter) {
                            card.classList.remove('hidden');
                            card.style.display = 'block';
                        } else {
                            card.classList.add('hidden');
                            card.style.display = 'none';
                        }
                    }
                });

                // Add animation delay for visible cards
                setTimeout(() => {
                    const visibleCards = document.querySelectorAll('.destination-card:not(.hidden)');
                    visibleCards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('fade-in');
                    });
                }, 100);
            });
        });
    }

    // Map interactivity
    setupMapInteractivity() {
        const destinationPoints = document.querySelectorAll('.destination-point');
        const destinationCards = document.querySelectorAll('.destination-card');

        destinationPoints.forEach(point => {
            point.addEventListener('mouseenter', () => {
                const cityName = point.getAttribute('data-city');
                this.highlightDestination(cityName);
                this.showCityTooltip(point, cityName);
            });

            point.addEventListener('mouseleave', () => {
                this.removeHighlights();
                this.hideCityTooltip();
            });

            point.addEventListener('click', () => {
                const cityName = point.getAttribute('data-city');
                this.scrollToDestination(cityName);
            });
        });

        // Add flight route animations
        this.animateFlightRoutes();
    }

    highlightDestination(cityName) {
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent;
            if (cardTitle.toLowerCase() === cityName.toLowerCase()) {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 12px 40px rgba(0, 102, 204, 0.2)';
                card.style.border = '2px solid var(--primary-orange)';
            }
        });
    }

    removeHighlights() {
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.border = '';
        });
    }

    showCityTooltip(point, cityName) {
        // Remove existing tooltip
        this.hideCityTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'city-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${cityName}</h4>
                <p>Click to view details</p>
            </div>
        `;
        
        // Style the tooltip
        Object.assign(tooltip.style, {
            position: 'absolute',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: '1000',
            transform: 'translate(-50%, -100%)',
            marginTop: '-10px'
        });

        // Position tooltip
        const rect = point.getBoundingClientRect();
        const mapContainer = document.querySelector('.map-container');
        const mapRect = mapContainer.getBoundingClientRect();
        
        tooltip.style.left = `${rect.left - mapRect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - mapRect.top}px`;

        mapContainer.appendChild(tooltip);

        // Add entrance animation
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translate(-50%, -100%) scale(0.8)';
        
        requestAnimationFrame(() => {
            tooltip.style.transition = 'all 0.2s ease-out';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translate(-50%, -100%) scale(1)';
        });
    }

    hideCityTooltip() {
        const existingTooltip = document.querySelector('.city-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    scrollToDestination(cityName) {
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent;
            if (cardTitle.toLowerCase() === cityName.toLowerCase()) {
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add highlight animation
                card.style.animation = 'highlight 1s ease-in-out';
                setTimeout(() => {
                    card.style.animation = '';
                }, 1000);
            }
        });
    }

    animateFlightRoutes() {
        const flightRoutes = document.querySelectorAll('.flight-route');
        flightRoutes.forEach((route, index) => {
            route.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Card animations on scroll
    setupCardAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all destination cards
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            cardObserver.observe(card);
        });

        // Observe service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            cardObserver.observe(card);
        });
    }

    // CTA button functionality
    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.destination-cta');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const destinationCard = e.target.closest('.destination-card');
                const cityName = destinationCard.querySelector('h3').textContent;
                
                // Add loading state
                const originalText = button.textContent;
                button.textContent = 'Searching...';
                button.disabled = true;
                
                // Simulate booking search
                setTimeout(() => {
                    this.showBookingModal(cityName);
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1500);
            });
        });
    }

    showBookingModal(cityName) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'booking-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="booking-modal">
                <div class="modal-header">
                    <h3>Book Flight to ${cityName}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="booking-form">
                        <div class="form-group">
                            <label for="departure">From</label>
                            <select id="departure">
                                <option value="delhi">Delhi (DEL)</option>
                                <option value="mumbai">Mumbai (BOM)</option>
                                <option value="bangalore">Bangalore (BLR)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="arrival">To</label>
                            <input type="text" id="arrival" value="${cityName}" readonly>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="departure-date">Departure</label>
                                <input type="date" id="departure-date" required>
                            </div>
                            <div class="form-group">
                                <label for="return-date">Return</label>
                                <input type="date" id="return-date">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="passengers">Passengers</label>
                            <select id="passengers">
                                <option value="1">1 Adult</option>
                                <option value="2">2 Adults</option>
                                <option value="3">3 Adults</option>
                                <option value="4">4+ Adults</option>
                            </select>
                        </div>
                        <button class="search-flights-btn">Search Flights</button>
                    </div>
                </div>
            </div>
        `;

        // Style the modal
        Object.assign(modalOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10000',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        document.body.appendChild(modalOverlay);

        // Add modal styles
        this.addModalStyles();

        // Show modal with animation
        requestAnimationFrame(() => {
            modalOverlay.style.opacity = '1';
        });

        // Close modal functionality
        const closeBtn = modalOverlay.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            this.closeBookingModal(modalOverlay);
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeBookingModal(modalOverlay);
            }
        });

        // Set default departure date to today
        const today = new Date().toISOString().split('T')[0];
        modalOverlay.querySelector('#departure-date').value = today;

        // Search flights button
        const searchBtn = modalOverlay.querySelector('.search-flights-btn');
        searchBtn.addEventListener('click', () => {
            searchBtn.textContent = 'Searching...';
            setTimeout(() => {
                alert(`Searching flights to ${cityName}. This would redirect to the booking system.`);
                this.closeBookingModal(modalOverlay);
            }, 1000);
        });
    }

    closeBookingModal(modalOverlay) {
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            if (modalOverlay.parentNode) {
                modalOverlay.parentNode.removeChild(modalOverlay);
            }
        }, 300);
    }

    addModalStyles() {
        // Check if styles already exist
        if (document.querySelector('#modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .booking-modal {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .booking-modal-overlay[style*="opacity: 1"] .booking-modal {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 24px 24px 16px;
                border-bottom: 1px solid #E5E5E7;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--primary-blue);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--medium-gray);
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: var(--primary-blue);
            }
            
            .modal-content {
                padding: 24px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: var(--dark-gray);
            }
            
            .form-group input,
            .form-group select {
                width: 100%;
                padding: 12px;
                border: 2px solid #E5E5E7;
                border-radius: 8px;
                font-size: 16px;
                transition: border-color 0.2s;
            }
            
            .form-group input:focus,
            .form-group select:focus {
                outline: none;
                border-color: var(--primary-blue);
            }
            
            .search-flights-btn {
                width: 100%;
                padding: 16px;
                background: var(--primary-blue);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .search-flights-btn:hover {
                background: var(--secondary-blue);
            }
            
            @keyframes highlight {
                0%, 100% { background: transparent; }
                50% { background: rgba(255, 107, 53, 0.1); }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .fade-in {
                animation: fadeIn 0.4s ease-out forwards;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize destinations page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DestinationsPage();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DestinationsPage;
}
