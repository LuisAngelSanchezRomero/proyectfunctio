let puntos = parseInt(localStorage.getItem('puntos')) || 0;  // Recupera los puntos desde localStorage o inicializa en 0 
let descuentoAplicado = JSON.parse(localStorage.getItem('descuentoAplicado')) || false;  // Recupera si el descuento ha sido aplicado

// Función para agregar puntos cada minuto
function acumularPuntos() {
    setInterval(() => {
        if (!descuentoAplicado) {
            
            puntos += 100;  // 100 puntos por cada minuto

            // Si llega a 1000 puntos, aplica el descuento
            if (puntos >= 1000 && !descuentoAplicado) {
                alert("¡Felicidades! Has alcanzado 1000 puntos. Obtienes un 10% de descuento.");
                descuentoAplicado = true;
                // Guarda los datos actualizados del descuento en localStorage
                localStorage.setItem('descuentoAplicado', JSON.stringify(descuentoAplicado));
            }
        } else {
            // Si el descuento ya se aplicó, seguimos sumando puntos sin detener la acumulación
            puntos += 100;
        }
    }, 60000);  // Ejecuta cada 60 segundos (1 minuto)
}

// Llama a la función cuando la página carga
document.addEventListener('DOMContentLoaded', function () {
    // Solo inicializamos el almacenamiento si es la primera vez que se carga
    if (localStorage.getItem('puntos') === null) {
        localStorage.setItem('puntos', puntos); // Almacena los puntos solo una vez al inicio
    }
    acumularPuntos();
});
