const canvas = document.getElementById("canvasJogo");
const ctx = canvas.getContext("2d");
const tamanho = 50;
let listaPosicoes = [{ x: 250, y: 250 }];
ctx.fillRect(listaPosicoes[0].x, listaPosicoes[0].y, tamanho, tamanho);
let ultimaTecla = "";
let horizontal = 0;
let vertical = 0;
let comeu = false;
let xComida;
let yComida;

function desenharCobra() {
    ctx.fillStyle = "red";
    let tamanhoCobra = listaPosicoes.length;
    const ultimoElemento = listaPosicoes[tamanhoCobra - 1]
    let novox = ultimoElemento.x + horizontal;
    let novoy = ultimoElemento.y + vertical;
    let novoElemento = { x: novox, y: novoy };
    if (comeu == false) {
        listaPosicoes.shift();
    }
    listaPosicoes.push(novoElemento);
    comeu = false;

    let tam = listaPosicoes.length;
    for (let i = 0; i < tam; i++) {
        if (i == tam - 1) {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(listaPosicoes[i].x, listaPosicoes[i].y, tamanho, tamanho);
    }

}


function gerarAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function gerarPosicao() {
    return Math.round(gerarAleatorio(0, 500) / 50) * 50;
}


function gerarCordenada() {
    let coordenadaValida = false;

    while (!coordenadaValida) {
        xComida = gerarPosicao();
        yComida = gerarPosicao();

        coordenadaValida = true;

        for (var i = 0; i < listaPosicoes.length; i++) {
            if (listaPosicoes[i].x === xComida && listaPosicoes[i].y === yComida) {
                coordenadaValida = false;
                break;
            }
        }
    }
}




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