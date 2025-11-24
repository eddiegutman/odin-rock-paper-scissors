const choices = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;

const winCondition = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper',
}

function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * choices.length)
  return choices[randomNum];
}

function getHumanChoice() {
  const humanChoice = prompt('Rock Paper or Scissors?');
  return humanChoice?.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log('Tie!');
    return;
  }

  // human won
  if (winCondition[humanChoice] === computerChoice) {
    humanScore++;
    console.log(`You won! ${humanChoice} beats ${computerChoice}`);
  } else { // computer won
    computerScore++;
    console.log(`You lost! ${computerChoice} beats ${humanChoice}`);
  }
}

function playGame(numOfRounds = 5) {
  for (let i = 0; i < numOfRounds; i++) {
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