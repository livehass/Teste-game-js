const areaDoJogo = document.querySelector(".area-do-jogo");
const ElementomaiorPontuacao = document.querySelector(".maior-pontuacao");
const Elementopontuacao = document.querySelector(".pontuacao");

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
    if (e.code === "KeyW" && yDaVelocidade != 1) {
        xDaVelocidade = 0;
        yDaVelocidade = -1;
    
    }else if (e.code === "KeyS" && yDaVelocidade != -1){
        xDaVelocidade = 0;
        yDaVelocidade = 1;

    }else if(e.code === "KeyA" && xDaVelocidade != 1){
        xDaVelocidade = -1;
        yDaVelocidade = 0;

    }else if (e.code === "KeyD" && xDaVelocidade != -1) {
        xDaVelocidade = 1;
        yDaVelocidade = 0;
    }
}

const iniciaGame = () => {
    if(fimDeJogo) return AtualizaGamerOver();
    let html = `<div class="comida" style="grid-area: ${yDaComida} / ${xDaComida}"></div>`;
    
    if(xDacobra === xDaComida && yDaCobra === yDaComida) {
        atualizaPosicaoDaComida();
        corpoDaCobra.push([yDaComida, xDaComida]);
        pontuacao++;
        maiorPontuacao = pontuacao >= maiorPontuacao ? pontuacao : maiorPontuacao;

        localStorage.setItem("maior-pontuacao", maiorPontuacao);
        Elementopontuacao.innerText = `Pontuacao: ${pontuacao}`;
        ElementomaiorPontuacao.innerText = `Maior pontuacao: ${maiorPontuacao}`;
    }
    xDacobra += xDaVelocidade;
    yDaCobra += yDaVelocidade;

    for(let i = corpoDaCobra.length - 1; i > 0; i--) {
        corpoDaCobra[i] = corpoDaCobra[i -1];
    }
    corpoDaCobra[0] = [xDacobra, yDaCobra];

    for(let i = 0; i < corpoDaCobra.length; i++) {
        html += `<div class="cabeca" style="grid-area: ${corpoDaCobra[i][1]} / ${corpoDaCobra[i][0]}"></div>`;

        if(i !== 0 && corpoDaCobra[0][1] === corpoDaCobra[i][1] && corpoDaCobra[0][0] === corpoDaCobra[i][0]) {
            fimDeJogo = true;
        }
    }
    areaDoJogo.innerHTML = html;
}
atualizaPosicaoDaComida();
tempoDeEspera = setInterval(iniciaGame, 100);
document.addEventListener("keyup", MudaDirecao);