var board = document.querySelector('.board');
var boxes = board.querySelectorAll('.box');

var playerOne = document.querySelector('.playerOne');
var playerTwo = document.querySelector('.playerTwo');
var retryBtn = document.querySelector('.retryBtn');

var player = {'X': 'Player One', 'O': 'Player Two'};
var playerOneSign = "X";
var playerTwoSign = "O";
var moveMadeCount = 0;
var playerInputSign;
var win = false;

var winner = document.querySelector('.winner');
var winnerName = winner.querySelector('.winnerName');
var draw = document.querySelector('.draw');

var maxMove = 9;
var minWinnerCheckMove = 4;

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
    document.querySelectorAll('.activeCircle').forEach(function (circle) {
        circle.classList.add('invisible');
    });
}

// show retry button
function showRetryButton() {
    retryBtn.classList.remove('d-none');
    removeActiveStatus();
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

// logic to see if there is a win
function checkWinningPattern() {
    var winningPattern = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

    winningPattern.forEach(function (pattern) {
        if (boxes[pattern[0]].innerHTML == boxes[pattern[1]].innerHTML && boxes[pattern[0]].innerHTML == boxes[pattern[2]].innerHTML && boxes[pattern[0]].innerHTML != "") {
            win = true
        }
    });

}

// declare winner(show the winner name)
function declareWinner(playerSign) {
    winner.classList.remove('d-none');
    winnerName.innerHTML = player[playerSign] + ' (' + playerSign + ')';
}

// check winner after certain move
function checkWinner() {
    if (moveMadeCount > minWinnerCheckMove) {
        checkWinningPattern();

        if (!win && moveMadeCount == maxMove) {
            draw.classList.remove('d-none');
            showRetryButton();
            return false;
        } else if (win) {
            declareWinner(playerInputSign);
            checkRemainingBoxes();
            showRetryButton();
            return false;
        }
    }
}

// handle box click event
function handleClick(box) {
    box.addEventListener('click', function () {
        if (!box.classList.contains('checked')) {

            box.innerHTML = playerInputSign;
            box.classList.add('checked');

            moveMadeCount += 1;

            checkWinner();

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
