// ==========================================
// PORTFOLIO WEBSITE JAVASCRIPT
// ==========================================

// 1. Toggle Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ==========================================
// 2. Animasi Muncul Saat Scroll (Scroll Reveal)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ==========================================
// 3. Smooth Scroll untuk semua anchor link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==========================================
// 4. Navbar Background Change saat Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// ==========================================
// 5. Efek Typing pada Hero Section
const typedTextSpan = document.querySelector('.hero-content h1 span');
const texts = ['Mahasiswa TI', 'Web Developer', 'UI/UX Designer', 'Programmer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Tunggu sebentar sebelum menghapus
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Mulai efek typing
if (typedTextSpan) {
    document.addEventListener('DOMContentLoaded', typeEffect);
}

// ==========================================
// 6. Active Link pada Navbar saat Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// ==========================================
// 7. Counter Animation untuk Statistik (jika ada)
const counters = document.querySelectorAll('.counter');
let started = false;

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        const inc = target / speed;

        function updateCounter() {
            const c = +counter.innerText;
            if (c < target) {
                counter.innerText = Math.ceil(c + inc);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        }
        updateCounter();
    });
}

// Mulai counter saat section terlihat
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            startCounters();
            started = true;
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ==========================================
// 8. Preloader (Opsional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ==========================================
// 9. Dark/Light Mode Toggle (Bonus)
const modeToggle = document.createElement('button');
modeToggle.className = 'mode-toggle';
modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
modeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
    transition: 0.3s;
`;
document.body.appendChild(modeToggle);

let isDarkMode = true;
modeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.documentElement.style.setProperty('--bg-color', '#0f172a');
        document.documentElement.style.setProperty('--card-bg', '#1e293b');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f8fafc');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// ==========================================
// 10. Project Filter (jika ingin menambahkan kategori)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hapus active dari semua tombol
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==========================================
// 11. Tambah CSS untuk animasi filter
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    .filter-btn {
        background: transparent;
        border: 2px solid var(--primary);
        color: var(--text-light);
        padding: 0.5rem 1.5rem;
        border-radius: 30px;
        cursor: pointer;
        transition: 0.3s;
        margin: 0.5rem;
    }
    
    .filter-btn.active, .filter-btn:hover {
        background: var(--gradient);
        border-color: transparent;
    }
    
    .nav-links a.active {
        color: var(--primary);
    }
    
    .mode-toggle:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// ==========================================
// 12. Form Validation (Jika ada form kontak)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        
        if (name && email && message) {
            alert(`Terima kasih ${name}! Pesan Anda telah terkirim.`);
            contactForm.reset();
        } else {
            alert('Mohon lengkapi semua field!');
        }
    });
}

// ==========================================
// 13. Scroll to Top Button
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 2px solid var(--primary);
    color: var(--primary);
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// 14. Particle Background Effect (Bonus)
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
`;
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Resize canvas saat window di-resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

console.log('🚀 Portfolio Website Loaded Successfully!');