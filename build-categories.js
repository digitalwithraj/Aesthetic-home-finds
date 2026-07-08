const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// Extract product articles from index.html
function extractProducts(html) {
  const products = [];
  const regex = /<article class="product-card group reveal" data-category="([^"]+)">([\s\S]*?)<\/article>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    products.push({ categories: match[1].split(/\s+/), html: match[2] });
  }
  return products;
}

const allProducts = extractProducts(indexHtml);

const categories = [
  {
    slug: 'bedroom',
    name: 'Bedroom Decor',
    filterKey: 'bedroom',
    tagline: 'Cozy & tranquil escapes',
    description: 'Transform your bedroom into a serene retreat with our curated selection of aesthetic bedroom decor from Amazon. From luxurious bedding sets to ambient lighting and smart storage solutions.',
    metaDesc: 'Shop curated aesthetic bedroom decor finds from Amazon. Discover cozy bedding, nightstands, ambient lighting, and minimalist bedroom essentials.',
    heroImage: '../images/bedroom%20decor.webp',
  },
  {
    slug: 'living-room',
    name: 'Living Room Essentials',
    filterKey: 'living-room',
    tagline: 'Social & stylish hubs',
    description: 'Elevate your living room with handpicked decor that blends comfort and modern elegance. From textured throw pillows to statement lamps and sculptural vases.',
    metaDesc: 'Shop curated aesthetic living room decor finds from Amazon. Discover throw pillows, rugs, curtains, ceramic lamps, and minimalist living room essentials.',
    heroImage: '../images/living%20room%20decor.webp',
  },
  {
    slug: 'workspace',
    name: 'Workspace Aesthetics',
    filterKey: 'workspace',
    tagline: 'High-performance styling',
    description: 'Design a workspace that inspires productivity and creativity. Standing desks, monitor risers, sculptural accents, and organizational essentials for your home office.',
    metaDesc: 'Shop curated aesthetic workspace and home office decor from Amazon. Discover standing desks, monitor stands, shelves, and minimalist desk accessories.',
    heroImage: '../images/work%20space%20decor.webp',
  },
  {
    slug: 'kitchen',
    name: 'Kitchen Decor',
    filterKey: 'kitchen',
    tagline: 'Functional charm',
    description: 'Make your kitchen as beautiful as it is functional. Curated picks including woven coasters, vintage vases, premium knife sets, runner rugs, and smart organizers.',
    metaDesc: 'Shop curated aesthetic kitchen decor finds from Amazon. Discover coasters, organizers, ceramic vases, knife sets, and stylish kitchen essentials.',
    heroImage: '../images/kitchen%20decor.webp',
  },
  {
    slug: 'cozy-lighting',
    name: 'Cozy Lighting',
    filterKey: 'lighting',
    tagline: 'Atmosphere & ambiance',
    description: 'Set the perfect mood with ambient lighting picks. Sunset projectors, fairy lights, dimmable floor lamps, rechargeable wall sconces, and LED projection lamps.',
    metaDesc: 'Shop curated cozy lighting finds from Amazon. Discover sunset projectors, fairy lights, floor lamps, wall sconces, and ambient LED lighting.',
    heroImage: '../images/cozy%20lighting%20decor.webp',
  },
  {
    slug: 'wall-decor',
    name: 'Wall Decor',
    filterKey: 'wall-decor',
    tagline: 'Personalized expressions',
    description: 'Turn bare walls into curated gallery spaces. Floating shelves, cork boards, and decorative accents that add personality and warmth to every room.',
    metaDesc: 'Shop curated aesthetic wall decor finds from Amazon. Discover floating shelves, cork boards, wall art, and minimalist wall accessories.',
    heroImage: '../images/wall%20decor.webp',
  },
];

function fixImagePaths(html) {
  return html
    .replace(/src="images\\/g, 'src="../images/')
    .replace(/src="\.\.\/images\//g, 'src="../images/')
    .replace(/\\/g, '/');
}

function generatePage(cat) {
  const products = allProducts.filter(p => p.categories.includes(cat.filterKey));
  
  const productCards = products.map(p => {
    let cardHtml = fixImagePaths(p.html);
    return `                <article class="product-card group reveal">${cardHtml}</article>`;
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-94P2P1XF8N"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-94P2P1XF8N');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cat.name} | Aesthetic Home Finds</title>
    <meta name="description" content="${cat.metaDesc}">
    <meta name="p:domain_verify" content="43ac91cddd9fe9598ba33b03ddd693d1"/>
    <link rel="canonical" href="https://www.aesthetichomefinds.shop/${cat.slug}/">

    <!-- Open Graph -->
    <meta property="og:title" content="${cat.name} | Aesthetic Home Finds">
    <meta property="og:description" content="${cat.metaDesc}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.aesthetichomefinds.shop/${cat.slug}/">

    <link rel="icon" href="../images/favicon/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../images/favicon/apple-touch-icon.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'beige': { 'light': '#F5F1EB', 'DEFAULT': '#E8E1D5', 'dark': '#D4A574' },
                        'neutral-accent': '#8B7355',
                        'luxury-black': '#1A1A1A',
                    },
                    fontFamily: {
                        'serif': ['"Playfair Display"', 'serif'],
                        'sans': ['Inter', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.8s ease-out forwards',
                        'slide-up': 'slideUp 0.8s ease-out forwards',
                    },
                    keyframes: {
                        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                    },
                }
            }
        }
    </script>

    <style>
        .glass { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
        .site-logo { display:block; width:6rem; height:2.6rem; flex-shrink:0; object-fit:contain; transform:scale(2.75); transform-origin:left center; }
        @media (max-width:767px) { .site-logo { width:5rem; height:2.2rem; transform:scale(2); } }
        .footer-logo { display:block; width:14rem; height:auto; object-fit:contain; transform:none; }
        .section-divider { display:block; height:1px; width:5.5rem; margin:1.5rem auto 0; background:linear-gradient(90deg,transparent,rgba(183,138,86,0.72),transparent); }

        .product-card { display:flex; height:100%; min-height:100%; flex-direction:column; overflow:hidden; border:1px solid rgba(139,115,85,0.16); border-radius:1.25rem; background:rgba(255,252,246,0.78); box-shadow:0 10px 30px rgba(0,0,0,0.06),0 2px 8px rgba(0,0,0,0.04); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); transition:all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .product-card:hover { transform:translateY(-8px); border-color:rgba(212,165,116,0.34); box-shadow:0 28px 70px rgba(63,48,33,0.14),0 10px 26px rgba(26,26,26,0.08); }
        .product-media { position:relative; overflow:hidden; aspect-ratio:4/3; background:#e8e1d5; }
        .product-media::after { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.18),transparent 48%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(26,26,26,0.08)); pointer-events:none; }
        .product-image { height:100%; width:100%; object-fit:cover; filter:saturate(0.82) contrast(0.98) sepia(0.1) brightness(0.98); transition:transform 0.75s cubic-bezier(0.4,0,0.2,1),filter 0.75s cubic-bezier(0.4,0,0.2,1); }
        .product-card:hover .product-image { transform:scale(1.055); filter:saturate(0.94) contrast(1.02) sepia(0.04) brightness(1); }
        .category-badge, .trend-badge { border:1px solid rgba(255,255,255,0.4); border-radius:999px; background:rgba(255,255,255,0.7); color:#4d4032; box-shadow:0 8px 22px rgba(26,26,26,0.08); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
        .product-content { display:flex; flex:1; flex-direction:column; }
        .product-title { font-size:20px; font-weight:600; line-height:1.3; color:#221f1b; }
        .product-rating { display:flex; align-items:center; gap:0.5rem; margin-top:0.65rem; color:#b78a56; font-size:0.82rem; font-weight:600; line-height:1; }
        .rating-stars { display:inline-flex; gap:0.08rem; letter-spacing:0; }
        .rating-score { color:#74685e; font-size:0.72rem; font-weight:600; }
        .product-highlights { display:grid; gap:0.5rem; margin:0 0 1.35rem; padding:0; list-style:none; }
        .product-highlights li { position:relative; padding-left:1rem; color:#6b6258; font-size:0.8rem; line-height:1.55; }
        .product-highlights li::before { content:""; position:absolute; left:0; top:0.64em; height:0.32rem; width:0.32rem; border-radius:999px; background:#b78a56; box-shadow:0 0 0 4px rgba(183,138,86,0.12); }
        .premium-cta { display:inline-flex; align-items:center; justify-content:center; min-height:3rem; width:100%; margin-top:auto; border-radius:999px; background:#1A1A1A; color:#fff; box-shadow:0 16px 34px rgba(26,26,26,0.16),0 0 0 1px rgba(255,255,255,0.04) inset; font-size:0.7rem; font-weight:700; letter-spacing:0.13em; text-align:center; text-transform:uppercase; transition:all 0.3s ease; }
        .premium-cta:hover { transform:translateY(-2px); background:#211c17; box-shadow:0 22px 42px rgba(26,26,26,0.24),0 0 32px rgba(183,138,86,0.18); }
        .premium-cta:focus-visible { outline:3px solid rgba(183,138,86,0.32); outline-offset:4px; }

        .reveal { opacity:0; transform:translateY(30px); transition:all 0.8s ease-out; }
        .reveal.active { opacity:1; transform:translateY(0); }
        .affiliate-disclosure { position:fixed; top:0; left:0; right:0; z-index:60; background:rgba(26,26,26,0.92); color:rgba(255,255,255,0.7); font-size:0.65rem; letter-spacing:0.08em; text-align:center; padding:0.45rem 1rem; transition:transform 0.3s ease; }
        .back-to-top { position:fixed; bottom:2rem; right:2rem; z-index:40; width:3rem; height:3rem; border-radius:50%; background:rgba(26,26,26,0.85); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transform:translateY(20px); transition:all 0.4s cubic-bezier(0.4,0,0.2,1); pointer-events:none; border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.15); }
        .back-to-top.visible { opacity:1; transform:translateY(0); pointer-events:auto; }
        .back-to-top:hover { background:#1A1A1A; transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.25); }

        .featured-finds { position:relative; overflow:hidden; background: radial-gradient(circle at 12% 12%,rgba(255,255,255,0.78),transparent 26%), radial-gradient(circle at 82% 18%,rgba(183,138,86,0.14),transparent 30%), linear-gradient(180deg,#f7f2eb 0%,#f3ede5 100%); }
        .featured-finds::before { content:""; position:absolute; inset:0; pointer-events:none; opacity:0.28; background-image:linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px); background-size:38px 38px; mask-image:linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent); }

        .breadcrumb a { color:#8B7355; text-decoration:none; transition:color 0.2s ease; }
        .breadcrumb a:hover { color:#1A1A1A; }
        .breadcrumb .separator { color:#ccc; margin:0 0.5rem; }
        .breadcrumb .current { color:#62564b; }
    </style>
</head>
<body class="bg-white text-luxury-black font-sans selection:bg-beige-dark selection:text-white">

    <!-- STICKY NAVIGATION BAR -->
    <nav class="fixed top-[26px] w-full z-50 glass py-4 transition-all duration-300" id="navbar">
        <div class="container mx-auto px-6 flex justify-between items-center">
            <a href="../" class="inline-flex items-center" aria-label="Aesthetic Home Finds home">
                <img src="../images/logo%20horizontal%20remove%20bg.png" alt="Aesthetic Home Finds" class="site-logo">
            </a>
            <div class="hidden md:flex space-x-8 text-sm font-normal tracking-wide uppercase">
                <a href="../#categories" class="hover:text-beige-dark transition-colors">Categories</a>
                <a href="../#finds" class="hover:text-beige-dark transition-colors">Curated Finds</a>
                <a href="../#inspiration" class="hover:text-beige-dark transition-colors">Inspiration</a>
            </div>
            <a href="../" class="md:hidden text-xs font-bold uppercase tracking-widest text-neutral-accent hover:text-luxury-black transition-colors">&larr; Home</a>
        </div>
    </nav>

    <!-- AFFILIATE DISCLOSURE -->
    <div class="affiliate-disclosure">
        This page contains affiliate links. We may earn a small commission at no extra cost to you.
    </div>

    <!-- HERO SECTION -->
    <section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-beige-light">
        <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px); background-size:38px 38px; mask-image:linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent);"></div>
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-beige-dark opacity-[0.07] rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-beige-dark opacity-[0.05] rounded-full blur-3xl"></div>
        <div class="container mx-auto px-6 relative z-10 text-center">
            <!-- Breadcrumb -->
            <nav class="breadcrumb mb-6 text-xs font-medium uppercase tracking-widest" aria-label="Breadcrumb">
                <a href="../">Home</a>
                <span class="separator" aria-hidden="true">/</span>
                <span class="current">${cat.name}</span>
            </nav>
            <span class="mb-4 block text-[11px] font-bold uppercase tracking-[0.32em] text-[#9b7650]">${cat.tagline}</span>
            <h1 class="text-4xl md:text-6xl font-serif mb-6 text-[#221f1b]">${cat.name}</h1>
            <p class="mx-auto max-w-2xl text-sm md:text-base font-light leading-7 text-[#62564b]">${cat.description}</p>
            <span class="section-divider" aria-hidden="true"></span>
            <p class="mt-8 text-xs text-neutral-400 font-light">${products.length} curated finds</p>
        </div>
    </section>

    <!-- PRODUCTS SECTION -->
    <section class="featured-finds py-24 md:py-32">
        <div class="container relative z-10 mx-auto px-6">
            <header class="mx-auto mb-12 max-w-4xl text-center">
                <span class="mb-4 block text-[11px] font-bold uppercase tracking-[0.32em] text-[#9b7650]">Curated Collection</span>
                <h2 class="font-serif text-4xl leading-tight text-[#221f1b] md:text-5xl">${cat.name} Finds</h2>
                <span class="section-divider" aria-hidden="true"></span>
            </header>

            <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3" id="product-grid">
${productCards}
            </div>

            <div class="mt-14 text-center">
                <a href="../#categories"
                    class="inline-flex min-h-14 items-center justify-center rounded-full border border-[#1A1A1A] bg-transparent px-10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1A1A1A] hover:text-white hover:shadow-2xl">
                    Explore All Categories
                </a>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-white py-16">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div class="col-span-1 md:col-span-1">
                    <a href="../" class="inline-flex items-center mb-6" aria-label="Aesthetic Home Finds home">
                        <img src="../images/logo%20horizontal%20remove%20bg.png" alt="Aesthetic Home Finds" class="footer-logo">
                    </a>
                    <p class="text-sm text-neutral-400 font-light mb-8">Curating the world's most beautiful, affordable Amazon decor finds for the modern, aesthetic home.</p>
                </div>
                <div>
                    <h5 class="text-xs font-bold uppercase tracking-widest mb-8">Shop Categories</h5>
                    <ul class="space-y-4 text-sm text-neutral-500 font-light">
                        <li><a href="../bedroom/" class="hover:text-luxury-black">Bedroom</a></li>
                        <li><a href="../living-room/" class="hover:text-luxury-black">Living Room</a></li>
                        <li><a href="../workspace/" class="hover:text-luxury-black">Home Office</a></li>
                        <li><a href="../kitchen/" class="hover:text-luxury-black">Kitchen & Dining</a></li>
                        <li><a href="../cozy-lighting/" class="hover:text-luxury-black">Cozy Lighting</a></li>
                        <li><a href="../wall-decor/" class="hover:text-luxury-black">Wall Decor</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-xs font-bold uppercase tracking-widest mb-8">Helpful Links</h5>
                    <ul class="space-y-4 text-sm text-neutral-500 font-light">
                        <li><a href="../contact.html" class="hover:text-luxury-black">Contact</a></li>
                        <li><a href="../privacy-policy.html" class="hover:text-luxury-black">Privacy Policy</a></li>
                        <li><a href="../disclaimer.html" class="hover:text-luxury-black">Disclaimer</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-xs font-bold uppercase tracking-widest mb-8">Legal Disclaimer</h5>
                    <p class="text-[10px] text-neutral-400 font-light leading-relaxed mb-4">As an Amazon Associate, we earn from qualifying purchases. This means if you click on a link and make a purchase, we may receive a small commission at no extra cost to you.</p>
                    <p class="text-[10px] text-neutral-400 font-light leading-relaxed">&copy; 2026 AESTHETIC HOME FINDS. All aesthetic rights reserved.</p>
                </div>
            </div>
            <div class="border-t border-beige pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                    <a href="../disclaimer.html" class="hover:text-luxury-black transition-colors">Disclaimer</a>
                    <a href="../affiliate-disclosure.html" class="hover:text-luxury-black transition-colors">Affiliate Disclosure</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- BACK TO TOP BUTTON -->
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
        <i data-lucide="arrow-up" class="w-5 h-5"></i>
    </button>

    <script>
        lucide.createIcons();

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) { navbar.classList.add('py-2','shadow-md'); navbar.classList.remove('py-4'); }
            else { navbar.classList.add('py-4'); navbar.classList.remove('py-2','shadow-md'); }
        });

        // Scroll reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        // Back to top
        const backToTopBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        });
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    </script>
</body>
</html>`;
}

// Generate all category pages
categories.forEach(cat => {
  const dir = path.join(__dirname, cat.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  const html = generatePage(cat);
  fs.writeFileSync(filePath, html, 'utf-8');
  const products = allProducts.filter(p => p.categories.includes(cat.filterKey));
  console.log(`Created ${cat.slug}/index.html (${products.length} products)`);
});

console.log('\nAll category pages generated successfully!');
