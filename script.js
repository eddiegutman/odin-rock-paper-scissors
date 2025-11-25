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

function beats(moveA, moveB) {
  return winCondition[moveA] === moveB;
}

function moveToString(move) {
  return choices[move];
}

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

function formatRoundMessage(outcome, humanChoice, computerChoice) {
  switch (outcome) {
    case OUTCOME.TIE:
      return 'Tie!';
    case OUTCOME.HUMAN_WIN:
      return `You won! ${moveToString(humanChoice)} beats ${moveToString(computerChoice)}`;
    case OUTCOME.COMPUTER_WIN:
      return `You lost! ${moveToString(computerChoice)} beats ${moveToString(humanChoice)}`;
  }
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return OUTCOME.TIE;
  }

  if (beats(humanChoice, computerChoice)) {
    return OUTCOME.HUMAN_WIN;
  }
  return OUTCOME.COMPUTER_WIN;
}

function declareGameWinner(scores) {
  const { human, computer } = scores;
  console.log(`Final score - You: ${human}, Computer: ${computer}`)
}

function hasWinner(scores, earlyExitScore) {
  return scores.human === earlyExitScore || scores.computer === earlyExitScore;
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
    console.log(formatRoundMessage(outcome, humanSelection, computerSelection));

    if (hasWinner(scores, earlyExitScore)) {
      break;
    }
  }
  declareGameWinner(scores);
}

//playGame();

const containerMoves = document.querySelector('#container-moves');
containerMoves?.addEventListener('click', (event) => {
  let target = event.target;
  let humanSelection;

  switch (target.id) {
    case 'move-rock':
      humanSelection = MOVE.ROCK;
      break;
    case 'move-paper':
      humanSelection = MOVE.PAPER;
      break;
    case 'move-scissors':
      humanSelection = MOVE.SCISSORS;
      break;
  }

  const computerSelection = getComputerChoice();
  const outcome = playRound(humanSelection, computerSelection);
  console.log(formatRoundMessage(outcome, humanSelection, computerSelection));
})