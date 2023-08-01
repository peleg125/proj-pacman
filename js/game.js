"use strict";
/*
A Developer started this work but left it in the middle, we need some help adding the following features:
• Show game-over modal with ‘play again’ button. (When the game is finished).
• When Pacman collects all the foods, the user wins – Show ‘victorious’ modal with ‘play again’ button.
• Each ghost should have a random color.
• Add support for Super Food (in 4 corners of the board)
o When Pacman eats a Super Food:
▪ The ghosts should appear in a different color
▪ If the Pacman meets a ghost, he eats it – the
• Cherry seconds
ghost should be removed from the ghosts
array
▪ Super Power mode ends after 5 seconds and
the ghosts return to life (or create new ones)
▪ When Pacman in already super mode, he
cannot eat another Super Food
- Place a cherry in a random location every 15
o cherry gives Pacman 10 points, (it is NOT a Super Food)
o We need to find an empty location for the cherry, and we want to make it random
TIP: You can find all the empty locations, add them to an array and then select a random location from the array.
• BONUS: Add some audio
• BONUS: Make the Pacman face the direction where he
goes
*/
const WALL = "#";
const FOOD = ".";
const EMPTY = " ";
const SUPER_FOOD = "*";
var gFoodCount;
const gGame = {
  score: 0,
  isOn: false,
};
var gBoard;

function onInit() {
  console.log("hello");
  gEatenGhosts = [];
  gGame.score = 0;
  document.querySelector(".score").innerText = gGame.score;
  gBoard = buildBoard();
  createGhosts(gBoard);
  createPacman(gBoard);
  renderBoard(gBoard);
  gGame.isOn = true;
  gFoodCount = getFoodCount(gBoard);
}
// • Show game-over modal with ‘play again’ button. (When the game is finished).
function openModal() {
  const elSpan = document.querySelector(".close");
  const elModal = document.querySelector(".modal");
  const elResetBtn = document.querySelector(".resetBtn");
  elModal.classList.remove("hide");

  window.onclick = function (event) {
    if (event.target == elModal) {
      elModal.classList.add("hide");
    }
    elSpan.onclick = function () {
      elModal.classList.add("hide");
    };
  };
  elResetBtn.onclick = function () {
    elModal.classList.add("hide");
    onInit();
  };
}

function getFoodCount(board) {
  var foodCount = 1;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === FOOD) foodCount++;
    }
  }
  return foodCount;
}
function setVictory() {
  gGame.isOn = false;
  openModal();
  clearInterval(gIntervalGhosts);
}
function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === 8) ||
        (i === size - 2 && j === 1) ||
        (i === size - 2 && j === 8)
      ) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }

  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += "</tr>";
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function updateScore(diff) {
  // DONE: update model and dom

  // update model
  gGame.score += diff;
  // update dom
  document.querySelector(".score").innerText = gGame.score;
}

function gameOver() {
  console.log("Game Over");
  // TODO
  clearInterval(gIntervalGhosts);
  renderCell(gPacman.location, "🪦");
  gGame.isOn = false;
}
