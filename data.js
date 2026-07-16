/* ==========================================
   VELVET BEAN DATA LAYER (100% Verified URLs)
   ========================================== */

const ABOUT_CARDS = [
    {
        title: "The Roastery",
        location: "Portland, Oregon",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Precision Extraction",
        location: "9 Bar Pressure",
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Ethiopian Yirgacheffe",
        location: "Heirloom Varietals",
        img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
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
            img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Honey Lavender Latte",
            price: "$6.25",
            desc: "Smooth espresso combined with velvety steamed oat milk, raw high-desert Oregon honey, and house-infused culinary lavender.",
            badge: "Best Seller",
            tags: ["Floral", "Comfort"],
            img: "https://images.unsplash.com/photo-1570968992193-fd6dcba1da5e?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Single Origin V60",
            price: "$5.50",
            desc: "Hand-poured filter coffee highlighting seasonal lots. Currently serving: Gesha Village, Ethiopia. Notes of jasmine and peach.",
            badge: "Seasonal",
            tags: ["Bright", "Artisan"],
            img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Classic Cappuccino",
            price: "$4.75",
            desc: "A strict 6-ounce traditional cappuccino. Equal parts espresso, steamed milk, and rich, glossy microfoam.",
            badge: null,
            tags: ["Creamy", "Balanced"],
            img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Valrhona Mocha",
            price: "$6.00",
            desc: "Double espresso melted directly into 70% Valrhona dark chocolate ganache, finished with steamed whole milk and cocoa dust.",
            badge: null,
            tags: ["Indulgent", "Rich"],
            img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Velvet Americano",
            price: "$4.25",
            desc: "Double espresso pulled over hot filtered water, preserving the golden crema for a clean, full-bodied cup without bitterness.",
            badge: null,
            tags: ["Classic", "Smooth"],
            img: "https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?auto=format&fit=crop&w=800&q=80"
        }
    ],
    tea: [
        {
            name: "Uji Matcha Latte",
            price: "$6.00",
            desc: "First-harvest ceremonial grade matcha from Uji, Japan, hand-whisked in a chawan and served over steamed macadamia milk.",
            badge: "Ceremonial",
            tags: ["Vibrant", "Antioxidants"],
            img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Masala Chai",
            price: "$5.50",
            desc: "Our proprietary 24-hour steeped chai concentrate featuring organic Assam black tea, cracked cardamom, ginger, and star anise.",
            badge: null,
            tags: ["Spiced", "Cozy"],
            img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "London Fog",
            price: "$5.25",
            desc: "Organic Earl Grey infused with Italian bergamot oil, sweetened with house vanilla bean syrup and topped with silky milk foam.",
            badge: null,
            tags: ["Bergamot", "Classic"],
            img: "https://images.unsplash.com/photo-1594631252845-29fc4cc4cde9?auto=format&fit=crop&w=800&q=80"
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
            img: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80"
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