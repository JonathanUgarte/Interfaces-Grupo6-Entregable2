let registerBtn = document.getElementById('register-btn');
let checkbox = document.getElementById('termsCheckbox');
let changeDiv = document.querySelector('.change');
let successMessage = document.getElementById('successMessage');
let loadingScreen = document.getElementById('loading-screen');
let loadingPercentage = document.getElementById('loading-percentage');

// Mostrar/ocultar botón de registro dependiendo del checkbox
checkbox.addEventListener('change', function () {
    if (this.checked) {
        registerBtn.style.display = 'block';  // Muestra el botón de registro
        changeDiv.style.display = 'none';     // Oculta el mensaje de términos
    } else {
        registerBtn.style.display = 'none';   // Oculta el botón si no se acepta
        changeDiv.style.display = 'flex';    // Muestra el mensaje de términos
    }
});

// Manejar el clic en el botón de registro
registerBtn.addEventListener('click', function(event) {
    event.preventDefault();  // Prevenir comportamiento predeterminado del botón

    // Mostrar la pantalla de carga cuando se haga clic
    loadingScreen.style.display = 'flex';
    
    let percentage = 0;
    let loadingInterval = setInterval(function() {
        percentage += 7;
        loadingPercentage.textContent = percentage + '%';

        if (percentage >= 100) {
            clearInterval(loadingInterval);

            // Reemplazar el porcentaje por el mensaje de éxito
            loadingPercentage.textContent = '¡Registro finalizado correctamente!';

            // Mostrar el mensaje de éxito por 2 segundos y luego redirigir
            setTimeout(function() {
                window.location.href = 'index.html';  // Redirigir a index.html
            }, 2000); // Mostrar el mensaje de éxito por 2 segundos
        }
    }, 100); // Incrementa el porcentaje cada 100ms
});
