/* =========================================================================
   VELVET BEAN CORE ENGINE (GSAP + LENIS + FAIL-SAFE UI)
   ========================================================================= */

// Universal Fail-Safe Backup Image (Guaranteed 200 OK CDN)
const SAFE_FALLBACK_IMG = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80";

/**
 * Generates an unbreakable <img> tag with automatic error recovery.
 */
function createSafeImg(src, alt, className = "", extraAttrs = "") {
    return `<img src="${src}" alt="${alt}" class="${className}" loading="lazy" onerror="this.onerror=null; this.src='${SAFE_FALLBACK_IMG}';" ${extraAttrs}>`;
}

/* ==========================================
   1. INTEGRATED DATA LAYER (Verified URLs)
   ========================================== */

const ABOUT_CARDS = [
    {
        title: "The Roastery",
        location: "Portland, Oregon",
        img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Precision Extraction",
        location: "9 Bar Pressure",
        img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Ethiopian Yirgacheffe",
        location: "Heirloom Varietals",
        img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80"
    }
];

const MENU_ITEMS = {
    coffee: [
        {
            name: "Velvet Espresso",
            price: "$4.00",
            desc: "Our flagship double shot. Thick, syrupy body with tasting notes of 85% dark chocolate, toasted hazelnut, and black cherry.",
            badge: "Signature",
            tags: ["Bold", "Traditional"],
            img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Honey Lavender Latte",
            price: "$6.25",
            desc: "Smooth espresso combined with velvety steamed oat milk, raw high-desert Oregon honey, and house-infused culinary lavender.",
            badge: "Best Seller",
            tags: ["Floral", "Comfort"],
            img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Single Origin V60",
            price: "$5.50",
            desc: "Hand-poured filter coffee highlighting seasonal lots. Currently serving: Gesha Village, Ethiopia. Notes of jasmine and peach.",
            badge: "Seasonal",
            tags: ["Bright", "Artisan"],
            img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Classic Cappuccino",
            price: "$4.75",
            desc: "A strict 6-ounce traditional cappuccino. Equal parts espresso, steamed milk, and rich, glossy microfoam.",
            badge: null,
            tags: ["Creamy", "Balanced"],
            img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Valrhona Mocha",
            price: "$6.00",
            desc: "Double espresso melted directly into 70% Valrhona dark chocolate ganache, finished with steamed whole milk and cocoa dust.",
            badge: null,
            tags: ["Indulgent", "Rich"],
            img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Velvet Americano",
            price: "$4.25",
            desc: "Double espresso pulled over hot filtered water, preserving the golden crema for a clean, full-bodied cup without bitterness.",
            badge: null,
            tags: ["Classic", "Smooth"],
            img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=80"
        }
    ],
    tea: [
        {
            name: "Uji Matcha Latte",
            price: "$6.00",
            desc: "First-harvest ceremonial grade matcha from Uji, Japan, hand-whisked in a chawan and served over steamed macadamia milk.",
            badge: "Ceremonial",
            tags: ["Vibrant", "Antioxidants"],
            img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Masala Chai",
            price: "$5.50",
            desc: "Our proprietary 24-hour steeped chai concentrate featuring organic Assam black tea, cracked cardamom, ginger, and star anise.",
            badge: null,
            tags: ["Spiced", "Cozy"],
            img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "London Fog",
            price: "$5.25",
            desc: "Organic Earl Grey infused with Italian bergamot oil, sweetened with house vanilla bean syrup and topped with silky milk foam.",
            badge: null,
            tags: ["Bergamot", "Classic"],
            img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80"
        }
    ],
    cold: [
        {
            name: "Nitro Cold Brew",
            price: "$5.50",
            desc: "Single-origin Colombian beans cold-steeped for 20 hours and infused with pure nitrogen for a cascading, stout-like texture.",
            badge: "On Tap",
            tags: ["Draft", "Creamy"],
            img: "https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Iced Salted Caramel",
            price: "$6.00",
            desc: "Double espresso poured over crystal clear ice with house-crafted burnt sugar caramel and a pinch of Maldon flaky sea salt.",
            badge: null,
            tags: ["Sweet", "Iced"],
            img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Sparkling Yuzu Fizz",
            price: "$5.00",
            desc: "Japanese citrus purée combined with sparkling mineral water, fresh rosemary sprig, and Meyer lemon juice. Highly refreshing.",
            badge: null,
            tags: ["Botanical", "Zero Caffeine"],
            img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
        }
    ],
    pastry: [
        {
            name: "French Butter Croissant",
            price: "$4.50",
            desc: "Three-day laminated dough made exclusively with AOP Isigny French butter. Crispy, shattered exterior with a delicate honeycomb crumb.",
            badge: "5 AM Bake",
            tags: ["Flaky", "Classic"],
            img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Cardamom Bun",
            price: "$5.00",
            desc: "Traditional Scandinavian twisted knot bread spiced with freshly ground green cardamom pods and topped with pearl sugar.",
            badge: null,
            tags: ["Nordic", "Spiced"],
            img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Brown Butter Cookie",
            price: "$4.00",
            desc: "Nutty brown butter cookie dough studded with bittersweet chocolate fèves and finished with Maldon sea salt. Served warm.",
            badge: null,
            tags: ["Warm", "Sweet"],
            img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80"
        }
    ],
    brunch: [
        {
            name: "Heirloom Avocado Toast",
            price: "$12.00",
            desc: "Thick-cut country sourdough, smashed organic Hass avocado, pickled shallots, heirloom cherry tomatoes, and dukkah spice crunch.",
            badge: "Healthy",
            tags: ["Vegan", "Savory"],
            img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Ricotta Hotcakes",
            price: "$14.00",
            desc: "Cloud-like whipped ricotta pancakes served with seasonal Pacific Northwest berry compote and Grade A dark amber maple syrup.",
            badge: null,
            tags: ["Sweet", "Weekend"],
            img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80"
        }
    ]
};

const TESTIMONIALS = [
    {
        quote: "The Honey Lavender Latte is divine. I drive 20 minutes across town every morning just for this cup. The architectural lighting makes it my favorite workspace.",
        author: "Sarah Mitchell",
        role: "Architectural Designer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
        quote: "As someone who works in specialty coffee, Velvet Bean pulls the most consistent, syrupy espresso shots in Portland. Their single-origin V60 menu is unmatched.",
        author: "James Kim",
        role: "Coffee Roaster",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
        quote: "The atmosphere is pure warmth. It feels like a boutique hotel lobby met a world-class European café. Their pastry laminated dough is breathtaking.",
        author: "Emma Rodriguez",
        role: "Food Writer",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    }
];

const GALLERY_ITEMS = [
    {
        title: "The Main Lounge",
        sub: "Architectural Seating",
        img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
        wide: true,
        tall: false
    },
    {
        title: "Master Extraction",
        sub: "Slayer Espresso",
        img: "https://images.unsplash.com/photo-1507133750069-69d3cdad863a?auto=format&fit=crop&w=1000&q=80",
        wide: false,
        tall: true
    },
    {
        title: "Small Batch Drum",
        sub: "Probat Roaster",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
        wide: false,
        tall: false
    },
    {
        title: "Morning Ritual",
        sub: "Quiet Corners",
        img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80",
        wide: false,
        tall: false
    },
    {
        title: "Evening Warmth",
        sub: "Community Events",
        img: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1400&q=80",
        wide: true,
        tall: false
    }
];

/* ==========================================
   2. APPLICATION LOGIC & RENDERING
   ========================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize Lenis Smooth Scrolling
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

// DOM Rendering Functions
function renderAboutCards() {
    const container = document.getElementById('aboutCardsContainer');
    if (!container) return;
    
    container.innerHTML = ABOUT_CARDS.map(card => `
        <div class="editorial-card gsap-reveal" data-cursor="view">
            <div class="editorial-card-img-wrap">
                ${createSafeImg(card.img, card.title, "parallax-img", 'data-speed="0.12"')}
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
                ${createSafeImg(item.img, item.name)}
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
                ${createSafeImg(t.avatar, t.author)}
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
            ${createSafeImg(g.img, g.title)}
            <div class="gallery-overlay">
                <span>${g.title}</span>
                <small>${g.sub}</small>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            const caption = item.getAttribute('data-caption');
            openLightbox(src, caption);
        });
    });
}

// Curtain Loader Sequence
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

// GSAP Scroll & Parallax Choreography
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
        gsap.fromTo(img, { yPercent: -12 }, {
            yPercent: 12, ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    setTimeout(() => ScrollTrigger.refresh(), 200);
}

// Magnetic Button Physics
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

// Custom Editorial Cursor Engine
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

// Menu Tab Switcher
document.getElementById('menuTabs')?.addEventListener('click', (e) => {
    const tab = e.target.closest('.menu-tab');
    if (!tab) return;

    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    renderMenu(tab.getAttribute('data-tab'));
    if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 100);
});

// Stats Counter Animation
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

// Navbar & Ambient Toggle
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

// Toast Notification System
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

// Lightbox System
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.onerror = function() { this.src = SAFE_FALLBACK_IMG; };
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

// Forms & Mobile Menu
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