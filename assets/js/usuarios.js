document.addEventListener("DOMContentLoaded", () => {
    const btnUsuario = document.getElementById("btnUsuario");
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (usuarioActivo) cambiarABotonCerrar(JSON.parse(usuarioActivo).nombre);
    btnUsuario.addEventListener("click", () => {
        if (localStorage.getItem("usuarioActivo")) {
            cerrarSesion();
        } else {
            abrirModalUsuario();
        }
    });
    function abrirModalUsuario() {
        if (document.getElementById("modal-usuario")) return;
        const overlay = document.createElement("div");
        overlay.id = "modal-usuario";
        overlay.classList.add("modal-overlay");
        overlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-tabs">
                    <button class="tab active" data-tab="registro">Crear cuenta</button>
                    <button class="tab" data-tab="login">Iniciar sesión</button>
                </div>
                <!-- Registro -->
                <div class="tab-content" id="registro" style="display: block;">
                    <form id="formRegistro" class="form-column">
                        <label>Nombre completo</label>
                        <input type="text" id="nombre" name="nombre" required>
                        <label>Correo electrónico</label>
                        <input type="email" id="email" name="email" required>
                        <label>Contraseña</label>
                        <div class="password-wrapper">
                            <input type="password" id="password" name="password" required placeholder="Contraseña">
                            <span class="toggle-password">👁️</span>
                        </div>
                        <div class="modal-buttons">
                            <button type="submit" class="btn-primary">Registrar</button>
                        </div>
                        <div class="social-login">
                            <p>O regístrate con:</p>
                            <div class="social-buttons">
                                <button type="button" class="btn-google">
                                    <img src="assets/icons/google.svg" alt="Google"> Google
                                </button>
                                <button type="button" class="btn-facebook">
                                    <img src="assets/icons/facebook.svg" alt="Facebook"> Facebook
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Login -->
                <div class="tab-content" id="login" style="display: none;">
                    <form id="formLogin" class="form-column">
                        <label>Correo electrónico</label>
                        <input type="email" id="loginEmail" name="loginEmail" required>
                        <label>Contraseña</label>
                        <div class="password-wrapper">
                            <input type="password" id="loginPassword" name="loginPassword" required placeholder="Contraseña">
                            <span class="toggle-password">👁️</span>
                        </div>
                        <div class="modal-buttons">
                            <button type="submit" class="btn-primary">Iniciar sesión</button>
                        </div>
                        <div class="social-login">
                            <p>O entra con:</p>
                            <div class="social-buttons">
                                <button type="button" class="btn-google">
                                    <img src="assets/icons/google.svg" alt="Google"> Google
                                </button>
                                <button type="button" class="btn-facebook">
                                    <img src="assets/icons/facebook.svg" alt="Facebook"> Facebook
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <button id="btnCerrarModal" class="btn-cerrar">×</button>
                <div id="mensajeFeedback" class="mensaje-feedback"></div>
                <div id="spinner" class="spinner" style="display:none;"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add("show"), 10);
        const tabs = overlay.querySelectorAll(".tab");
        const contents = overlay.querySelectorAll(".tab-content");
        const mensaje = overlay.querySelector("#mensajeFeedback");
        const spinner = overlay.querySelector("#spinner");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(c => c.style.display = "none");
                tab.classList.add("active");
                overlay.querySelector(`#${tab.dataset.tab}`).style.display = "block";
                mensaje.textContent = "";
            });
        });
        const cerrarModal = () => {
            overlay.classList.remove("show");
            setTimeout(() => overlay.remove(), 300);
        };
        overlay.querySelector("#btnCerrarModal").addEventListener("click", cerrarModal);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) cerrarModal();
        });
        const mostrarMensaje = (texto, tipo = "exito") => {
            spinner.style.display = "none";
            mensaje.textContent = texto;
            mensaje.className = `mensaje-feedback ${tipo}`;
            setTimeout(() => (mensaje.textContent = ""), 3000);
        };
        const mostrarSpinner = () => {
            mensaje.textContent = "";
            spinner.style.display = "block";
        };
        //Mostrar/Ocultar contraseña 
        overlay.querySelectorAll(".toggle-password").forEach(btn => {
            btn.addEventListener("click", () => {
                const input = btn.previousElementSibling;
                const isHidden = input.type === "password";
                input.type = isHidden ? "text" : "password";
                btn.textContent = isHidden ? "🔒" : "👁️";
            });
        });
        //REGISTRO DE USUARIOS
        overlay.querySelector("#formRegistro").addEventListener("submit", e => {
            e.preventDefault();
            const form = e.target;
            const nombre = form.nombre.value.trim();
            const email = form.email.value.trim().toLowerCase();
            const password = form.password.value.trim();
            if (nombre.length < 3) return mostrarMensaje("❌ Nombre muy corto", "error");
            if (!email.includes("@")) return mostrarMensaje("❌ Correo inválido", "error");
            if (password.length < 6) return mostrarMensaje("❌ Contraseña corta", "error");
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuarios.some(u => u.email === email))
                return mostrarMensaje("⚠️ Ya existe una cuenta con ese correo", "error");
            const nuevoUsuario = { nombre, email, password };
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
            mostrarSpinner();
            setTimeout(() => {
                mostrarMensaje("✅ Registro exitoso");
                setTimeout(() => {
                    cerrarModal();
                    cambiarABotonCerrar(nombre);
                }, 1000);
            }, 1000);
        });
        // LOGIN
        overlay.querySelector("#formLogin").addEventListener("submit", e => {
            e.preventDefault();
            const form = e.target;
            const email = form.loginEmail.value.trim().toLowerCase();
            const password = form.loginPassword.value.trim();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.email === email && u.password === password);
            if (!usuario)
                return mostrarMensaje("❌ Correo o contraseña incorrectos", "error");
            mostrarSpinner();
            setTimeout(() => {
                localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
                mostrarMensaje("🔓 Sesión iniciada");
                setTimeout(() => {
                    cerrarModal();
                    cambiarABotonCerrar(usuario.nombre);
                }, 1000);
            }, 1000);
        });
    }
    function cambiarABotonCerrar(nombre) {
        btnUsuario.innerHTML = "";
        const span = document.createElement("span");
        span.className = "user-text";
        span.textContent = "👋 " + (nombre.split(" ")[0] || nombre);
        btnUsuario.appendChild(span);
        btnUsuario.classList.add("btn-logout");
    }
    function cerrarSesion() {
        const confirmar = confirm("¿Deseas cerrar sesión?");
        if (!confirmar) return;
        localStorage.removeItem("usuarioActivo");
        btnUsuario.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        `;
        btnUsuario.classList.remove("btn-logout");
    }
});
