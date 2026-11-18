/**
 * LEWIS SHOP - Checkout Logic (Demo)
 * No real payment processing. Orders are prepared for WhatsApp confirmation.
 */

function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  const summaryEl = document.getElementById('checkout-summary');
  const citySelect = document.getElementById('ville');
  const shippingEl = document.getElementById('shipping-fee');
  const totalEl = document.getElementById('order-total');

  if (!form) return;

  // Populate cart summary
  renderCheckoutSummary();

  // Shipping calculation on city change
  citySelect?.addEventListener('change', () => {
    updateShippingDisplay();
  });

  // Payment option selection
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input').checked = true;
    });
  });

  // Form submission (demo)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleCheckoutSubmit(form);
  });
}

function renderCheckoutSummary() {
  const { items, subtotal, subtotalFormatted, itemCount } = getCartTotals();
  const listEl = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');

  if (!listEl) return;

  if (items.length === 0) {
    listEl.innerHTML = '<p>Votre panier est vide. <a href="boutique.html">Continuer vos achats</a></p>';
    return;
  }

  listEl.innerHTML = items.map(item => `
    <div class="summary-row" style="font-size:0.9rem;">
      <span>${item.name} × ${item.quantity}</span>
      <span>${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = subtotalFormatted;
  updateShippingDisplay();
}

function updateShippingDisplay() {
  const city = document.getElementById('ville')?.value;
  const shippingEl = document.getElementById('shipping-fee');
  const totalEl = document.getElementById('order-total');
  const delayEl = document.getElementById('shipping-delay');
  const { subtotal } = getCartTotals();

  if (!city) {
    if (shippingEl) shippingEl.textContent = '—';
    if (totalEl) totalEl.textContent = formatPrice(subtotal);
    if (delayEl) delayEl.textContent = '';
    return;
  }

  const shipping = getShippingFee(city);
  if (shippingEl) shippingEl.textContent = formatPrice(shipping.fee);
  if (totalEl) totalEl.textContent = formatPrice(subtotal + shipping.fee);
  if (delayEl) delayEl.textContent = `Délai estimé : ${shipping.delay} (à confirmer)`;
}

function handleCheckoutSubmit(form) {
  const { items, subtotal } = getCartTotals();

  if (items.length === 0) {
    showToast('Votre panier est vide', 'error');
    return;
  }

  // Validate required fields
  const required = ['prenom', 'nom', 'telephone', 'adresse', 'ville', 'quartier'];
  for (const field of required) {
    const el = form.querySelector(`[name="${field}"]`);
    if (!el || !el.value.trim()) {
      showToast(`Veuillez remplir le champ : ${field}`, 'error');
      el?.focus();
      return;
    }
  }

  const payment = form.querySelector('input[name="paiement"]:checked');
  if (!payment) {
    showToast('Veuillez choisir un moyen de paiement', 'error');
    return;
  }

  // Build order summary for WhatsApp
  const data = Object.fromEntries(new FormData(form));
  const city = data.ville;
  const shipping = getShippingFee(city);
  const total = subtotal + shipping.fee;

  let message = `*Nouvelle commande LEWIS SHOP*\n\n`;
  message += `*Client :* ${data.prenom} ${data.nom}\n`;
  message += `*Téléphone :* ${data.telephone}\n`;
  message += `*Adresse :* ${data.adresse}, ${data.quartier}, ${SHIPPING_CONFIG[city]?.label || city}\n\n`;
  message += `*Articles :*\n`;
  items.forEach(item => {
    message += `• ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}\n`;
  });
  message += `\n*Sous-total :* ${formatPrice(subtotal)}\n`;
  message += `*Livraison :* ${formatPrice(shipping.fee)}\n`;
  message += `*Total :* ${formatPrice(total)}\n`;
  message += `*Paiement :* ${payment.value}\n`;
  if (data.commentaires) {
    message += `\n*Commentaires :* ${data.commentaires}\n`;
  }
  message += `\n_Commande de démonstration — à confirmer_`;

  // Open WhatsApp (demo number - replace with real business number)
  const waNumber = '242000000000'; // À remplacer par le numéro réel
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  // Show confirmation
  showToast('Redirection vers WhatsApp pour confirmation...', 'success');

  // In a real app: save order to backend first
  // For demo: clear cart and redirect
  setTimeout(() => {
    // Optional: clearCart();
    window.open(waUrl, '_blank');
  }, 800);
}