export class Fondo {
    constructor(funcion, s){   
        this.div = funcion;
        this.getDiv().classList.add(s);
    }
    
    getDiv(){
        return this.div[0];
    }
    pausar(n){
        if (n==0){
            this.getDiv().style.webkitAnimationPlayState = "running";
        }else{
            this.getDiv().style.webkitAnimationPlayState = "paused";
        }
    }
}