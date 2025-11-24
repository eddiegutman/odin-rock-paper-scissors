const HUMAN_WIN = 1;
const TIE = 0;
const COMPUTER_WIN = -1;

const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const choices = ['rock', 'paper', 'scissors'];
const winCondition = [SCISSORS, ROCK, PAPER];


function getComputerChoice() {
  return Math.floor(Math.random() * choices.length)
}

function getHumanChoice() {
  const humanChoice = prompt('Rock Paper or Scissors?')?.toLowerCase();
  return choices.indexOf(humanChoice);
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
      console.log(`You won! ${choices[humanChoice]} beats ${choices[computerChoice]}`);
      break;
    case COMPUTER_WIN:
      console.log(`You lost! ${choices[computerChoice]} beats ${choices[humanChoice]}`);
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

function declareGameWinner(scores) {
  const { human, computer } = scores;
  console.log(`Final score - You: ${human}, Computer: ${computer}`)
}

function playGame(numOfRounds = 5) {
  const scores = {
    human: 0,
    computer: 0,
  }

  const earlyExitScore = Math.ceil(numOfRounds / 2);

  for (let i = 0; i < numOfRounds; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    const outcome = playRound(humanSelection, computerSelection);
    updateScore(outcome, scores);
    declareRoundWinner(outcome, humanSelection, computerSelection);

    if (scores.human === earlyExitScore || scores.computer === earlyExitScore) {
      break;
    }
  }
  declareGameWinner(scores);
}

playGame();