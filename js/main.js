/**
 * LEWIS SHOP - Main JavaScript
 * Core interactions, mobile menu, animations, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSearch();
  initBackToTop();
  initScrollAnimations();
  initAddToCartButtons();
  initFAQ();
  initNewsletter();
  updateCartCount();

  // Page-specific
  const path = window.location.pathname;
  if (path.includes('panier')) {
    renderCartPage();
  }
  if (path.includes('boutique') || path.includes('promotions') || path.includes('nouveautes')) {
    initShopPage();
  }
  if (path.includes('produit')) {
    initProductPage();
  }
  if (path.includes('checkout')) {
    initCheckoutPage();
  }
});

/* Mobile Menu */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* Search Overlay */
function initSearch() {
  const toggle = document.querySelector('.search-toggle');
  const overlay = document.querySelector('.search-overlay');
  const input = document.querySelector('.search-input');
  const results = document.querySelector('.search-results');
  const closeBtn = document.querySelector('.search-close');

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    overlay.classList.add('active');
    setTimeout(() => input?.focus(), 100);
  });

  const closeSearch = () => {
    overlay.classList.remove('active');
    if (results) results.innerHTML = '';
    if (input) input.value = '';
  };

  closeBtn?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });

  // Live search
  input?.addEventListener('input', debounce(() => {
    const q = input.value.trim();
    if (q.length < 2) {
      results.innerHTML = '';
      return;
    }
    const products = filterProducts({ search: q }).slice(0, 6);
    if (products.length === 0) {
      results.innerHTML = '<p style="padding:1rem;color:#6b6b6b;">Aucun résultat</p>';
      return;
    }
    results.innerHTML = products.map(p => `
      <a href="produit.html?id=${p.id}" style="display:flex;align-items:center;gap:12px;padding:10px;border-bottom:1px solid #f0f0f0;">
        <span style="font-size:1.5rem;">📦</span>
        <div>
          <strong style="font-size:0.9rem;">${p.name}</strong>
          <div style="font-size:0.8rem;color:#6b6b6b;">${formatPrice(p.promoPrice || p.price)}</div>
        </div>
      </a>
    `).join('');
  }, 250));
}

/* Back to Top */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Scroll Animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* Add to Cart buttons (delegated) */
function initAddToCartButtons() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    e.preventDefault();
    const id = btn.dataset.id;
    if (id) addToCart(id);
  });
}

/* FAQ Accordion */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* Newsletter */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (!email?.value || !email.value.includes('@')) {
      showToast('Veuillez entrer une adresse email valide', 'error');
      return;
    }
    // Demo only - no real subscription
    showToast('Merci ! Vous êtes inscrit à la newsletter (démo)', 'success');
    form.reset();
  });
}

/* Shop page filters */
function initShopPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const categorySelect = document.getElementById('filter-category');
  const sortSelect = document.getElementById('filter-sort');
  const promoCheck = document.getElementById('filter-promo');
  const searchInput = document.getElementById('shop-search');

  // Detect page type from URL or data attribute
  const pageType = document.body.dataset.page || '';

  function applyFilters() {
    const options = {
      category: categorySelect?.value || 'all',
      sort: sortSelect?.value || 'default',
      onPromo: promoCheck?.checked || pageType === 'promotions',
      new: pageType === 'nouveautes',
      search: searchInput?.value || ''
    };
    const products = filterProducts(options);
    renderProductGrid(products, 'products-grid');
  }

  categorySelect?.addEventListener('change', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);
  promoCheck?.addEventListener('change', applyFilters);
  searchInput?.addEventListener('input', debounce(applyFilters, 300));

  applyFilters();
}

/* Product detail page */
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = id ? getProductById(id) : null;

  const container = document.getElementById('product-detail');
  if (!container) return;

  if (!product) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <h2>Produit introuvable</h2>
        <p>Ce produit n'existe pas ou a été retiré.</p>
        <a href="boutique.html" class="btn btn-gold">Retour à la boutique</a>
      </div>
    `;
    return;
  }

  // Update page title and meta
  document.title = `${product.name} | LEWIS SHOP Congo`;

  const priceHtml = product.onPromo && product.promoPrice
    ? `<span class="price-current">${formatPrice(product.promoPrice)}</span>
       <span class="price-old">${formatPrice(product.price)}</span>`
    : `<span class="price-current">${formatPrice(product.price)}</span>`;

  const stockHtml = product.stock > 0
    ? `<div class="stock-status">✓ En stock (${product.stock} disponible${product.stock > 1 ? 's' : ''})</div>`
    : `<div class="stock-status out">✕ Rupture de stock</div>`;

  container.innerHTML = `
    <div class="product-gallery">
      <div class="product-image-placeholder" style="font-size:5rem;opacity:0.4;">📦</div>
    </div>
    <div class="product-detail-info">
      <p class="product-category">${product.categoryLabel}</p>
      <h1>${product.name}</h1>
      <div class="product-detail-price">${priceHtml}</div>
      ${stockHtml}
      <p class="product-detail-desc">${product.description}</p>
      <div class="product-actions" style="display:flex;gap:12px;flex-wrap:wrap;">
        <button class="btn btn-gold btn-lg add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
          Ajouter au panier
        </button>
        <a href="https://wa.me/242000000000?text=${encodeURIComponent('Bonjour, je suis intéressé par : ' + product.name + ' (réf. ' + product.id + ')')}" 
           class="btn btn-outline btn-lg" target="_blank" rel="noopener">
          Commander via WhatsApp
        </a>
      </div>
      <div class="demo-notice mt-2">
        Données de démonstration. Prix et stocks fictifs à des fins de présentation uniquement.
      </div>
    </div>
  `;

  // JSON-LD Product
  injectProductSchema(product);
}

function injectProductSchema(product) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "XAF",
      "price": product.promoPrice || product.price,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "LEWIS SHOP"
      }
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* Toast notification */
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* Debounce helper */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}