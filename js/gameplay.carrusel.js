let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
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
        slide.style.display = (index + 1 === slideIndex) ? "block" : "none";
    });

    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex - 1].classList.add("active");
}
