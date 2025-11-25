const OUTCOME = {
  HUMAN_WIN: 1,
  TIE: 0,
  COMPUTER_WIN: -1,
};

const MOVE = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};


const choices = ['rock', 'paper', 'scissors'];
const winCondition = [];
winCondition[MOVE.ROCK] = MOVE.SCISSORS;
winCondition[MOVE.PAPER] = MOVE.ROCK;
winCondition[MOVE.SCISSORS] = MOVE.PAPER;


function getComputerChoice() {
  return Math.floor(Math.random() * choices.length)
}

function getHumanChoice() {
  const humanChoice = prompt('Rock Paper or Scissors?')?.toLowerCase();
  return choices.indexOf(humanChoice);
}


function updateScore(outcome, scores) {
  if (outcome === OUTCOME.HUMAN_WIN) {
    scores.human++;
  } else if (outcome === OUTCOME.COMPUTER_WIN) {
    scores.computer++;
  }
}

function declareRoundWinner(outcome, humanChoice, computerChoice) {
  switch (outcome) {
    case OUTCOME.TIE:
      console.log('Tie!');
      break;
    case OUTCOME.HUMAN_WIN:
      console.log(`You won! ${choices[humanChoice]} beats ${choices[computerChoice]}`);
      break;
    case OUTCOME.COMPUTER_WIN:
      console.log(`You lost! ${choices[computerChoice]} beats ${choices[humanChoice]}`);
      break;
  }
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return OUTCOME.TIE;
  }

  // human won
  if (winCondition[humanChoice] === computerChoice) {
    return OUTCOME.HUMAN_WIN;
  } else {
    return OUTCOME.COMPUTER_WIN;
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