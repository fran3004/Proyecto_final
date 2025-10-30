// --- Función para normalizar texto (quita acentos y mayúsculas) ---
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
// --- Obtener nombre del producto desde la URL ---
const params = new URLSearchParams(window.location.search);
const nombreProducto = decodeURIComponent(params.get("producto") || "").trim();
// --- Base de datos con todas las categorías y productos ---
const productos = [
  // ⚽ FÚTBOL
  {
    nombre: "Guantes de Portero Adidas Predator",
    categoria: "Fútbol",
    precio: 234732,
    descuento: false,
    desc: "Guantes Adidas Predator con excelente agarre y ajuste anatómico para máximo control.",
    img: [
      "assets/img/81IlzqzU80L._AC_SL1500_.jpg",
      "assets/img/81IlzqzU80L._AC_SL1500_.jpg",
      "assets/img/img/arquero2.avif",
      "assets/img/img/arquero1.avif"
    ],
    tallas: ["S", "M", "L"],
    colores: ["Negro", "Rojo", "Blanco"]
  },
  {
    nombre: "Balón de Fútbol Profesional Nike Strike",
    categoria: "Fútbol",
    precio: 174194,
    descuento: true,
    desc: "Balón Nike Strike con tecnología de vuelo AerowSculpt para mayor precisión.",
    img: [
      "assets/img/nike-5390-1692981-1-zoom.webp",
      "assets/img/nike-5390-1692981-1-zoom.webp",
      "assets/img/img/futbolbalon2.webp",
      "assets/img/img/futbolbalon3.webp"
    ],
    tallas: ["5", "4"],
    colores: ["Amarillo", "Blanco", "Azul"]
  },
  {
    nombre: "Camiseta Fc Barcelona Stadium Home",
    categoria: "Fútbol",
    precio: 474950,
    descuento: true,
    desc: "Camiseta FC Barcelona Stadium Home con tecnología Dri-FIT y escudo bordado.",
    img: [
      "assets/img/hj5287-456_phsfh001-2000.webp",
      "assets/img/hj5287-456_phsfh001-2000.webp",
      "assets/img/img/barsa2.webp",
      "assets/img/img/barsa3.webp"
    ],
    tallas: ["S", "M", "L", "XL"],
    colores: ["Azul", "Grana"]
  },

  // 🏀 BASKETBALL
  {
    nombre: "Balón de Basketball Spalding NBA",
    categoria: "Basketball",
    precio: 264445,
    descuento: true,
    desc: "Balón oficial Spalding NBA con superficie de cuero compuesto para máximo agarre.",
    img: [
      "assets/img/0010_Balon_Baloncesto_Spalding_gold_Opcion_A.webp",
      "assets/img/0010_Balon_Baloncesto_Spalding_gold_Opcion_A.webp",
      "assets/img/img/basketbalon2.jpg",
      "assets/img/img/basketbalon3.jpg"
    ],
    tallas: ["7", "6"],
    colores: ["Naranja", "Marrón"]
  },
  {
    nombre: "Zapatillas Jordan Air High",
    categoria: "Basketball",
    precio: 472435,
    descuento: false,
    desc: "Zapatillas Jordan Air High con amortiguación y soporte en el tobillo.",
    img: [
      "assets/img/StockXAndre4-2024-02-28T154433.906.webp",
      "assets/img/StockXAndre4-2024-02-28T154433.906.webp",
      "assets/img/img/jordan2.webp",
      "assets/img/img/jordan3.webp"
    ],
    tallas: ["38", "39", "40", "41", "42"],
    colores: ["Rojo", "Negro", "Blanco"]
  },
  {
    nombre: "Aro flexible para baloncesto - 18AR01",
    categoria: "Basketball",
    precio: 965484,
    descuento: true,
    desc: "Aro profesional con sistema flexible de resorte y estructura reforzada.",
    img: [
      "assets/img/Imagen-039.jpg",
      "assets/img/Imagen-039.jpg",
      "assets/img/img/aro2.webp",
      "assets/img/img/aro3.jpg"
    ],
    tallas: ["Estándar"],
    colores: ["Naranja"]
  },

  // 🏐 VOLEIBOL
  {
    nombre: "Mizuno - Rodillera de voleibol T10 Plus",
    categoria: "Voleibol",
    precio: 77421,
    descuento: false,
    desc: "Rodilleras Mizuno T10 Plus con espuma de absorción de impacto y ajuste anatómico.",
    img: [
      "assets/img/D_NQ_NP_931481-MLV76861891375_062024-O.webp",
      "assets/img/D_NQ_NP_931481-MLV76861891375_062024-O.webp",
      "assets/img/img/rodillera2.jpg",
      "assets/img/img/rodillera3.jpg"
    ],
    tallas: ["S", "M", "L"],
    colores: ["Negro", "Blanco"]
  },
  {
    nombre: "Balón de Voleibol Mikasa MVA200",
    categoria: "Voleibol",
    precio: 205019,
    descuento: false,
    desc: "Balón Mikasa MVA200 oficial FIVB con alta durabilidad y control.",
    img: [
      "assets/img/96356aa94829ec9347531e7236c56303.jpg",
      "assets/img/96356aa94829ec9347531e7236c56303.jpg",
      "assets/img/img/voleibolbalon2.webp",
      "assets/img/img/voleibolbalon3.webp"
    ],
    tallas: ["5"],
    colores: ["Azul", "Amarillo", "Blanco"]
  },
  {
    nombre: "Zapatos Asics Metarise",
    categoria: "Voleibol",
    precio: 914855,
    descuento: true,
    desc: "Zapatillas Asics Metarise con sistema FlyteFoam y soporte lateral.",
    img: [
      "assets/img/1051a058_001_sb_fr_glb.jpg",
      "assets/img/1051a058_001_sb_fr_glb.jpg",
      "assets/img/img/zapatosvoley1.jpg",
      "assets/img/img/zapatosvoley3.webp"
    ],
    tallas: ["38", "39", "40", "41"],
    colores: ["Negro", "Rojo"]
  },

  // 🎾 TENIS
  {
    nombre: "Gorra Nike Dri-Fit Advantage Visor",
    categoria: "Tenis",
    precio: 129950,
    descuento: false,
    desc: "Gorra Nike Dri-Fit Advantage Visor con ventilación y banda absorbente.",
    img: [
      "assets/img/U+NK+DFADV+ACE+VISOR+U+SAB+P.avif",
      "assets/img/U+NK+DFADV+ACE+VISOR+U+SAB+P.avif",
      "assets/img/img/gorra2.avif",
      "assets/img/img/gorra3.avif"
    ],
    tallas: ["Única"],
    colores: ["Negro", "Blanco", "Gris"]
  },
  {
    nombre: "Malla futbol tenis con base 5M - 12MFT5M",
    categoria: "Tenis",
    precio: 654000,
    descuento: false,
    desc: "Malla para fútbol tenis de 5 metros con estructura resistente y base metálica.",
    img: [
      "assets/img/images.jpeg",
      "assets/img/images.jpeg",
      "assets/img/img/malla1.webp",
      "assets/img/img/malla2.webp"
    ],
    tallas: ["5m"],
    colores: ["Negro"]
  },
  {
    nombre: "Raqueta de Tenis Wilson Pro Staff",
    categoria: "Tenis",
    precio: 591287,
    descuento: true,
    desc: "Raqueta profesional Wilson Pro Staff ideal para precisión y potencia.",
    img: [
      "assets/img/62964f932954e5b179f94fca_thumbnail.jpg",
      "assets/img/62964f932954e5b179f94fca_thumbnail.jpg",
      "assets/img/img/raqueta2.webp",
      "assets/img/img/raqueta3.webp"
    ],
    tallas: ["Grip 2", "Grip 3"],
    colores: ["Negro", "Rojo"]
  },

  // 🏃 RUNNING
  {
    nombre: "Termo Soft Flask 500ml",
    categoria: "Running",
    precio: 49900,
    descuento: false,
    desc: "Termo flexible Soft Flask 500ml ideal para running y trail, liviano y fácil de guardar.",
    img: [
      "assets/img/Termo_Soft_Flask_500ml_Fucsia.webp",
      "assets/img/Termo_Soft_Flask_500ml_Fucsia.webp",
      "assets/img/img/botella2.avif",
      "assets/img/img/botella3.avif"
    ],
    tallas: ["500ml"],
    colores: ["Rosa", "Azul"]
  },
  {
    nombre: "Zapatillas Running Nike Pegasus",
    categoria: "Running",
    precio: 413010,
    descuento: true,
    desc: "Zapatillas Nike Pegasus con espuma ZoomX y soporte dinámico.",
    img: [
      "assets/img/615141-800-auto.webp",
      "assets/img/615141-800-auto.webp",
      "assets/img/img/correr2.webp",
      "assets/img/img/correr3.jpg"
    ],
    tallas: ["38", "39", "40", "41"],
    colores: ["Azul", "Negro"]
  },

  // ⚾ BASEBALL
  {
    nombre: "Bate Baseball Aluminio Wonder",
    categoria: "Baseball",
    precio: 67900,
    descuento: true,
    desc: "Bate de aluminio Wonder, ligero y duradero, ideal para entrenamientos.",
    img: [
      "assets/img/3160_Bate_Baseball_Aluminio_34P_BSP_3116_PSP_85.webp",
      "assets/img/3160_Bate_Baseball_Aluminio_34P_BSP_3116_PSP_85.webp",
      "assets/img/img/bate2.webp",
      "assets/img/img/bate3.webp"
    ],
    tallas: ["32''", "33''"],
    colores: ["Plateado", "Negro"]
  },
  {
    nombre: "Rawlings - R9 Series Baseball Glove",
    categoria: "Baseball",
    precio: 476269,
    descuento: false,
    desc: "Guante profesional Rawlings R9 Series de cuero natural, ideal para defensa de campo.",
    img: [
      "assets/img/81gx7Kv9NJL.jpg",
      "assets/img/81gx7Kv9NJL.jpg",
      "assets/img/img/atrapa2.jpg",
      "assets/img/img/atrapa3.jpg"
    ],
    tallas: ["12''"],
    colores: ["Marrón", "Negro"]
  },
  {
    nombre: "Casco de Béisbol y Sóftbol Easton Alpha",
    categoria: "Baseball",
    precio: 230097,
    descuento: true,
    desc: "Casco Easton Alpha con ventilación avanzada y acolchado interno.",
    img: [
      "assets/img/casco_easton_alpha_negro_01a-550x550.jpg",
      "assets/img/casco_easton_alpha_negro_01a-550x550.jpg",
      "assets/img/img/casco2.jpg",
      "assets/img/img/casco3.jpg"
    ],
    tallas: ["M", "L"],
    colores: ["Negro", "Rojo"]
  },

  // 💪 FITNESS
  {
    nombre: "Set de Mancuernas Ajustables 20kg",
    categoria: "Fitness",
    precio: 442723,
    descuento: true,
    desc: "Mancuernas ajustables de 20kg con sistema de bloqueo rápido y diseño ergonómico.",
    img: [
      "assets/img/D_NQ_NP_922086-MCO93551708536_102025-O.webp",
      "assets/img/D_NQ_NP_922086-MCO93551708536_102025-O.webp",
      "assets/img/img/peso1.jpg",
      "assets/img/img/peso2.webp"
    ],
    tallas: ["20kg"],
    colores: ["Negro", "Gris"]
  },
  {
    nombre: "Correa de levantamiento Performance VALEO",
    categoria: "Fitness",
    precio: 62418,
    descuento: false,
    desc: "Correa VALEO de levantamiento con agarre antideslizante y material reforzado.",
    img: [
      "assets/img/fabf18e5b7d992bfbe1301448f4d2651.jpg",
      "assets/img/fabf18e5b7d992bfbe1301448f4d2651.jpg",
      "assets/img/img/correa2.webp",
      "assets/img/img/correa1.png"
    ],
    tallas: ["Única"],
    colores: ["Negro"]
  },
  {
    nombre: "Barra Olympica Xtreme",
    categoria: "Fitness",
    precio: 334216,
    descuento: false,
    desc: "Barra olímpica Xtreme de acero templado, ideal para entrenamiento de fuerza.",
    img: [
      "assets/img/8486494_2-600x600.jpg",
      "assets/img/8486494_2-600x600.jpg",
      "assets/img/img/barra1.jpeg",
      "assets/img/img/barra3.jpg"
    ],
    tallas: ["2.2m"],
    colores: ["Plateado"]
  }
];
// === Buscar producto ===
const producto = productos.find(p => normalizar(p.nombre) === normalizar(nombreProducto));
// === Renderizar ===
const contenedor = document.getElementById("detalle-producto");
if (producto) {
  contenedor.innerHTML = `
    <div class="detalle-grid">
      <div class="detalle-imagenes">
        <img id="imgPrincipal" src="${producto.img[0]}" alt="${producto.nombre}" class="detalle-img">
        <div class="miniaturas">
          ${producto.img.slice(1).map(src => `<img src="${src}" class="mini-img" alt="${producto.nombre}">`).join("")}
        </div>
      </div>
      <div class="detalle-info">
        <h2>${producto.nombre}</h2>
        <p class="detalle-categoria">${producto.categoria}</p>
        <p class="detalle-descripcion">${producto.desc}</p>
        <p><strong>Tallas:</strong> ${producto.tallas.join(", ")}</p>
        <p><strong>Colores:</strong> ${producto.colores.join(", ")}</p>

        <div class="detalle-precio">
          <span class="precio-actual">$${producto.precio.toLocaleString()}</span>
          ${producto.descuento ? `<span class="etiqueta-descuento">🔥 En oferta</span>` : ""}
        </div>
        <button class="btn btn-primary">🛒 Agregar al carrito</button>
      </div>
    </div>
  `;
  // --- Cambiar imagen principal al hacer clic en miniatura ---
  const imgPrincipal = document.getElementById("imgPrincipal");
  document.querySelectorAll(".mini-img").forEach(img => {
    img.addEventListener("click", e => {
      imgPrincipal.src = e.target.src;
      if (zoomResult) {
        zoomResult.style.backgroundImage = `url('${e.target.src}')`;
      }
    });
  });
  /* === EFECTO LUPA === */
  const zoomLens = document.createElement("div");
  zoomLens.classList.add("zoom-lens");
  imgPrincipal.parentElement.style.position = "relative";
  imgPrincipal.parentElement.appendChild(zoomLens);
  const zoomResult = document.createElement("div");
  zoomResult.classList.add("zoom-result");
  imgPrincipal.parentElement.appendChild(zoomResult);
  zoomResult.style.backgroundImage = `url('${imgPrincipal.src}')`;
  imgPrincipal.addEventListener("mouseenter", () => {
    zoomLens.style.display = "block";
    zoomResult.style.display = "block";
  });
  imgPrincipal.addEventListener("mouseleave", () => {
    zoomLens.style.display = "none";
    zoomResult.style.display = "none";
  });
  imgPrincipal.addEventListener("mousemove", (e) => {
    const rect = imgPrincipal.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lensSize = 100;
    let lensX = x - lensSize / 2;
    let lensY = y - lensSize / 2;
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > rect.width - lensSize) lensX = rect.width - lensSize;
    if (lensY > rect.height - lensSize) lensY = rect.height - lensSize;
    zoomLens.style.left = `${lensX}px`;
    zoomLens.style.top = `${lensY}px`;
    const fx = (x / rect.width) * 100;
    const fy = (y / rect.height) * 100;
    zoomResult.style.backgroundPosition = `${fx}% ${fy}%`;
  });
} else {
  contenedor.innerHTML = `<p style="text-align:center; margin-top:2rem;">❌ Producto no encontrado.</p>`;
}
// --- Marcar botón de especificaciones para ser detectado por carrito.js ---
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.querySelector(".detalle-info .btn.btn-primary");
  if (boton) boton.classList.add("btn-especificaciones");
});
