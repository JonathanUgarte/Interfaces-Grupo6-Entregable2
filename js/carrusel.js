function moverCarrusel(direccion) {
    const contenedor = document.querySelector('.contenedor-carrusel');
    const cardWidth = document.querySelector('.game-card').offsetWidth; 
    const scrollAmount = cardWidth + 10; // Ajusta este valor si es necesario

    if (direccion === 'izquierda') {
        contenedor.scrollBy({ 
            left: -scrollAmount, 
            behavior: 'smooth' 
        });
    } else if (direccion === 'derecha') {
        contenedor.scrollBy({ 
            left: scrollAmount, 
            behavior: 'smooth' 
        });
    }
}
