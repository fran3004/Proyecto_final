
        const contactForm = document.getElementById("contactForm");
        const feedback = document.getElementById("feedback");
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            feedback.textContent = "✅ Mensaje recibido. ¡Gracias por contactarnos!";
            feedback.className = "mensaje-feedback exito";
            contactForm.reset();
            setTimeout(() => {
                feedback.textContent = "";
            }, 4000);
        });
