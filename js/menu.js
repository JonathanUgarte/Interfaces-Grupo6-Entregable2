let nav = document.querySelector("#nav");
let abrir = document.querySelector("#btn-menu");

// Mostrar el menú cuando el cursor está sobre el botón
abrir.addEventListener("mouseenter", () => {
    nav.classList.add("visible");
});

// Mantener el menú visible cuando el cursor está sobre el menú
nav.addEventListener("mouseenter", () => {
    nav.classList.add("visible");
});

// Ocultar el menú cuando el cursor sale del botón y no entra en el menú
abrir.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!nav.matches(':hover')) {
            nav.classList.remove("visible");
        }
    }, 100); // Tiempo de retardo para asegurarse de que el cursor no va hacia el menú
});

// Ocultar el menú cuando el cursor sale del menú y no entra en el botón
nav.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!abrir.matches(':hover')) {
            nav.classList.remove("visible");
        }
    }, 100); // Tiempo de retardo para asegurarse de que el cursor no va hacia el botón
});




