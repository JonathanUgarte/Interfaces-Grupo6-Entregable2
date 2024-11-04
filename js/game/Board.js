class Board {
    constructor(matriz, posX, posY, width, height, fill, context, modoDeJuego, image) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.width = width;
        this.height = height;
        this.matriz = matriz;
        this.modoDeJuego = modoDeJuego;
        this.image = image;
        this.blinking = true; // Para controlar el parpadeo de la primera fila
        this.blinkColor = "yellow"; // Color del parpadeo
        this.originalColor = "grey"; // Color original
        this.blinkInterval = null; // Intervalo de parpadeo
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    startBlinking() {
        this.blinkInterval = setInterval(() => {
            this.blinking = !this.blinking;
            this.redraw();
        }, 500); // Cambia cada 500ms
    }

    stopBlinking() {
        if (this.blinkInterval) {
            clearInterval(this.blinkInterval);
            this.blinkInterval = null;
        }
    }

    draw() {
        // Crear la matriz con el nuevo tamaño de slots
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                this.matriz[i][j] = new Slot(
                    this.posX + 50 * j, this.posY + 50 * i, 50, 50,
                    "blue", this.context, this.image
                );
                slots.push(this.matriz[i][j]);
                this.matriz[i][j].draw();
            }
        }

        // Dibujar la fila superior con el nuevo tamaño y parpadeo
        for (let i = 0; i < this.modoDeJuego + 3; i++) {
            const color = this.blinking ? this.blinkColor : this.originalColor;
            const slot = new Slot(
                this.posX + 50 * i, this.posY - 50, 50, 50,
                color, this.context, this.image
            );
            posicionPonerFichas.push(slot);
            slot.draw();
        }

        // Reiniciar el parpadeo para el nuevo tablero
        this.startBlinking();
    }


    redraw() {
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                this.matriz[i][j].draw();
            }
        }

        for (let i = 0; i < this.modoDeJuego + 3; i++) {
            const color = this.blinking ? this.blinkColor : this.originalColor;
            posicionPonerFichas[i].fill = color;
            posicionPonerFichas[i].draw();
        }
    }

    limpiarTablero(nuevoModoDeJuego) {
        // Detener el parpadeo de la fila superior
        this.stopBlinking();

        // Actualizar el modo de juego
        this.modoDeJuego = nuevoModoDeJuego;

        // Limpiar la matriz y la lista de slots para la fila superior
        this.matriz = Array.from({ length: 6 }, () => Array(this.modoDeJuego + 3).fill(null));
        posicionPonerFichas = [];

        // Vaciar el tablero visualmente
        this.context.clearRect(0, 0, this.width, this.height);

        // Redibujar el tablero completo con el nuevo modo de juego
        this.draw();
    }

    agregarFicha(columna, player) {
        if (columna < this.modoDeJuego + 3 && (player === 1 || player === 2)) {
            const ficha = new Ficha(
                this.posX + 30 + 60 * columna, this.posY + 30 + 60 * 5,
                20, "", this.context, player, this.image
            );
            if (this.matriz[0][columna].getFicha().getPlayer() === 0) {
                let fila = this.buscarFilaLibre(columna);
                this.matriz[fila][columna].setFicha(ficha);
                return { insertada: true, fila };
            } else {
                return { insertada: false, fila: -1 };
            }
        }
    }

    buscarFilaLibre(columna) {
        let ultimaFilaLibre = 0;
        for (let i = 0; i < this.modoDeJuego + 2; i++) {
            if (this.matriz[i][columna].getFicha().getPlayer() === 0) {
                ultimaFilaLibre = i;
            }
        }
        return ultimaFilaLibre;
    }

    hayGanador(ultimaFichaPuesta, fila, columna) {
        return (
            this.checkeoHorizontal(ultimaFichaPuesta, fila, columna) ||
            this.checkeoVertical(ultimaFichaPuesta, fila, columna) ||
            this.checkeoDiagonales(ultimaFichaPuesta, fila, columna)
        );
    }



    //CHEQUEO HORIZONTAL
    
    checkeoHorizontal(ultimaFichaPuesta, fila, columna) {
        let fichasEnLinea = this.checkeoIzquierda(ultimaFichaPuesta, fila, columna);
        if (fichasEnLinea == this.modoDeJuego) return true;
        else {
            if ((this.matriz[fila][columna+1] != null) && (this.matriz[fila][columna+1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
                if ((fichasEnLinea + this.checkeoDerecha(this.matriz[fila][columna+1].getFicha(), fila, columna+1)) >= this.modoDeJuego) return true;
            }
        }
        return false;
    }

    checkeoIzquierda(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila][columna-1] != null) && (this.matriz[fila][columna-1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila][columna-1] != null) {
                return this.checkeoIzquierda(this.matriz[fila][columna-1].getFicha(), fila, columna-1) + 1;
            } else return 1;
        } else return 1;
    }

    checkeoDerecha(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila][columna+1] != null) && (this.matriz[fila][columna+1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila][columna+1] != null) {
                return this.checkeoDerecha(this.matriz[fila][columna+1].getFicha(), fila, columna+1) + 1;
            } else return 1;
        } else return 1;
    }

    //CHEQUEO VERTICAL
    checkeoVertical(ultimaFichaPuesta, fila, columna) {
        let fichasEnLinea = this.checkeoAbajo(ultimaFichaPuesta, fila, columna);
        return (fichasEnLinea == this.modoDeJuego)
    }

    checkeoAbajo(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila+1] != null) && (this.matriz[fila+1][columna].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila+1][columna] != null) {
                return this.checkeoAbajo(this.matriz[fila+1][columna].getFicha(), fila+1, columna) + 1;
            } else return 1;
        } else return 1;
    }

    //CHEQUEO DIAGONALES
    checkeoDiagonales(ultimaFichaPuesta, fila, columna) {
        let fichasEnLinea = this.checkeoArribaIzquierda(ultimaFichaPuesta, fila, columna);
        if (fichasEnLinea == this.modoDeJuego) return true;
        else {
            if ((this.matriz[fila+1] != null) && (this.matriz[fila+1][columna+1] != null) && (this.matriz[fila+1][columna+1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
                if ((fichasEnLinea + this.checkeoAbajoDerecha(this.matriz[fila+1][columna+1].getFicha(), fila+1, columna+1)) >= this.modoDeJuego) return true;
            }
        }
        fichasEnLinea = this.checkeoArribaDerecha(ultimaFichaPuesta, fila, columna);
        if (fichasEnLinea == this.modoDeJuego) return true;
        else {
            if ((this.matriz[fila+1] != null) && (this.matriz[fila+1][columna-1] != null) && (this.matriz[fila+1][columna-1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
                if ((fichasEnLinea + this.checkeoAbajoIzquierda(this.matriz[fila+1][columna-1].getFicha(), fila+1, columna-1)) >= this.modoDeJuego) return true;
            }
        }
        return false;
    }

    checkeoArribaIzquierda(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila-1] != null) && (this.matriz[fila-1][columna-1] != null) && (this.matriz[fila-1][columna-1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila-1][columna-1] != null) {
                return this.checkeoArribaIzquierda(this.matriz[fila-1][columna-1].getFicha(), fila-1, columna-1) + 1;
            } else return 1;
        } else return 1;
    }

    checkeoAbajoDerecha(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila+1] != null) && (this.matriz[fila+1][columna+1] != null) && (this.matriz[fila+1][columna+1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila+1][columna+1] != null) {
                return this.checkeoAbajoDerecha(this.matriz[fila+1][columna+1].getFicha(), fila+1, columna+1) + 1;
            } else return 1;
        } else return 1;
    }

    checkeoArribaDerecha(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila-1] != null) && (this.matriz[fila-1][columna+1] != null) && (this.matriz[fila-1][columna+1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila-1][columna+1] != null) {
                return this.checkeoArribaDerecha(this.matriz[fila-1][columna+1].getFicha(), fila-1, columna+1) + 1;
            } else return 1;
        } else return 1;
    }

    checkeoAbajoIzquierda(ultimaFichaPuesta, fila, columna) {
        if ((this.matriz[fila+1] != null) && (this.matriz[fila+1][columna-1] != null) && (this.matriz[fila+1][columna-1].getFicha().getPlayer() == ultimaFichaPuesta.getPlayer())) {
            if (this.matriz[fila+1][columna-1] != null) {
                return this.checkeoAbajoIzquierda(this.matriz[fila+1][columna-1].getFicha(), fila+1, columna-1) + 1;
            } else return 1;
        } else return 1;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    
}