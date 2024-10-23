class Ficha extends Circle {
    constructor(posX, posY, radius, fill, context, player, image) {
        super(posX, posY, radius, fill, context);
        this.player = player;
        this.image = image;
    }

    draw() {
        this.context.drawImage(this.image, this.posX-20, this.posY-20, 40, 40);
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