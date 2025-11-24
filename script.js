const HUMAN_WIN = 1;
const TIE = 0;
const COMPUTER_WIN = -1;

const choices = ['rock', 'paper', 'scissors'];

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


function updateScore(outcome, scores) {
  if (outcome === HUMAN_WIN) {
    scores.human++;
  } else if (outcome === COMPUTER_WIN) {
    scores.computer++;
  }
}

function declareRoundWinner(outcome, humanChoice, computerChoice) {
  switch (outcome) {
    case TIE:
      console.log('Tie!');
      break;
    case HUMAN_WIN:
      console.log(`You won! ${humanChoice} beats ${computerChoice}`);
      break;
    case COMPUTER_WIN:
      console.log(`You lost! ${computerChoice} beats ${humanChoice}`);
      break;
  }
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return TIE;
  }

  // human won
  if (winCondition[humanChoice] === computerChoice) {
    return HUMAN_WIN;
  } else {
    return COMPUTER_WIN;
  }
}

function declareGameWinner({ human, computer }) {
  console.log(`Final score - You: ${human}, Computer: ${computer}`)
}

function playGame(numOfRounds = 5) {
  const scores = {
    human: 0,
    computer: 0,
  }

  for (let i = 0; i < numOfRounds; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    const outcome = playRound(humanSelection, computerSelection);
    updateScore(outcome, scores);
    declareRoundWinner(outcome, humanSelection, computerSelection);

    if (scores.human === Math.ceil(numOfRounds / 2) || scores.computer === Math.ceil(numOfRounds / 2)) {
      break;
    }
  }
  declareGameWinner(scores);
}

playGame();