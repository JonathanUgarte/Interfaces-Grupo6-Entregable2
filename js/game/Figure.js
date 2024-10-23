class Figure {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.posXInicial = posX;
        this.posYInicial = posY;
    }

    setFill(fill) {
        this.fill = fill;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosY(posY){
        this.posY = posY;

    }

    setPosX(posX){
        this.posX = posX;

    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    setPosition(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    getFill() {
        return this.fill;
    }
    
    getPosXInicial(){
        return this.posXInicial;
    }

    getPosYInicial(){
        return this.posYInicial;
    }


    draw() {
        this.context.fillStyle = this.fill;
    }
}