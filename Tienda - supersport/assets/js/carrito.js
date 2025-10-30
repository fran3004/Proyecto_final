// ==== VARIABLES ====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBadge = document.querySelector(".cart-badge");
const cartButton = document.querySelector(".cart-button");

// ==== CREAR CONTENEDOR DEL CARRITO ====
const cartContainer = document.createElement("div");
cartContainer.classList.add("cart-container");
cartContainer.innerHTML = `
  <div class="cart-overlay"></div>
  <div class="cart-panel">
    <div class="cart-header">
      <h2>🛒 Tu Carrito</h2>
      <button class="close-cart">✖</button>
    </div>
    <div class="cart-items"></div>
    <div class="cart-total">
      <p>Total: <span class="cart-total-price">$0.00 COP</span></p>
      <button class="btn btn-primary btn-checkout">Finalizar compra</button>
    </div>
  </div>
`;
document.body.appendChild(cartContainer);
const cartItemsContainer = cartContainer.querySelector(".cart-items");
const totalPriceEl = cartContainer.querySelector(".cart-total-price");
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price}</p>
      </div>
      <button class="remove-btn" data-index="${index}">✖</button>
    `;
    cartItemsContainer.appendChild(div);
    const numericPrice = parseFloat(
      item.price.replace(/\$/g, '').replace(/\./g, '').replace(/\s?COP/g, '').replace(',', '.')
    );
    total += isNaN(numericPrice) ? 0 : numericPrice;
  });
  // Actualiza el total del overlay del carrito
  const formattedTotal = `$${total.toLocaleString('es-CO')} COP`;
  const totalEl = cartContainer.querySelector(".cart-total-price");
  if (totalEl) totalEl.textContent = formattedTotal;

  cartBadge.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}
// ==== DELEGACIÓN DE EVENTOS PARA AGREGAR AL CARRITO ====
document.body.addEventListener("click", e => {
  // --- Botón agregar desde tarjetas de producto ---
  if (e.target.closest(".btn-cart")) {
    const button = e.target.closest(".btn-cart");
    const card = button.closest(".product-card");
    const name = card.querySelector(".product-name").textContent;
    const price = card.querySelector(".price-current").textContent;
    const image = card.querySelector("img").src;

    cart.push({ name, price, image });
    updateCart();

    // Animación del botón
    button.classList.add("added");
    setTimeout(() => button.classList.remove("added"), 600);

    // Animación del contador del carrito
    cartBadge.classList.add("bump");
    setTimeout(() => cartBadge.classList.remove("bump"), 400);
  }
  // --- Botón eliminar item del carrito ---
  if (e.target.closest(".remove-btn")) {
    const i = e.target.closest(".remove-btn").dataset.index;
    cart.splice(i, 1);
    updateCart();
  }
  // --- Botón agregar desde la página de especificaciones ---
  if (e.target.closest(".btn.btn-primary") && document.querySelector(".product-details")) {
    const detalle = document.querySelector(".detalle-info");
    if (detalle) {
      const name = detalle.querySelector("h2").textContent;
      const price = detalle.querySelector(".precio-actual").textContent;
      const image = document.getElementById("imgPrincipal")?.src || "";
      cart.push({ name, price, image });
      updateCart();
      // Animación visual
      e.target.classList.add("added");
      setTimeout(() => e.target.classList.remove("added"), 600);

      cartBadge.classList.add("bump");
      setTimeout(() => cartBadge.classList.remove("bump"), 400);
    }
  }
});
// ==== MOSTRAR / OCULTAR CARRITO ====
cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

// ==== CERRAR CARRITO ====
const closeCartBtn = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");

closeCartBtn.addEventListener("click", () => {
  cartContainer.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartContainer.classList.remove("active");
});

// ==== BOTÓN FINALIZAR COMPRA ====
const checkoutBtn = document.querySelector(".btn-checkout");
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("🛒 Tu carrito está vacío. Agrega algún producto antes de continuar.");
    return;
  }
  window.location.href = "compra.html";
});

// ==== INICIALIZAR ====
updateCart();
