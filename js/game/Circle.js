class Circle extends Figure {
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        const fillAnterior = this.fill;
        this.setFill("black");
        this.context.stroke();
        this.context.closePath();
        this.setFill(fillAnterior);
    }

    getRadius() {
        return this.radius;
    }
}