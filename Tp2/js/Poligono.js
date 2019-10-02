
import {Circulo} from "./Circulo.js";

 export class Poligono{
    constructor(z){
        this.ctx = z;
        this.arrCirculos = [];
        this.brillo = 50;
    }

    creaFigura(){
        this.cerrar(0, this.arrCirculos.length-1);
        this.centroVerde();
    }

    cerrar(a, b){
        this.arrCirculos[a].uneCirculos(this.arrCirculos[b].getx(), this.arrCirculos[b].gety());
    }

    agregarCirculo(circulo){
        this.arrCirculos.push(circulo);
        if (this.arrCirculos.length >= 2)
            this.arrCirculos[this.arrCirculos.length-2].uneCirculos(circulo.getx(), circulo.gety());
    }

    getCir(){return this.arrCirculos;}

    getCirVerde(){ return this.arrCirculos.length-1;}

    circuloIgual(circulo, i){
        return (circulo.getx() == this.arrCirculos[i].getx()) && circulo.getx() == this.arrCirculos[i].getx();
    }

    centroVerde(){
        let cir = new Circulo(this.xCentro(), this.yCentro(), 7, "#39ff14", this.ctx);
        cir.dibujar();
        this.arrCirculos.push(cir);
    }

    yCentro(){
        let suma = 0;
        for (var i = 0; i < this.arrCirculos.length; i++) {
            suma = suma + this.arrCirculos[i].gety();
        }
        return suma/i;
    }
    xCentro(){
        let suma = 0;
        for (var i = 0; i < this.arrCirculos.length; i++) {
            suma = suma + this.arrCirculos[i].getx();
        }return suma/i;
         
    }
    
    dibujaFigura(){
        for (let i = 0; i < this.arrCirculos.length; i++) {
            this.arrCirculos[i].dibujar();
        }this.uneFigura();
    }

    buscaCirculo(circulo){
        for (let i = 0; i < this.arrCirculos.length; i++) {
            if (this.circuloIgual(circulo, i)){
                return this.arrCirculos[i]; 
            }
        }
    }
    
    moverFigura(x, y){
        if (this.arrCirculos.length){
            for (let i = 0; i < this.arrCirculos.length-1; i++) {
                this.moverPunto(x, y, i);
            }
           this.moverPunto(x, y, this.getCirVerde());
           this.uneFigura();
        }
    }
    moverCirculo(x, y, i){
        this.moverPunto(x, y, i);
        this.arrCirculos.pop();
        this.centroVerde();
    }

    moverPunto(x, y, i){
        this.arrCirculos[i].setCoor(x, y);
        this.arrCirculos[i].dibujar();
    }

    uneFigura(){
        for (let i = 0; i < this.arrCirculos.length-1; i++) {
            if ((this.arrCirculos[i].soyRojo()) && (this.arrCirculos[i+1].soyRojo()))
                this.cerrar(i, i+1);
            else    
                if(! (this.arrCirculos[i+1].soyRojo()))
                    this.cerrar(0, i);
        }
    }

    clickRojo(x, y){
        for (let i = 0; i < this.arrCirculos.length-1; i++) {
            if (this.arrCirculos[i].soyClick(x, y)) {
                return i; 
            }
        }
    }
    clickVerde(x, y){
        return this.arrCirculos[this.getCirVerde()].soyClick(x, y);
    }
    
    diferenciaX(a, pos){
        if (this.arrCirculos.length)
            return a - this.arrCirculos[pos].getx();
    }
    diferenciaY(a, pos){
        if (this.arrCirculos.length)
            return a - this.arrCirculos[pos].gety();
    }

    borrarCirculo(a){
        if (this.arrCirculos.length>4){
            this.arrCirculos.splice(a, 1);
            this.arrCirculos.splice(this.getCirVerde(), 1);
            this.centroVerde();
        }
    }

    setColor(valor){
        if (this.arrCirculos.length > 1) {
            if (valor > 0){
            this.brillo += -0.03;
            }else{
            this.brillo += 0.03;
            }
            for (var i= 0 ; i<this.arrCirculos.length-1; i++){
            this.arrCirculos[i].setColor("hsl(0, 100%, "+this.brillo+"%)");
            }
        }
    }
    
}