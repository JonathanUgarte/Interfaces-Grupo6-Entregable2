const canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

//SELECCION DE PERSONAJES
let robots = document.querySelectorAll(".robots");
let aliens = document.querySelectorAll(".aliens");
let jugadores = document.querySelectorAll(".jugadores");

var imagenJugador1 = document.getElementById("robot-1");
var imagenJugador2 = document.getElementById("alien-1");

for (let jugador of jugadores) {
    jugador.addEventListener("click", () => {
        if (jugador.classList.contains("robots")) {
            for (let robot of robots) {
                robot.classList.remove("selected");
            }
            jugador.classList.add("selected");
            imagenJugador1 = document.getElementById(jugador.id);
        }
        if (jugador.classList.contains("aliens")) {
            for (let alien of aliens) {
                alien.classList.remove("selected");
            }
            jugador.classList.add("selected");
            imagenJugador2 = document.getElementById(jugador.id);
        }
    })
}

//SELECCION DE MODO DE JUEGO
let formatos = document.querySelectorAll(".formato-juego");
var modoDeJuego = 4;

for (let formato of formatos) {
    formato.addEventListener("click", () => {
        for (let formato of formatos) {
            formato.classList.remove("selected");
        }
        formato.classList.add("selected");
        modoDeJuego = Number(formato.id);
    })
}

// CAMBIO DE DIV A CANVAS

let primerPantalla = document.querySelector(".juego");
let containerJuego = document.querySelector(".juego-container");
let timer = document.querySelector("#temporizador");

document.getElementById("btn-jugar").addEventListener("click", () => {

    setTimeout(a, 500);

    function a() {
        canvas.classList.remove("esconder");
        containerJuego.classList.add('esconder');
        containerJuego.classList.remove("juego-container")
        primerPantalla.classList.add('esconder');
        btnMenu.classList.remove("esconder");
        timer.classList.remove('esconder');
        minutos = 5;
        segundos = 0;
        temporizador();
        inicializeGame();
    }
 
})

//CAMBIO DE CANVAS A DIV
let btnMenu = document.getElementById("btn-menu-juego");

btnMenu.addEventListener("click", () => {
    canvas.classList.add("esconder");
    containerJuego.classList.remove("esconder");
    containerJuego.classList.add("container-juego");
    primerPantalla.classList.remove("esconder");
    timer.classList.add('esconder');
    btnMenu.classList.add("esconder");
    clearInterval(temp);
    temp = null;
})

//INICIALIZO VARIABLES

const canvasH = 520;
const canvasW = 900;

var cantFichasTotal;

var boardW;
var boardH;

var boardx0;
var boardy0;

var filas;
var columnas;

var tablero = [];
const slots = [];
const fichas = [];
const fichasPuestas = [];
const posicionPonerFichas = [];

var board = null;
let turnoJugador = null

function inicializeGame() {
    //SETEO VARIABLES
    cantFichasTotal = (modoDeJuego + 3) * (modoDeJuego + 2);
    turnoJugador = 1;
    boardW = (modoDeJuego + 3) * 50;
    boardH = (modoDeJuego + 2) * 50;

    boardx0 = canvasW / 2 - boardW / 2;
    boardy0 = canvasH / 2 - boardH / 2 + 25;

    filas = modoDeJuego + 2;
    columnas = modoDeJuego + 3;

    ultimaFichaPuesta = null;
    fichaClicked = null;

    //vacío el arreglo
    tablero = [];

    //declaro matriz
    for (let i = 0; i < filas; i++) {
        tablero[i] = new Array(filas);
    }

    //inicializo matriz en 0
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = "";
        }
    }

    //dejo vacío el arreglo de fichas, fichas puestas y slots
    for (let i = fichas.length; i > 0; i--) {
        fichas.pop();
    }

    for (let i = fichasPuestas.length; i > 0; i--) {
        fichasPuestas.pop();
    }

    for (let i = slots.length; i > 0; i--) {
        slots.pop();
    }

    for (let i = posicionPonerFichas.length; i > 0; i--) {
        posicionPonerFichas.pop();
    }
    mostrarTurno();
    var image = document.getElementById("robot-1");
    

    board = new Board(tablero, boardx0, boardy0, boardW, boardH, "blue", ctx, modoDeJuego, image);

    pintarFondo();

    board.draw();

    

    let fichaPosY = 505;
    for (let i = 0; i < cantFichasTotal / 2; i++) {
        let fichaPosX = 30;
        fichaPosY = fichaPosY - 10;
        const ficha = new Ficha(fichaPosX, fichaPosY, 20, "red", ctx, 1, imagenJugador1);
        fichas.push(ficha);
        ficha.draw();
    }

    

    fichaPosY = 505;
    for (let i = 0; i < cantFichasTotal / 2; i++) {
        let fichaPosX = canvasW - 30;
        fichaPosY = fichaPosY - 10;
        const ficha = new Ficha(fichaPosX, fichaPosY, 20, "yellow", ctx, 2, imagenJugador2);
        fichas.push(ficha);
        ficha.draw();
    }

    
}

canvas.addEventListener("mousedown", clickEnFicha);
canvas.addEventListener("mouseup", ponerFicha);
canvas.addEventListener("mousemove", moverFicha);

//FONDO CANVAS
function pintarFondo() {
    let img = document.querySelector("#fondo-canvas")
    let imgFondo = ctx.createPattern(img, null);
    ctx.rect(0, 0, canvasW, canvasW);
    ctx.fillStyle = imgFondo;
    ctx.fill();
}

function repaint() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    pintarFondo();
    board.redraw();
    for (let i = 0; i < fichas.length; i++) {
        if (fichas[i].getPlayer() == 1) fichas[i].setFill("red");
        else fichas[i].setFill("yellow");
        fichas[i].draw();
    }
    
    mostrarTurno(); 
}
    //DIV QUE MUESTRA A QUE JUGADOR LE TOCA
function mostrarTurno() {
    let ancho = 150, alto = 50;
    let x = (turnoJugador === 1) ? 50 : canvasW - ancho - 50;
    let y = 450;

    ctx.fillStyle = turnoJugador === 1 ? "Red" : "Blue";  
    ctx.beginPath();
    ctx.roundRect(x, y, ancho, alto, 10);  
    ctx.fill();

    ctx.font = "20px Arial";
    ctx.fillStyle = "white"; // Contraste
    ctx.textAlign = "center";
    ctx.fillText(turnoJugador === 1 ? "Turno: Robots" : "Turno: Aliens", x + ancho / 2, y + alto / 2 + 5);
}



function getMousePos(event) {
    return {
        x: Math.round(event.clientX - canvas.offsetLeft),
        y: Math.round(event.clientY - canvas.offsetTop)
    }
}

let ultimaFichaPuesta;
let fichaClicked;
let fichaPosXInicial;
let fichaPosYInicial;
let click = false;
var inicioX = 0, inicioY = 0;
var fichax0;
var fichay0;
var indiceFichaEnMovimiento;

function clickEnFicha(e) {
    let m = getMousePos(e);

    for (let i = 0; i < fichas.length; i++) {
        if (fichas[i].contienePunto(m.x, m.y) && fichas[i].getPlayer() === turnoJugador) {
            if (ultimaFichaPuesta == null || (fichas[i].getPlayer() != ultimaFichaPuesta)) {
                fichaClicked = fichas[i];
                fichaPosXInicial = fichaClicked.getPosX(); 
                fichaPosYInicial = fichaClicked.getPosY(); 
                indiceFichaEnMovimiento = i;
                inicioY = m.y - fichaClicked.y;
                inicioX = m.x - fichaClicked.x;
                click = true; 
                return; 
            }
        }
    }

    click = false;
}

function ponerFicha(e) {
    let m = getMousePos(e);
    let fichaPuesta = false;

    if (fichaClicked != null) {
        for (let i = 0; i < posicionPonerFichas.length; i++) {
            if (posicionPonerFichas[i].contienePunto(m.x, m.y)) {
                if (ultimaFichaPuesta == null || (fichaClicked.getPlayer() != ultimaFichaPuesta)) {
                    let columna = i;
                    const fichaAgregada = board.agregarFicha(columna, fichaClicked.getPlayer());
                    if (fichaAgregada.insertada) {
                        fichasPuestas.push(fichaClicked);
                        ultimaFichaPuesta = fichaClicked.getPlayer();
                        turnoJugador = turnoJugador === 1 ? 2 : 1;
                        animarCaida(fichaClicked, fichaAgregada.fila, columna);
                        fichaClicked = null; 
                        fichaPuesta = true; 
                    } 
                    break; 
                }
            }
        }
        if (!fichaPuesta) {
            fichas[indiceFichaEnMovimiento].setPosX(fichaPosXInicial);
            fichas[indiceFichaEnMovimiento].setPosY(fichaPosYInicial);
            repaint();
        }
    }
    click = false;
}
//ANIMACION DE LA CAIDA DE LA FICHA 
function animarCaida(ficha, filaDestino, columna) {
    const posYInicial = ficha.getPosY();
    const posX = boardx0 + 25 + 50 * columna; 
    const posYFinal = boardy0 + 25 + 50 * filaDestino; 

    const distancia = posYFinal - posYInicial;
    const tiempoAnimacion = 500; 
    let tiempoInicio = null;

    function step(timestamp) {  // Usamos timestamp para una animación más suave
        if (!tiempoInicio) tiempoInicio = timestamp;
        const tiempoTranscurrido = timestamp - tiempoInicio;
        let progreso = tiempoTranscurrido / tiempoAnimacion;

        // Efecto de aceleración (ease-in)
        progreso = progreso < 1 ? progreso * progreso : 1; 

        const nuevaPosY = posYInicial + (distancia * progreso);
        ficha.setPosY(nuevaPosY);
        ficha.setPosX(posX);

        repaint(); 

        if (progreso < 1) {
            requestAnimationFrame(step); 
        } else {
            // La animación ha terminado
            if (board.hayGanador(ficha, filaDestino, columna)) {
                mostrarPopupVictoria(turnoJugador === 2 ? "¡Han ganado los Robots!" : "¡Han ganado los Aliens!");
            }
            mostrarTurno();

            // Elimina la ficha del arreglo al final de la animación
            const index = fichas.indexOf(ficha);
            if (index !== -1) fichas.splice(index, 1);
        }
    }

    requestAnimationFrame(step); 
}

function mostrarPopupVictoria(mensaje) {
    let popup = document.getElementById("victoria-popup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "victoria-popup";
        popup.innerHTML = `
                <div class="popup-content">
                    <h2 id="mensaje-victoria"></h2>
                    <button id="cerrar-popup">Cerrar</button>
                </div>
            `;
        document.body.appendChild(popup);

        document.getElementById("cerrar-popup").addEventListener("click", () => {
            cerrarPopup();
        });
    }

    const mensajeVictoria = document.getElementById("mensaje-victoria");
    mensajeVictoria.textContent = mensaje;

    popup.style.display = "flex"; // <-- Mostrar el popup
    crearFuegosArtificiales(); // Crear fuegos artificiales
}

function cerrarPopup() {
    const popup = document.getElementById("victoria-popup");

    // Eliminar los fuegos artificiales
    const fuegosArtificiales = popup.querySelectorAll(".fuego-artificial");
    fuegosArtificiales.forEach(fuego => fuego.remove());

    // Ocultar el popup completamente
    popup.style.display = "none"; // <-- Ocultar con display: none

    inicializeGame(); // Reiniciar el juego
}


function crearFuegosArtificiales() {
    const popup = document.getElementById("victoria-popup");
    const numFuegos = 20; // Número de fuegos artificiales

    for (let i = 0; i < numFuegos; i++) {
        const fuegoArtificial = document.createElement("div");
        fuegoArtificial.classList.add("fuego-artificial");
        fuegoArtificial.style.left = Math.random() * 100 + "%";
        fuegoArtificial.style.top = Math.random() * 100 + "%";
        fuegoArtificial.style.animationDelay = Math.random() * 2 + "s"; // Retraso aleatorio
        fuegoArtificial.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Color aleatorio
        popup.appendChild(fuegoArtificial);
    }
}

function moverFicha(e) {
    let m = getMousePos(e);
    if (click != false && fichaClicked != null) {
        fichaClicked.setPosX(m.x);
        fichaClicked.setPosY(m.y);
    }
    actualizar();
}

function actualizar() {
    if (click != false && fichaClicked != null) {
        fichaClicked.draw();
        repaint();
    }
}

const tiempoRestante = document.getElementById("tiempo-restante");
let temp;

function temporizador() {
    let minutos = 5;
    let segundos = 0;
    if (!temp) {
        tiempoRestante.textContent = minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
        temp = setInterval(function() {
            if ((minutos == 0) && (segundos == 0)) {
                clearInterval(temp);
                temp = null;
                inicializeGame();
            } else {
                if (segundos === 0) {
                    minutos--;
                    segundos = 59;
                } else {
                    segundos--;
                }
                tiempoRestante.textContent = minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
            }
        }, 1000);
    }
}



