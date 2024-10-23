const canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

//SELECCION DE PERSONAJES
let robots = document.querySelectorAll(".robots");
let aliens = document.querySelectorAll(".aliens");
let jugadores = document.querySelectorAll(".jugadores");

var imagenJugador1 = document.getElementById("robot-1");
var imagenJugador2 = document.getElementById("alien-1");

for(let jugador of jugadores) {
    jugador.addEventListener("click", () => {
        if (jugador.classList.contains("robots")) {
            for(let robot of robots) {
                robot.classList.remove("selected");
            }
            jugador.classList.add("selected");
            imagenJugador1 = document.getElementById(jugador.id);
        }
        if (jugador.classList.contains("aliens")) {
            for(let alien of aliens) {
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

for(let formato of formatos) {
    formato.addEventListener("click", () => {
        for(let formato of formatos) {
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

document.getElementById("btn-jugar").addEventListener("click", ()=>{

    setTimeout(a, 1000);
    function a(){
        canvas.classList.remove("esconder");
        containerJuego.classList.add('esconder');
        containerJuego.classList.remove("container-juego")
        primerPantalla.classList.add('esconder');
        btnMenu.classList.remove("esconder");
        timer.classList.remove('esconder');
        minutos = 5;
        segundos =0;       temporizador();
        inicializeGame();
    }
})

//CAMBIO DE CANVAS A DIV
let btnMenu = document.getElementById("btn-menu");

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

function inicializeGame() {
    //SETEO VARIABLES
    cantFichasTotal = (modoDeJuego+3)*(modoDeJuego+2);

    boardW = (modoDeJuego+3)*50;
    boardH = (modoDeJuego+2)*50;

    boardx0 = canvasW/2 - boardW/2;
    boardy0 = canvasH/2 - boardH/2 + 25;

    filas = modoDeJuego+2;
    columnas = modoDeJuego+3;

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

    var image = document.getElementById("travellers-1");

    board = new Board(tablero, boardx0,boardy0,boardW,boardH,"blue",ctx, modoDeJuego, image);

    pintarFondo();
    
    board.draw();
    
    //pinta fichas jugador 1

    let fichaPosY = 505;
    for (let i = 0; i < cantFichasTotal/2; i++) {
        let fichaPosX = 30;
        fichaPosY = fichaPosY - 10;
        const ficha = new Ficha(fichaPosX, fichaPosY, 20, "red", ctx, 1, imagenJugador1);
        fichas.push(ficha);
        ficha.draw();
    }
    
    //pinta fichas jugador 2

    fichaPosY = 505;
    for (let i = 0; i < cantFichasTotal/2; i++) {
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

function pintarFondo(){
    let img = document.querySelector("#fondo-canvas")
    let imgFondo = ctx.createPattern(img, null);
    ctx.rect(0, 0, canvasW, canvasW);
    ctx.fillStyle = imgFondo;
    ctx.fill();
}

function repaint() {
    ctx.clearRect(0,0,canvasW,canvasH);
    pintarFondo();
    board.redraw();
    for(let i = 0; i < fichas.length; i++) {
        if (fichas[i].getPlayer() == 1) fichas[i].setFill("red");
        else fichas[i].setFill("yellow");
        fichas[i].draw();
    }
    
}

function getMousePos(event){
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
        if (fichas[i].contienePunto(m.x ,m.y)) {
            if(ultimaFichaPuesta == null || (fichas[i].getPlayer() != ultimaFichaPuesta)){
                fichaClicked = fichas[i];
                fichax0 = fichaClicked.getPosX();
                fichay0 = fichaClicked.getPosY();
                indiceFichaEnMovimiento = i;
                inicioY = m.y - fichaClicked.y;
                inicioX = m.x - fichaClicked.x;
            }
        }
    }
    click = true; 
}

function ponerFicha(e) {
    let m = getMousePos(e);
    if (fichaClicked != null) {
        for (let i = 0; (i < posicionPonerFichas.length); i++) {
            if (posicionPonerFichas[i].contienePunto(m.x,m.y)) {
                if(ultimaFichaPuesta == null || (fichaClicked.getPlayer() != ultimaFichaPuesta)){
                    //agrega la ficha al board
                    let columna = i;
                    const fichaAgregada = board.agregarFicha(columna, fichaClicked.getPlayer());
                    if (fichaAgregada.insertada) {
                        //agrega las fichas clickeadas al arreglo de fichas ya puestas en el board
                        fichasPuestas.push(fichaClicked);
                        //setea la ultimaficha puesta en el board
                        ultimaFichaPuesta = fichasPuestas[fichasPuestas.length-1].getPlayer(); 
                        //checkea si hay ganador
                        if (board.hayGanador(fichaClicked, fichaAgregada.fila, columna)){ 
                            if (fichaClicked.getPlayer() == 1) {
                                alert ("¡Han ganado los Viajeros!");
                            } else {
                                alert("¡Han ganado los Invasores!");
                            }
                        }
                        //toma la posicion la ficha en el arreglo de fichas generales
                        let p = fichas.indexOf(fichaClicked);
                        //borra del arreglo de fichas generales la ficha puesta
                        fichas.splice(p,1);
                    } else break;
                }
                
                //setea en null y queda lista para ser clickeada la proxima ficha
                repaint();
                fichaClicked = null;
                break;
            }
        }
        if (fichaClicked != null) {
            fichas[indiceFichaEnMovimiento].setPosX(fichax0);
            fichas[indiceFichaEnMovimiento].setPosY(fichay0);
            repaint();
            fichaClicked = null;
        }
    }
    click = false;
}

function moverFicha(e){
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
        temp = setInterval(function () {
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