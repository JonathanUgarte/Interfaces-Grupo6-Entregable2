const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const slider = document.querySelector('.slider');

prevButton.addEventListener('click', () => {
  slider.classList.add('inclinando'); // Añade la clase para activar la animación

  setTimeout(() => {
    slider.style.transform = 'translateX(-100%)'; // Mueve el slider
    slider.classList.remove('inclinando'); // Remueve la clase después de la animación
  }, 500); // Ajusta el tiempo según la duración de la animación
});

nextButton.addEventListener('click', () => {
  slider.classList.add('inclinando');

  setTimeout(() => {
    slider.style.transform = 'translateX(-200%)';
    slider.classList.remove('inclinando');
  }, 500);
});