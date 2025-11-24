const choice = ['rock', 'paper', 'scissors'];
const choicesCount = 3;

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * choicesCount)
  return choice[randomNum];
}

function getHumanChoice() {
  const humanChoice = prompt('Rock Paper or Scissors?')
  console.log(humanChoice)
}
