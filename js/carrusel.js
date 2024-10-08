function moverCarrusel(direccion, carruselId) {
    const carrusel = document.getElementById(carruselId).querySelector('.contenedor-carrusel');
    const desplazamiento = 300; // La cantidad de desplazamiento en píxeles

    if (direccion === 'izquierda') {
        carrusel.scrollLeft -= desplazamiento;
    } else if (direccion === 'derecha') {
        carrusel.scrollLeft += desplazamiento;
    }
}
/*
// Funcionamiento de carrusel con botones
const carouselContainers = document.querySelectorAll('.carrusel-juegos');

carouselContainers.forEach((container) => {
    const carousel = container.querySelector('.contenedor-carrusel');
    const prevButton = container.querySelector('slide left');
    const nextButton = container.querySelector('slide right');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    nextButton.addEventListener('click', () => {
      const cardWidth = 200; // Ancho de la tarjeta + margen
      const maxTranslate = -1250;
      
      if (currentTranslate > maxTranslate) {
          currentTranslate -= 258;
          // Agrega la clase "skew" para aplicar la animación de skew
          carousel.classList.add('skewder');
          updateCarousel();
          
          // Elimina la clase "skew" después de un tiempo (puedes ajustar el tiempo según tu preferencia)
          setTimeout(() => {
              carousel.classList.remove('skewder');
          }, 300); // 300 milisegundos (0.3 segundos)
      }
    });
    
    prevButton.addEventListener('click', () => {
        if (currentTranslate !== 0) {
            currentTranslate += 258; // Ancho de la tarjeta + margen
            // Agrega la clase "skew" para aplicar la animación de skew
            carousel.classList.add('skewizq');
            updateCarousel();
            
            // Elimina la clase "skew" después de un tiempo (puedes ajustar el tiempo según tu preferencia)
            setTimeout(() => {
                carousel.classList.remove('skewizq');
            }, 300); // 300 milisegundos (0.3 segundos)
        }
    });

    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startPosition = e.touches[0].clientX;
        carousel.style.transition = 'none';
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPosition;
    });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        const cardWidth = 200; // Ancho de la tarjeta + margen
        const maxTranslate = -(carousel.querySelectorAll('.game-card').length - 1) * cardWidth;

        if (movedBy < -100 && currentTranslate > maxTranslate) {
            currentTranslate -= cardWidth;
        } else if (movedBy > 100 && currentTranslate !== 0) {
            currentTranslate += cardWidth;
        }

        updateCarousel();
    });

    function updateCarousel() {
        const cardWidth = 200; // Ancho de la tarjeta + margen
        const maxTranslate = -(carousel.querySelectorAll('.game-card').length - 1) * cardWidth;
        if (currentTranslate > 0) currentTranslate = 0;
        if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        carousel.style.transition = 'transform 0.3s ease-in-out';
    }
});*/