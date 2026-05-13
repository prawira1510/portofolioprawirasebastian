// DOM Elements
const openingScreen = document.getElementById('openingScreen');
const openBtn = document.getElementById('btnOpen');
const mainWrapper = document.getElementById('mainWrapper');
const body = document.body;

// Tombol OPEN diklik
openBtn.addEventListener('click', () => {
    openBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        openBtn.style.transform = '';
    }, 150);
    
    openingScreen.classList.add('hide');
    
    setTimeout(() => {
        mainWrapper.classList.add('show');
        body.classList.add('scroll-enabled');
    }, 400);
    
    setTimeout(() => {
        revealSections();
        startCardAnimations();
    }, 500);
});

// Scroll Reveal Animation
function revealSections() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Card animations on scroll
function startCardAnimations() {
    const cards = document.querySelectorAll('.gallery-item, .cert-card, .experience-item, .project-item, .visi-card, .misi-card, .contact-item');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s ease-out';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Navbar Active Link & Smooth Scroll
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('.section');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (mainWrapper.classList.contains('show')) {
        updateActiveLink();
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (mainWrapper.classList.contains('show')) {
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.');
        contactForm.reset();
    });
}

window.addEventListener('load', () => {
    console.log('Portfolio website ready - waiting for OPEN button');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (mainWrapper.classList.contains('show')) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});