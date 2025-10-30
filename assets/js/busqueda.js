const searchInput = document.querySelector(".search-input");
const suggestionBox = document.createElement("div");
suggestionBox.classList.add("search-suggestions");
searchInput.parentNode.appendChild(suggestionBox);
// === Función para normalizar texto (quita tildes y mayúsculas) ===
function normalizeText(text) {
  return text
    ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
    : "";
}
// === Obtener query si venimos desde otra página ===
const urlParams = new URLSearchParams(window.location.search);
const initialSearch = urlParams.get("search");
if (initialSearch) {
  searchInput.value = initialSearch;
  if (window.location.href.includes("categoria.html")) {
    setTimeout(() => {
      const productCards = document.querySelectorAll(".product-card");
      for (const card of productCards) {
        const nameElem = card.querySelector(".product-name");
        if (nameElem.textContent === initialSearch) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.style.transition = "0.5s";
          card.style.boxShadow = "0 0 15px 3px var(--color-primary)";
          setTimeout(() => (card.style.boxShadow = ""), 1500);
          break;
        }
      }
    }, 500);
  }
  searchInput.dispatchEvent(new Event("input"));
}
// === Mostrar sugerencias mientras escribe ===
searchInput.addEventListener("input", () => {
  const query = normalizeText(searchInput.value);
  suggestionBox.innerHTML = "";

  if (query === "") return;

  // === Filtro avanzado con texto normalizado ===
  const matches = products.filter(p => {
    const name = normalizeText(p.name);
    const sport = normalizeText(p.sport);
    const category = normalizeText(p.category);
    const keywords = [name, sport, category].join(" ");

    const nameMatch = name.includes(query);
    const sportMatch = sport.includes(query);
    const categoryMatch = category.includes(query);
    const keywordMatch = keywords.includes(query);
    const offerMatch =
      (query.includes("oferta") || query.includes("descuento")) && p.offer;

    return nameMatch || sportMatch || categoryMatch || keywordMatch || offerMatch;
  });

  // === Sin resultados ===
  if (matches.length === 0) {
    const noResult = document.createElement("div");
    noResult.classList.add("suggestion-item");
    noResult.textContent = "Sin resultados 😕";
    suggestionBox.appendChild(noResult);
    return;
  }

  // === Mostrar coincidencias ===
  matches.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="suggestion-img">
      <span class="suggestion-name">${p.name}</span>
      <small style="color: #94a3b8; font-size: 0.8rem;">
        ${p.sport || p.category || "Producto"} ${p.offer ? "— 🔥 En oferta" : ""}
      </small>
    `;

    div.addEventListener("click", () => {
      if (!window.location.href.includes("categoria.html")) {
        // Si hace clic desde otra página
        window.location.href = `categoria.html?search=${encodeURIComponent(p.name)}`;
        return;
      }

      // Si ya está en categoría
      const productCards = document.querySelectorAll(".product-card");
      for (const card of productCards) {
        const nameElem = card.querySelector(".product-name");
        if (nameElem.textContent === p.name) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.style.transition = "0.5s";
          card.style.boxShadow = "0 0 15px 3px var(--color-primary)";
          setTimeout(() => (card.style.boxShadow = ""), 1500);
          break;
        }
      }
      suggestionBox.innerHTML = "";
      searchInput.value = "";
    });

    suggestionBox.appendChild(div);
  });
});

// === Ocultar sugerencias al hacer clic fuera ===
document.addEventListener("click", e => {
  if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
    suggestionBox.innerHTML = "";
  }
});
