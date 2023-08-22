const areaDoJogo = document.querySelector(".area-do-jogo");
const ElementomaiorPontuacao = document.querySelector(".maior-pontuacao");
const Elementopontuacao = document.querySelector(".pontuacao");
const controles = document.querySelectorAll(".constrols i");

console.log(controles);

var fimDeJogo = false;
var xDaComida, yDaComida;
var xDacobra = 5, yDaCobra = 5;
var xDaVelocidade = 0, yDaVelocidade = 0;
var corpoDaCobra = [];
var tempoDeEspera;
var pontuacao = 0;

var maiorPontuacao = localStorage.getItem("maior-pontuacao") || 0;
ElementomaiorPontuacao.innerText = `Maior Pontuação: ${maiorPontuacao}`;

const atualizaPosicaoDaComida = () => {
    xDaComida = Math.floor(Math.random() * 30) + 1;
    yDaComida = Math.floor(Math.random() * 30) + 1;
}

const AtualizaGamerOver = () => {
    clearInterval(tempoDeEspera);
    alert("Fim de jogo, Pressione OK para jogar novamente");
    location.reload();
}

const MudaDirecao = e => {

    if (e.key === "ArrowUp" && yDaVelocidade != 1) {
        xDaVelocidade = 0;
        yDaVelocidade = -1;
    
    }else if (e.key === "ArrowDown" && yDaVelocidade != -1){
        xDaVelocidade = 0;
        yDaVelocidade = 1;

    }else if(e.key === "ArrowLeft" && xDaVelocidade != 1){
        xDaVelocidade = -1;
        yDaVelocidade = 0;

    }else if (e.key === "ArrowLeft" && xDaVelocidade != -1) {
        xDaVelocidade = 1;
        yDaVelocidade = 0;
    }

    
}