class Ficha extends Circle {
    constructor(posX, posY, radius, fill, context, player, image) {
        super(posX, posY, radius, fill, context);
        this.player = player;
        this.image = image;
    }

    /*draw() {
        this.context.drawImage(this.image, this.posX-20, this.posY-20, 40, 40);
    }*/

    draw() {
        // Dibujar el borde blanco primero
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, 20, 0, 2 * Math.PI); // Ajustar el radio al tamaño del borde
        this.context.lineWidth = 4; // Grosor del borde blanco
        this.context.strokeStyle = "white";
        this.context.stroke();
        this.context.closePath();
        
        // Dibujar la imagen encima del borde
        this.context.drawImage(this.image, this.posX - 20, this.posY - 20, 40, 40);
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }

    contienePunto(x, y) {
        const distanciaAlCentro = Math.sqrt(Math.pow(x - this.posX, 2) + Math.pow(y - this.posY, 2));
        return distanciaAlCentro <= this.radius;
    }

    delete() {
        this.posX = -100;
        this.posY = -100;
    }
}