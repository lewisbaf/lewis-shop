/**
 * LEWIS SHOP - Product Catalog (Demo Data)
 * All data is for demonstration purposes only.
 * Prices, stocks and references are fictional.
 */

const PRODUCTS = [
  {
    id: "LS-001",
    name: "Casque Audio Sans Fil Premium",
    slug: "casque-audio-sans-fil-premium",
    category: "electronique",
    categoryLabel: "Électronique",
    price: 45000,
    promoPrice: 38900,
    onPromo: true,
    stock: 15,
    description: "Casque Bluetooth haute fidélité avec réduction de bruit active. Autonomie 30h. Design élégant et confortable pour un usage quotidien.",
    shortDesc: "Son immersif, autonomie longue durée.",
    badge: "Promo",
    featured: true,
    bestseller: true,
    new: false,
    image: null // placeholder
  },
  {
    id: "LS-002",
    name: "Montre Connectée Sport",
    slug: "montre-connectee-sport",
    category: "electronique",
    categoryLabel: "Électronique",
    price: 32000,
    promoPrice: null,
    onPromo: false,
    stock: 22,
    description: "Montre intelligente avec suivi de santé, GPS et notifications. Compatible Android et iOS. Étanche IP68.",
    shortDesc: "Suivi santé et sport avancé.",
    badge: null,
    featured: true,
    bestseller: true,
    new: true,
    image: null
  },
  {
    id: "LS-003",
    name: "Sac à Dos Urbain Élégant",
    slug: "sac-a-dos-urbain-elegant",
    category: "mode",
    categoryLabel: "Mode & Accessoires",
    price: 28500,
    promoPrice: 24900,
    onPromo: true,
    stock: 8,
    description: "Sac à dos en tissu résistant avec compartiment laptop 15\". Design minimaliste, plusieurs poches organisées.",
    shortDesc: "Style et praticité au quotidien.",
    badge: "Promo",
    featured: true,
    bestseller: false,
    new: false,
    image: null
  },
  {
    id: "LS-004",
    name: "Lampe de Bureau LED Design",
    slug: "lampe-de-bureau-led-design",
    category: "maison",
    categoryLabel: "Maison & Déco",
    price: 18500,
    promoPrice: null,
    onPromo: false,
    stock: 30,
    description: "Lampe LED réglable en intensité et température de couleur. Bras flexible, base stable. Idéale pour le télétravail.",
    shortDesc: "Éclairage modulable et moderne.",
    badge: null,
    featured: false,
    bestseller: false,
    new: true,
    image: null
  },
  {
    id: "LS-005",
    name: "Enceinte Portable Bluetooth",
    slug: "enceinte-portable-bluetooth",
    category: "electronique",
    categoryLabel: "Électronique",
    price: 22000,
    promoPrice: 18900,
    onPromo: true,
    stock: 18,
    description: "Enceinte waterproof IPX7, son stéréo puissant, autonomie 12h. Parfaite pour l'extérieur et les fêtes.",
    shortDesc: "Son puissant, résistant à l'eau.",
    badge: "Promo",
    featured: true,
    bestseller: true,
    new: false,
    image: null
  },
  {
    id: "LS-006",
    name: "Coffret Soins Visage Homme",
    slug: "coffret-soins-visage-homme",
    category: "beaute",
    categoryLabel: "Beauté & Soins",
    price: 27500,
    promoPrice: null,
    onPromo: false,
    stock: 12,
    description: "Coffret complet : nettoyant, hydratant et sérum. Formules adaptées aux peaux africaines. Ingrédients naturels.",
    shortDesc: "Routine complète pour homme.",
    badge: "Nouveau",
    featured: false,
    bestseller: false,
    new: true,
    image: null
  },
  {
    id: "LS-007",
    name: "Powerbank 20000mAh Rapide",
    slug: "powerbank-20000mah-rapide",
    category: "electronique",
    categoryLabel: "Électronique",
    price: 19500,
    promoPrice: 16900,
    onPromo: true,
    stock: 25,
    description: "Batterie externe haute capacité avec charge rapide PD 22.5W. Deux ports USB + USB-C. Indicateur LED.",
    shortDesc: "Ne restez jamais sans batterie.",
    badge: "Promo",
    featured: true,
    bestseller: true,
    new: false,
    image: null
  },
  {
    id: "LS-008",
    name: "Parfum Eau de Toilette 100ml",
    slug: "parfum-eau-de-toilette-100ml",
    category: "beaute",
    categoryLabel: "Beauté & Soins",
    price: 35000,
    promoPrice: null,
    onPromo: false,
    stock: 10,
    description: "Fragrance boisée et fraîche. Notes de bergamote, bois de santal et musc. Tenue longue durée.",
    shortDesc: "Élégance et fraîcheur.",
    badge: null,
    featured: false,
    bestseller: false,
    new: false,
    image: null
  },
  {
    id: "LS-009",
    name: "Set de Cuisine 5 Pièces",
    slug: "set-de-cuisine-5-pieces",
    category: "maison",
    categoryLabel: "Maison & Déco",
    price: 42000,
    promoPrice: 36500,
    onPromo: true,
    stock: 7,
    description: "Set antiadhésif : poêle, casserole, faitout. Compatible tous feux. Manches ergonomiques.",
    shortDesc: "Cuisine avec style et efficacité.",
    badge: "Promo",
    featured: false,
    bestseller: false,
    new: false,
    image: null
  },
  {
    id: "LS-010",
    name: "Lunettes de Soleil UV400",
    slug: "lunettes-de-soleil-uv400",
    category: "mode",
    categoryLabel: "Mode & Accessoires",
    price: 15500,
    promoPrice: null,
    onPromo: false,
    stock: 20,
    description: "Protection UV400, monture légère et confortable. Style unisexe contemporain.",
    shortDesc: "Style et protection solaire.",
    badge: "Nouveau",
    featured: false,
    bestseller: false,
    new: true,
    image: null
  },
  {
    id: "LS-011",
    name: "Tapis de Yoga Premium",
    slug: "tapis-de-yoga-premium",
    category: "sport",
    categoryLabel: "Sport & Bien-être",
    price: 21000,
    promoPrice: 17900,
    onPromo: true,
    stock: 14,
    description: "Tapis antidérapant 6mm, écologique, avec sangle de transport. Idéal yoga, pilates et fitness.",
    shortDesc: "Confort et stabilité pour vos séances.",
    badge: "Promo",
    featured: false,
    bestseller: false,
    new: false,
    image: null
  },
  {
    id: "LS-012",
    name: "Support Laptop Ajustable",
    slug: "support-laptop-ajustable",
    category: "electronique",
    categoryLabel: "Électronique",
    price: 14500,
    promoPrice: null,
    onPromo: false,
    stock: 28,
    description: "Support en aluminium réglable en hauteur et inclinaison. Améliore l'ergonomie et le refroidissement.",
    shortDesc: "Ergonomie et productivité.",
    badge: null,
    featured: false,
    bestseller: false,
    new: true,
    image: null
  }
];

const CATEGORIES = [
  { id: "electronique", name: "Électronique", icon: "📱", count: 0 },
  { id: "mode", name: "Mode & Accessoires", icon: "👜", count: 0 },
  { id: "maison", name: "Maison & Déco", icon: "🏠", count: 0 },
  { id: "beaute", name: "Beauté & Soins", icon: "✨", count: 0 },
  { id: "sport", name: "Sport & Bien-être", icon: "💪", count: 0 }
];

// Update category counts
CATEGORIES.forEach(cat => {
  cat.count = PRODUCTS.filter(p => p.category === cat.id).length;
});

/**
 * Format price in FCFA
 */
function formatPrice(amount) {
  return new Intl.NumberFormat('fr-CG', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(amount) + ' FCFA';
}

/**
 * Get product by ID
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get product by slug
 */
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

/**
 * Filter products
 */
function filterProducts(options = {}) {
  let result = [...PRODUCTS];

  if (options.category && options.category !== 'all') {
    result = result.filter(p => p.category === options.category);
  }

  if (options.onPromo === true) {
    result = result.filter(p => p.onPromo);
  }

  if (options.featured === true) {
    result = result.filter(p => p.featured);
  }

  if (options.bestseller === true) {
    result = result.filter(p => p.bestseller);
  }

  if (options.new === true) {
    result = result.filter(p => p.new);
  }

  if (options.search) {
    const q = options.search.toLowerCase().trim();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (options.sort === 'price-asc') {
    result.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
  } else if (options.sort === 'price-desc') {
    result.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
  } else if (options.sort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }

  return result;
}

/**
 * Generate product card HTML
 */
function renderProductCard(product) {
  const priceHtml = product.onPromo && product.promoPrice
    ? `<span class="price-current">${formatPrice(product.promoPrice)}</span>
       <span class="price-old">${formatPrice(product.price)}</span>`
    : `<span class="price-current">${formatPrice(product.price)}</span>`;

  const badgeHtml = product.badge
    ? `<span class="product-badge ${product.onPromo ? 'promo' : ''}">${product.badge}</span>`
    : '';

  return `
    <article class="product-card" data-id="${product.id}">
      ${badgeHtml}
      <a href="produit.html?id=${product.id}" class="product-image" aria-label="Voir ${product.name}">
        <div class="product-image-placeholder">📦</div>
      </a>
      <div class="product-info">
        <p class="product-category">${product.categoryLabel}</p>
        <h3 class="product-name">
          <a href="produit.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-price">${priceHtml}</div>
        <div class="product-actions">
          <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}" aria-label="Ajouter ${product.name} au panier">
            Ajouter
          </button>
          <a href="produit.html?id=${product.id}" class="btn btn-outline btn-sm">Voir</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render product grid
 */
function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h2>Aucun produit trouvé</h2>
        <p>Essayez de modifier vos filtres ou votre recherche.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(renderProductCard).join('');
}