const divTesoura = document.querySelector(".scissors");
const divfilha = document.querySelector(".scissors button");
const buttons = document.querySelectorAll(".choice button");
const divs = Array.from(document.querySelectorAll(".choice div"));
const resultadoTexto = document.querySelector(".reset-game p");
const score = document.querySelector(".score");
let pontuacao = 1;
let cut = divs.splice(1, 1);
const restartGame = document.querySelector(".restart");
const playerChoice = document.querySelector(".players");
const computerChoice = document.querySelector(".computer");

let jogoAtivo = true;

function clickHandler(index) {
  return function () {
    if (!jogoAtivo) return;
    let computer = Math.floor(Math.random() * buttons.length);

    if (
      (index == 0 && computer == 2) ||
      (index == 1 && computer == 0) ||
      (index == 2 && computer == 1)
    ) {
      removerBotoesDaTela();
      ganhou(index, computer);
    } else if (
      (index == 0 && computer == 0) ||
      (index == 1 && computer == 1) ||
      (index == 2 && computer == 2)
    ) {
      removerBotoesDaTela();
      empatou(index, computer);
    } else if (
      (computer == 0 && index == 2) ||
      (computer == 1 && index == 0) ||
      (computer == 2 && index == 1)
    ) {
      removerBotoesDaTela();
      perdeu(index, computer);
    }

    if (index == 0 && computer == 0) {
      buttons[1].classList.remove("selected");
      buttons[1].classList.remove("scissors-button");
      buttons[1].classList.add("paper-button");
      buttons[1].innerHTML = `<img src="./images/paper.png" alt="" />`;
      divs[1].classList.add("playertwo");
    } else if (index == 1 && computer == 1) {
      buttons[0].classList.remove("selected");
      buttons[0].classList.remove("paper-button");
      buttons[0].classList.add("scissors-button");
      divs[0].classList.add("playertwo");
      buttons[0].innerHTML = `<img src="./images/scissors.png" alt="" />`;
    } else if (index == 2 && computer == 2) {
      buttons[1].classList.remove("selected");
      buttons[1].classList.remove("scissors-button");
      buttons[1].classList.add("rock-button");
      buttons[1].innerHTML = `<img src="./images/rock.png" alt="" />`;
      divs[1].classList.add("playertwo");
    }
    salvarPontuacao();
    jogoAtivo = false;
  };
}
pegarPontuacao();

function playGame() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", clickHandler(index));
  });
}
playGame();

function removeee() {
  buttons[1].classList.add("scissors-button");
  buttons[1].classList.remove("paper-button");
  buttons[1].classList.remove("rock-button");
  buttons[1].innerHTML = `<img src="./images/scissors.png" alt="" />`;

  buttons[0].classList.add("paper-button");
  buttons[0].classList.remove("scissors-button");
  buttons[0].innerHTML = `<img src="./images/paper.png" alt="" />`;
}

function ganhou(index, computer) {
  divs[index].classList.add("playerone");
  divs[computer].classList.add("playertwo");
  buttons[index].classList.remove("selected");
  buttons[computer].classList.remove("selected");
  score.innerHTML = pontuacao++;
  score.classList.add("scoreAnimation");
  resultadoTexto.innerHTML = "Você ganhou";
  resultadoTexto.classList.add("restart-game");
  buttons[index].classList.add("winner");
  restartGame.classList.add("restart-game");
  restartGame.classList.add("winnerText");
  playerChoice.classList.add("choiceText");
  computerChoice.classList.add("choiceText");
}

function empatou(index, computer) {
  divs[index].classList.add("playerone");
  buttons[index].classList.remove("selected");
  buttons[computer].classList.remove("selected");
  resultadoTexto.innerHTML = "Empatou";
  restartGame.classList.add("restart-game");
  resultadoTexto.classList.add("restart-game");
  playerChoice.classList.add("choiceText");
  computerChoice.classList.add("choiceText");
}

function perdeu(index, computer) {
  divs[index].classList.add("playerone");
  divs[computer].classList.add("playertwo");
  buttons[index].classList.remove("selected");
  buttons[computer].classList.remove("selected");
  buttons[computer].classList.add("winner");
  resultadoTexto.innerHTML = "Você perdeu";
  restartGame.classList.add("restart-game");
  resultadoTexto.classList.add("restart-game");
  playerChoice.classList.add("choiceText");
  computerChoice.classList.add("choiceText");
}

function removerBotoesDaTela() {
  buttons.forEach((button) => {
    button.classList.add("selected");
  });
}

function salvarPontuacao() {
  localStorage.setItem("data", score.innerHTML);
}

function pegarPontuacao() {
  score.innerHTML = localStorage.getItem("data");
}

function resetscore() {
  pontuacao = 1;
  score.innerHTML = 0;
  salvarPontuacao();
}

function reset() {
  buttons.forEach((button) => {
    button.classList.remove("selected");
    button.classList.remove("winner");
  });
  divs.forEach((div) => {
    div.classList.remove("playerone");
    div.classList.remove("playertwo");
  });
  restartGame.classList.remove("restart-game");
  resultadoTexto.classList.remove("restart-game");
  restartGame.classList.remove("winnerText");
  score.classList.remove("scoreAnimation");
  playerChoice.classList.remove("choiceText");
  computerChoice.classList.remove("choiceText");
  resultadoTexto.innerHTML = "";
  removeee();
  jogoAtivo = true;
}
