const choice = ['rock', 'paper', 'scissors'];
const choicesCount = 3;

function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * choicesCount)
  return choice[randomNum];
}

