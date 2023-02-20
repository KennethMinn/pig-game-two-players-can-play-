'use strict';

const totalScore_0 = document.querySelector('#score--0');
const totalScore_1 = document.querySelector('#score--1');
const currentScore_0 = document.querySelector('#current--0');
const currentScore_1 = document.querySelector('#current--1');
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

let currentScore, totalScores, activePlayer, playing; // create global variables to reassign

//create initialization function when the user refresh the page or click the 'New Game Button'
const init = () => {
  currentScore = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  playing = true;

  totalScore_0.textContent = 0;
  totalScore_1.textContent = 0;
  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;

  dice.classList.add('hidden');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--winner');
};

init();

//create a function to reuse in order to switch player
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
};

//the following codes will work when u click 'Roll Dice Button'
btn_roll.addEventListener('click', () => {
  if (playing) {
    const dice_num = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${dice_num}.png`;

    if (dice_num !== 1) {
      currentScore += dice_num;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//the following codes will work when u click 'Hold Button'
btn_hold.addEventListener('click', () => {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    if (totalScores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//the following codes will work when u click 'New Game Button'
btn_new.addEventListener('click', init);
