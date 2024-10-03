function moverCarrusel(direccion, carruselId) {
    const carrusel = document.getElementById(carruselId).querySelector('.contenedor-carrusel');
    const desplazamiento = 300; // La cantidad de desplazamiento en píxeles

    if (direccion === 'izquierda') {
        carrusel.scrollLeft -= desplazamiento;
    } else if (direccion === 'derecha') {
        carrusel.scrollLeft += desplazamiento;
    }
}