/**
 * LEWIS SHOP - Cart Management
 * Uses LocalStorage for persistence (demo)
 */

const CART_KEY = 'lewis_shop_cart';

/**
 * Get cart from LocalStorage
 */
function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erreur lecture panier:', e);
    return [];
  }
}

/**
 * Save cart to LocalStorage
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  } catch (e) {
    console.error('Erreur sauvegarde panier:', e);
  }
}

/**
 * Add product to cart
 */
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) {
    showToast('Produit introuvable', 'error');
    return false;
  }

  if (product.stock <= 0) {
    showToast('Produit en rupture de stock', 'error');
    return false;
  }

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (newQty > product.stock) {
      showToast(`Stock limité : ${product.stock} disponible(s)`, 'error');
      return false;
    }
    existing.quantity = newQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.promoPrice || product.price,
      originalPrice: product.price,
      quantity: quantity,
      slug: product.slug
    });
  }

  saveCart(cart);
  showToast(`${product.name} ajouté au panier`, 'success');

  // Bounce cart icon
  const cartBtn = document.querySelector('.cart-toggle');
  if (cartBtn) {
    cartBtn.classList.add('bounce');
    setTimeout(() => cartBtn.classList.remove('bounce'), 400);
  }

  return true;
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  showToast('Produit retiré du panier', 'success');
  return cart;
}

/**
 * Update quantity
 */
function updateQuantity(productId, quantity) {
  if (quantity < 1) {
    return removeFromCart(productId);
  }

  const product = getProductById(productId);
  if (product && quantity > product.stock) {
    showToast(`Stock limité : ${product.stock} disponible(s)`, 'error');
    quantity = product.stock;
  }

  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
  return cart;
}

/**
 * Get cart totals
 */
function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Demo shipping logic - configurable, not real rates
  // Shipping is calculated on checkout based on city selection
  return {
    items: cart,
    itemCount,
    subtotal,
    subtotalFormatted: formatPrice(subtotal)
  };
}

/**
 * Update cart count badge
 */
function updateCartCount() {
  const { itemCount } = getCartTotals();
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(badge => {
    badge.textContent = itemCount > 0 ? itemCount : '';
    badge.style.display = itemCount > 0 ? 'flex' : 'none';
  });
}

/**
 * Clear cart
 */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

/**
 * Render cart page
 */
function renderCartPage() {
  const container = document.getElementById('cart-items');
  const summaryContainer = document.getElementById('cart-summary');
  if (!container) return;

  const { items, subtotal, subtotalFormatted, itemCount } = getCartTotals();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos produits et ajoutez-les à votre panier.</p>
        <a href="boutique.html" class="btn btn-gold">Voir la boutique</a>
      </div>
    `;
    if (summaryContainer) summaryContainer.style.display = 'none';
    return;
  }

  if (summaryContainer) summaryContainer.style.display = 'block';

  container.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-image">📦</div>
      <div class="cart-item-details">
        <h3><a href="produit.html?id=${item.id}">${item.name}</a></h3>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
        <div class="qty-control">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Diminuer">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Augmenter">+</button>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">Supprimer</button>
      </div>
      <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
    </div>
  `).join('');

  // Summary
  if (summaryContainer) {
    document.getElementById('summary-subtotal').textContent = subtotalFormatted;
    document.getElementById('summary-count').textContent = itemCount;
  }

  // Event listeners
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = getCart().find(i => i.id === id);
      if (!item) return;
      const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
      updateQuantity(id, newQty);
      renderCartPage();
    });
  });

  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      renderCartPage();
    });
  });
}

/**
 * Shipping rates (demo configuration - not real commercial rates)
 * These are placeholders to be configured by the merchant
 */
const SHIPPING_CONFIG = {
  brazzaville: { label: 'Brazzaville', fee: 2000, delay: '1-3 jours ouvrés' },
  'pointe-noire': { label: 'Pointe-Noire', fee: 3500, delay: '2-5 jours ouvrés' },
  dolisie: { label: 'Dolisie', fee: 4000, delay: '3-6 jours ouvrés' },
  nkayi: { label: 'Nkayi', fee: 4500, delay: '3-7 jours ouvrés' },
  ouesso: { label: 'Ouesso', fee: 6000, delay: '5-10 jours ouvrés' },
  oyo: { label: 'Oyo', fee: 5500, delay: '4-8 jours ouvrés' },
  autre: { label: 'Autre ville', fee: 5000, delay: 'Sur devis' }
};

function getShippingFee(city) {
  return SHIPPING_CONFIG[city] || SHIPPING_CONFIG.autre;
}