const canvas = document.getElementById("canvasJogo");
const derrota = document.getElementById("losescreean");
let pontosjogador = document.getElementById("pontoJogador");
let melhorScore = document.getElementById("melhorPontuacao");
let pontoJogadorAtual = document.getElementById("pontoJogadorAtual");
const ctx = canvas.getContext("2d");
const tamanho = 40;
let listaPosicoes = [{ x: 400, y: 400 }];
let ultimaTecla = "";
let horizontal = 0;
let vertical = 0;
let comeu = false;
let xComida;
let yComida;
let xExplosao;
let yExplosao;
let loopId;
let perdeu = false;
let pontos = 0;
let velocidade = 1;
let mudarDirecao = true;
let melhorpontuacao = localStorage.getItem("melhorPonto");
let comecar = false;
let explosao = false;
const audio = new Audio('audio/creeper-explosion.mp3');

function verificaLocalStore(){
    if (melhorpontuacao == null) {
        melhorpontuacao = 0;
    }
    melhorScore.innerText = "" + melhorpontuacao;
    localStorage.setItem("melhorPonto", melhorpontuacao);
}

function desenharCobra() {
  let tamanhoCobra = listaPosicoes.length;
  const ultimoElemento = listaPosicoes[tamanhoCobra - 1];
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
    ctx.fillStyle = corAleatoria();
    if (i == tam - 1) {
      ctx.fillStyle = "blue";
    }
    ctx.fillRect(
      listaPosicoes[i].x,
      listaPosicoes[i].y,
      tamanho - 2,
      tamanho - 2
    );
  }
  mudarDirecao = true;
}

function corAleatoria() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

function gerarAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
  const imagemComida = new Image();
  imagemComida.src = 'imagens/headCreaper.png';
  ctx.fillStyle = "yellow";
//   ctx.fillRect(xComida, yComida, tamanho, tamanho);
if (imagemComida.complete) {
    ctx.drawImage(imagemComida, xComida, yComida, tamanho, tamanho);
  } else {
    imagemComida.onload = function () {
      ctx.drawImage(imagemComida, xComida, yComida, tamanho, tamanho);
    };
  }

}


function desenharExplosao(xComida,yComida,tamanho,tamanho){
    const imagemExplosao = new Image()
    imagemExplosao.src = 'imagens/explosao.png';
    if (imagemExplosao.complete) {
        ctx.drawImage(imagemExplosao, xComida, yComida, tamanho, tamanho);
      } else {
        imagemExplosao.onload = function () {
          ctx.drawImage(imagemExplosao, xComida, yComida, tamanho, tamanho);
        };
      }

}

function verificaComeu() {
  let tamanhoCobra = listaPosicoes.length;
  const ultimoElemento = listaPosicoes[tamanhoCobra - 1];  
  if (ultimoElemento.x == xComida && ultimoElemento.y == yComida) {
    xExplosao = xComida;
    yExplosao = yComida;
    audio.play();
    gerarCordenada();
    pontos += 1;
    pontosjogador.innerText = "" + pontos;
    explosao =true;
    comeu = true;
  }
}

function verificarDerrotaCampo() {
  let tamanhoCobra = listaPosicoes.length;
  const ultimoElemento = listaPosicoes[tamanhoCobra - 1];
  console.log(canvas.width);
  if (ultimoElemento.x == canvas.width || ultimoElemento.x == -40) {
    perdeu = true;
  }
  if (ultimoElemento.y == canvas.height || ultimoElemento.y == -40) {
    perdeu = true;
  }
}

function verificarDerrotaCorpo() {
  let tamanhoCorpo = listaPosicoes.length - 1;
  const ultimoElemento = listaPosicoes[tamanhoCorpo];
  for (let i = 0; i < tamanhoCorpo; i++) {
    if (
      ultimoElemento.x == listaPosicoes[i].x &&
      ultimoElemento.y == listaPosicoes[i].y
    ) {
      perdeu = true;
    }
  }
}

function velocit(valor) {
  velocidade = valor;
  document.querySelectorAll(".botoesVelocidade button").forEach((btn) => {
    btn.addEventListener("click", function () {
      const vel = parseFloat(btn.textContent);
      document
        .querySelectorAll(".botoesVelocidade button")
        .forEach((b) => b.classList.remove("ativo"));
      btn.classList.add("ativo");
    });
  });
}

document.addEventListener("keydown", function (event) {

  if(mudarDirecao == false || comecar ==false){
    return;
  }

  if (event.key == "ArrowDown" && ultimaTecla != "ArrowUp" ) {
    ultimaTecla = "ArrowDown";
    horizontal = 0;
    vertical = tamanho;
    mudarDirecao = false;
  }

  if (event.key == "ArrowUp" && ultimaTecla != "ArrowDown") {
    ultimaTecla = "ArrowUp";
    horizontal = 0;
    vertical = -tamanho;
    mudarDirecao = false;
  }

  if (event.key == "ArrowRight" && ultimaTecla != "ArrowLeft") {
    ultimaTecla = "ArrowRight";
    horizontal = tamanho;
    vertical = 0;
    mudarDirecao = false;
  }

  if (event.key == "ArrowLeft" && ultimaTecla != "ArrowRight") {
    ultimaTecla = "ArrowLeft";
    horizontal = -tamanho;
    vertical = 0;
    mudarDirecao = false;
  }
});

function telaDerrota() {
  derrota.style.display = "block";
}

function startgame() {
  const startgame = document.getElementById("tela-inicial");
  startgame.style.display = "none";
  comecar = true;

}

function restart() {
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
  pontosjogador.innerText = "" + 0;
  gerarCordenada();
  gameLoop();
}

function abrirPopup() {
  document.getElementById("popup-regras").style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popup-regras").style.display = "none";
}

gerarCordenada();
verificaLocalStore();
function gameLoop() {
  if (perdeu == true) {
    if (pontos > melhorpontuacao) {
      melhorpontuacao = pontos;
      localStorage.setItem("melhorPonto", melhorpontuacao);
      melhorScore.innerText = "" + melhorpontuacao;
    }
    pontoJogadorAtual.innerText = "" + pontos;
    telaDerrota();
    return;
  }

  ctx.clearRect(0, 0, 800, 800);
  verificaComeu();
  desenharCobra();
  desenhaComida();
  verificarDerrotaCorpo();
  verificarDerrotaCampo();
  if(explosao){
    desenharExplosao(xExplosao,yExplosao,tamanho,tamanho)
    setTimeout(() => {
        explosao = false;
      },600 );
    
  }
  loopId = setTimeout(() => {
    gameLoop();
  }, 300 * velocidade);
}
gameLoop();
