document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const tarjeta = form.tarjeta.value.replace(/\s+/g, '');
    const cvv = form.cvv.value.trim();
    const tipo = form["tipo-tarjeta"].value;
    // Validaciones básicas
    if (tarjeta.length !== 16 || isNaN(tarjeta)) {
      alert("⚠️ El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("⚠️ El CVV debe tener 3 números.");
      return;
    }

    if (!tipo) {
      alert("⚠️ Selecciona el tipo de tarjeta.");
      return;
    }

    alert(`✅ Gracias ${nombre}, tu compra ha sido procesada con éxito.`);

    localStorage.removeItem("cart");
    window.location.href = "index.html"; // Redirigir al inicio
  });
  // ==== BOTÓN CANCELAR COMPRA ====
  const cancelarBtn = document.getElementById("cancelar-compra");
  cancelarBtn.addEventListener("click", () => {
    if (confirm("❌ ¿Estás seguro de que quieres cancelar la compra?")) {
      window.location.href = "index.html";
    }
  });
  // ==== FORMATO AUTOMÁTICO DEL NÚMERO DE TARJETA ====
  const tarjetaInput = document.getElementById("tarjeta");
  tarjetaInput.addEventListener("input", e => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  });
});
