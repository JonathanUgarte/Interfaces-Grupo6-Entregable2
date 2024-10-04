let nav = document.querySelector("#nav");
let abrir = document.querySelector("#btn-menu");

abrir.addEventListener("click", (event) => {
    nav.classList.toggle("visible");
    event.stopPropagation(); // Evita que el clic se propague y cierre el menú inmediatamente
});

// Cierra el menú cuando se hace clic fuera de él
window.addEventListener("click", (event) => {
    if (nav.classList.contains("visible") && !nav.contains(event.target) && event.target !== abrir) {
        nav.classList.remove("visible");
    }
});



