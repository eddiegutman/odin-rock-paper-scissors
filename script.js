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

const WINNING_SCORE = 5;
const WIN_MESSAGE = 'You won the game! 🎉';
const LOSE_MESSAGE = 'You lost the game! 💀';

const scores = {
  human: 0,
  computer: 0,
}

const choices = ['Rock', 'Paper', 'Scissors'];
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

function updateScore(outcome) {
  if (outcome === OUTCOME.HUMAN_WIN) {
    scores.human++;
  } else if (outcome === OUTCOME.COMPUTER_WIN) {
    scores.computer++;
  }
}

function updateUIScore() {
  document.querySelector('#score-human').textContent = scores.human;
  document.querySelector('#score-computer').textContent = scores.computer;
}

function formatRoundMessage(outcome, humanChoice, computerChoice) {
  switch (outcome) {
    case OUTCOME.TIE:
      return 'Tie!';
    case OUTCOME.HUMAN_WIN:
      return `You won!\n ${moveToString(humanChoice)} beats ${moveToString(computerChoice)}`;
    case OUTCOME.COMPUTER_WIN:
      return `You lost!\n ${moveToString(computerChoice)} beats ${moveToString(humanChoice)}`;
  }
}

function colorRoundMessage(outcome) {
  switch (outcome) {
    case OUTCOME.TIE:
      return '#2b38f5ff';
    case OUTCOME.HUMAN_WIN:
      return '#40c040ff';
    case OUTCOME.COMPUTER_WIN:
      return '#fd3939ff';
  }
}

function showRoundResult(outcome, humanSelection, computerSelection) {
  const result = document.querySelector('#result');
  result.textContent = formatRoundMessage(outcome, humanSelection, computerSelection);
  result.style.color = colorRoundMessage(outcome);
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

function hasWinner() {
  return scores.human === WINNING_SCORE || scores.computer === WINNING_SCORE;
}

function showModal(message) {
  document.querySelector('#modal-message').textContent = message;
  document.querySelector('#modal').classList.remove('hidden');
}

function hideModal() {
  document.querySelector('#modal').classList.add('hidden');
}

function resetScore() {
  scores.human = 0;
  scores.computer = 0;
  updateUIScore();
}

function restartGame() {
  hideModal();
  resetScore();
}

document.querySelector('#restart-game').addEventListener('click', restartGame);

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 75,
    origin: { y: 0.6 }
  });
}


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

  showRoundResult(outcome, humanSelection, computerSelection);
  updateScore(outcome);
  updateUIScore();

  if (hasWinner()) {
    if (scores.human > scores.computer) {
      showModal(WIN_MESSAGE);
      launchConfetti();
    } else {
      showModal(LOSE_MESSAGE);
    }
  }
})