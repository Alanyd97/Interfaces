"use strict"
import {Circulo} from "./Circulo.js";
import {Poligono} from "./Poligono.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let HEIGHT = canvas.heigth;
let WIDTH = canvas.width;
let figActual = null;
let newFigura = true;
let reDibujar = false;
let clickRojo = false;
let figuras = [];
var figura = new Poligono(ctx);

canvas.addEventListener("click", function(e){ 
    event.preventDefault();
    event.stopPropagation();
    if (newFigura){
        var cir = new Circulo(event.layerX, event.layerY, 10, '#ff0000', ctx);
        figura.agregarCirculo(cir);
        figura.buscaCirculo(cir).dibujar();
    }
});

 let btnCerrar = document.getElementById("cerrarFigura").addEventListener("click", function(){
        if (figura.getCir().length > 1){
            figura.creaFigura();
            figuras.push(figura);
            figura = new Poligono(ctx);
            newFigura = false;
        }
});

let nueva = document.getElementById("creaFigura").addEventListener("click", function(){
    newFigura = true;
})


canvas.addEventListener("mousedown", function(e){
    var x = event.layerX;
    var y = event.layerY;
        for (let i = 0; i < figuras.length; i++) {
            reDibujar = (figuras[i].clickVerde(x, y));
            clickRojo = figuras[i].clickRojo(x, y);
            if ((reDibujar) || (clickRojo>=0)){
                figActual = figuras[i]; 
                figuras.splice(i, 1);
            }
            else{
                if(i == figuras.length){
                    figActual = null;
                    reDibujar = false;
                    clickRojo = false;
                }
            }
        }
});
canvas.addEventListener("mousemove", function(e){
    if (figActual != null){
        var x = event.layerX;
        var y = event.layerY;
        if (clickRojo>=0){
            let xRojo = figActual.clickRojo(x, y);
            figActual.moverCirculo(figActual.diferenciaX(x, xRojo), figActual.diferenciaY(y, xRojo), xRojo);
            clean();
            figActual.dibujaFigura();
            actualizar();
        }else{
            if (reDibujar){ 
                clean();
                figActual.moverFigura(figActual.diferenciaX(x, figActual.getCirVerde()), figActual.diferenciaY(y, figActual.getCirVerde())); 
                actualizar();
            }
        }
        
         
    }
}); 
function clean(){
    ctx.clearRect(0, 0, 900, 400);
}
function actualizar(){
    for (let i = 0; i < figuras.length; i++) {
        figuras[i].dibujaFigura();
    }
}
 
canvas.addEventListener("mouseup", function(){
    event.preventDefault();
    event.stopPropagation();
    if (figActual != null){
        figuras.push(figActual);
        figura = new Poligono(ctx);
        figActual = null;
    }
});
canvas.addEventListener("dblclick", function(){
    var x = event.layerX;
    var y = event.layerY;
    if (figActual){
        for (let i = 0; i < figuras.length; i++) {
            clickRojo = figuras[i].clickRojo(x, y);
            if (clickRojo>=0){
                figActual = figuras[i]; 
                figuras.splice(i, 1);
            }
            else{
                if(i == figuras.length){
                    figActual = null;
                    clickRojo = false;
                }
            }
        }
        figActual.borrarCirculo(clickRojo);
        clean();
        figuras.push(figActual);
        actualizar();
    }
        

});
document.addEventListener("keydown", function(){
    if (event.code == 'KeyC'){
        canvas.addEventListener("wheel", function () { 
            event.preventDefault();
            for (let i = 0; i < figuras.length; i++) {
                figuras[i].setColor(event.deltaY); 
                clean(); 
                actualizar();
            }
        });
    }else{
      
                
    }
});

document.getElementById("clean").addEventListener("click", function(){
    clean();
    figuras = [];
    figura = new Poligono(ctx);
    figActual = null;
    newFigura = true;
    alert("Se limpio correctamente");
});






