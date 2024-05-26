const game_overlay = document.querySelector('.game');
const player = document.querySelector('.player');
const game_boxes = document.querySelectorAll('.game_box');
const restBtn = document.querySelector('.rest');
// first conditions
let isPlayerOne = true;
let gameOver = false;
let draw = 0;
const boxes = {
  1: { check: false, xOrO: '' },
  2: { check: false, xOrO: '' },
  3: { check: false, xOrO: '' },
  4: { check: false, xOrO: '' },
  5: { check: false, xOrO: '' },
  6: { check: false, xOrO: '' },
  7: { check: false, xOrO: '' },
  8: { check: false, xOrO: '' },
  9: { check: false, xOrO: '' },
};
const winConditions = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

// Game logic
// Clicking box X or O
game_overlay.addEventListener('click', (e) => {
  const clicked = e.target.closest('.game_box');

  if (!clicked || gameOver) return;

  let boxNumber = clicked.dataset.box;
  // if empty or not
  // add X if player 1 is playing
  changePlayer(clicked, boxNumber);
  // if the winning condition is true
  wins();
  // id draw
});

restBtn.addEventListener('click', () => {
  isPlayerOne = true;
  gameOver = false;
  draw = 0;
  player.textContent = "X's turn";

  for (const value of Object.values(boxes)) {
    value.check = false;
    value.xOrO = '';
  }
  game_boxes.forEach((el) => {
    el.innerHTML = '';
  });
});

function wins() {
  winConditions.forEach((cond) => {
    const cellA = boxes[cond[0]]['xOrO'];
    const cellB = boxes[cond[1]]['xOrO'];
    const cellC = boxes[cond[2]]['xOrO'];
    if (cellA === '' && cellB === '' && cellC === '') {
      return;
    } else if (cellA === cellB && cellB === cellC) {
      gameOver = true;
      player.textContent = `The Player ${cellA === 'x' ? 'X' : 'O'} Wins`;
    }
  });
}

function changePlayer(elementClicked, elementNumber) {
  // add X if player 1 is playing
  if (isPlayerOne && !boxes[elementNumber]['check']) {
    elementClicked.insertAdjacentHTML('afterbegin', markUp(1));
    isPlayerOne = !isPlayerOne;
    player.textContent = "O's turn";
    boxes[elementNumber].check = true;
    boxes[elementNumber].xOrO = 'x';
    draw++;
  } else if (!isPlayerOne && !boxes[elementNumber]['check']) {
    //add o of player 2 is playing
    elementClicked.insertAdjacentHTML('afterbegin', markUp(2));
    isPlayerOne = !isPlayerOne;
    player.textContent = "X's turn";
    boxes[elementNumber].check = true;
    boxes[elementNumber].xOrO = 'o';
    draw++;
  }
  if (draw === 9) {
    player.textContent = 'Draw';
  }
}
// add X or O
function markUp(type) {
  if (type === 1) {
    return '<i class="fa-solid fa-x"></i>';
  }
  if (type === 2) {
    return '<i class="fa-solid fa-o"></i>';
  }
}
