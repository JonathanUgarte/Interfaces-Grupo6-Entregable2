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
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    draw() {
        // Dibujar la cuadrícula principal
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                this.matriz[i][j] = new Slot(boardx0 + 50 * j, boardy0 + 50 * i, 50, 50, "blue", ctx, this.image);
                slots.push(this.matriz[i][j]);
                this.matriz[i][j].draw();
            }
        }
    
        // Dibujar la fila superior con ranuras grises
        for (let i = 0; i < this.modoDeJuego + 3; i++) {
            const slot = new Slot(boardx0 + 50 * i, boardy0 - 50, 50, 50, "grey", ctx, this.image);
            posicionPonerFichas.push(slot);
            slot.draw();
        }
    
        // Añadir animación de parpadeo a la fila superior
      
        
        for (let i = 0; i < this.modoDeJuego+3; i++) {
            const slot = new Slot(boardx0 + 50*i, boardy0 - 50, 50, 50, "grey", ctx, this.image);
            posicionPonerFichas.push(slot);
            slot.draw();
            this.startBlinking();
        }
<<<<<<< HEAD
      
       
    }

    startBlinking() {
        // Detener cualquier intervalo existente
        clearInterval(this.blinkInterval);
        this.blinkState = true; // Reinicia el estado del parpadeo

        // Iniciar un nuevo intervalo para el parpadeo
        this.blinkInterval = setInterval(() => {
            // Alternar color de la fila superior
            const color = this.blinkState ? "green" : "grey"; // Color alternante
            this.posicionPonerFichas.forEach(slot => {
                slot.color = color; // Cambia el color del slot
                slot.draw(); // Redibuja el slot
            });
            this.blinkState = !this.blinkState; // Cambia el estado para la siguiente iteración
        }, 100); // Cambia cada 500 ms
    }
    
    
=======
        this.animateTopRowBorder();
    }

>>>>>>> 25dc89313919496ea3ecf7db2e76a23fcba51152
    redraw(){
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                this.matriz[i][j].draw();
            }
        }
        for (let i = 0; i < this.modoDeJuego+3; i++) {
            posicionPonerFichas[i].draw();
        }
        
<<<<<<< HEAD
=======
    }
    animateTopRowBorder() {
        let hue = 180; // Empieza en el rango de tonos de azul (180-240)
        
        const animateBorder = () => {
            // Obtiene el primer y último slot para determinar las posiciones de los bordes exteriores
            const firstSlot = posicionPonerFichas[0];
            const lastSlot = posicionPonerFichas[posicionPonerFichas.length - 1];
            
            // Calcula las coordenadas del borde exterior
            const startX = firstSlot.posX; // Coordenada X del borde izquierdo
            const startY = firstSlot.posY; // Coordenada Y del borde superior
            const totalWidth = (lastSlot.posX + lastSlot.width) - firstSlot.posX; // Ancho total de la fila
            const totalHeight = firstSlot.height; // Altura de los slots, usada como altura del contorno
    
            // Configuración del estilo de borde
            firstSlot.context.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Cambia el color del borde
            firstSlot.context.lineWidth = 2; // Ajusta el grosor del borde
    
            // Dibuja un rectángulo alrededor de toda la fila
            firstSlot.context.strokeRect(startX, startY, totalWidth, totalHeight);
    
            // Cambia el tono de azul para dar el efecto de animacion
            hue += 0.2;
            if (hue > 240) hue = 180; // Reinicia el tono cuando excede el rango de azul
    
            // Llama a la función de nuevo en el siguiente cuadro de animacion
            requestAnimationFrame(animateBorder);
        };
    
        animateBorder(); // Inicia la animacion
>>>>>>> 25dc89313919496ea3ecf7db2e76a23fcba51152
    }

    //Funcion agregar ficha
    agregarFicha(columna, player) {
        if ((columna < this.modoDeJuego+3) && (player == 1 || player == 2)) {
            const ficha = new Ficha(this.posX+30+60*columna,this.posY+30+60*5,20,"",this.context, player, this.image);
            if (this.matriz[0][columna].getFicha().getPlayer() == 0) {
                let fila = this.buscarFilaLibre(columna);
                this.matriz[fila][columna].setFicha(ficha);
                return {
                    insertada: true,
                    fila: fila
                };
            }
            else return {
                insertada: false,
                fila: -1
            };
        }
    }

    buscarFilaLibre(columna) {
        let ultimaFilaLibre = 0;
        for (let i = 0; i < this.modoDeJuego+2; i++) {
            if (this.matriz[i][columna].getFicha().getPlayer() == 0) {
                ultimaFilaLibre = i;
            }
        }
        return ultimaFilaLibre;
    }
     //CHEQUEOS PARA DETECTAR GANADOR
    hayGanador(ultimaFichaPuesta, fila, columna) {
        if ((this.checkeoHorizontal(ultimaFichaPuesta, fila, columna)) || (this.checkeoVertical(ultimaFichaPuesta, fila, columna)) || (this.checkeoDiagonales(ultimaFichaPuesta, fila, columna))) return true;
        else return false;
    }

   
    
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