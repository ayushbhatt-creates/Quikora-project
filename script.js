// script.js
// Products + rendering + filters + cart + localStorage

// ========== 1. PRODUCT DATA ==========
const products = [
  {
    id: "1",
    name: "Banana (1 dozen)",
    quantity: "1 dozen",
    price: 38,
    mrp: 40,
    category: "fruits",
    image: "products/items/banana.jpg"
  },
  {
    id: "2",
    name: "Tomato (500 g)",
    quantity: "500 g",
    price: 24,
    mrp: 30,
    category: "fruits",
    image: "products/items/tomato.jpg"
  },
  {
    id: "3",
    name: "Apple (500 g)",
    quantity: "500 g",
    price: 89,
    mrp: 79,
    category: "fruits",
    image: "products/items/apple.jpg"
  },
  {
    id: "4",
    name: "Potato (500 g)",
    quantity: "500 g",
    price: 28,
    mrp: 30,
    category: "fruits",
    image: "products/items/potato.jpg"
  },
  {
    id: "5",
    name: "Onion (500 g)",
    quantity: "500 g",
    price: 26,
    mrp: 32,
    category: "fruits",
    image: "products/items/onion.jpg"
  },
  {
    id: "6",
    name: "Amul Taaza Milk",
    quantity: "1 L",
    price: 64,
    mrp: 70,
    category: "dairy",
    image: "products/items/amulmilk.jpg"
  },
  {
    id: "7",
    name: "Brown Bread",
    quantity: "400 g",
    price: 45,
    mrp: 50,
    category: "dairy",
    image: "products/items/bread.jpg"
  },
  {
    id: "8",
    name: "Lays Magic Masala",
    quantity: "52 g",
    price: 20,
    mrp: 20,
    category: "snacks",
    image: "products/items/lays.jpg"
  },
  {
    id: "9",
    name: "Thums Up Soft Drink",
    quantity: "750 ml",
    price: 40,
    mrp: 45,
    category: "drinks",
    image: "products/items/thumpsup.jpg"
  },
  {
    id: "10",
    name: "Corn Flakes",
    quantity: "475 g",
    price: 175,
    mrp: 199,
    category: "breakfast",
    image: "products/items/cornflakes.jpg"
  },
  {
    id: "11",
    name: "Maggi 2-Minute Noodles",
    quantity: "280 g (4 x 70 g)",
    price: 72,
    mrp: 80,
    category: "instant",
    image: "products/items/maggi.jpg"
  },
  {
    id: "12",
    name: "Fortune Sunflower Oil",
    quantity: "1 L",
    price: 135,
    mrp: 150,
    category: "staples",
    image: "products/items/fortuneoil.jpg"
  },
  {
    id: "13",
    name: "Colgate Toothpaste",
    quantity: "200 g",
    price: 99,
    mrp: 110,
    category: "personal",
    image: "products/items/colgate.jpg"
  },
  {
    id: "14",
    name: "Facewash",
    quantity: "150 g",
    price: 155,
    mrp: 177,
    category: "personal",
    image: "products/items/facewash.jpg"
  },
  {
    id: "15",
    name: "Dettol Soap",
    quantity: "set of 3",
    price: 99,
    mrp: 110,
    category: "personal",
    image: "products/items/dettol.jpg"
  },
  {
    id: "16",
    name: "Pears Soap",
    quantity: "set of 2",
    price: 150,
    mrp: 170,
    category: "personal",
    image: "products/items/pears.jpg"
  },
  {
    id: "17",
    name: "Harpic",
    quantity: "set of 2",
    price: 150,
    mrp: 170,
    category: "household",
    image: "products/items/harpic.jpg"
  },
  {
    id: "18",
    name: "Vim Bar",
    quantity: "set of 4",
    price: 69,
    mrp: 79,
    category: "household",
    image: "products/items/vim.jpg"
  },
  {
    id: "19",
    name: "Scotch Brite",
    quantity: "set of 3",
    price: 90,
    mrp: 99,
    category: "household",
    image: "products/items/scotch.jpg"
  },
  {
    id: "20",
    name: "Wipes",
    quantity: "10 wipes",
    price: 70,
    mrp: 79,
    category: "baby",
    image: "products/items/wipes.jpg"
  },
  {
    id: "21",
    name: "Himalaya Cream",
    quantity: "set of 3",
    price: 199,
    mrp: 249,
    category: "baby",
    image: "products/items/cream.jpg"
  },
  {
    id: "22",
    name: "Feeding Bottle",
    quantity: "set of 3",
    price: 90,
    mrp: 99,
    category: "baby",
    image: "products/items/bottle.jpg"
  },
  {
    id: "23",
    name: "Pedigree",
    quantity: "600 g",
    price: 499,
    mrp: 599,
    category: "baby",
    image: "products/items/pedigree.jpg"
  },
  {
    id: "24",
    name: "Baby Bowl",
    quantity: "1 pc",
    price: 159,
    mrp: 170,
    category: "baby",
    image: "products/items/bowl.jpg"
  },
];

// ========== 2. CART SETUP ==========

let cart = {};
const CART_KEY = "quikora_cart";

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    Object.keys(parsed).forEach((id) => {
      parsed[id] = Number(parsed[id]) || 0;
    });
    cart = parsed;
  } catch (e) {
    console.error("Failed to load cart", e);
  }
}

function saveCartToStorage() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let currentCategory = null;
let currentSearch = "";
let currentSort = "";


// ========== 3. DOM ELEMENTS ==========

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-card");
const logoHome = document.getElementById("logoHome");
const cartButton = document.getElementById("cartButton");
const itemsTotalEl = document.getElementById("itemsTotal");
const deliveryFeeEl = document.getElementById("deliveryFee");
const grandTotalEl = document.getElementById("grandTotal");
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const upiInput = document.getElementById("upiInput");



// Cart UI
const cartBar = document.getElementById("cartBar");
const cartCountEl = document.getElementById("cartCount");
const cartBarItems = document.getElementById("cartBarItems");
const cartBarTotal = document.getElementById("cartBarTotal");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSummaryTotal = document.getElementById("cartSummaryTotal");
const viewCartButton = document.getElementById("viewCartButton");
const closeCartButton = document.getElementById("closeCart");
const placeOrderButton = document.getElementById("placeOrderButton");
const orderSuccess = document.getElementById("orderSuccess");
const orderSuccessClose = document.getElementById("orderSuccessClose");

// ✅ ADDRESS ELEMENTS
const addressOverlay = document.getElementById("addressOverlay");
const saveAddressBtn = document.getElementById("saveAddressBtn");
const addressInput = document.getElementById("addressInput");
const closeAddressBtn = document.getElementById("closeAddressBtn");
const locationBtn = document.querySelector(".location-btn");
const locationLabel = document.querySelector(".location-label");

// ========== 4. HELPERS ==========

function findProductById(id) {
  return products.find((p) => p.id === String(id));
}

function getCartTotals() {
  let totalItems = 0;
  let totalPrice = 0;

  for (const id in cart) {
    const qty = cart[id];
    const product = findProductById(id);
    if (!product) continue;
    totalItems += qty;
    totalPrice += product.price * qty;
  }
  return { totalItems, totalPrice };
}

function getFilteredProducts() {
  let list = products.filter((p) => {
    const matchCategory = currentCategory ? p.category === currentCategory : true;
    const matchSearch = currentSearch
      ? p.name.toLowerCase().includes(currentSearch.toLowerCase())
      : true;
    return matchCategory && matchSearch;
  });

  // 🔽 SORTING LOGIC
  if (currentSort === "low-high") {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === "high-low") {
    list.sort((a, b) => b.price - a.price);
  }

  return list;
}


// ========== 5. CART OPERATIONS ==========

function addToCart(id) {
  id = String(id);
  if (!cart[id]) cart[id] = 0;
  cart[id]++;
  saveCartToStorage();
  refreshUI();
}

function removeFromCart(id) {
  id = String(id);
  if (!cart[id]) return;
  cart[id]--;
  if (cart[id] <= 0) delete cart[id];
  saveCartToStorage();
  refreshUI();
}

function clearCart() {
  cart = {};
  saveCartToStorage();
  refreshUI();
}

// ========== 6. RENDER PRODUCTS GRID ==========

function renderProducts(list) {
  if (!productsContainer) return;

if (!list || list.length === 0) {
  productsContainer.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0;">
      <p style="font-size: 1rem; font-weight: 500;">No products found 😕</p>
      <p style="font-size: 0.85rem; color: #6b7280;">
        Try changing the category or search term
      </p>
    </div>
  `;
  return;
}

  productsContainer.innerHTML = list
    .map((p) => {
      const qtyInCart = cart[p.id] || 0;

      return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-image" style="background-image:url('${p.image}')"></div>
        <div class="product-top-row">
          <span class="delivery-pill">15 MINS</span>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${p.quantity}</div>
        <div class="product-footer">
          <span class="product-price">₹${p.price}</span>
          ${
            qtyInCart === 0
              ? `<button class="add-btn" data-id="${p.id}">ADD</button>`
              : `<div class="qty-control" data-id="${p.id}">
                  <button class="qty-btn qty-minus" data-id="${p.id}">-</button>
                  <span class="qty-value">${qtyInCart}</span>
                  <button class="qty-btn qty-plus" data-id="${p.id}">+</button>
                </div>`
          }
        </div>
      </div>`;
    })
    .join("");
}

// ========== 7. RENDER CART PANEL ==========

function renderCartPanel() {
  const { totalItems, totalPrice } = getCartTotals();

  // 🟡 DELIVERY LOGIC
  const deliveryFee = totalPrice >= 199 || totalPrice === 0 ? 0 : 20;
  const grandTotal = totalPrice + deliveryFee;

  // 🟡 EMPTY CART
  if (totalItems === 0) {
    cartItemsContainer.innerHTML = `
  <div style="text-align: center; padding: 40px 0;">
    <p style="font-size: 1rem; font-weight: 500;">Your cart is empty 🛒</p>
    <p style="font-size: 0.85rem; color: #6b7280;">
      Add items to get them delivered in minutes
    </p>
  </div>
`;


    itemsTotalEl.textContent = "₹0";
    deliveryFeeEl.textContent = "₹0";
    grandTotalEl.textContent = "₹0";
    return;
  }

  // 🟢 CART ITEMS
  cartItemsContainer.innerHTML = Object.keys(cart)
    .map((id) => {
      const product = findProductById(id);
      if (!product) return "";
      const qty = cart[id];

      return `
        <div class="cart-item" data-id="${id}">
          <div class="cart-item-info">
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-meta">${product.quantity}</span>
            <span class="cart-item-price">₹${product.price * qty}</span>
          </div>
          <div class="qty-control" data-id="${id}">
            <button class="qty-btn qty-minus" data-id="${id}">-</button>
            <span class="qty-value">${qty}</span>
            <button class="qty-btn qty-plus" data-id="${id}">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  // 🟢 PRICE BREAKDOWN
  itemsTotalEl.textContent = `₹${totalPrice}`;
  deliveryFeeEl.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
  grandTotalEl.textContent = `₹${grandTotal}`;
}


// ========== 8. UPDATE CART BAR ==========

function updateCartBar() {
  const { totalItems, totalPrice } = getCartTotals();
  cartCountEl.textContent = totalItems;
  cartBarItems.textContent = totalItems === 1 ? "1 item" : `${totalItems} items`;
  cartBarTotal.textContent = `₹${totalPrice}`;

  if (totalItems > 0) cartBar.classList.add("visible");
  else cartBar.classList.remove("visible");
}

// ========== 9. FULL UI REFRESH ==========

function refreshUI() {
  renderProducts(getFilteredProducts());
  updateCartBar();
  renderCartPanel();
}

// ========== 10. EVENT LISTENERS ==========

// Product Grid (ADD / + / -)
if (productsContainer) {
  productsContainer.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-btn");
    const plusBtn = e.target.closest(".qty-plus");
    const minusBtn = e.target.closest(".qty-minus");

    if (addBtn) addToCart(addBtn.dataset.id);
    if (plusBtn) addToCart(plusBtn.dataset.id);
    if (minusBtn) removeFromCart(minusBtn.dataset.id);
  });
}

// Category Filter
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.category;
    currentCategory = currentCategory === cat ? null : cat;

    categoryButtons.forEach((b) => b.classList.remove("active"));
    if (currentCategory) btn.classList.add("active");

    refreshUI();
  });
});

// Search
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim();
    refreshUI();
  });
}

// Logo resets filters
if (logoHome) {
  logoHome.addEventListener("click", () => {
    currentCategory = "";
    currentSearch = "";
    if (searchInput) searchInput.value = "";
    categoryButtons.forEach((b) => b.classList.remove("active"));
    refreshUI();
  });
}

// Cart open (bottom bar)
if (viewCartButton) {
  viewCartButton.addEventListener("click", () => {
    cartOverlay.classList.add("open");
    renderCartPanel();
  });
}

// Cart open (top button)
if (cartButton) {
  cartButton.addEventListener("click", () => {
    if (getCartTotals().totalItems === 0) return;
    cartOverlay.classList.add("open");
    renderCartPanel();
  });
}

// Cart close
if (closeCartButton) {
  closeCartButton.addEventListener("click", () => {
    cartOverlay.classList.remove("open");
  });
}

// Cart panel quantity buttons
if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (e) => {
    const plusBtn = e.target.closest(".qty-plus");
    const minusBtn = e.target.closest(".qty-minus");

    if (plusBtn) addToCart(plusBtn.dataset.id);
    if (minusBtn) removeFromCart(minusBtn.dataset.id);
  });
}

if (placeOrderButton) {
  placeOrderButton.addEventListener("click", () => {
    if (getCartTotals().totalItems === 0) return;

    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    if (selectedPayment === "upi") {
      const upi = upiInput.value.trim();
      if (!upi || !upi.includes("@")) {
        alert("Please enter a valid UPI ID");
        return;
      }
    }

    cartOverlay.classList.remove("open");
    orderSuccess.classList.add("open");
    clearCart();
  });
}


// Order success close
if (orderSuccessClose) {
  orderSuccessClose.addEventListener("click", () => {
    orderSuccess.classList.remove("open");
  });
}

// Address popup open
if (locationBtn) {
  locationBtn.addEventListener("click", () => {
    addressOverlay.classList.add("open");
  });
}

// Address save
if (saveAddressBtn) {
  saveAddressBtn.addEventListener("click", () => {
    const address = addressInput.value.trim();
    if (!address) return alert("Please enter an address");

    localStorage.setItem("quikora_address", address);
    locationLabel.textContent = address;
    addressOverlay.classList.remove("open");
  });
}

// Address close button
if (closeAddressBtn) {
  closeAddressBtn.addEventListener("click", () => {
    addressOverlay.classList.remove("open");
  });
}

// Close address popup on background click
if (addressOverlay) {
  addressOverlay.addEventListener("click", (e) => {
    if (e.target === addressOverlay) {
      addressOverlay.classList.remove("open");
    }
  });
}

// Sorting
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    refreshUI();
  });
}
// Payment method change (COD / UPI)
if (paymentRadios && upiInput) {
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "upi" && radio.checked) {
        upiInput.style.display = "block";
      } else if (radio.value === "cod" && radio.checked) {
        upiInput.style.display = "none";
        upiInput.value = "";
      }
    });
  });
}



// ========== 11. INITIAL LOAD ==========

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();

  const savedAddress = localStorage.getItem("quikora_address");
  if (savedAddress) locationLabel.textContent = savedAddress;

  refreshUI();
});
