var sixSquareBoard = document.querySelector('.sixSquareBoard');
var boxes = sixSquareBoard.querySelectorAll('.box');

var playerOne = sixSquareBoard.querySelector('.playerOne');
var playerTwo = sixSquareBoard.querySelector('.playerTwo');
var retryBtn = sixSquareBoard.querySelector('.retryBtn');

var player = {'X': 'Player One', 'O': 'Player Two'};
var playerOneSign = "X";
var playerTwoSign = "O";
var moveMadeCount = 0;
var playerInputSign;
var win = false;

var winner = sixSquareBoard.querySelector('.winner');
var winnerName = winner.querySelector('.winnerName');
var draw = sixSquareBoard.querySelector('.draw');

var maxMove = 36;
var minWinnerCheckMove = 10;
var rowCount = 6;

// toggle turn to show whose turn is next
function togglePlayerActiveTurn(showPlayer, hidePlayer) {
    var activePlayer = showPlayer.querySelector('.activeCircle');
    var waitingPlayer = hidePlayer.querySelector('.activeCircle');
    if (activePlayer.classList.contains('invisible')) {
        activePlayer.classList.remove('invisible');
        waitingPlayer.classList.add('invisible');
    }
}

// to show which player sign should be added to the box
function changePlayerInputSign() {
    if (moveMadeCount % 2 == 0) {
        playerInputSign = playerOneSign;
        togglePlayerActiveTurn(playerOne, playerTwo);
    } else {
        playerInputSign = playerTwoSign;
        togglePlayerActiveTurn(playerTwo, playerOne);
    }
}

// reset board
function resetBoard() {
    retryBtn.addEventListener('click', function () {
        boxes.forEach(function (box) {
            box.innerHTML = "";
            box.classList.remove('checked');
        });

        moveMadeCount = 0;

        changePlayerInputSign();

        retryBtn.classList.add('d-none');

        win = false;

        if (!winner.classList.contains('d-none')) {
            winner.classList.add('d-none');
        }

        if (!draw.classList.contains('d-none')) {
            draw.classList.add('d-none');
        }

    });
}

// remove active circle or player turn circle after game is completed
function removeActiveStatus() {
    sixSquareBoard.querySelectorAll('.activeCircle').forEach(function (circle) {
        circle.classList.add('invisible');
    });
}

// show retry button
function showRetryButton() {
    retryBtn.classList.remove('d-none');
    resetBoard();
}

// make the boxes as checked so that they can not be clicked
function checkRemainingBoxes() {
    boxes.forEach(function (box) {
        if (!box.classList.contains('checked')) {
            box.classList.add('checked');
        }
    });
}

function checkWinningPattern(pattern) {
    let patternWin = false;
    if (boxes[pattern[0]].innerHTML == boxes[pattern[1]].innerHTML && boxes[pattern[0]].innerHTML == boxes[pattern[2]].innerHTML && boxes[pattern[0]].innerHTML == boxes[pattern[3]].innerHTML && boxes[pattern[0]].innerHTML == boxes[pattern[4]].innerHTML && boxes[pattern[0]].innerHTML == boxes[pattern[5]].innerHTML && boxes[pattern[0]].innerHTML != "") {
        patternWin = true;
    }
    return patternWin;
}

function checkHorizontalWin() {
    let increaseBy = 0;
    let verticalMatchPattern = [];
    let horizontalWin = false;
    for (let i = 0; i < rowCount; i++) {
        let horizontalMatchPattern = [];
        verticalMatchPattern.push(i + increaseBy);
        for (let row = 0; row < rowCount; row++) {
            horizontalMatchPattern.push(row + increaseBy);
        }
        increaseBy += rowCount;
        if (checkWinningPattern(horizontalMatchPattern)) {
            horizontalWin = true;
            break;
        }
    }

    return horizontalWin;
}

function checkVerticalWin() {
    let verticalWin = false;
    for (let i = 0; i < rowCount; i++) {
        let increaseBy = 0;
        let verticalMatchPattern = [];
        for (let row = 0; row < rowCount; row++) {
            verticalMatchPattern.push(i + increaseBy);
            increaseBy += rowCount;
        }
        if (checkWinningPattern(verticalMatchPattern)) {
            verticalWin = true;
            break;
        }
        console.log(verticalMatchPattern)
    }

    return verticalWin;
}

function checkLeftDiagonalWin() {
    let diagonalWin = false;
    let increaseBy = 0;
    let diagonalMatchPattern = [];
    for (let i = 0; i < rowCount; i++) {
        diagonalMatchPattern.push(i + increaseBy);
        increaseBy += rowCount;
    }
    if (checkWinningPattern(diagonalMatchPattern)) {
        diagonalWin = true;
    }
    console.log(diagonalMatchPattern);

    return diagonalWin;
}

function checkRightDiagonalWin() {
    let diagonalWin = false;
    let initial = rowCount - 1;
    let increaseBy = 0;
    let diagonalMatchPattern = [];
    for (let i = 0; i < rowCount; i++) {
        diagonalMatchPattern.push(initial + increaseBy);
        increaseBy += rowCount;
        initial -= 1;
    }
    if (checkWinningPattern(diagonalMatchPattern)) {
        diagonalWin = true;
    }
    console.log(diagonalMatchPattern);

    return diagonalWin;
}

// logic to see if there is a win
function getWinner() {
    if (checkHorizontalWin()) {
        win = true;
    } else if (checkVerticalWin()) {
        win = true;
    } else if (checkLeftDiagonalWin()) {
        win = true;
    } else if (checkRightDiagonalWin()) {
        win = true;
    }
}

// declare winner(show the winner name)
function declareWinner(playerSign) {
    winner.classList.remove('d-none');
    winnerName.innerHTML = player[playerSign] + ' (' + playerSign + ')';
}

// check winner after certain move
function checkWinner() {
    var resetGame = false;
    if (moveMadeCount > minWinnerCheckMove) {
        getWinner();

        if (!win && moveMadeCount == maxMove) {
            draw.classList.remove('d-none');
            resetGame = true;
        } else if (win) {
            declareWinner(playerInputSign);
            checkRemainingBoxes();
            resetGame = true;
        }
    }
    return resetGame;
}

// handle box click event
function handleClick(box) {
    box.addEventListener('click', function () {
        if (!box.classList.contains('checked')) {

            box.innerHTML = playerInputSign;
            box.classList.add('checked');

            moveMadeCount += 1;

            if (checkWinner()) {
                showRetryButton();
                removeActiveStatus();
                return false;
            }

            changePlayerInputSign();
        }

    });
}

// start game
function startGame() {
    boxes.forEach(function (box) {
        changePlayerInputSign();
        handleClick(box)
    });
}

startGame();


let initial = rowCount - 1;
let increaseBy = 0;
let diagonalMatchPattern = [];
for (let i = 0; i < rowCount; i++) {
    diagonalMatchPattern.push(initial + increaseBy);
    increaseBy += 6;
    initial -= 1;
}
console.log(diagonalMatchPattern);
