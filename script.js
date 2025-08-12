// Global variables
let currentSlide = 0;
const totalSlides = 3;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeCarousel();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeVideoPlayer();
    initializeSmoothScrolling();
    initializeCounters();
    initializeParallaxEffects();
    initPhoneSlideshow(); // Add phone slideshow initialization
    initializeScrollIndicator(); // Add scroll indicator functionality
    initializeShowcaseSwipe(); // Add showcase swipe functionality
});

// Phone Slideshow Functionality for Hero Section
function initPhoneSlideshow() {
    const heroSlideshow = document.querySelector('.hero-phone .phone-slideshow');
    if (!heroSlideshow) return;
    
    const slides = heroSlideshow.querySelectorAll('.screenshot-slide');
    if (slides.length <= 1) return;
    
    let currentPhoneSlide = 0;
    
    function nextPhoneSlide() {
        slides[currentPhoneSlide].classList.remove('active');
        currentPhoneSlide = (currentPhoneSlide + 1) % slides.length;
        slides[currentPhoneSlide].classList.add('active');
    }
    
    // Auto-advance slides every 3 seconds
    setInterval(nextPhoneSlide, 3000);
}

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll indicator functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        const showcaseSection = document.getElementById('showcase');
        if (showcaseSection) {
            showcaseSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Showcase swipe functionality
function initializeShowcaseSwipe() {
    const showcasePhone = document.querySelector('.showcase-phone');
    if (!showcasePhone) return;
    
    let startX = 0;
    let endX = 0;
    
    showcasePhone.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    showcasePhone.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleShowcaseSwipe();
    });
    
    function handleShowcaseSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextShowcaseSlide();
            } else {
                previousShowcaseSlide();
            }
        }
    }
}

// Carousel functionality
function initializeCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.screenshot-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Auto-slide functionality
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        previousSlide();
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function currentSlideSet(slideIndex) {
    currentSlide = slideIndex - 1;
    updateCarousel();
}

// Renamed function to avoid conflicts
window.currentSlide = currentSlideSet;

function updateCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const indicators = document.querySelectorAll('.indicator');
    
    // Update carousel position
    const translateX = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// App Showcase Phone Navigation
let currentShowcaseSlide = 0;
const totalShowcaseSlides = 4;

function changeShowcaseSlide(direction) {
    if (direction === 1) {
        nextShowcaseSlide();
    } else {
        previousShowcaseSlide();
    }
}

function nextShowcaseSlide() {
    currentShowcaseSlide = (currentShowcaseSlide + 1) % totalShowcaseSlides;
    updateShowcase();
}

function previousShowcaseSlide() {
    currentShowcaseSlide = (currentShowcaseSlide - 1 + totalShowcaseSlides) % totalShowcaseSlides;
    updateShowcase();
}

function currentShowcaseSlideSet(slideIndex) {
    currentShowcaseSlide = slideIndex - 1;
    updateShowcase();
}

// Make functions globally accessible
window.changeShowcaseSlide = changeShowcaseSlide;
window.currentShowcaseSlide = currentShowcaseSlideSet;

function updateShowcase() {
    const phoneSlides = document.querySelectorAll('.phone-slideshow .screenshot-slide');
    const descriptions = document.querySelectorAll('.slide-description');
    const indicators = document.querySelectorAll('.showcase-indicators .indicator');
    
    // Update phone slides
    phoneSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentShowcaseSlide);
    });
    
    // Update descriptions
    descriptions.forEach((description, index) => {
        description.classList.toggle('active', index === currentShowcaseSlide);
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentShowcaseSlide);
    });
}

// Auto-advance showcase slideshow
function initShowcaseAutoSlide() {
    // Auto-advance slides every 4 seconds (slightly slower than hero)
    setInterval(() => {
        nextShowcaseSlide();
    }, 4000);
}

// Initialize showcase auto-slide when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure everything is loaded
    setTimeout(initShowcaseAutoSlide, 1000);
});

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe other animated elements
    document.querySelectorAll('.about-text, .about-visual').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// Video player placeholder
function initializeVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Placeholder for video functionality
            // In a real implementation, this would open a modal or redirect to video
            showNotification('Video feature coming soon!');
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Download button functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.testflight-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Analytics tracking (placeholder)
            trackEvent('download_button_clicked', {
                button_location: this.closest('section').className || 'unknown'
            });
            
            // Show notification
            showNotification('TestFlight download will be available soon!');
            
            // In a real implementation, this would redirect to TestFlight
            // window.open('https://testflight.apple.com/join/your-app-id', '_blank');
        });
    });
});

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #3F704D;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function trackEvent(eventName, parameters) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, parameters);
    
    // In a real implementation, this would send data to your analytics service
    // Example: gtag('event', eventName, parameters);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroPhone = document.querySelector('.hero-phone');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroPhone && window.innerWidth > 768) {
        heroPhone.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        document.querySelector('.arabic-name').style.animationPlayState = 'running';
    }, 500);
});

// Intersection Observer for counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                const element = entry.target;
                let current = 0;
                
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, 50);
                
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Enhanced parallax effects
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Phone float effect
        const heroPhone = document.querySelector('.hero-phone');
        if (heroPhone && window.innerWidth > 768) {
            const phoneRate = Math.sin(Date.now() * 0.002) * 10;
            heroPhone.style.transform = `translateY(${scrolled * 0.1 + phoneRate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(249, 251, 250, 0.98);
            backdrop-filter: blur(10px);
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            gap: 1rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .notification {
            right: 10px;
            left: 10px;
            right: 10px;
            max-width: calc(100vw - 20px);
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Lazy loading for images (when you add real images)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeLazyLoading();
    
    // Add any additional initializations here
    console.log('Asma Ul Husna website loaded successfully');
});
