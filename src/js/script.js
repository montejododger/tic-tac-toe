const X_CLASS = 'X';
const CIRCLE_CLASS = 'O';

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cellEles = document.querySelectorAll('[data-cell]');
const images = document.querySelectorAll(`img`);

const startingEle = document.getElementById('starter');
const winningMessageEle = document.getElementById('winningMsg');
const restartButton = document.getElementById('restartBtn');

// const winningMessageTextElement = document.querySelector(
//     '[data-winning-message-text]'
// );

let circleTurn;

const GAMESTATE = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
};

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    currentTurn = X_CLASS;
    resetGameState();
    resetGameBoard(cellEles);

    startingEle.classList.toggle('flex');
    startingEle.classList.toggle('hidden');

    // setBoardHoverClass();
    // winningMessageEle.classList.remove('show');
}

function resetGameBoard(cells) {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS, CIRCLE_CLASS);
        cell.querySelectorAll('img').forEach(img =>
            img.classList.add('hidden')
        );
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function resetGameState() {
    for (let i = 0; i < 9; i++) {
        GAMESTATE[i] = null;
    }
}

function handleClick(e) {
    // e.preventDefault();

    const cell = e.currentTarget;

    markBoard(cell);

    if (boardWinner()) {
        return endGame();
    } else if (isDraw()) {
        return endGame();
    } else {
        switchTurns();
    }

    // if (boardWinner()) {
    //     endGame();
    // } else if (isDraw()) {
    //     endGame();
    // } else {
    //     switchTurns();
    // }

    // endGame();
}

function markBoard(cell) {
    const cellNumber = cell.dataset.cell;

    const xImage = cell.querySelector('img[src*="x-symbol-svgrepo-com.svg"]');
    const oImage = cell.querySelector(
        'img[src*="circle-outline-shape-svgrepo-com.svg"]'
    );

    currentTurn === CIRCLE_CLASS
        ? oImage.classList.remove('hidden')
        : xImage.classList.remove('hidden');

    GAMESTATE[cellNumber] = currentTurn;
}

function boardWinner() {
    const winner = WINNING_COMBINATIONS.some(combo => {
        return combo.every(index => {
            return GAMESTATE[index] === currentTurn;
        });
    });

    // console.log(winner);
    return winner;
}

function switchTurns() {
    currentTurn === X_CLASS
        ? (currentTurn = CIRCLE_CLASS)
        : (currentTurn = X_CLASS);
}

function endGame() {
    setTimeout(() => {
        startingEle.classList.toggle('flex');
        startingEle.classList.toggle('hidden');
    }, 1500);
}

// function endGame(draw) {
//     if (draw) {
//         winningMessageTextElement.innerText = 'Draw!';
//     } else {
//         winningMessageTextElement.innerText = `${
//             circleTurn ? "O's" : "X's"
//         } Wins!`;
//     }
//     winningMessageElement.classList.add('show');
// }

function isDraw() {}

// function setBoardHoverClass() {
//     board.classList.remove(X_CLASS);
//     board.classList.remove(CIRCLE_CLASS);
//     if (circleTurn) {
//         board.classList.add(CIRCLE_CLASS);
//     } else {
//         board.classList.add(X_CLASS);
//     }
// }
