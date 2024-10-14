
let currentSlideIndex = 0; // Índice del slide actual
const slides = document.querySelectorAll('.carrusel-gameplay-slide'); // Seleccionar todos los slides
const dots = document.querySelectorAll('.carrusel-gameplay-dot'); // Seleccionar todos los puntos

function showSlide(index) {
    const currentSlide = slides[currentSlideIndex]; // Slide actual
    const nextSlide = slides[index]; // Slide siguiente

    // Comienza la animación de salida del slide actual
    currentSlide.classList.add('exit'); // Agrega clase para la animación de salida

    // Después de la animación de salida, ocultamos el slide actual y mostramos el siguiente
    setTimeout(() => {
        currentSlide.classList.remove('active', 'exit'); // Remueve las clases active y exit
        currentSlideIndex = index; // Actualiza el índice actual
        nextSlide.classList.add('active'); // Activa el siguiente slide
    }, 500); // Debe ser el mismo tiempo que la transición (0.5s)

    // Actualiza el punto activo
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Cambiar de slide al hacer clic en los puntos
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentSlideIndex) { // Solo cambia si el índice es diferente
            showSlide(index);
        }
    });
});

// Inicializar el carrusel mostrando el primer slide
showSlide(currentSlideIndex);







