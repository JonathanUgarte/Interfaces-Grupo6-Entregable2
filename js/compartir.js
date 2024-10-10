// Obtener los elementos necesarios
const shareButton = document.querySelector('#share-button');
const shareMenu = document.querySelector('.share-menu');
const exitButton = document.querySelector('.exit'); // Botón de cierre
const overlay = document.querySelector('.overlay'); // Overlay oscuro

// Añadir evento de click para el botón de compartir
shareButton.addEventListener('click', () => {
    // Mostrar el menú de compartir y el overlay
    shareMenu.classList.toggle('active');
    overlay.style.display = 'block'; // Mostrar el overlay
});

// Añadir evento de click para el botón de cierre
exitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el enlace haga scroll al principio de la página
    // Cerrar el menú de compartir y ocultar el overlay
    shareMenu.classList.remove('active');
    overlay.style.display = 'none'; // Ocultar el overlay
});

