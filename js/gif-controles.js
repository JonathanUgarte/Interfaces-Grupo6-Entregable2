function restartGif() {
    const gif = document.getElementById('myGif');
    gif.src = '';  // Cambia el src temporalmente
    gif.src = './img/tablero_4_en_linea_fichas.gif';  // Vuelve a asignar el src original para reiniciar el GIF
  }

  setInterval(restartGif, 5000);  // Reinicia el GIF cada 5 segundos, ajusta el tiempo según la duración de tu GIF