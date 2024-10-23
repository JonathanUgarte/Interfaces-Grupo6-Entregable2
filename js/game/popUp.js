'use strict';


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
  
  const dropdown = document.querySelector('.dropdown');
  const overlay = document.getElementById('overlay');
  
  const toggleDropdown = () => {
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
          overlay.style.display = 'none'; // Oculta el overlay al cerrar el dropdown
      } else {
          dropdownContent.style.display = 'block';
          overlay.style.display = 'block'; // Muestra el overlay al abrir el dropdown
      }
  };
  

//POPUP REDES
let popUpRedes = document.querySelector("#popUpRedes");

document.querySelector("#btn-compartir").addEventListener("click", ()=>{
    popUpRedes.showModal();
});

document.querySelector("#cerrar-popUpRedes").addEventListener("click", ()=>{
    popUpRedes.close();
});

//POPUP LOADING


document.querySelector("#logo-header").addEventListener("click", PopUpLoading);
document.querySelector("#home-nav").addEventListener("click", PopUpLoading);
document.querySelector('.container-btn-misJuegos').addEventListener('click', PopUpLoading);
document.querySelector('#inicio-breadcrumb').addEventListener('click', PopUpLoading);

function PopUpLoading(){
    let popUpLoading = document.querySelector("#popUpLoading");
    popUpLoading.showModal();
    setTimeout(a, 5000);
    function a(){
        NavigateTo('./home.html');
    }
}

function NavigateTo(url){
    location.href = url;
}


const grande    = document.querySelector('.grande')
const punto     = document.querySelectorAll('.punto')

// Recorrer TODOS los punto
punto.forEach( ( cadaPunto , i )=> {
    // Asignamos un CLICK a cadaPunto
    punto[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -33.3

        // MOVEMOS el grand
        grande.style.transform = `translateX(${operacion}%)`

        // Recorremos TODOS los punto
        punto.forEach( ( cadaPunto , i )=>{
            // Quitamos la clase ACTIVO a TODOS los punto
            punto[i].classList.remove('activo')
        })
        // Añadir la clase activo en el punto que hemos hecho CLICK
        punto[i].classList.add('activo')

    })
})