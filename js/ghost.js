"use strict";

const GHOST = "&#128123";
var gGhosts = [];
var gEatenGhosts = [];
var gIntervalGhosts;

function createGhosts(board) {
  // DONE: 3 ghosts and an interval
  gGhosts = [];
  for (var i = 0; i < 3; i++) {
    createGhost(board);
  }

  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function createGhost(board) {
  const ghostColor = getRandomColor();
  const ghost = {
    location: {
      i: 2,
      j: 6,
    },
    currCellContent: FOOD,
    color: ghostColor,
    originalColor: ghostColor,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function moveGhosts() {
  // DONE: loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    const ghost = gGhosts[i];
    moveGhost(ghost);
  }
  // console.log('')
}

function moveGhost(ghost) {
  // DONE: figure out moveDiff, nextLocation, nextCell
  const moveDiff = getMoveDiff();
  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // DONE: return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;

  // DONE: hitting a pacman? call gameOver
  if (nextCell === PACMAN && gPacman.isSuper) {
    return;
  }
  if (nextCell === PACMAN) {
    gameOver();
    return;
  }

  // DONE: moving from current location:
  // DONE: update the model (restore prev cell contents)
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // DONE: update the DOM
  renderCell(ghost.location, ghost.currCellContent);

  // DONE: Move the ghost to new location:
  // DONE: update the model (save cell contents)
  ghost.currCellContent = nextCell;
  ghost.location = nextLocation;
  gBoard[nextLocation.i][nextLocation.j] = GHOST;
  // DONE: update the DOM
  renderCell(nextLocation, getGhostHTML(ghost));
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4);

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 };
    case 2:
      return { i: 1, j: 0 };
    case 3:
      return { i: 0, j: -1 };
    case 4:
      return { i: -1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  const ghostColor = ghost.color;
  return `<span style="background-color:#${ghostColor};">${GHOST}</span>`;
}

function getRandomColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return randomColor;
}
