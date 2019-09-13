export class Circulo {

    constructor(x, y, r, c, context) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.ctx = context;
    }
    gety(){return this.y;}
    getx(){return this.x;}
    getRadio(){return this.r}
    setColor(color){
        this.c = color;
    }

    setCoor(a, b){
        this.x = this.getx() + a;
        this.y = this.gety() + b;
    }
    

    dibujar(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.c;
        this.ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
        this.ctx.fill();
        this.ctx.closePath();
    }

    uneCirculos(x, y){
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#ffff00";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
    
    soyClick(x, y){
        var dx = Math.abs(x-this.getx());
        var dy = Math.abs(y-this.gety());
        var distancia = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return (distancia <= this.getRadio());
    }
    soyRojo(){
        return this.getRadio() == 10;
    }

}