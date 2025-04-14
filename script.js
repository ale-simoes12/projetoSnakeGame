const canvas = document.getElementById("canvasJogo");
const ctx = canvas.getContext("2d");
const tamanho = 50;
let listaPosicoes = [{ x: 250, y: 250 }];
ctx.fillRect(listaPosicoes[0].x, listaPosicoes[0].y, tamanho, tamanho);
let ultimaTecla = "";
let horizontal = 0;
let vertical = 0;



document.addEventListener("keydown", function (event) {

    if (event.key == "ArrowDown" && ultimaTecla != "ArrowUp") {
        ultimaTecla = "ArrowDown";
        horizontal = 0;
        vertical = tamanho;

    }

    if (event.key == "ArrowUp" && ultimaTecla != "ArrowDown" ) {
        ultimaTecla = "ArrowUp";
        horizontal = 0;
        vertical = -tamanho;
    }



    if (event.key == "ArrowRight"  && ultimaTecla != "ArrowLeft" ) {
        //desenharCobra(tamanho,0);
        ultimaTecla = "ArrowRight" 
        horizontal = tamanho;
        vertical = 0;

    }


    if (event.key == "ArrowLeft" && ultimaTecla != "ArrowRight" ) {
        //desenharCobra(-tamanho,0);
        ultimaTecla = "ArrowLeft" 
        horizontal = -tamanho;
        vertical = 0;
    }

});