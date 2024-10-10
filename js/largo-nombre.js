function truncarNombre(nombre) {
    if (nombre.length > 25) {
      return nombre.slice(0, 25) + "...";
    } else {
      return nombre;
    }
  }
  
  const gameTitles = document.querySelectorAll('.game-title');
  
  gameTitles.forEach(title => {
    title.textContent = truncarNombre(title.textContent);
  });