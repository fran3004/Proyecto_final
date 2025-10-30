const products = [
  // Fútbol
  {name: "Guantes de Portero Adidas Predator", price: 234732, originalPrice: 0, category: "Fútbol", offer: false, sport:"Fútbol", image:"assets/img/81IlzqzU80L._AC_SL1500_.jpg"},
  {name: "Balón de Fútbol Profesional Nike Strike", price: 174194, originalPrice: 175306, category: "Fútbol", offer: true, sport:"Fútbol", image:"assets/img/nike-5390-1692981-1-zoom.webp"},
  {name: "Camiseta Fc Barcelona Stadium Home", price: 474950, originalPrice: 609784, category: "Fútbol", offer: true, sport:"Fútbol", image:"assets/img/hj5287-456_phsfh001-2000.webp"},

  // Basketball
  {name: "Balón de Basketball Spalding NBA", price: 264445, originalPrice: 353584, category: "Basketball", offer: true, sport:"Basketball", image:"assets/img/0010_Balon_Baloncesto_Spalding_gold_Opcion_A.webp"},
  {name: "Zapatillas Jordan Air High", price: 472435, originalPrice: 0, category: "Basketball", offer: false, sport:"Basketball", image:"assets/img/StockXAndre4-2024-02-28T154433.906.webp"},
  {name: "Aro flexible para baloncesto - 18AR01", price: 965484, originalPrice: 1487939, category: "Basketball", offer: true, sport:"Basketball", image:"assets/img/Imagen-039.jpg"},

  // Voleibol
  {name: "Mizuno - Rodillera de voleibol T10 Plus", price: 77421, originalPrice: 0, category: "Voleibol", offer: false, sport:"Voleibol", image:"assets/img/D_NQ_NP_931481-MLV76861891375_062024-O.webp"},
  {name: "Balón de Voleibol Mikasa MVA200", price: 205019, originalPrice: 0, category: "Voleibol", offer: false, sport:"Voleibol", image:"assets/img/96356aa94829ec9347531e7236c56303.jpg"},
  {name: "Zapatos Asics Metarise", price: 914855, originalPrice: 1165432, category: "Voleibol", offer: true, sport:"Voleibol", image:"assets/img/1051a058_001_sb_fr_glb.jpg"},

  // Tenis
  {name: "Gorra Nike Dri-Fit Advantage Visor", price: 129950, originalPrice: 0, category: "Tenis", offer: false, sport:"Tenis", image:"assets/img/U+NK+DFADV+ACE+VISOR+U+SAB+P.avif"},
  {name: "Malla futbol tenis con base 5M - 12MFT5M", price: 654000, originalPrice: 0, category: "Tenis", offer: false, sport:"Tenis", image:"assets/img/images.jpeg"},
  {name: "Raqueta de Tenis Wilson Pro Staff", price: 591287, originalPrice: 780000, category: "Tenis", offer: true, sport:"Tenis", image:"assets/img/62964f932954e5b179f94fca_thumbnail.jpg"},

  // Running
  {name: "Termo Soft Flask 500ml", price: 49900, originalPrice: 0, category: "Running", offer: false, sport:"Running", image:"assets/img/Termo_Soft_Flask_500ml_Fucsia.webp"},
  {name: "Zapatillas Running Nike Pegasus", price: 413010, originalPrice: 502148, category: "Running", offer: true, sport:"Running", image:"assets/img/615141-800-auto.webp"},

  // Baseball
  {name: "Bate Baseball Aluminio Wonder", price: 67900, originalPrice: 120564, category: "Baseball", offer: true, sport:"Baseball", image:"assets/img/3160_Bate_Baseball_Aluminio_34P_BSP_3116_PSP_85.webp"},
  {name: "Rawlings - R9 Series Baseball Glove ", price: 476269, originalPrice: 0, category: "Baseball", offer: false, sport:"Baseball", image:"assets/img/81gx7Kv9NJL.jpg"},
  {name: "Casco de Béisbol y Sóftbol Easton Alpha", price: 230097, originalPrice: 320897, category: "Baseball", offer: true, sport:"Baseball", image:"assets/img/casco_easton_alpha_negro_01a-550x550.jpg"},

  // Fitness
  {name: "Set de Mancuernas Ajustables 20kg", price: 442723, originalPrice: 591287, category: "Fitness", offer: true, sport:"Fitness", image:"assets/img/D_NQ_NP_922086-MCO93551708536_102025-O.webp"},
  {name: "Correa de levantamiento Performance VALEO", price: 62418, originalPrice: 0, category: "Fitness", offer: false, sport:"Fitness", image:"assets/img/fabf18e5b7d992bfbe1301448f4d2651.jpg"},
  {name: "Barra Olympica Xtreme", price: 334216, originalPrice: 0, category: "Fitness", offer: false, sport:"Fitness", image:"assets/img/8486494_2-600x600.jpg"},
];

const productsGrid = document.getElementById("products-grid");
const filterPrice = document.getElementById("filter-price");
const filterOffer = document.getElementById("filter-offer");
const sportOptions = document.querySelectorAll(".sport-option");

function displayProducts(list) {
  productsGrid.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <div class="product-image" data-product="${encodeURIComponent(p.name)}">
        <img src="${p.image}" alt="${p.name}">
        ${p.offer ? '<div class="product-badge badge-offer">Oferta</div>' : ''}
      </div>
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <p class="product-price">
          ${p.offer && p.originalPrice > 0 ? `<span class="price-original" style="text-decoration: line-through; color: #f87171;">$ ${p.originalPrice.toLocaleString('es-CO')} COP</span> ` : ''}
          <span class="price-current">$ ${p.price.toLocaleString('es-CO')} COP</span>
        </p>
        <button class="btn btn-cart">Agregar al carrito</button>
      </div>
    `;
    productsGrid.appendChild(div);
  });
  // Enlace al detalle de producto
  document.querySelectorAll(".product-image").forEach(img => {
    img.addEventListener("click", e => {
      const nombre = e.currentTarget.dataset.product;
      window.location.href = `especificaciones.html?producto=${nombre}`;
    });
  });
}
// Función que aplica filtros
function applyFilters() {
  let filtered = [...products];

  if (filterOffer.value === "yes") filtered = filtered.filter(p => p.offer);
  if (filterPrice.value === "asc") filtered.sort((a, b) => a.price - b.price);
  if (filterPrice.value === "desc") filtered.sort((a, b) => b.price - a.price);

  const selectedSports = Array.from(sportOptions)
    .filter(s => s.classList.contains("active"))
    .map(s => s.dataset.sport);

  if (selectedSports.length > 0) filtered = filtered.filter(p => selectedSports.includes(p.sport));

  displayProducts(filtered);
}

// Detectar parámetro en URL
function setSportFromURL() {
  const params = new URLSearchParams(window.location.search);
  const sportParam = params.get("sport");

  if (sportParam) {
    // Activar el botón correspondiente
    sportOptions.forEach(option => {
      if (option.dataset.sport === sportParam) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }
}
// Eventos de filtros
filterPrice.addEventListener("change", applyFilters);
filterOffer.addEventListener("change", applyFilters);

sportOptions.forEach(option => {
  option.addEventListener("click", () => {
    option.classList.toggle("active");
    applyFilters();
  });
});
// Inicialización
setSportFromURL();
applyFilters();

// ==== Detectar si viene de "Ofertas" ====
const offerParam = new URLSearchParams(window.location.search).get("offer");
if (offerParam === "yes") {
  filterOffer.value = "yes";
  applyFilters();
}