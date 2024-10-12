
  // Seleccionar el ícono de perfil y el menú desplegable
  const profileIcon = document.getElementById('profile-icon');
  const profileDropdown = document.getElementById('profile-dropdown');

  // Mostrar/Ocultar el menú desplegable al hacer clic en el ícono de perfil
  profileIcon.addEventListener('click', function(event) {
    event.preventDefault();
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Ocultar el menú desplegable si se hace clic fuera de él
  window.addEventListener('click', function(event) {
    if (!profileDropdown.contains(event.target) && !profileIcon.contains(event.target)) {
      profileDropdown.style.display = 'none';
    }
  });

