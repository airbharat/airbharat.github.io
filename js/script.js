// AirBharat Website JavaScript
class AirBharatWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFleetShowcase();
        this.setupDestinationMap();
        this.setupAnimations();
        this.setupAccessibility();
        this.setupContactForm();
    }

    // Navigation functionality
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // Scroll effect for navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll-triggered animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .experience-card, .fleet-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Fleet showcase functionality
    setupFleetShowcase() {
        const fleetCards = document.querySelectorAll('.fleet-card');
        
        fleetCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                fleetCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                card.classList.add('active');
            });
        });
    }

    // Interactive destination map
    setupDestinationMap() {
        const destinationPins = document.querySelectorAll('.destination-pin');
        
        destinationPins.forEach(pin => {
            pin.addEventListener('mouseenter', () => {
                this.showDestinationInfo(pin);
            });

            pin.addEventListener('mouseleave', () => {
                this.hideDestinationInfo(pin);
            });

            pin.addEventListener('click', () => {
                this.selectDestination(pin);
            });
        });
    }

    showDestinationInfo(pin) {
        const city = pin.dataset.city;
        pin.querySelector('span').style.opacity = '1';
        
        // Add a subtle animation
        pin.style.transform = 'translate(-50%, -50%) scale(1.2)';
    }

    hideDestinationInfo(pin) {
        pin.querySelector('span').style.opacity = '0';
        pin.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    selectDestination(pin) {
        const city = pin.dataset.city;
        console.log(`Selected destination: ${city}`);
        // Here you could integrate with a booking system or show more details
    }

    // Setup CSS animations and interactions
    setupAnimations() {
        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            section, .experience-card, .fleet-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .navbar.scrolled {
                background: rgba(255, 255, 255, 0.98) !important;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
            }

            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 70px;
                    right: -100%;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 2rem;
                    transition: right 0.3s ease;
                }

                .nav-menu.active {
                    right: 0;
                }

                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }

            .experience-card:nth-child(1) { transition-delay: 0.1s; }
            .experience-card:nth-child(2) { transition-delay: 0.2s; }
            .experience-card:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }

    // Accessibility enhancements
    setupAccessibility() {
        // Add keyboard navigation for interactive elements
        document.querySelectorAll('.fleet-card, .destination-pin').forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Add ARIA labels for better screen reader support
        document.querySelectorAll('.destination-pin').forEach(pin => {
            const city = pin.dataset.city;
            pin.setAttribute('aria-label', `Destination: ${city}`);
            pin.setAttribute('role', 'button');
        });

        // Enhanced focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // Contact form setup
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
            const errors = [];
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    errors.push(field);
                }
            });

            if (errors.length > 0) {
                this.showFormError('Please fill in all required fields.');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                this.showFormError('Please enter a valid email address.');
                return;
            }

            // Show success message (in a real app, this would send to a server)
            this.showFormSuccess();
        });
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');
    }

    showFormSuccess() {
        this.showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        document.querySelector('.contact-form').reset();
    }

    showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create and show new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        const formActions = document.querySelector('.form-actions');
        formActions.insertBefore(messageEl, formActions.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance optimization for scroll events
    optimizeScrollEvents() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            // Scroll-based updates here
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }
}

// Enhanced booking functionality
class BookingSystem {
    constructor() {
        this.setupBookingButtons();
    }

    setupBookingButtons() {
        document.querySelectorAll('.book-btn, .cta-primary').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openBookingModal();
            });
        });
    }

    openBookingModal() {
        // Create a simple booking modal
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="booking-modal-overlay">
                <div class="booking-modal">
                    <div class="modal-header">
                        <h3>Book Your Flight</h3>
                        <button class="close-modal" aria-label="Close">&times;</button>
                    </div>
                    <div class="modal-content">
                        <p>Welcome to AirBharat's booking experience!</p>
                        <p>Our new booking system will be available soon. For now, please contact our customer service team.</p>
                        <div class="contact-info">
                            <p><strong>Phone:</strong> +91-1800-XXX-XXXX</p>
                            <p><strong>Email:</strong> bookings@airbharat.com</p>
                        </div>
                        <button class="cta-primary" onclick="this.closest('.booking-modal-overlay').remove()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .booking-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }

            .booking-modal {
                background: white;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #f0f0f0;
            }

            .close-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }

            .modal-content {
                padding: 2rem;
            }

            .contact-info {
                background: #f5f5f7;
                padding: 1rem;
                border-radius: 12px;
                margin: 1rem 0;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            modalStyle.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                modalStyle.remove();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                modal.remove();
                modalStyle.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AirBharatWebsite();
    new BookingSystem();
    
    // Add a subtle loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
