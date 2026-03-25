'use strict';

/* ─── DATOS DE PRODUCTOS ─── */
const PRODUCTS = [
  { id:1,  name:'Jersey Pro 1413',       brand:'1413 Cycling Sport', icon:'🚴', cat:'ciclismo', price:89900,  oldPrice:249900, discount:64, sizes:['S','M','L','XL'], new:false },
  { id:2,  name:'Culote Aero Carbon',    brand:'1413 Cycling Sport', icon:'🩱', cat:'ciclismo', price:119900, oldPrice:349900, discount:66, sizes:['M','L','XL','XXL'], new:true  },
  { id:3,  name:'Maillot Montaña X',     brand:'1413 Cycling Sport', icon:'⛰️', cat:'montana',  price:79900,  oldPrice:229900, discount:65, sizes:['S','M','L'],       new:false },
  { id:4,  name:'Short Running Pro',     brand:'1413 Cycling Sport', icon:'🏃', cat:'running',  price:49900,  oldPrice:149900, discount:67, sizes:['S','M','L','XL'], new:false },
  { id:5,  name:'Camiseta Gym Power',    brand:'1413 Cycling Sport', icon:'💪', cat:'gimnasio', price:39900,  oldPrice:109900, discount:64, sizes:['M','L','XL','XXL'], new:true  },
  { id:6,  name:'Guantes Ciclismo 360',  brand:'1413 Cycling Sport', icon:'🧤', cat:'ciclismo', price:34900,  oldPrice:99900,  discount:65, sizes:['S','M','L'],       new:false },
  { id:7,  name:'Uniforme Fútbol Local', brand:'1413 Cycling Sport', icon:'⚽', cat:'futbol',   price:89900,  oldPrice:249900, discount:64, sizes:['S','M','L','XL'], new:false },
  { id:8,  name:'Lycra Triatlón Elite',  brand:'1413 Cycling Sport', icon:'🏊', cat:'triatlon', price:149900, oldPrice:419900, discount:64, sizes:['S','M','L'],       new:true  },
  { id:9,  name:'Jersey Manga Larga 1413',brand:'1413 Cycling Sport',icon:'🧥', cat:'ciclismo', price:99900,  oldPrice:279900, discount:64, sizes:['M','L','XL'],      new:false },
  { id:10, name:'Zapatillas Trail Run',  brand:'1413 Cycling Sport', icon:'👟', cat:'running',  price:189900, oldPrice:529900, discount:64, sizes:['40','41','42','43','44'], new:true },
  { id:11, name:'Maleta Hidratación',    brand:'1413 Cycling Sport', icon:'🎒', cat:'montana',  price:69900,  oldPrice:199900, discount:65, sizes:['Único'],           new:false },
  { id:12, name:'Casco Ciclismo Aero',   brand:'1413 Cycling Sport', icon:'⛑️', cat:'ciclismo', price:129900, oldPrice:379900, discount:66, sizes:['S','M','L'],       new:false },
  { id:13, name:'Leggins Gym Mujer',     brand:'1413 Cycling Sport', icon:'🩳', cat:'gimnasio', price:59900,  oldPrice:169900, discount:65, sizes:['S','M','L','XL'], new:true  },
  { id:14, name:'Camiseta Fútbol Retro', brand:'1413 Cycling Sport', icon:'👕', cat:'futbol',   price:45900,  oldPrice:129900, discount:65, sizes:['S','M','L','XL'], new:false },
  { id:15, name:'Pantalón Montaña Tech', brand:'1413 Cycling Sport', icon:'🏔️', cat:'montana',  price:89900,  oldPrice:259900, discount:65, sizes:['M','L','XL'],      new:false },
  { id:16, name:'Kit Triatlón Completo', brand:'1413 Cycling Sport', icon:'🏅', cat:'triatlon', price:249900, oldPrice:699900, discount:64, sizes:['S','M','L'],       new:true  },
];

/* ─── ESTADO ─── */
let cart = JSON.parse(localStorage.getItem('1413_cart') || '[]')
  .map(c => {
    const rawId = typeof c === 'object' && c !== null ? c.id : c;
    const id = Number(rawId);
    const qty = typeof c === 'object' && c !== null && c.qty ? Number(c.qty) : 1;
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return null;
    return { id: prod.id, qty: isNaN(qty) ? 1 : qty, name: prod.name, price: prod.price, icon: prod.icon };
  })
  .filter(Boolean);

let favorites     = JSON.parse(localStorage.getItem('1413_favs') || '[]');
let currentFilter = 'todos';
let searchQuery   = '';

/* ─── FORMATO PRECIO COP ─── */
const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

/* ─── RENDER PRODUCTOS ─── */
function renderProducts(list) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  document.getElementById('product-count').textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#999;">
      <div style="font-size:56px;margin-bottom:16px;">🔍</div>
      <p style="font-size:18px;color:#555;">No encontramos productos con esos filtros.</p>
      <button onclick="clearFilters()" style="margin-top:16px;padding:10px 24px;background:var(--primary);color:#fff;border-radius:8px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;border:none;cursor:pointer;">LIMPIAR FILTROS</button>
    </div>`;
    return;
  }

  list.forEach((p) => {
    const isFav = favorites.includes(p.id);
    const card  = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id  = p.id;
    card.dataset.cat = p.cat;
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
      <div class="product-img-wrap">
        <div class="product-img-placeholder">${p.icon}</div>
        <div class="discount-badge">-${p.discount}%</div>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${p.id}" aria-label="Favorito" title="Agregar a favoritos">
          ${isFav ? '❤️' : '🤍'}
        </button>
        ${p.new ? '<div style="position:absolute;bottom:10px;left:12px;background:#ffdd57;color:#111;font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:11px;padding:2px 8px;border-radius:4px;letter-spacing:1px;">NUEVO</div>' : ''}
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-prices">
          <span class="price-old">${formatCOP(p.oldPrice)}</span>
          <span class="price-current">${formatCOP(p.price)}</span>
        </div>
        <button class="btn-cart" data-id="${p.id}">🛒 AGREGAR AL CARRITO</button>
      </div>
    `;
    grid.appendChild(card);
  });

  /* IntersectionObserver para fadeIn */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card').forEach(c => observer.observe(c));

  /* Eventos botones carrito */
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      addToCart(id);
    });
  });

  /* Eventos favoritos */
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      toggleFavorite(id, e.currentTarget);
    });
  });
}

/* ─── FILTRAR PRODUCTOS ─── */
function getFilteredProducts() {
  let list = [...PRODUCTS];

  /* Filtro categoría navbar */
  if (currentFilter !== 'todos') {
    list = list.filter(p => p.cat === currentFilter);
  }

  /* Filtro búsqueda */
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q));
  }

  return list;
}

function applyFilters() {
  const catChecks = document.querySelectorAll('[data-filter-cat]:checked');
  const activeSizes = [...document.querySelectorAll('.size-btn.active')].map(b => b.dataset.size);
  const maxPrice = parseInt(document.getElementById('price-range').value);

  let list = getFilteredProducts();

  if (catChecks.length > 0) {
    const cats = [...catChecks].map(c => c.dataset.filterCat);
    list = list.filter(p => cats.includes(p.cat));
  }

  if (activeSizes.length > 0) {
    list = list.filter(p => p.sizes.some(s => activeSizes.includes(s)));
  }

  list = list.filter(p => p.price <= maxPrice);

  renderProducts(list);
}

function clearFilters() {
  document.querySelectorAll('[data-filter-cat]').forEach(c => c.checked = false);
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  const priceRange = document.getElementById('price-range');
  if (priceRange) { priceRange.value = 500000; updatePriceLabel(); }
  currentFilter = 'todos';
  searchQuery   = '';
  document.getElementById('search-input').value = '';
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelector('[data-cat="todos"]').classList.add('active');
  renderProducts(PRODUCTS);
}

function filterByCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const link = document.querySelector(`[data-cat="${cat}"]`);
  if (link) link.classList.add('active');
  const list = cat === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  renderProducts(list);
  document.getElementById('main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── ORDENAR ─── */
function sortProducts(mode) {
  const list = getFilteredProducts();
  if (mode === 'low')      list.sort((a,b) => a.price - b.price);
  if (mode === 'high')     list.sort((a,b) => b.price - a.price);
  if (mode === 'discount') list.sort((a,b) => b.discount - a.discount);
  if (mode === 'new')      list.sort((a,b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
  renderProducts(list);
  /* Sync selects */
  document.getElementById('sort-select').value = mode;
  const sortM = document.getElementById('sort-select-mobile');
  if (sortM) sortM.value = mode;
}

/* ─── PRECIO RANGE ─── */
function updatePriceLabel() {
  const val = document.getElementById('price-range').value;
  document.getElementById('price-max-label').textContent = formatCOP(parseInt(val));
}

document.getElementById('price-range').addEventListener('input', updatePriceLabel);

/* ─── CARRITO ─── */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1, name: product.name, price: product.price, icon: product.icon });
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
  openCart();

  /* Animación badge */
  const badge = document.getElementById('cart-count');
  badge.style.animation = 'none';
  badge.offsetHeight; /* reflow */
  badge.style.animation = 'bounceIn 0.4s ease';
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('1413_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCartItems() {
  const list   = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');

  if (cart.length === 0) {
    list.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Tu carrito está vacío</p><p style="font-size:13px;margin-top:8px;color:#555;">¡Agrega tus productos favoritos!</p></div>`;
    footer.style.display = 'none';
    return;
  }

  list.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img">${c.icon}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name} ×${c.qty}</div>
        <div class="cart-item-price">${formatCOP(c.price * c.qty)}</div>
      </div>
      <button class="cart-item-remove" data-remove="${c.id}" aria-label="Eliminar">✕</button>
    </div>
  `).join('');

  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.remove)));
  });

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = formatCOP(total);
  footer.style.display = 'block';

  /* Actualizar link WhatsApp con productos */
  const msg = encodeURIComponent('Hola! Me interesa comprar:\n' + cart.map(c => `• ${c.name} ×${c.qty} — ${formatCOP(c.price * c.qty)}`).join('\n') + `\nTotal: ${formatCOP(total)}`);
  document.getElementById('wa-checkout').href = `https://wa.me/573163784026?text=${msg}`;
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cart-open-btn').addEventListener('click', openCart);
document.getElementById('cart-close-btn').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

/* ─── FAVORITOS ─── */
function toggleFavorite(id, btn) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    btn.classList.remove('active');
    btn.textContent = '🤍';
  } else {
    favorites.push(id);
    btn.classList.add('active');
    btn.textContent = '❤️';
  }
  localStorage.setItem('1413_favs', JSON.stringify(favorites));
}

/* ─── HERO SLIDER ─── */
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
let currentSlide = 0;
let sliderInterval;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSlider() {
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

document.getElementById('slide-prev').addEventListener('click', () => { stopSlider(); goToSlide(currentSlide - 1); startSlider(); });
document.getElementById('slide-next').addEventListener('click', () => { stopSlider(); goToSlide(currentSlide + 1); startSlider(); });
dots.forEach(d => d.addEventListener('click', () => { stopSlider(); goToSlide(parseInt(d.dataset.slide)); startSlider(); }));

const hero = document.getElementById('hero');
hero.addEventListener('mouseenter', stopSlider);
hero.addEventListener('mouseleave', startSlider);
startSlider();

/* ─── NAVBAR STICKY ─── */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── BUSCADOR ─── */
document.getElementById('search-input').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderProducts(getFilteredProducts());
});

/* ─── NAVBAR LINKS ─── */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    filterByCategory(link.dataset.cat);
  });
});

/* ─── TALLAS TOGGLE ─── */
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});

/* ─── COLORES TOGGLE ─── */
document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', () => dot.classList.toggle('active'));
});

/* ─── HAMBURGER (mobile) ─── */
document.getElementById('hamburger-btn').addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(l => {
    l.style.display = l.style.display === 'block' ? 'none' : 'block';
  });
});

/* ─── FILTRO MOBILE ─── */
document.getElementById('filter-mobile-btn').addEventListener('click', openSidebarModal);

function openSidebarModal() {
  document.getElementById('sidebar-overlay').style.display = 'block';
  document.getElementById('sidebar-modal').style.display  = 'block';
  document.body.style.overflow = 'hidden';
}

function closeSidebarModal() {
  document.getElementById('sidebar-overlay').style.display = 'none';
  document.getElementById('sidebar-modal').style.display  = 'none';
  document.body.style.overflow = '';
}

/* ─── INIT ─── */
renderProducts(PRODUCTS);
updateCartBadge();
renderCartItems();
updatePriceLabel();
