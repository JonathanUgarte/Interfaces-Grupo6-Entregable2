class Slot extends Figure {
    constructor(posX, posY, width, height, fill, context, image) {
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
        this.ficha = new Ficha(this.posX + 25, this.posY + 25, 20, "white", this.context, 0, image);
    }

    setFicha(ficha) {
        this.ficha = ficha;
        this.draw();
    }

    getFicha() {
        return this.ficha;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setPosX(x) {
        this.posX = x;
    }

    setPosY(y) {
        this.posY = y;
    }

    contienePunto(x, y) {
        return ((x >= this.posX && x < (this.posX + this.width))&&(y >= this.posY && y < (this.posY + this.height)));
    }

    draw() {
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        let color = "";
        if (this.ficha.getPlayer() == 0) {
            color = "white";
            const circulo = new Circle(this.posX + 25, this.posY + 25, 20, color, this.context);
            circulo.draw();
        } else {
            if (this.ficha.getPlayer() == 1) {
                const ficha = new Ficha(this.posX+25, this.posY+25, 20, "red", ctx, 1, imagenJugador1);
                ficha.draw();
            } else {
                const ficha = new Ficha(this.posX+25, this.posY+25, 20, "yellow", ctx, 2, imagenJugador2);
                ficha.draw();
            };
        }
    }
}