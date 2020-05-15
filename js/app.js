// UI Variables
const boxOne = document.querySelector('.boxOne'),
      boxTwo = document.querySelector('.boxTwo'),
      playingDot = document.querySelector('.playing'),
      playerOne = document.querySelector('#playerOne'),
      playerTwo = document.querySelector('#playerTwo'),
      playerOneScore = document.querySelector('#playerOneScore'),
      playerTwoScore = document.querySelector('#playerTwoScore'),
      playerOneCurrentScore = document.querySelector('#playerOneCurrentScore'),
      playerTwoCurrentScore = document.querySelector('#playerTwoCurrentScore'),
      loading = document.querySelector('.loadingImage'),
      diceImages = document.querySelector('.diceImages'),
      dice = document.querySelector('.dice'),
      diceOne = document.querySelector('#dice1'),
      diceTwo = document.querySelector('#dice2'),
      main = document.querySelector('.main'),
      currentScoreBox = document.querySelectorAll('.currentScoreBox'),
      winningNumber = document.querySelector('.number'),
      winImage = document.querySelector('.win-image');

// Btns
const btnNew = document.querySelector('.btn-play'),
    btnRoll = document.querySelector('.btn-roll'),
    btnSave = document.querySelector('.btn-save');

// Game Variables
let currentScore = 0,
    activePlayer = 0,
    playerOneGlobalScore = 0,
    playerTwoGlobalScore = 0,
    winValue;

// Initialization
loading.style.display = 'none';
btnRoll.style.display = 'none';
btnSave.style.display = 'none';

playerOneScore.textContent = '0';
playerTwoScore.textContent = '0';
playerOneCurrentScore.textContent = '0';
playerTwoCurrentScore.textContent = '0';

// Event Listeners 
btnNew.addEventListener('mousedown', startGame); 

btnRoll.addEventListener('mousedown', function (e) {
  
  // Show the Loader
  loading.style.display = 'block';
  // Hide the dice
  diceImages.style.display = 'none';

  // Start the game
  setTimeout(rollDice, 300);
  
});

btnSave.addEventListener('mousedown', saveScore);

// Window Reload after play again button pressed
main.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('play-again')) {
    console.log('hi');
    window.location.reload();
  }

  
});

// Functions 
// Game Initialization
function startGame() {

  btnNew.style.display = 'none';
  boxOne.style.opacity = '1';
  boxTwo.style.opacity = '1';

  btnRoll.style.display = 'block';
  btnSave.style.display = 'block';

  winningNumber.style.display = 'none';
  boxOne.className += ' active';
  winValue = winningNumber.value;

  loading.style.marginBottom = '90px';
  diceImages.style.marginBottom = '90px';

}



function rollDice() {

  // hide the Loader
  loading.style.display = 'none';

  // Random naumber
  let diceNumberOne = Math.floor(Math.random() * 6) + 1,
      diceNumberTwo = Math.floor(Math.random() * 6) + 1;

  // Display the correct dice image
  diceImages.style.display = 'block';

  // Show the Dice
  diceOne.setAttribute('src', `images/dice-six-faces-${diceNumberOne}.svg`);
  diceTwo.setAttribute('src', `images/dice-six-faces-${diceNumberTwo}.svg`);

  // Update the Current Score if dicenumber is not 1
  if (diceNumberOne !== 1 && diceNumberTwo !== 1) {
    // Add Number
    currentScore += (diceNumberOne + diceNumberTwo);
    // Show the Number to Curent Player DOM
    activePlayer === 0 ? playerOneCurrentScore.textContent = currentScore : playerTwoCurrentScore.textContent = currentScore; 

  } else {
    // Change Player
    setTimeout(changePlayer,500);
  }

}

// Hide the Dice after playing One
function hideDice() {
  diceImages.style.display = 'none';
}

function saveScore() {
  // Add Current Score to Global Score
  activePlayer === 0 ? playerOneGlobalScore += currentScore : playerTwoGlobalScore += currentScore;

  // Update the UI
  activePlayer === 0 ? playerOneScore.textContent = playerOneGlobalScore : playerTwoScore.textContent = playerTwoGlobalScore;

  if (activePlayer === 0 && playerOneGlobalScore >= winValue) {
    // Player One Win
    playerOne.textContent = 'Winner!';
    playerOne.style.color = '#f80759';
    boxTwo.style.opacity = '0.25';
    currentScoreBox[0].style.opacity = '0';
    winImage.style.left = '5%';
    win();
  } else if (activePlayer === 1 && playerTwoGlobalScore >= winValue) {
    // Player Two Win
    playerTwo.textContent = 'Winner!';
    playerTwo.style.color = '#f80759';
    boxOne.style.opacity = '0.25';
    currentScoreBox[1].style.opacity = '0';
    winImage.style.right = '5%';
    win();
  } else {
    // Change Player
    setTimeout(changePlayer,500);
  }
}

// Change Player Function
function changePlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  currentScore = 0;
  playerOneCurrentScore.textContent = currentScore;
  playerTwoCurrentScore.textContent = currentScore;

  boxOne.classList.toggle('active');
  boxTwo.classList.toggle('active');

  diceImages.style.display = 'none';
}

// Game Win function
function win() {
  diceImages.style.display = 'none';
  btnRoll.style.display = 'none';
  btnSave.style.display = 'none';
  btnNew.style.display = 'block';
  btnNew.classList.add('play-again');
  btnNew.style.animation = 'unset';
  btnNew.innerHTML = '<i class="fa fa-refresh mr-2"></i>Play Again';
  winImage.style.display = 'block';
}
