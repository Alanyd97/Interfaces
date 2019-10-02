"use strict"
import {Fondo} from "./Fondo.js";
import {Obstaculo} from "./Obstaculo.js";
import {Personaje} from "./Personaje.js";

  
    // URLS
    let zombieURL = "./html/zombie.html";
    let relojURL = "./html/reloj.html";
    let hoverURL = "./html/hover.html";
    let randomURL = "./html/random.html";

    // BOTONES
    let uno = document.getElementById("uno");
    let reglas = document.getElementById("reglas");
    let tres = document.getElementById("tres");
    let cuatro = document.getElementById("cuatro");


    uno.addEventListener("click", function(){
        traerHTML(hoverURL, hover);
        function hover(){
            let div = document.getElementById("hover");
            console.log(div.style.backgroundPositionX+"  "+div.style.backgroundPositionY);
        }
    });

    tres.addEventListener("click", function(){
        traerHTML(relojURL, reloj);
        function reloj(){
        }
    });

    reglas.addEventListener("click", function(){
        traerHTML("./html/reglas.html", some);
        function some(){

        }
    })

    cuatro.addEventListener("click", function(){
        traerHTML(zombieURL, juego);
        function juego(){
            let audio = document.getElementById('audio');
            let choque = document.getElementById('choque');
            function init(){
                audio.style.display= "none";  
                choque.style.display= "none"; 
                audio.volume = 1;
                audio.play();
            }
            init();
            let cielo = new Fondo(document.getElementsByClassName("cielo"), "animacionCielo");

            let sierras = new Fondo(document.getElementsByClassName("sierras"),"animacionSierras");

            let pasto = new Fondo(document.getElementsByClassName("pasto"),"animacionPasto");

            let zombie = new Personaje(document.getElementById("zombie"));
            zombie.caminar();

            document.getElementById("gameover").style.display= "none";
            let cactus = new Obstaculo();
            
            let vidas = 3;
            let enPausa = false;

           let req = requestAnimationFrame(gameover);

            function gameover(){
                if ((zombie.caminando) && (zombie.colision())){
                    vidas--;
                    vida(vidas);
                    setTimeout(function(){requestAnimationFrame(gameover);}, 700);
                    cancelAnimationFrame(req);
                }else{
                    requestAnimationFrame(gameover);
                }
            }
            document.addEventListener("keydown", function(){
                if("KeyW"==event.code){
                    zombie.saltar();    
                    setTimeout(function(){ 
                        if(!(enPausa)){
                            zombie.caminar(); 
                        }
                    }, 900);  
                }else{
                    if("KeyP"==event.code){
                        if(enPausa){
                            pausa(0);
                            audio.play();
                            enPausa=false;
                            if(!(zombie.caminando)){
                                setTimeout(function(){ 
                                        zombie.caminar(); 
                                }, 500);
                            }
                        }else{
                            pausa(1);
                            audio.pause();
                            enPausa = true;
                        }
                    }
                }
            });

            function vida(vida){
                switch (vida) {
                    case 2:
                        document.getElementById("vida2").style.visibility= "hidden" ; break;
                    case 1:
                        document.getElementById("vida1").style.visibility= "hidden" ;break;
                    case 0:
                        choque.play();
                        let div = document.getElementById("vida");
                        div.style.visibility="hidden";
                        audio.pause();
                        desanimar();
                        document.addEventListener("keydown", function(){
                            if(event.keyCode == 13){
                                traerHTML(zombieURL, juego);
                                event.preventDefault();
                            }

                        })
                        break;
                }
            }

            function desanimar(){
                pausar(1);
                zombie.morir();
                document.getElementById("gameover").style.display= "block";
                setTimeout(function(){zombie.pausar(1); alert("Press enter para volver a jugar");}, 1750);
            }
            function pausar(n){
                cielo.pausar(n);
                sierras.pausar(n);
                pasto.pausar(n);
                cactus.pausar(n);
            }
            function pausa(n){
                pausar(n);
                zombie.pausar(n);
            }
            
        }
       

    });


    async function traerHTML(url, someFunction){
        let promesa = await fetch(url);
        if (promesa.ok){
            let respuesta = await promesa.text();
            if (respuesta){
                document.getElementById("container").innerHTML = respuesta;
                someFunction();
            }
        }
    }
    



 
