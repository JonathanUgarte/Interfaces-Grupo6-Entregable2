let slideIndex = 1;
let slideInterval; // Variable para almacenar el intervalo de tiempo

showSlides(slideIndex);
startSlideShow(); // Iniciar el carrusel

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetSlideShow(); // Reiniciar el temporizador al hacer clic
}

function showSlides(n) {
    const slides = document.querySelectorAll(".carrusel-gameplay-slide");
    const dots = document.querySelectorAll(".carrusel-gameplay-dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach((slide, index) => {
        slide.classList.remove("active", "next", "prev"); // Remover todas las clases

        // Asignar las clases para animación
        if (index === slideIndex - 1) {
            slide.classList.add("active");
        } else if (index === slideIndex) {
            slide.classList.add("next"); // La siguiente imagen
        } else if (index === slideIndex - 2 || (slideIndex === 1 && index === slides.length - 1)) {
            slide.classList.add("prev"); // La imagen anterior
        }
    });

    // Actualizar los puntos
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex - 1].classList.add("active");
}








