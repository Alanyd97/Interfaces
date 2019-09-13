
    let urlUyD = "html/ejercicio12.html";
    let urlTyC = "html/ejercicio34.html";
    let urlCyS = "html/ejercicio56.html";
    let box = document.getElementById("box");
    cargaInterfaz(urlUyD, ejercicio1, ejercicio2);
    
    let unoDos = document.getElementById("unoDos").addEventListener("click", function() {
        cargaInterfaz(urlUyD, ejercicio1, ejercicio2);
    })

    let tresCuatro = document.getElementById("tresCuatro").addEventListener("click", function(){
        cargaInterfaz(urlTyC, ejercicio3, ejercicio4);
    });

    let cinSeis = document.getElementById("cinSeis").addEventListener("click", function(){
        cargaInterfaz(urlCyS, ejercicio5, ejercicio6);
    });

    async function cargaInterfaz(someUrl, funcion1, funcion2) {
        try {
            let promesa = await fetch(someUrl);
            if (promesa.ok){
                let respuesta = await promesa.text();
                if (respuesta){
                    box.innerHTML = respuesta;
                    funcion1();
                    funcion2();

                }
            }
        } catch (error) {
            console.log(error);
            box.innerHTML = "<h1>Error - Conection Failed!</h1>";
        }
        
    }



function ejercicio6(){
    let c = document.querySelector(".canvas2");
    let ctx = c.getContext('2d');
    let img = new Image();
    let imageData;
    img.crossOrigin = "Anonymous";
    botonColores(selecImagen);         

    function selecImagen(color){
        switch (color) {
            case  "#ff0000":
                img.src = "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
                break;
            case  "#0000ff":
                img.src = "https://images.unsplash.com/photo-1535370976884-f4376736ab06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
                break;
            case  "#ffff00":
                    img.src = "http://images.pexels.com/photos/1040626/pexels-photo-1040626.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
                break;
        }
        
        img.onload = function () {
            myDrawImageMethod(this);
            imageData = ctx.getImageData(0,0,c.width,c.height);
            ctx.putImageData(imageData,0,0);
        }

        let but = document.getElementById("but").addEventListener("click", function(){
            filtroGris(imageData);
            ctx.putImageData(imageData,0,0);

        });
    }
    function filtroGris(imageData){
        for (let i=0; i<c.width; i++){
            for(let j=0;j<c.height;j++){
                let r =getRed(imageData,i,j);
                let g = getGreen(imageData,i,j);
                let b = getBlue(imageData,i,j);
                let f = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                setPixel(imageData,i,j,f,f,f);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function setPixel(imageData, x, y, r, g, b){
        let index= (x+y*imageData.width)*4;
        imageData.data[index+0]=r;
        imageData.data[index+1]=g;
        imageData.data[index+2]=b;
    }

    function myDrawImageMethod(img){
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        ctx.drawImage(img, 0,0);
    }

    function getRed(imageData,x,y){
        return imageData.data[(x+y*imageData.width)*4+0];
    }

    function getGreen(imageData,x,y){
        return imageData.data[(x+y*imageData.width)*4+1];
    }

    function getBlue(imageData,x,y){
        return imageData.data[(x+y*imageData.width)*4+2];
    }
}


function ejercicio5(){
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    let imageData = ctx.createImageData(c.width, c.height*2);
    let height = imageData.height;
    let width = imageData.width;
    let alt = width/2;
    let r, g;
    let b = 0;
    
    botonColores2(segundoColor);

    function segundoColor(color){ 
        for(let i = 0; i <= alt; i++){
            for(let j=0; j <= height; j++){
                r=(i/alt)*255;
                g=(i/alt)*255;
                setPixel(imageData, i, j, r, g, b, 255);
            }
        }
        switch (color) {
            case "#ff0000":
                colorMitad(0);
                break;
            case "#ffff00":
                colorMitad(1);
                break;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function colorMitad(num){
        switch (num) {
            case 0:
                for(let i = alt; i < width; i++){ 
                    g=(1-((i-alt)/alt))*255;
                    for(let j = 0; j < height; j++){
                        setPixel(imageData, i, j, r, g, 0, 255);
                    }
                }break;
                
            case 1:
                for(let i = alt; i < width; i++){ 
                    r=(1-((i-alt)/alt))*255;
                    for(let j = 0; j < height; j++){
                        setPixel(imageData, i, j, r, g, 0, 255);
                    }
                }break;
        }
    }

    function setPixel(imageData, x, y, r, g, b, a){
        let index= (x+y*imageData.width)*4;
        imageData.data[index+0]=r;
        imageData.data[index+1]=g;
        imageData.data[index+2]=b;
        imageData.data[index+3]=a;
    }
} 

function ejercicio4(){
    let c = document.getElementById("canvasGradiente");
    let h = c.height;
    let w = c.width;
    let ctx = c.getContext("2d");
    let imageData = ctx.createImageData(w, h);
    let pintar = document.getElementById("pintar").addEventListener("click", function(){
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                let color = (j/h)*255;
                setPixel(imageData, i, j, color);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    });
    

    function setPixel(image, x, y, color){
        let index = (x+y*image.width)*4;
        image.data[index+0] = color;
        image.data[index+1] = color;
        image.data[index+2] = color;
        image.data[index+3] = 255;
    }

}

function ejercicio3() {
    let c = document.getElementById("canvas");
    let height = c.height;
    let width = c.width;
    let ctx = c.getContext("2d");
    let imageData = ctx.createImageData(width, height);
    botonColores(colorPixel);

    function colorPixel(color){
        switch (color) {
            case  "#ff0000":
                setPixel(imageData, 255, 0, 0, 255);
                break;
            case  "#0000ff":
                setPixel(imageData, 0, 0, 255, 255);
                break;
            case  "#ffff00":
                setPixel(imageData, 255, 255, 0, 255);
                break;
        }
    }
    function setPixel(image, r, g, b, a){
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let index = (i+j*width)*4;
                image.data[index+0] = r;
                image.data[index+1] = g;
                image.data[index+2] = b;
                image.data[index+3] = a; 
            }
        }
    ctx.putImageData(imageData, 0, 0);
    }  
}

function ejercicio2(){
    let ejercicio2 = document.getElementById("ejercicio2");
    ejercicio2.addEventListener("click", function(){
        botonColores(ejer2);
        function ejer2(color){
            let c = document.getElementById("canvas");
            let height = c.height;
            let width = c.width;
            let ctx = c.getContext("2d");
            ctx.fillStyle = color;
            //parametros (x,y, ancho, alto)
            ctx.fillRect(0, 0, width, height);
        }
    });
}

function ejercicio1(){
    let matrizImp = false;
    let tabla = document.getElementById("tabla");
    tabla.addEventListener("click", function(){
        let fila = 5;
        let columna = 5;
        let matriz = [];
        let tBody = document.getElementById("tCuerpo");//trae del DOM el tCuerpo
        let pResult = document.getElementById("resultado");
        domMatriz();
        
        
        let puntoA = document.getElementById("puntoA")
        puntoA.addEventListener("click", function(){
            removeChild();
            let n = matriz[0][0]; //auxiliar de guardado del n a buscar
            for (let i = 0; i < fila; i++) {
                n = buscarNFila(i, n, matriz);
            }
            pResult.innerHTML = "El mayor de toda la matriz es: "+n;

        });

        let puntoB = document.getElementById("puntoB");
        puntoB.addEventListener("click", function(){
            while (pResult.lastChild){
                removeChild();
            }
            buscaSegun(matriz);
            function buscaSegun(mat){
                let n=mat[0][0];
                for (let i = 0; i < fila; i++) {
                    let ul = document.createElement('ul');
                    let n=mat[i][0];
                    if(i%2==0){
                    let txt = document.createTextNode("Mayor de la fila "+i+":   "+buscarNFila(i, n, mat));
                    ul = creaLista(ul, txt)
                    }else{
                        let txt = document.createTextNode("Menor de la fila "+i+":   "+buscarNFilaMenor(i, n, mat));
                        ul = creaLista(ul, txt);
                    }
                    pResult.appendChild(ul);
                }
            }

        });

        let puntoC = document.getElementById("puntoC");
        puntoC.addEventListener("click", function(){
            while (pResult.lastChild){removeChild();}
            let arr = [];
            let ul = document.createElement('ul');
            for (let i = 0; i < matriz.length; i++) {
                arr[i] = promedioFila(i, 0, matriz);
                let txt = document.createTextNode("Resultado por fila  "+i+":   "+arr[i]);
                ul = creaLista(ul, txt);
            }
            pResult.appendChild(ul);
            function promedioFila(a, n, mat){
                for (let z = 0; z < columna; z++){
                    n = n + mat[a][z];
                }return n/fila;
            }

        });

        let reCarga = document.getElementById("recargar");
        reCarga.addEventListener("click", function(){
            while(tBody.lastChild){
                tBody.removeChild(tBody.lastChild);
                removeChild();
            }
            matriz = [];
            matrizImp = false;
            domMatriz();

        })
        
        
        function domMatriz(){
            if (!matrizImp){
                llenarMatriz(matriz);
                imprimeMatriz(matriz);
                matrizImp = true;
            }
        }
        function creaLista(ul, txt){
            let li = document.createElement('li');
            li.appendChild(txt); 
            ul.appendChild(li);
            return ul;
        }

        function buscarNFila(a, n, mat){
            for (let z = 0; z < columna; z++){
                if (n<mat[a][z]){
                    n=mat[a][z];
                }
            }return n;
        }
        function buscarNFilaMenor(a, n, mat){
            for (let z = 0; z < columna; z++){
                if (n>mat[a][z]){
                    n=mat[a][z];
                }
            }return n;
        }

        function llenarMatriz(mat){
            for (let m = 0; m < fila; m++) {
                mat[m] = [];
                for (let n = 0; n < columna; n++) {
                    mat[m][n] = Math.floor(Math.random() * 101);
                }
            }
        }

        function imprimeMatriz(mat){
            for (let m = 0; m < fila; m++) {
                let row = document.createElement("tr");
                let col;
                for (let n = 0; n < columna; n++) {
                    col = document.createElement("td");
                    let txtCol = document.createTextNode(mat[m][n]);
                    col.appendChild(txtCol);
                    row.appendChild(col);
                }
                
                tBody.appendChild(row);
            }
        }

        function removeChild(){
            if (pResult.lastChild) {
                pResult.removeChild(pResult.lastChild);
            }
        }
});

}

function botonColores(someFunction){
    let rojo = document.getElementById("rojo").addEventListener("click", function(){
        let red = "#ff0000";
        someFunction(red);
    });
    let azul = document.getElementById("azul").addEventListener("click", function(){
        let blue =  "#0000ff";
        someFunction(blue);
    });
    let amarillo = document.getElementById("amarillo").addEventListener("click", function(){
        let yel =  "#ffff00";
        someFunction(yel);
    });
}

function botonColores2(someFunction){
    let rojo = document.getElementById("red").addEventListener("click", function(){
        let red = "#ff0000";
        someFunction(red);
    });
    let amarillo = document.getElementById("green").addEventListener("click", function(){
        let yel =  "#ffff00";
        someFunction(yel);
    });
}