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

function getRoundWinner(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return 'tie';
  }

  // human won
  if (winCondition[humanChoice] === computerChoice) {
    return 'human';
  } else {
    return 'computer';
  }
}

function updateScore(winner) {
  if (winner === 'human') {
    humanScore++;
  } else if (winner === 'computer') {
    computerScore++;
  }
}

function declareRoundWinner(winner, humanChoice, computerChoice) {
  switch (winner) {
    case 'tie':
      console.log('Tie!');
      break;
    case 'human':
      console.log(`You won! ${humanChoice} beats ${computerChoice}`);
      break;
    case 'computer':
      console.log(`You lost! ${computerChoice} beats ${humanChoice}`);
      break;
  }
}

function playRound(humanChoice, computerChoice) {
  const outcome = getRoundWinner(humanChoice, computerChoice);
  updateScore(outcome);
  declareRoundWinner(outcome, humanChoice, computerChoice);
}

function declareGameWinner(humanScore, computerScore) {
  console.log(`Final score - You: ${humanScore}, Computer: ${computerScore}`)
}

function playGame(numOfRounds = 5) {
  for (let i = 0; i < numOfRounds; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);

    if (humanScore === 3 || computerScore === 3) {
      break;
    }
  }
  declareGameWinner(humanScore, computerScore);
}

playGame();