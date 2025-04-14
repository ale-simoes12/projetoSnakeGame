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
let loopId;
let perdeu = false;

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


function desenhaComida() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(xComida, yComida, tamanho, tamanho);
}


function verificaComeu() {
    let tamanhoCobra = listaPosicoes.length;
    const ultimoElemento = listaPosicoes[tamanhoCobra - 1]
    if (ultimoElemento.x == xComida && ultimoElemento.y == yComida) {
        gerarCordenada();
        comeu = true;
    }
}



function verificarDerrotaCampo(){
    let tamanhoCobra = listaPosicoes.length;
    const ultimoElemento = listaPosicoes[tamanhoCobra - 1];
    console.log(canvas.width);
    if(ultimoElemento.x == canvas.width || ultimoElemento.x == 0){
        perdeu = true;
    }
    if(ultimoElemento.y== canvas.height || ultimoElemento.y == 0){
        perdeu = true;
    }
      
}


function verificarDerrotaCorpo(){
    let tamanhoCorpo = listaPosicoes.length-1;
     console.log("tamanho corpo" , tamanhoCorpo);
    const ultimoElemento = listaPosicoes[tamanhoCorpo];
    for(let i = 0;i<tamanhoCorpo;i++){
        if(ultimoElemento.x == listaPosicoes[i].x && ultimoElemento.y == listaPosicoes[i].y  ){
            perdeu = true;
        }
    }

}

document.addEventListener("keydown", function (event) {

    if (event.key == "ArrowDown" && ultimaTecla != "ArrowUp") {
        ultimaTecla = "ArrowDown";
        horizontal = 0;
        vertical = tamanho;

    }

    if (event.key == "ArrowUp" && ultimaTecla != "ArrowDown") {
        ultimaTecla = "ArrowUp";
        horizontal = 0;
        vertical = -tamanho;
    }



    if (event.key == "ArrowRight" && ultimaTecla != "ArrowLeft") {
        ultimaTecla = "ArrowRight"
        horizontal = tamanho;
        vertical = 0;

    }


    if (event.key == "ArrowLeft" && ultimaTecla != "ArrowRight") {
        ultimaTecla = "ArrowLeft"
        horizontal = -tamanho;
        vertical = 0;
    }

});


gerarCordenada();
function gameLoop() {
    ctx.clearRect(0, 0, 550, 550)
    verificaComeu();
    desenharCobra();
    desenhaComida();
    verificarDerrotaCorpo();
    verificarDerrotaCampo();
    if(perdeu == true){
        return;
    }
    loopId = setTimeout(() => {
        gameLoop()
    }, 300)

}


gameLoop();