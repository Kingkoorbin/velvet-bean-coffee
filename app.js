/* ==========================================
   VELVET BEAN CORE ENGINE (GSAP + LENIS + UI)
   ========================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. INITIALIZE LENIS SMOOTH SCROLLING
let lenis;
if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);
}

// 2. DOM POPULATION FROM DATA LAYER
function renderAboutCards() {
    const container = document.getElementById('aboutCardsContainer');
    if (!container) return;
    
    container.innerHTML = ABOUT_CARDS.map(card => `
        <div class="editorial-card gsap-reveal" data-cursor="view">
            <div class="editorial-card-img-wrap">
                <img src="${card.img}" alt="${card.title}" class="parallax-img" data-speed="0.12" loading="lazy">
            </div>
            <div class="editorial-card-caption">
                <span>${card.title}</span>
                <small>${card.location}</small>
            </div>
        </div>
    `).join('');
}

function renderMenu(category = 'coffee') {
    const container = document.getElementById('menuGrid');
    if (!container || !MENU_ITEMS[category]) return;

    container.innerHTML = MENU_ITEMS[category].map(item => `
        <div class="menu-card" data-cursor="view">
            <div class="menu-card-img">
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
            </div>
            <div class="menu-card-info">
                <div class="menu-card-header">
                    <h4 class="menu-card-title">${item.name}</h4>
                    <span class="menu-card-price">${item.price}</span>
                </div>
                <p class="menu-card-desc">${item.desc}</p>
                <div class="menu-card-footer">
                    <div class="menu-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn-add btn-magnetic" onclick="addToOrder('${item.name}')" aria-label="Add ${item.name} to order" data-cursor="link"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
    `).join('');

    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
        gsap.fromTo('.menu-card', 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
        );
    }
    
    initMagneticButtons();
    initCursorListeners();
}

function renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    container.innerHTML = TESTIMONIALS.map(t => `
        <div class="testimonial-card gsap-reveal">
            <div>
                <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                <p class="testimonial-text">"${t.quote}"</p>
            </div>
            <div class="author">
                <img src="${t.avatar}" alt="${t.author}" loading="lazy">
                <div><strong>${t.author}</strong><span>${t.role}</span></div>
            </div>
        </div>
    `).join('');
}

function renderGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;

    container.innerHTML = GALLERY_ITEMS.map(g => `
        <div class="gallery-item ${g.wide ? 'wide' : ''} ${g.tall ? 'tall' : ''} gsap-reveal" data-src="${g.img}" data-caption="${g.title} — ${g.sub}" data-cursor="view">
            <img src="${g.img}" alt="${g.title}" loading="lazy">
            <div class="gallery-overlay">
                <span>${g.title}</span>
                <small>${g.sub}</small>
            </div>
        </div>
    `).join('');

    // Attach Lightbox Listeners
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            const caption = item.getAttribute('data-caption');
            openLightbox(src, caption);
        });
    });
}

// 3. CURTAIN LOADER SEQUENCE
window.addEventListener('load', () => {
    renderAboutCards();
    renderMenu('coffee');
    renderTestimonials();
    renderGallery();
    initScrollAnimations();
    initMagneticButtons();
    initCursorListeners();

    const loader = document.getElementById('loader');
    const loaderCount = document.getElementById('loaderCount');
    const loaderProgress = document.getElementById('loaderProgress');
    
    if (prefersReducedMotion || !loader) {
        if (loader) loader.style.display = 'none';
        return;
    }

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            const tl = gsap.timeline();
            tl.to(loaderProgress, { width: '100%', duration: 0.4, ease: 'power2.out' })
              .to(loader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.2 })
              .from('.hero-title, .hero-desc, .hero-actions, .eyebrow', { 
                  y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' 
              }, '-=0.5')
              .from('.hero-visual', { 
                  scale: 0.95, opacity: 0, duration: 1.2, ease: 'power3.out' 
              }, '-=0.8');
        }
        if (loaderCount) loaderCount.textContent = progress < 10 ? `0${progress}` : progress;
        if (loaderProgress) loaderProgress.style.width = `${progress}%`;
    }, 40);
});

// 4. GSAP SCROLL & PARALLAX CHOREOGRAPHY
function initScrollAnimations() {
    if (prefersReducedMotion || typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = gsap.utils.toArray('.gsap-reveal');
    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            y: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
        });
    });

    const parallaxImages = gsap.utils.toArray('.parallax-img');
    parallaxImages.forEach((img) => {
        const speed = parseFloat(img.getAttribute('data-speed')) || 0.15;
        gsap.fromTo(img, { yPercent: -12 }, {
            yPercent: 12, ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    setTimeout(() => ScrollTrigger.refresh(), 200);
}

// 5. MAGNETIC BUTTON PHYSICS
function initMagneticButtons() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    
    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
            const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
            xTo(x); yTo(y);
        });

        btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
}

// 6. CUSTOM EDITORIAL CURSOR ENGINE
function initCursorListeners() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const cursorText = document.getElementById('cursorText');
    if (!cursorDot || !cursorRing) return;

    const xDotTo = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3.out' });
    const xRingTo = gsap.quickTo(cursorRing, 'x', { duration: 0.25, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(cursorRing, 'y', { duration: 0.25, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
        xDotTo(e.clientX); yDotTo(e.clientY);
        xRingTo(e.clientX); yRingTo(e.clientY);
    });

    document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const type = el.getAttribute('data-cursor');
            if (type === 'link') {
                cursorRing.classList.add('active-link');
            } else if (type === 'view') {
                cursorRing.classList.add('active-view');
                if (cursorText) cursorText.textContent = 'View';
            }
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('active-link', 'active-view');
            if (cursorText) cursorText.textContent = '';
        });
    });
}

// 7. MENU TAB SWITCHER
document.getElementById('menuTabs')?.addEventListener('click', (e) => {
    const tab = e.target.closest('.menu-tab');
    if (!tab) return;

    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    renderMenu(tab.getAttribute('data-tab'));
    if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 100);
});

// 8. STATS COUNTER ANIMATION
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 60;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + (target > 50 ? '' : '+');
                    }
                };
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.stats-grid');
if (statsSection) statsObserver.observe(statsSection);

// 9. NAVBAR & AMBIENT TOGGLE
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
});

const ambientBtn = document.getElementById('ambientBtn');
ambientBtn?.addEventListener('click', () => {
    ambientBtn.classList.toggle('active');
    const text = ambientBtn.querySelector('.ambient-text');
    if (text) text.textContent = ambientBtn.classList.contains('active') ? 'Vibes: On' : 'Vibes: Off';
    showToast(ambientBtn.classList.contains('active') ? 'Ambient soundwave simulation activated.' : 'Ambient soundwave muted.');
});

// 10. TOAST NOTIFICATION SYSTEM
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    container.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

function addToOrder(itemName) { showToast(`"${itemName}" added to your tasting order.`); }

// 11. LIGHTBOX SYSTEM
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    if (lenis) lenis.start();
    document.body.style.overflow = '';
}

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// 12. FORMS & MOBILE MENU
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value || 'Guest';
    showToast(`Thank you, ${name}. Your hospitality inquiry has been received.`);
    e.target.reset();
});

document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Welcome to The Velvet Bean Club. Your first dispatch arrives soon.');
    e.target.reset();
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileMenuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon?.classList.toggle('fa-bars');
    icon?.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        const icon = mobileMenuBtn?.querySelector('i');
        icon?.classList.add('fa-bars');
        icon?.classList.remove('fa-times');
    });
});