document.addEventListener('DOMContentLoaded', () => {
    verificarAuth();
    
    // Manejo de Login
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                username: formLogin.username.value,
                password: formLogin.password.value
            };
            await procesarAuth('/usuarios/login', data, 'login-alerts', 'Login exitoso, redirigiendo...');
        });
    }

    // Manejo de Registro
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                username: formRegistro['reg-username'].value,
                password: formRegistro['reg-password'].value
            };
            await procesarAuth('/usuarios/registro', data, 'registro-alerts', 'Registro exitoso, ingresando...');
        });
    }

    // Manejo de Compra
    const formCompra = document.getElementById('form-compra');
    if (formCompra) {
        formCompra.addEventListener('submit', async (e) => {
            e.preventDefault();
            const idLibro = formCompra.dataset.id;
            const cantidad = parseInt(formCompra.cantidad.value);
            const token = localStorage.getItem('jwt_token');

            if (!token) {
                mostrarAlerta('compra-alerts', 'Debes iniciar sesión para comprar.', 'danger');
                setTimeout(() => window.location.href = '/usuarios/login', 2000);
                return;
            }

            // Usamos la ruta: /libros/:id/comprar (POST)
            try {
                const res = await fetch(`/libros/${idLibro}/comprar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ cantidad })
                });

                const result = await res.json();

                if (res.ok) {
                    mostrarAlerta('compra-alerts', 'Compra realizada con éxito. Volviendo al catálogo...', 'success');
                    setTimeout(() => window.location.href = '/libros/catalogo', 2000);
                } else {
                    mostrarErrores('compra-alerts', result);
                }

            } catch (error) {
                mostrarAlerta('compra-alerts', 'Error de conexión con el servidor', 'danger');
            }
        });
    }

    // Lógica para bloquear enlaces de compra si no hay sesión
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    if (!localStorage.getItem('jwt_token')) {
        botonesComprar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    alert('Debes iniciar sesión para comprar');
                    window.location.href = '/usuarios/login';
                }
            });
        });
    }
});

// Función Genérica Login/Registro
async function procesarAuth(url, data, alertId, msgExito) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            localStorage.setItem('jwt_token', result.token);
            localStorage.setItem('usuario', data.username);
            
            mostrarAlerta(alertId, msgExito, 'success');
            setTimeout(() => window.location.href = '/libros/catalogo', 1500);
        } else {
            mostrarErrores(alertId, result);
        }
    } catch (error) {
        mostrarAlerta(alertId, 'Error interno del servidor o de conexión', 'danger');
    }
}

// Verifica estado de sesión para Navbar
function verificarAuth() {
    const token = localStorage.getItem('jwt_token');
    const user = localStorage.getItem('usuario');
    const navGuest = document.getElementById('nav-guest');
    const navUser = document.getElementById('nav-user');
    const userDisplay = document.getElementById('username-placeholder');

    if (token && user) {
        if(navGuest) navGuest.classList.replace('d-block', 'd-none');
        if(navUser) navUser.classList.replace('d-none', 'd-flex');
        
        if(userDisplay) userDisplay.textContent = user;
    } else {
        if(navGuest) navGuest.classList.replace('d-none', 'd-block');
        if(navUser) navUser.classList.replace('d-flex', 'd-none');
    }
}

// Cerrar Sesión
function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario');
    window.location.href = '/'; 
}

// Utilidad para mostrar alertas
function mostrarAlerta(containerId, mensaje, tipo) {
    const container = document.getElementById(containerId);
    if(container) {
        container.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

// Utilidad para mostrar errores de validación backend
function mostrarErrores(containerId, result) {
    let msg = result.error || 'Ocurrió un error inesperado';
    
    // Si hay detalles (array de errores del middleware validacion)
    if (result.detalles && Array.isArray(result.detalles) && result.detalles.length > 0) {
        msg += '<ul>';
        result.detalles.forEach(d => {
            msg += `<li>${d}</li>`; 
        });
        msg += '</ul>';
    }
    
    mostrarAlerta(containerId, msg, 'danger');
}