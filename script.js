// ===== Throttle Function for Better Performance =====
function throttle(func, wait) {
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

// ===== Detect Mobile Device =====
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

const updateActiveLink = throttle(() => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 150);

// Only enable on desktop for better mobile performance
if (!isMobile) {
    window.addEventListener('scroll', updateActiveLink, { passive: true });
}

// ===== Smooth Scroll (Instant on Mobile for Better Performance) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: isMobile ? 'auto' : 'smooth'
            });
        }
    });
});

// ===== Scroll to Top =====
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: isMobile ? 'auto' : 'smooth'
    });
});

// ===== Screenshots Slider =====
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// في RTL، الأزرار معكوسة
nextBtn.addEventListener('click', prevSlide);
prevBtn.addEventListener('click', nextSlide);

// Auto slide
let autoSlide = setInterval(nextSlide, 5000);

// Pause auto slide on hover
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Create WhatsApp message
    const whatsappMessage = `مرحباً، أنا ${name}%0A` +
                           `البريد الإلكتروني: ${email}%0A` +
                           `رقم الهاتف: ${phone}%0A` +
                           `الرسالة: ${message}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/218928198656?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('شكراً لتواصلك معنا! سيتم فتح واتساب لإرسال رسالتك.');
});

// ===== Intersection Observer for Animations (Disabled on Mobile) =====
if (!isMobile) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe note cards
    document.querySelectorAll('.note-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = `translateX(${index % 2 === 0 ? '-' : ''}30px)`;
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===== Parallax Effect (Disabled on Mobile for Performance) =====
if (!isMobile) {
    const parallaxEffect = throttle(() => {
        const scrolled = window.scrollY;
        const heroShapes = document.querySelectorAll('.hero-shape');
        
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 100);
    
    window.addEventListener('scroll', parallaxEffect, { passive: true });
}

// ===== Loading Animation (Disabled on Mobile) =====
if (!isMobile) {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===== Keyboard Navigation for Slider =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        nextSlide();
    } else if (e.key === 'ArrowRight') {
        prevSlide();
    }
});

// ===== Touch Swipe for Slider =====
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${currentYear} منظومة المهندس. جميع الحقوق محفوظة.`;

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Prevent Right Click on Images (Optional) =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment to prevent right-click
        // e.preventDefault();
    });
});

// ===== Add Ripple Effect to Buttons (Disabled on Mobile for Performance) =====
if (!isMobile) {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Sidebar Toggle =====
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarPanel = document.getElementById('sidebarPanel');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open sidebar
sidebarToggle.addEventListener('click', () => {
    sidebarPanel.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close sidebar
sidebarClose.addEventListener('click', () => {
    sidebarPanel.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', () => {
    sidebarPanel.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close sidebar when clicking on a link
document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.addEventListener('click', () => {
        sidebarPanel.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarPanel.classList.contains('active')) {
        sidebarPanel.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Image Viewer =====
const imageViewerModal = document.getElementById('imageViewerModal');
const imageViewerImg = document.getElementById('imageViewerImg');
const imageViewerCaption = document.getElementById('imageViewerCaption');
const imageViewerClose = document.getElementById('imageViewerClose');
let currentImageIndex = 0;
const screenshotImages = document.querySelectorAll('.screenshot-img');

// فتح عارض الصور عند الضغط على أي صورة في الواجهات
screenshotImages.forEach((img, index) => {
    img.addEventListener('click', function() {
        currentImageIndex = index;
        openImageViewer(this);
    });
});

function openImageViewer(img) {
    imageViewerModal.classList.add('active');
    imageViewerImg.src = img.src;
    imageViewerCaption.textContent = img.alt;
    document.body.style.overflow = 'hidden';
}

// إغلاق عارض الصور
imageViewerClose.addEventListener('click', closeImageViewer);

// أزرار التنقل
const imageViewerPrev = document.getElementById('imageViewerPrev');
const imageViewerNext = document.getElementById('imageViewerNext');

imageViewerPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + screenshotImages.length) % screenshotImages.length;
    openImageViewer(screenshotImages[currentImageIndex]);
});

imageViewerNext.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % screenshotImages.length;
    openImageViewer(screenshotImages[currentImageIndex]);
});

// إغلاق عند الضغط خارج الصورة
imageViewerModal.addEventListener('click', function(e) {
    if (e.target === imageViewerModal) {
        closeImageViewer();
    }
});

// التنقل بين الصور والإغلاق بزر Escape
document.addEventListener('keydown', function(e) {
    if (imageViewerModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeImageViewer();
        } else if (e.key === 'ArrowRight') {
            // في RTL، السهم الأيمن يذهب للصورة السابقة
            currentImageIndex = (currentImageIndex - 1 + screenshotImages.length) % screenshotImages.length;
            openImageViewer(screenshotImages[currentImageIndex]);
        } else if (e.key === 'ArrowLeft') {
            // في RTL، السهم الأيسر يذهب للصورة التالية
            currentImageIndex = (currentImageIndex + 1) % screenshotImages.length;
            openImageViewer(screenshotImages[currentImageIndex]);
        }
    }
});

function closeImageViewer() {
    imageViewerModal.classList.remove('active');
    document.body.style.overflow = '';
}

// دعم اللمس للتنقل بين الصور
let touchStartXViewer = 0;
let touchEndXViewer = 0;

imageViewerImg.addEventListener('touchstart', (e) => {
    touchStartXViewer = e.changedTouches[0].screenX;
});

imageViewerImg.addEventListener('touchend', (e) => {
    touchEndXViewer = e.changedTouches[0].screenX;
    handleViewerSwipe();
});

function handleViewerSwipe() {
    if (touchEndXViewer < touchStartXViewer - 50) {
        // Swipe left - الصورة التالية
        currentImageIndex = (currentImageIndex + 1) % screenshotImages.length;
        openImageViewer(screenshotImages[currentImageIndex]);
    }
    if (touchEndXViewer > touchStartXViewer + 50) {
        // Swipe right - الصورة السابقة
        currentImageIndex = (currentImageIndex - 1 + screenshotImages.length) % screenshotImages.length;
        openImageViewer(screenshotImages[currentImageIndex]);
    }
}

// ===== Console Message =====
console.log('%c منظومة المهندس ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
console.log('%c نظام محاسبي متكامل ', 'font-size: 14px; color: #2563eb;');
