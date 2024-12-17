document.addEventListener('DOMContentLoaded', function () {
    // Recupera el estado del descuento y los puntos
    let puntos = parseInt(localStorage.getItem('puntos')) || 0;  // Recupera los puntos desde localStorage
    let descuentoAplicado = JSON.parse(localStorage.getItem('descuentoAplicado')) || false;  // Recupera si el descuento ha sido aplicado

    // Función para calcular el precio con descuento
    function aplicarDescuento(precioOriginal) {
        if (descuentoAplicado) {
            return precioOriginal * 0.9; // Descuento del 10%
        }
        return precioOriginal; // Si no hay descuento, el precio original
    }

    // Actualizar precios de los productos con descuento si corresponde
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        const precioElemento = producto.querySelector('.precio');
        let precioOriginal = parseFloat(precioElemento.innerText.replace('S/. ', '').replace(' / Bolsa', ''));

        // Aplica descuento y actualiza el precio
        let precioConDescuento = aplicarDescuento(precioOriginal);
        precioElemento.innerText = `S/. ${precioConDescuento.toFixed(2)} / Bolsa`;

        // Actualiza los datos del carrito con el precio con descuento
        const boton = producto.querySelector('button');
        const nombreProducto = producto.querySelector('.nombre-producto').innerText.trim();

        boton.setAttribute('onclick', `agregarAlCarrito('${nombreProducto}', ${precioConDescuento})`);
    });
});
