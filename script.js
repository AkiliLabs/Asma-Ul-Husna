// Global variables
let currentSlide = 0;
const totalSlides = 3;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOM loaded, initializing components...');
    initializeNavbar();
    initializeCarousel();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeVideoPlayer();
    initializeSmoothScrolling();
    initializeCounters();
    initializeLanguage(); // Initialize language support
    // initializeParallaxEffects();
    initPhoneSlideshow(); // Add phone slideshow initialization
    initializeScrollIndicator(); // Add scroll indicator functionality
    initializeShowcaseSwipe(); // Add showcase swipe functionality
    initializePhoneRotationEffects(); // Add phone rotation and shadow effects
    
    // Initialize showcase immediately to ensure first slide is properly displayed
    updateShowcase();
    
    // Start auto-slide after a delay
    setTimeout(initShowcaseAutoSlide, 1000);
});

// Phone Slideshow Functionality for Hero Section
let heroSlideIndex = 0;
let heroSlideInterval;

function initPhoneSlideshow() {
    // console.log('Initializing hero phone slideshow...');
    
    // Target only hero section slideshow, not showcase section
    const heroSlideshow = document.querySelector('.hero-phone .phone-slideshow');
    if (!heroSlideshow) {
        // console.log('Hero slideshow element not found');
        return;
    }
    
    const slides = heroSlideshow.querySelectorAll('.screenshot-slide');
    // console.log('Found hero slides:', slides.length);
    
    if (slides.length <= 1) {
        // console.log('Not enough slides for slideshow');
        return;
    }
    
    function showHeroSlide(index) {
        // console.log('Showing hero slide:', index);
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextHeroSlide() {
        heroSlideIndex = (heroSlideIndex + 1) % slides.length;
        // console.log('Moving to hero slide:', heroSlideIndex);
        showHeroSlide(heroSlideIndex);
    }
    
    // Start automatic slideshow
    function startHeroSlideshow() {
        // console.log('Starting automatic hero slideshow...');
        heroSlideInterval = setInterval(nextHeroSlide, 3000); // Change slide every 4 seconds
    }
    
    // Stop automatic slideshow
    function stopHeroSlideshow() {
        if (heroSlideInterval) {
            clearInterval(heroSlideInterval);
            heroSlideInterval = null;
        }
    }
    
    // Initialize first slide
    showHeroSlide(0);
    
    // Start automatic slideshow after a short delay
    setTimeout(startHeroSlideshow, 2000); // Start after 2 seconds
    
    // Pause on hover (optional)
    const heroPhone = document.querySelector('.hero-phone');
    if (heroPhone) {
        heroPhone.addEventListener('mouseenter', stopHeroSlideshow);
        heroPhone.addEventListener('mouseleave', startHeroSlideshow);
    }
}

// Phone Rotation and Shadow Effects
function initializePhoneRotationEffects() {
    const heroPhone = document.querySelector('.hero-phone .phone-mockup');
    const showcasePhone = document.querySelector('.showcase-phone .phone-mockup');
    
    // Add rotation effect to both phones
    [heroPhone, showcasePhone].forEach(phone => {
        if (!phone) return;
        
        let isRotated = false;
        let isHovering = false;
        let cooldownActive = false;
        
        // Store original transform values
        const originalTransform = getComputedStyle(phone).transform;
        const isHeroPhone = phone.closest('.hero-phone');
        
        function applyRotation() {
            if (isHeroPhone) {
                // Hero phone: moderate rotation and scale
                phone.style.transform = 'rotate(-2deg) scale(1.05)';
                phone.style.boxShadow = `
                    0 40px 80px rgba(0, 0, 0, 0.4),
                    0 20px 40px rgba(0, 0, 0, 0.25),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    0 0 30px rgba(63, 112, 77, 0.3)
                `;
            } else {
                // Showcase phone: moderate rotation and scale
                phone.style.transform = 'rotate(5deg) scale(1.05)';
                phone.style.boxShadow = `
                    0 30px 60px rgba(0, 0, 0, 0.35),
                    0 15px 30px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    0 0 25px rgba(63, 112, 77, 0.25)
                `;
            }
        }
        
        function resetRotation() {
            phone.style.transform = '';
            phone.style.boxShadow = '';
        }
        
        function handleMouseEnter() {
            if (cooldownActive) return;
            isHovering = true;
            isRotated = true;
            applyRotation();
        }
        
        function handleMouseLeave() {
            if (cooldownActive) return;
            isHovering = false;
            isRotated = false;
            resetRotation();
        }
        
        function handleClick(e) {
            e.preventDefault();
            
            if (cooldownActive) return;
            
            cooldownActive = true;
            
            // If already hovering, just maintain the rotation
            if (isHovering) {
                // Already rotated from hover, just add a slight bounce effect
                const currentTransform = phone.style.transform;
                phone.style.transform = currentTransform.replace('scale(1.05)', 'scale(1.02)');
                setTimeout(() => {
                    if (isHovering) {
                        phone.style.transform = currentTransform;
                    }
                }, 150);
            } else {
                // Not hovering, apply click rotation
                isRotated = !isRotated;
                if (isRotated) {
                    applyRotation();
                } else {
                    resetRotation();
                }
            }
            
            // Add cooldown to prevent rapid clicking
            setTimeout(() => {
                cooldownActive = false;
            }, 300);
        }
        
        function handleTouchStart(e) {
            e.preventDefault();
            
            if (cooldownActive) return;
            
            cooldownActive = true;
            isRotated = !isRotated;
            
            if (isRotated) {
                applyRotation();
            } else {
                resetRotation();
            }
            
            // Add cooldown to prevent rapid tapping
            setTimeout(() => {
                cooldownActive = false;
            }, 400);
        }
        
        // Desktop hover events
        phone.addEventListener('mouseenter', handleMouseEnter);
        phone.addEventListener('mouseleave', handleMouseLeave);
        
        // Desktop and mobile click events
        phone.addEventListener('click', handleClick);
        
        // Mobile touch events for better responsiveness
        phone.addEventListener('touchstart', handleTouchStart, { passive: false });
        
        // Add CSS cursor pointer for better UX
        phone.style.cursor = 'pointer';
    });
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
    // Target only the showcase phone, not hero phone
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
    
    // Check if carousel elements exist before initializing
    if (!carouselContainer) {
        // console.log('Carousel container not found - skipping carousel initialization');
        return;
    }
    
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
    
    // Check if carousel container exists before trying to update it
    if (!carouselContainer) {
        // console.log('Carousel container not found - skipping carousel update');
        return;
    }
    
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
const totalShowcaseSlides = 5;

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
    // Target only showcase section slides, not hero section slides
    const phoneSlides = document.querySelectorAll('.showcase-phone .phone-slideshow .screenshot-slide');
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
    }, 3000);
}

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
                // Calculate navbar height dynamically
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = target.offsetTop - (navbarHeight + 20); // Extra 20px padding
                
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
            // showNotification('TestFlight download will be available soon!');
            
            // In a real implementation, this would redirect to TestFlight
            window.open('https://testflight.apple.com/join/rjAm5yft', '_blank');
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
    // console.log('Event tracked:', eventName, parameters);
    
    // In a real implementation, this would send data to your analytics service
    // Example: gtag('event', eventName, parameters);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    // const heroBackground = document.querySelector('.hero-background');
    const heroPhone = document.querySelector('.hero-phone');
    
    // if (heroBackground) {
    //     heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    // }
    
    // if (heroPhone && window.innerWidth > 768) {
    //     heroPhone.style.transform = `translateY(${scrolled * 0.2}px)`;
    // }
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
        const rate = scrolled * 1.05;
        
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
        
        /* Ensure navbar doesn't cover content on mobile */
        .navbar {
            padding: 0.75rem 0; /* Slightly smaller padding on mobile */
        }
        
        .hero {
            padding-top: 120px !important; /* Ensure enough space for mobile navbar */
        }
        
        /* Also ensure other sections have proper spacing */
        #features, #showcase, #about, #download {
            scroll-margin-top: 80px; /* For smooth scrolling with fixed navbar */
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    /* Enhanced phone rotation effects */
    .phone-mockup {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                   box-shadow 0.4s ease !important;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
    
    .phone-mockup:active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
    
    /* Prevent text selection during interaction */
    .hero-phone, .showcase-phone {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* Enhance touch responsiveness on mobile */
    @media (max-width: 768px) {
        .phone-mockup {
            touch-action: manipulation;
        }
        
        .phone-mockup:active {
            transform: scale(0.95) !important;
        }
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
    // console.log('Asma Ul Husna website loaded successfully');
});

// Language Toggle Functionality
const translations = {
    en: {
        nav: {
            title: "Asma Ul Husna",
            features: "Features",
            about: "About",
            download: "Download"
        },
        hero: {
            title: "Asma Ul Husna",
            tagline: "Experience the divine beauty of Allah's 99 Names through an elegant, interactive journey that brings spiritual meaning to your daily life",
            hadith: {
                translation: '"Allah has ninety-nine names, whoever learns them will enter Paradise"',
                reference: "- Prophet Muhammad ﷺ (Sahih al-Bukhari)"
            },
            download: {
                subtitle: "Download on"
            },
            explore: "Explore Features"
        },
        showcase: {
            title: "Experience the App",
            subtitle: "See how Asma Ul Husna brings the 99 Names of Allah to life",
            slides: [
                {
                    title: "Beautiful Splash Screen",
                    description: "Start your spiritual journey with inspiring verses from the Quran, setting a peaceful and reverent tone for your experience with Allah's beautiful names."
                },
                {
                    title: "Interactive Card Experience",
                    description: "Swipe through elegantly designed cards featuring each of the 99 names with Arabic calligraphy, English transliteration, and meaningful translations."
                },
                {
                    title: "Detailed View",
                    description: "Explore each name in depth with beautiful layouts, including meanings, benefits, and relevant verses from the Quran."
                },
                {
                    title: "Personalized Experience",
                    description: "Save your favorite names, customize your experience, and access helpful settings to make the app truly yours on your spiritual journey."
                },
                {
                    title: "List View",
                    description: "Save your favorite names, customize your experience, and access helpful settings to make the app truly yours on your spiritual journey."
                }
            ]
        },
        features: {
            title: "Discover the Features",
            subtitle: "Everything you need for a meaningful spiritual experience",
            items: [
                {
                    title: "Two Browsing Modes",
                    description: "Choose between beautiful swipeable cards for immersive reading or a fast-scroll list view for quick navigation through all 99 names."
                },
                {
                    title: "Rich Details",
                    description: "Each name includes its meaning, the Quranic verses where it appears, and beautiful audio recitations to enhance your understanding."
                },
                {
                    title: "Personalization",
                    description: "Save your favorite names and verses for quick access. Create your personal collection of the names that resonate most with you."
                },
                {
                    title: "Multi-language Support",
                    description: "Experience the app in both English and Turkish, making it accessible to a wider community of believers."
                },
                {
                    title: "Audio Recitations",
                    description: "Listen to beautiful recitations of each name to improve pronunciation and deepen your spiritual connection."
                },
                {
                    title: "Helpful Notifications",
                    description: "Receive gentle reminders and daily inspiration to keep you connected with the beautiful names of Allah throughout your day."
                }
            ]
        },
        about: {
            title: "About Asma Ul Husna",
            paragraph1: "Asma Ul Husna is more than just an app—it's a spiritual companion designed to help Muslims around the world deepen their connection with Allah through His beautiful names. Each of the 99 names carries profound meaning and reflects different aspects of Allah's infinite mercy, wisdom, and power.",
            paragraph2: "Our app combines traditional Islamic knowledge with modern technology, creating an accessible and engaging way to explore these sacred names. Whether you're a student of Islamic studies, someone seeking spiritual growth, or simply curious about the beauty of Islamic tradition, Asma Ul Husna provides a respectful and enriching experience.",
            paragraph3: "The app was carefully crafted with attention to Islamic values and aesthetics, ensuring that every interaction enhances rather than distracts from the spiritual significance of Allah's names.",
            verse: {
                translation: "He is Allah, other than whom there is no deity, the Sovereign, the Pure, the Perfection, the Bestower of Faith, the Overseer, the Exalted in Might, the Compeller, the Superior. Exalted is Allah above whatever they associate with Him."
            }
        },
        download: {
            title: "Start Your Spiritual Journey Today",
            subtitle: "Download Asma Ul Husna and begin exploring the beautiful names of Allah",
            button: {
                label: "Download on"
            },
            info: {
                compatible: "iOS Compatible",
                free: "Free Download",
                privacy: "Privacy Focused"
            }
        },
        footer: {
            copyright: "&copy; 2025 <b>Asma Ul Husna - Esmaül Hüsna</b>. All rights reserved.",
            developer: "Developed by <a href=\"https://akililabs.org/\" target=\"_blank\" rel=\"noopener noreferrer\">AkiliLabs</a>"
        }
    },
    tr: {
        nav: {
            title: "Esmaül Hüsna",
            features: "Özellikler",
            about: "Hakkında",
            download: "İndir"
        },
        hero: {
            title: "Esmaül Hüsna",
            tagline: "Allah'ın 99 güzel isminin ilahi güzelliğini, günlük yaşamınıza ruhani anlam katan zarif ve etkileşimli bir yolculuk aracılığıyla deneyimleyin",
            hadith: {
                translation: '"Allah\'ın doksan dokuz ismi vardır, bunları öğrenen cennete girer"',
                reference: "- Peygamber Muhammed ﷺ (Sahih al-Bukhari)"
            },
            download: {
                subtitle: "İndir"
            },
            explore: "Özellikleri Keşfet"
        },
        showcase: {
            title: "Uygulamayı Deneyimleyin",
            subtitle: "Esmaül Hüsna'nın Allah'ın 99 ismini nasıl hayata geçirdiğini görün",
            slides: [
                {
                    title: "Güzel Açılış Ekranı",
                    description: "Kur'an'dan ilham verici ayetlerle ruhani yolculuğunuza başlayın, Allah'ın güzel isimleriyle deneyiminiz için huzurlu ve saygılı bir ton belirleyin."
                },
                {
                    title: "Etkileşimli Kart Deneyimi",
                    description: "Arapça hat sanatı, İngilizce transliterasyon ve anlamlı çevirilerle 99 ismin her birini içeren zarif tasarlanmış kartlar arasında kaydırın."
                },
                {
                    title: "Detaylı Görünüm",
                    description: "Her ismi anlamları, faydaları ve Kur'an'dan ilgili ayetler dahil güzel düzenlerle derinlemesine keşfedin."
                },
                {
                    title: "Kişiselleştirilmiş Deneyim",
                    description: "Favori isimlerinizi kaydedin, deneyiminizi özelleştirin ve ruhani yolculuğunuzda uygulamayı gerçekten sizin yapan yararlı ayarlara erişin."
                },
                {
                    title: "Liste Görünümü",
                    description: "Favori isimlerinizi kaydedin, deneyiminizi özelleştirin ve ruhani yolculuğunuzda uygulamayı gerçekten sizin yapan yararlı ayarlara erişin."
                }
            ]
        },
        features: {
            title: "Özellikleri Keşfedin",
            subtitle: "Anlamlı bir ruhani deneyim için ihtiyacınız olan her şey",
            items: [
                {
                    title: "İki Gezinme Modu",
                    description: "Sürükleyici okuma için güzel kaydırılabilir kartlar veya tüm 99 isim arasında hızlı gezinme için hızlı kaydırma liste görünümü arasından seçin."
                },
                {
                    title: "Zengin Detaylar",
                    description: "Her isim anlamını, göründüğü Kur'an ayetlerini ve anlayışınızı artırmak için güzel sesli okumaları içerir."
                },
                {
                    title: "Kişiselleştirme",
                    description: "Hızlı erişim için favori isimlerinizi ve ayetlerinizi kaydedin. Size en çok hitap eden isimlerin kişisel koleksiyonunuzu oluşturun."
                },
                {
                    title: "Çok Dil Desteği",
                    description: "Uygulamayı hem İngilizce hem de Türkçe olarak deneyimleyin, daha geniş bir inananlar topluluğu için erişilebilir hale getirin."
                },
                {
                    title: "Sesli Okumalar",
                    description: "Her ismin güzel okumalarını dinleyerek telaffuzu geliştirin ve ruhani bağınızı derinleştirin."
                },
                {
                    title: "Yararlı Bildirimler",
                    description: "Gününüz boyunca Allah'ın güzel isimleriyle bağlantınızı sürdürmek için nazik hatırlatmalar ve günlük ilham alın."
                }
            ]
        },
        about: {
            title: "Esmaül Hüsna Hakkında",
            paragraph1: "Esmaül Hüsna sadece bir uygulama değil—dünya çapındaki Müslümanların Allah'ın güzel isimleri aracılığıyla O'nunla bağlarını derinleştirmelerine yardımcı olmak için tasarlanmış ruhani bir arkadaştır. 99 ismin her biri derin anlam taşır ve Allah'ın sonsuz merhameti, hikmeti ve gücünün farklı yönlerini yansıtır.",
            paragraph2: "Uygulamamız geleneksel İslami bilgiyi modern teknolojiyle birleştirerek bu kutsal isimleri keşfetmek için erişilebilir ve ilgi çekici bir yol yaratır. İslami araştırmalar öğrencisi, ruhani gelişim arayan biri veya sadece İslami geleneğin güzelliğini merak eden biri olsanız da, Esmaül Hüsna saygılı ve zenginleştirici bir deneyim sunar.",
            paragraph3: "Uygulama, her etkileşimin Allah'ın isimlerinin ruhani öneminden dikkat dağıtmak yerine onu artırmasını sağlayarak İslami değerler ve estetik açısından dikkatli bir şekilde hazırlandı.",
            verse: {
                translation: "O, kendisinden başka ilah bulunmayan Allah'tır. O, mülkün gerçek sahibi, mukaddes, barış ve esenlik veren, iman verip koruyan, gözetip koruyan, mutlak güç sahibi, düzeltip ıslah eden, büyüklükte eşsiz olandır. Allah, ortak koştukları şeylerden uzaktır."
            }
        },
        download: {
            title: "Ruhani Yolculuğunuza Bugün Başlayın",
            subtitle: "Esmaül Hüsna'yı indirin ve Allah'ın güzel isimlerini keşfetmeye başlayın",
            button: {
                label: "İndir"
            },
            info: {
                compatible: "iOS Uyumlu",
                free: "Ücretsiz İndirme",
                privacy: "Gizlilik Odaklı"
            }
        },
        footer: {
            copyright: "&copy; 2025 <b>Asma Ul Husna - Esmaül Hüsna</b>. Tüm hakları saklıdır.",
            developer: "<a href=\"https://akililabs.org/\" target=\"_blank\" rel=\"noopener noreferrer\">AkiliLabs</a> tarafından geliştirilmiştir"
        }
    }
};

let currentLanguage = 'en';

function initializeLanguage() {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        setLanguage(currentLanguage);
    } else {
        // Check browser language for Turkish users
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('tr')) {
            currentLanguage = 'tr';
            setLanguage(currentLanguage);
        }
    }
    updateLanguageButton();
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'tr' : 'en';
    setLanguage(currentLanguage);
    localStorage.setItem('preferred-language', currentLanguage);
    updateLanguageButton();
}

function setLanguage(lang) {
    const translation = translations[lang];
    if (!translation) return;

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    document.title = lang === 'tr' ? 'Esmaül Hüsna - 99 Güzel İsim' : 'Asma Ul Husna - Esmaül Hüsna';

    // Update all elements with data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const value = getNestedTranslation(translation, key);
        
        if (value) {
            // Handle HTML content for links and formatting
            if (key.includes('footer') || key.includes('developer')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
        if (current && typeof current === 'object') {
            // Handle array indices
            if (!isNaN(key)) {
                return current[parseInt(key)];
            }
            return current[key];
        }
        return undefined;
    }, obj);
}

function updateLanguageButton() {
    const langButton = document.getElementById('current-lang');
    if (langButton) {
        langButton.textContent = currentLanguage.toUpperCase();
    }
}
