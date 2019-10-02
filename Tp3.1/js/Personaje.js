
import {Obstaculo} from "./Obstaculo.js";

export class Personaje {
    constructor(some){
        this.char = some;
        this.getChar().classList.add("zombie");
        this.caminando = true;
    }

    getChar(){
        return this.char;
    }
    caminando(){
        return  this.caminando;
    }
    
    saltar(){
        this.caminando=false;
        this.getChar().classList.remove("movimiento");
        this.getChar().classList.remove("posicion");
        this.getChar().classList.add("subir");
    }

    caminar(){
        this.caminando=true;
        this.char.classList.remove("subir");
        this.char.classList.add("posicion");
        this.char.classList.add("movimiento");
    }
    morir(){
        this.char.classList.remove("movimiento");
        this.char.classList.remove("zombie");
        this.getChar().classList.remove("posicion");
        this.char.classList.add("muere");
    }
    
    colision(){
        let zombie = document.getElementById("zombie").getBoundingClientRect();
        let cactus = document.getElementById("obstaculo").getBoundingClientRect();
        return ((cactus.x < zombie.x-20 + zombie.width-20) && (cactus.x + cactus.width > zombie.x) && 
        (cactus.left < zombie.left-20 + zombie.height) && (cactus.height + cactus.left > zombie.left-20));
    }

    pausar(n){
        if (n==0){
            this.getChar().style.webkitAnimationPlayState = "running";
        }else{
            this.getChar().style.webkitAnimationPlayState = "paused";
        }
    }

    

}