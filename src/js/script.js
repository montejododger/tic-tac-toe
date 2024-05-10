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
const playersTurn = document.getElementById('turn');

let gameActive = false;
let circleTurn;

const board = document.getElementById('board');

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
    gameActive = true;
    currentTurn = X_CLASS;
    resetGameState();
    resetGameBoard();

    playersTurn.innerText = `${currentTurn}'s`;
    restartButton.addEventListener('click', () => {
        startingEle.classList.remove('opacity-100');
        startingEle.classList.add('opacity-0');
        setTimeout(() => {
            startingEle.classList.toggle('hidden');
            startingEle.classList.toggle('flex');
        }, 500);
    });
}

function resetGameBoard() {
    cellEles.forEach(cell => {
        cell.classList.add('hover:cursor-pointer');
        cell.classList.remove('clicked', 'hover:cursor-not-allowed');
        toggleImgs(cell);
        cell.querySelectorAll('img').forEach(img =>
            img.classList.add('hidden'),
        );
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function toggleImgs(cell) {
    cell.addEventListener('mouseenter', () => {
        const xImage = cell.querySelector('img[class*="X"]');
        const oImage = cell.querySelector('img[class*="O"]');

        if (!cell.classList.contains('clicked')) {
            currentTurn === CIRCLE_CLASS
                ? oImage.classList.remove('hidden')
                : xImage.classList.remove('hidden');
        }
    });

    cell.addEventListener('mouseleave', () => {
        if (!cell.classList.contains('clicked')) {
            cell.querySelectorAll('img').forEach(img =>
                img.classList.add('hidden'),
            );
        }
    });
}

function resetGameState() {
    for (let i = 0; i < 9; i++) {
        GAMESTATE[i] = null;
    }
}

function handleClick(e) {
    if (!gameActive) return;
    const cell = e.currentTarget;

    markBoard(cell);

    if (boardWinner()) {
        endGame();
    } else if (!isDraw()) {
        const drawFlag = true;
        endGame(drawFlag);
    } else {
        switchTurns();
        playersTurn.innerText = `${currentTurn}'s`;
    }
}

function markBoard(cell) {
    const cellNumber = cell.dataset.cell;

    cell.classList.add('clicked');
    cell.classList.remove('hover:cursor-pointer');
    cell.classList.add('hover:cursor-not-allowed');

    const xImage = cell.querySelector('img[class*="X"]');
    const oImage = cell.querySelector('img[class*="O"]');

    currentTurn === CIRCLE_CLASS
        ? oImage.classList.remove('hidden')
        : xImage.classList.remove('hidden');

    GAMESTATE[cellNumber] = currentTurn;
}

function boardWinner() {
    return WINNING_COMBINATIONS.some(combo => {
        return combo.every(index => {
            return GAMESTATE[index] === currentTurn;
        });
    });
}

function isDraw() {
    return Object.values(GAMESTATE).some(val => val === null);
}

function switchTurns() {
    currentTurn === X_CLASS
        ? (currentTurn = CIRCLE_CLASS)
        : (currentTurn = X_CLASS);
}

function endGame(draw) {
    const winningP = winningMessageEle.querySelector('p');
    gameActive = false;
    startingEle.classList.add('opacity-100');
    startingEle.classList.remove('opacity-0');

    startingEle.classList.toggle('hidden');
    startingEle.classList.toggle('flex');

    setTimeout(() => {
        // startingEle.classList.toggle('hidden');
        // startingEle.classList.toggle('flex');
    }, 1000);

    draw
        ? (winningP.innerText = 'Draw!')
        : (winningP.innerText = ` ${currentTurn} Wins! \n Would you like to play again?`);
}
