'use strict';

// Create a random number for game logic
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// State variable
let score = 20,
  highscore = 0;

// Functions for DRY
const changeText = function (selector, message) {
  document.querySelector(selector).textContent = message;
};

// Create an event listener
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    changeText('.message', '😡 No Number!');
  }

  // When player wins
  else if (guess === secretNumber) {
    changeText('.number', secretNumber);
    // document.querySelector('.number').textContent = secretNumber;
    changeText('.message', '🎉 It was correct');
    // document.querySelector('.message').textContent = '🎉 It was correct';
    document.querySelector('body').style.backgroundColor = 'rgb(50, 166, 15)';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      changeText('.highscore', highscore);
    }
  }

  // When guess is too close to secret number
  else if (guess <= secretNumber + 3 && guess >= secretNumber - 3) {
    // Execute code when the score only higher than 0
    if (score > 1) {
      changeText('.message', "You're close");
      score--;
      document.querySelector('body').style.backgroundColor =
        'rgb(15, 149, 139)';
      changeText('.score', score);
    } else {
      changeText('.message', '😡 You lost the game!');
      changeText('.score', 0);
    }
  }

  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      changeText('.message', guess > secretNumber ? 'Too high' : 'Too low');
      score--;
      document.querySelector('body').style.backgroundColor = '#222';
      changeText('.score', score);
    } else {
      changeText('.message', '😡 You lost the game!');
      changeText('.score', 0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  changeText('.score', score);
  // document.querySelector('.score').textContent = score;
  changeText('.number', '?');
  // document.querySelector('.number').textContent = '?';
  changeText('.message', 'Start guessing...');
  // document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
