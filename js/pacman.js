"use strict";

const PACMAN = "😀";
var gPacman;

function createPacman(board) {
  // DONE: initialize gPacman...
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },
    isSuper: false,
  };

  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function onMovePacman(ev) {
  // DONE: use getNextLocation(), nextCell
  if (!gGame.isOn) return;
  const nextLocation = getNextLocation(ev.key);
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // DONE: return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === SUPER_FOOD && gPacman.isSuper) return;
  // DONE: hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      var ghost = getGhostLocation(nextLocation);

      if (!ghost) return;

      handleEatGhost(ghost);
      // DONE: moving from current location:
      // DONE: update the model
      gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
      // DONE: update the DOM
      renderCell(gPacman.location, EMPTY);

      // DONE: Move the pacman to new location:
      // DONE: update the model
      gBoard[nextLocation.i][nextLocation.j] = PACMAN;
      gPacman.location = nextLocation;
      // DONE: update the DOM
      renderCell(nextLocation, PACMAN);
      return;
    }
    gameOver();
    return;
  }

  if (nextCell === FOOD) {
    updateScore(1);
    if (gFoodCount != 0) {
      gFoodCount--;
    } else {
      setVictory();
    }
  }
  if (nextCell === SUPER_FOOD && !gPacman.isSuper) {
    pacSuperMode();
  }

  // DONE: moving from current location:
  // DONE: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // DONE: update the DOM
  renderCell(gPacman.location, EMPTY);

  // DONE: Move the pacman to new location:
  // DONE: update the model
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  gPacman.location = nextLocation;
  // DONE: update the DOM
  renderCell(nextLocation, PACMAN);
}

function getNextLocation(eventKeyboard) {
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // DONE: figure out nextLocation
  switch (eventKeyboard) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
  }
  return nextLocation;
}

function pacSuperMode() {
  gPacman.isSuper = true;
  var ghostColor = "0000FF";

  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    ghost.color = ghostColor;
  }

  setTimeout(function () {
    gPacman.isSuper = false;

    for (var i = 0; i < gGhosts.length; i++) {
      var ghost = gGhosts[i];
      ghost.color = ghost.originalColor;
    }

    while (gEatenGhosts.length) {
      var ghost = gEatenGhosts.pop();
      gGhosts.push(ghost);
      gBoard[ghost.location.i][ghost.location.j] = GHOST;
      renderCell(ghost.location, getGhostHTML(ghost));
    }
  }, 5000);
}
function getGhostLocation(location) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === location.i &&
      gGhosts[i].location.j === location.j
    )
      return gGhosts[i];
  }
  return null;
}
function handleEatGhost(ghost) {
  var eatenGhost = gGhosts.splice(gGhosts.indexOf(ghost), 1)[0];
  gEatenGhosts.push({
    location: {
      i: eatenGhost.location.i,
      j: eatenGhost.location.j,
    },
    originalColor: eatenGhost.originalColor,
    currCellContent: EMPTY,
  });
}
