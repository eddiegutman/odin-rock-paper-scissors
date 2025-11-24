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


function updateScore(winner, scores) {
  if (winner === 'human') {
    scores.human++;
  } else if (winner === 'computer') {
    scores.computer++;
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

    if (scores.human === 3 || scores.computer === 3) {
      break;
    }
  }
  declareGameWinner(scores);
}

playGame();