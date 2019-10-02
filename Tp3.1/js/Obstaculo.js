export class Obstaculo{
   constructor(){
      this.obstaculo = document.getElementById("obstaculo");
   }

   getDis(){
      return document.getElementById("obstaculo");
   }
   pausar(n){
      if (n==0){
         this.getDis().style.webkitAnimationPlayState = "running";
      }else{
         this.getDis().style.webkitAnimationPlayState = "paused";
      }
   }

}