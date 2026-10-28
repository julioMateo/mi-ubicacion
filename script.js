
const btnUbicacion = document.getElementById("btnUbicacion");
const btnMapa = document.getElementById("btnMapa");

const latitudTexto = document.getElementById("latitud");
const longitudTexto = document.getElementById("longitud");
const precisionTexto = document.getElementById("precision");
const estado = document.getElementById("estado");

// Evento del botón
btnUbicacion.addEventListener("click", obtenerUbicacion);

// Función principal de geolocalización
function obtenerUbicacion() {

    if (!navigator.geolocation) {
        estado.textContent =
            "Tu navegador no soporta geolocalización.";
        return;
    }

    btnUbicacion.disabled = true;
    btnMapa.classList.add("oculto");

    estado.textContent = "Obteniendo ubicación...";

    navigator.geolocation.getCurrentPosition(
        mostrarUbicacion,
        mostrarError,
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}

// Si la ubicación se obtiene correctamente
function mostrarUbicacion(posicion) {

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;
    const precision = posicion.coords.accuracy;

    latitudTexto.textContent = latitud.toFixed(6);
    longitudTexto.textContent = longitud.toFixed(6);

    precisionTexto.textContent =
        precision.toFixed(2) + " metros";

    estado.textContent =
        "¡Ubicación obtenida correctamente!";

    // Crear enlace a Google Maps
    const urlMapa =
        `https://www.google.com/maps?q=${latitud},${longitud}`;

    btnMapa.href = urlMapa;

    btnMapa.classList.remove("oculto");
    btnUbicacion.disabled = false;
}

// Si ocurre un error
function mostrarError(error) {

    switch (error.code) {

        case 1:
            estado.textContent =
                "Permiso de ubicación denegado.";
            break;

        case 2:
            estado.textContent =
                "No se pudo determinar tu ubicación.";
            break;

        case 3:
            estado.textContent =
                "Se agotó el tiempo de espera.";
            break;

        default:
            estado.textContent =
                "Ocurrió un error desconocido.";
    }

    btnUbicacion.disabled = false;
}
