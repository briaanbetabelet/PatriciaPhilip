// Configuration
const GALLERY_IMAGES = [
    "Pre-wedding Philip & Patricia.jpg",
    "Pre-wedding Philip & Patricia_1.jpg",
    "Pre-wedding Philip & Patricia_3.jpg",
    "Pre-wedding Philip & Patricia_4.jpg",
    "Pre-wedding Philip & Patricia_5.jpg",
    "Pre-wedding Philip & Patricia_6.jpg",
    "Pre-wedding Philip & Patricia_7.jpg",
    "Pre-wedding Philip & Patricia_9.jpg",
    "Pre-wedding Philip & Patricia_12.jpg",
    "Pre-wedding Philip & Patricia_14.jpg",
    "Pre-wedding Philip & Patricia_17.jpg",
    "Pre-wedding Philip & Patricia_18.jpg",
];

// Navigation
let currentImageIndex = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initGallery();
    initLightbox();
    initScrollEffects();
    setCurrentYear();
});

// Navigation scroll effect
function initNavigation() {
    const nav = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.remove('bg-transparent');
            nav.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
            navLinks.forEach(link => {
                link.classList.remove('text-white', 'drop-shadow-lg');
                link.classList.add('text-wedding-brown');
            });
            const navTitle = nav.querySelector('h3');
            if (navTitle) {
                navTitle.classList.remove('text-white', 'drop-shadow-lg');
                navTitle.classList.add('text-wedding-brown');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('text-white');
                mobileMenuBtn.classList.add('text-wedding-brown');
            }
        } else {
            nav.classList.add('bg-transparent');
            nav.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
            navLinks.forEach(link => {
                link.classList.add('text-white', 'drop-shadow-lg');
                link.classList.remove('text-wedding-brown');
            });
            const navTitle = nav.querySelector('h3');
            if (navTitle) {
                navTitle.classList.add('text-white', 'drop-shadow-lg');
                navTitle.classList.remove('text-wedding-brown');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.add('text-white');
                mobileMenuBtn.classList.remove('text-wedding-brown');
            }
        }
    });

    // Smooth scroll pour les liens
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fermer le menu mobile
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Menu mobile toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Galerie avec lazy loading et optimisation
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Intersection Observer pour le lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.loading = 'lazy';
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px' // Commence à charger 50px avant que l'image soit visible
    });
    
    GALLERY_IMAGES.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'relative aspect-square overflow-hidden shadow-sm group cursor-pointer';
        div.addEventListener('click', () => openLightbox(index));
        
        const img = document.createElement('img');
        // Utiliser data-src pour le lazy loading
        img.dataset.src = `public/${image}`;
        // Placeholder transparent ou une petite image de placeholder
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        img.alt = `Photo ${index + 1} - Patricia & Philip Pre-Wedding`;
        img.className = 'w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.fetchpriority = index < 6 ? 'high' : 'low'; // Priorité pour les 6 premières images
        
        // Observer l'image pour le lazy loading
        imageObserver.observe(img);
        
        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

// Lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');

    // Précharger les images adjacentes pour améliorer la navigation
    function preloadAdjacentImages() {
        const prevIndex = currentImageIndex === 0 ? GALLERY_IMAGES.length - 1 : currentImageIndex - 1;
        const nextIndex = currentImageIndex === GALLERY_IMAGES.length - 1 ? 0 : currentImageIndex + 1;
        
        const prevImg = new Image();
        prevImg.src = `public/${GALLERY_IMAGES[prevIndex]}`;
        
        const nextImg = new Image();
        nextImg.src = `public/${GALLERY_IMAGES[nextIndex]}`;
    }

    window.openLightbox = function(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        // Précharger les images adjacentes
        preloadAdjacentImages();
    };

    function updateLightboxImage() {
        // Charger l'image uniquement quand le lightbox est ouvert
        const imagePath = `public/${GALLERY_IMAGES[currentImageIndex]}`;
        if (lightboxImage.src !== imagePath) {
            // Afficher un loader pendant le chargement
            lightboxImage.style.opacity = '0';
            lightboxImage.onload = () => {
                lightboxImage.style.opacity = '1';
                lightboxImage.style.transition = 'opacity 0.3s';
            };
            lightboxImage.src = imagePath;
        }
        lightboxImage.alt = `Photo ${currentImageIndex + 1} - Patricia & Philip Pre-Wedding`;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${GALLERY_IMAGES.length}`;
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'unset';
    }

    function navigateImage(direction) {
        if (direction === 'prev') {
            currentImageIndex = currentImageIndex === 0 ? GALLERY_IMAGES.length - 1 : currentImageIndex - 1;
        } else {
            currentImageIndex = currentImageIndex === GALLERY_IMAGES.length - 1 ? 0 : currentImageIndex + 1;
        }
        updateLightboxImage();
        // Précharger les images adjacentes pour une navigation fluide
        preloadAdjacentImages();
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage('prev');
    });
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage('next');
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            }
        }
    });

    // Support du swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance pour déclencher le swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe vers la gauche = image suivante
                navigateImage('next');
            } else {
                // Swipe vers la droite = image précédente
                navigateImage('prev');
            }
        }
    }
}

// Effets de scroll
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observer les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Année actuelle dans le footer
function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

