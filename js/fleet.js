// Fleet Page JavaScript
class FleetPage {
    constructor() {
        this.currentAircraft = 'a350';
        this.init();
    }

    init() {
        this.setupAircraftSelector();
        this.setupAnimations();
        this.setupInteractiveElements();
        this.startAircraftAnimations();
    }

    // Aircraft selector functionality
    setupAircraftSelector() {
        const aircraftBtns = document.querySelectorAll('.aircraft-btn');
        const aircraftDetails = document.querySelectorAll('.aircraft-details');

        aircraftBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const aircraft = btn.getAttribute('data-aircraft');
                this.switchAircraft(aircraft);
            });
        });
    }

    switchAircraft(aircraftType) {
        if (this.currentAircraft === aircraftType) return;

        // Update button states
        document.querySelectorAll('.aircraft-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-aircraft="${aircraftType}"]`).classList.add('active');

        // Hide current aircraft with animation
        const currentDetails = document.querySelector(`.aircraft-details[data-aircraft="${this.currentAircraft}"]`);
        if (currentDetails) {
            currentDetails.style.transform = 'translateX(-50px)';
            currentDetails.style.opacity = '0';
            
            setTimeout(() => {
                currentDetails.classList.remove('active');
                this.showAircraft(aircraftType);
            }, 300);
        } else {
            this.showAircraft(aircraftType);
        }

        this.currentAircraft = aircraftType;
    }

    showAircraft(aircraftType) {
        const newDetails = document.querySelector(`.aircraft-details[data-aircraft="${aircraftType}"]`);
        if (newDetails) {
            newDetails.style.transform = 'translateX(50px)';
            newDetails.style.opacity = '0';
            newDetails.classList.add('active');
            
            // Trigger reflow
            newDetails.offsetHeight;
            
            setTimeout(() => {
                newDetails.style.transform = 'translateY(0)';
                newDetails.style.opacity = '1';
            }, 50);
        }

        // Update aircraft-specific styling
        this.updateAircraftTheme(aircraftType);
        
        // Trigger spec animations
        this.animateSpecs(aircraftType);
    }

    updateAircraftTheme(aircraftType) {
        const themes = {
            'a350': '--primary-blue',
            'b787': '--primary-orange', 
            'a320neo': '--accent-gold',
            'b777': '--secondary-blue'
        };

        const themeColor = themes[aircraftType] || '--primary-blue';
        
        // Update CSS custom property for this aircraft
        const aircraftDetails = document.querySelector(`.aircraft-details[data-aircraft="${aircraftType}"]`);
        if (aircraftDetails) {
            aircraftDetails.style.setProperty('--aircraft-theme', `var(${themeColor})`);
        }
    }

    animateSpecs(aircraftType) {
        const specItems = document.querySelectorAll(`.aircraft-details[data-aircraft="${aircraftType}"] .spec-item`);
        const classItems = document.querySelectorAll(`.aircraft-details[data-aircraft="${aircraftType}"] .class-section`);
        
        // Animate specs with stagger
        specItems.forEach((item, index) => {
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease-out';
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, 400 + (index * 100));
        });

        // Animate class sections
        classItems.forEach((item, index) => {
            item.style.transform = 'scale(0.8)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease-out';
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            }, 600 + (index * 80));
        });
    }

    // Setup scroll-triggered animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            fadeInObserver.observe(card);
        });

        // Observe maintenance check items
        document.querySelectorAll('.check-item').forEach(item => {
            fadeInObserver.observe(item);
        });
    }

    // Interactive elements
    setupInteractiveElements() {
        this.setupSpecItemInteractions();
        this.setupMaintenanceInteractions();
        this.setupAircraftHover();
    }

    setupSpecItemInteractions() {
        document.querySelectorAll('.spec-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-4px) scale(1.02)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupMaintenanceInteractions() {
        document.querySelectorAll('.check-item').forEach(item => {
            item.addEventListener('click', () => {
                const checkType = item.querySelector('.check-circle').textContent;
                this.showMaintenanceInfo(checkType);
            });
        });
    }

    setupAircraftHover() {
        document.querySelectorAll('.aircraft-3d').forEach(aircraft => {
            aircraft.addEventListener('mouseenter', () => {
                this.startAircraftHoverEffect(aircraft);
            });

            aircraft.addEventListener('mouseleave', () => {
                this.stopAircraftHoverEffect(aircraft);
            });
        });
    }

    startAircraftHoverEffect(aircraft) {
        const svg = aircraft.querySelector('.aircraft-svg');
        if (svg) {
            svg.style.transform = 'translateY(-5px) rotateY(5deg)';
            svg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))';
        }
    }

    stopAircraftHoverEffect(aircraft) {
        const svg = aircraft.querySelector('.aircraft-svg');
        if (svg) {
            svg.style.transform = 'translateY(0) rotateY(0)';
            svg.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
        }
    }

    showMaintenanceInfo(checkType) {
        const maintenanceInfo = {
            'A': {
                title: 'A-Check Maintenance',
                description: 'Routine inspections performed every 400-600 flight hours, including visual inspections, system checks, and minor component replacements.',
                duration: '10-20 hours',
                interval: 'Every 400-600 flight hours'
            },
            'B': {
                title: 'B-Check Maintenance', 
                description: 'More comprehensive inspections including detailed system tests, component replacements, and structural inspections.',
                duration: '1-3 days',
                interval: 'Every 6-8 months'
            },
            'C': {
                title: 'C-Check Maintenance',
                description: 'Major maintenance involving detailed inspections, major component overhauls, and aircraft modifications.',
                duration: '1-2 weeks',
                interval: 'Every 18-24 months'
            },
            'D': {
                title: 'D-Check Maintenance',
                description: 'Complete aircraft overhaul including paint stripping, interior refurbishment, and major structural inspections.',
                duration: '1-2 months',
                interval: 'Every 6-10 years'
            }
        };

        const info = maintenanceInfo[checkType];
        if (info) {
            this.createMaintenanceModal(info);
        }
    }

    createMaintenanceModal(info) {
        // Remove existing modal
        const existing = document.querySelector('.maintenance-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'maintenance-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${info.title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${info.description}</p>
                        <div class="maintenance-details">
                            <div class="detail-item">
                                <strong>Duration:</strong> ${info.duration}
                            </div>
                            <div class="detail-item">
                                <strong>Interval:</strong> ${info.interval}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        this.addMaintenanceModalStyles();

        document.body.appendChild(modal);

        // Show with animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });

        // Close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeMaintenanceModal(modal);
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                this.closeMaintenanceModal(modal);
            }
        });
    }

    closeMaintenanceModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    addMaintenanceModalStyles() {
        if (document.querySelector('#maintenance-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'maintenance-modal-styles';
        style.textContent = `
            .maintenance-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .maintenance-modal[style*="opacity: 1"] .modal-content {
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
                border-radius: 50%;
                transition: all 0.2s;
            }
            
            .modal-close:hover {
                background: var(--light-gray);
                color: var(--primary-blue);
            }
            
            .modal-body {
                padding: 24px;
            }
            
            .modal-body p {
                line-height: 1.6;
                color: var(--dark-gray);
                margin-bottom: 20px;
            }
            
            .maintenance-details {
                display: grid;
                gap: 12px;
            }
            
            .detail-item {
                padding: 12px;
                background: var(--light-gray);
                border-radius: 8px;
                color: var(--dark-gray);
            }
            
            .detail-item strong {
                color: var(--primary-blue);
            }
        `;

        document.head.appendChild(style);
    }

    // Aircraft animations
    startAircraftAnimations() {
        // Add subtle floating animation to aircraft
        const aircraftSvgs = document.querySelectorAll('.aircraft-svg');
        aircraftSvgs.forEach((svg, index) => {
            svg.style.animation = `aircraftFloat 4s ease-in-out infinite`;
            svg.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes aircraftFloat {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    
    .aircraft-svg {
        transition: all 0.3s ease;
    }
    
    .spec-item,
    .class-section {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize fleet page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FleetPage();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FleetPage;
}
