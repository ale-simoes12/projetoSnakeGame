const canvas = document.getElementById("canvasJogo");
const derrota = document.getElementById("losescreean");
let pontosjogador = document.getElementById("pontoJogador");
let melhorScore = document.getElementById("melhorPontuacao");
let pontoJogadorAtual  = document.getElementById("pontoJogadorAtual");
const ctx = canvas.getContext("2d");
const tamanho = 40;
let listaPosicoes = [{ x: 400, y: 400 }];
let ultimaTecla = "";
let horizontal = 0;
let vertical = 0;
let comeu = false;
let xComida;
let yComida;
let loopId;
let perdeu = false;
let pontos = 0;
let velocidade =1;

let melhorpontuacao =  localStorage.getItem("melhorPonto");
if (melhorpontuacao == null) {
    melhorpontuacao = 0;
}

melhorScore.innerText = ""+melhorpontuacao;
localStorage.setItem('melhorPonto', melhorpontuacao);

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
        ctx.fillRect(listaPosicoes[i].x, listaPosicoes[i].y, tamanho-2, tamanho-2);
    }

}

function gerarAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function gerarPosicao() {
    return Math.round(gerarAleatorio(0, 760) / 40) * 40;
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
        // pontosjogador
        pontos +=1;
        pontosjogador.innerText = ""+pontos;

        comeu = true;
    }
}

function verificarDerrotaCampo(){
    let tamanhoCobra = listaPosicoes.length;
    const ultimoElemento = listaPosicoes[tamanhoCobra - 1];
    console.log(canvas.width);
    if(ultimoElemento.x == canvas.width || ultimoElemento.x == -40){
        perdeu = true;
    }
    if(ultimoElemento.y== canvas.height || ultimoElemento.y == -40){
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

function  velocit(valor){
    console.log("entrou velo");
    velocidade = valor;
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

function telaDerrota(){
    derrota.style.display = "block";
}

function startgame(){
    const startgame =  document.getElementById("tela-inicial");
    startgame.style.display = "none";

}

function restart(){
    ctx.clearRect(0, 0, 800, 800);
    derrota.style.display = "none";
    perdeu = false;
    listaPosicoes = [{ x: 400, y: 400 }];
    ultimaTecla = "";
    horizontal = 0;
    vertical = 0;
    comeu = false;
    xComida;
    yComida;
    loopId;
    perdeu = false;
    pontos = 0;
    pontosjogador.innerText = ""+0;
    gerarCordenada();
    gameLoop();

}

gerarCordenada();
function gameLoop() {
    if(perdeu == true){
        if(pontos> melhorpontuacao){
            melhorpontuacao = pontos;
            localStorage.setItem('melhorPonto', melhorpontuacao);
            melhorScore.innerText = ""+melhorpontuacao;
        }
        pontoJogadorAtual.innerText = ""+pontos;
        telaDerrota();
        return;
    }
    ctx.clearRect(0, 0, 800, 800)
    verificaComeu();
    desenharCobra();
    desenhaComida();
    verificarDerrotaCorpo();
    verificarDerrotaCampo();
    
    loopId = setTimeout(() => {
        gameLoop()
    }, 300*velocidade)

}
gameLoop();