const botonesAgregar = document.querySelectorAll('.game-icon');
const contadorCarrito = document.querySelector('.contador-carrito');
let contador = 0;

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    contador++;

    
    if (contador > 0) {
      contadorCarrito.style.display = 'block'; 
    } else {
      contadorCarrito.style.display = 'none'; 
    }

    
    contadorCarrito.textContent = contador; 
  });
});