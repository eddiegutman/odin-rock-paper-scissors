const choice = ['rock', 'paper', 'scissors'];
const choicesCount = 3;

const winCondition = {
  'rock': { 'rock': 0, 'paper': -1, 'scissors': 1 },
  'paper': { 'rock': 1, 'paper': 0, 'scissors': -1 },
  'scissors': { 'rock': -1, 'paper': 1, 'scissors': 0 },
}

function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * choicesCount)
  return choice[randomNum];
}

function getHumanChoice() {
  const humanChoice = prompt('Rock Paper or Scissors?');
  return humanChoice?.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
    const resultNum = winCondition[humanChoice][computerChoice];
    if (resultNum === 0) {
      console.log('Tie!');
      return;
    }

    // human won
    if (resultNum > 0) {
      humanScore++;
      console.log(`You won! ${humanChoice} beats ${computerChoice}`);
    } else { // computer won
      computerScore++;
      console.log(`You lost! ${computerChoice} beats ${humanChoice}`);
    }
  }

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  if (humanScore === computerScore) {
    console.log('Tie!');
  } else if (humanScore > computerScore) {
    console.log('You won the game!');
  } else {
    console.log('You lost the game!');
  }
}

playGame();