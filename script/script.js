// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(7px, 7px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -7px)' 
        : 'none';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.destination-card, .package-card, .testimonial-card, .section-header'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (!name || !email || !phone || !message) {
        alert('Mohon lengkapi semua field!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }
    
    // Phone validation (Indonesian phone number)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(phone)) {
        alert('Format nomor telepon tidak valid!');
        return;
    }
    
    // Success message
    alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`);
    
    // Reset form
    contactForm.reset();
});

// Explore button click handlers
const exploreButtons = document.querySelectorAll('.explore-btn');
exploreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.destination-card');
        const destination = card.querySelector('h3').textContent;
        alert(`Anda akan menjelajahi ${destination}! Hubungi kami untuk informasi lebih lanjut.`);
    });
});

// Package selection handlers
const packageButtons = document.querySelectorAll('.package-btn');
packageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.package-card');
        const packageName = card.querySelector('h3').textContent;
        const packagePrice = card.querySelector('.package-price').textContent.split('/')[0];
        
        const confirmation = confirm(
            `Anda memilih ${packageName}\nHarga: ${packagePrice}\n\nLanjutkan ke pemesanan?`
        );
        
        if (confirmation) {
            // Scroll to contact form
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
            alert('Silakan isi form kontak untuk melanjutkan pemesanan.');
        }
    });
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
const newsletterButton = newsletterForm.querySelector('button');
const newsletterInput = newsletterForm.querySelector('input');

newsletterButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = newsletterInput.value;
    
    if (!email) {
        alert('Mohon masukkan email Anda!');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }
    
    alert('Terima kasih! Anda telah berlangganan newsletter kami.');
    newsletterInput.value = '';
});

// Add hover effect to destination cards
const destinationCards = document.querySelectorAll('.destination-card');
destinationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Scroll to top functionality (optional)
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('id', 'scrollToTop');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Counter animation for statistics (if you want to add stats section)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Console message for developers
console.log('%c🌴 Jelajah Nusantara', 'font-size: 20px; color: #0077be; font-weight: bold;');
console.log('%cLanding Page Pariwisata - Dibuat dengan ❤️', 'font-size: 14px; color: #ff6b35;');