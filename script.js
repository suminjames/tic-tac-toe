var board = document.querySelector('.board');
var boxes = board.querySelectorAll('.box');

var playerOne = document.querySelector('.playerOne');
var playerTwo = document.querySelector('.playerTwo');
var retryBtn = document.querySelector('.retryBtn');

var playerOneSign = "X";
var playerTwoSign = "O";
var filledCount = 0;
var playerSign;
var win = false;

var winner = document.querySelector('.winner');
var winnerName = winner.querySelector('.winnerName');
var draw = document.querySelector('.draw');

// toggle turn to show whose turn is next
function toggleTurn(showPlayer, hidePlayer) {
    var activePlayer = showPlayer.querySelector('.activeCircle');
    var waitingPlayer = hidePlayer.querySelector('.activeCircle');
    if (activePlayer.classList.contains('invisible')) {
        activePlayer.classList.remove('invisible');
        waitingPlayer.classList.add('invisible');
    }
}

// to show which player sign should be added to the box
function playerTurn() {
    if (filledCount % 2 == 0) {
        playerSign = playerOneSign;
        toggleTurn(playerOne, playerTwo);
    } else {
        playerSign = playerTwoSign;
        toggleTurn(playerTwo, playerOne);
    }
}

// reset board
function resetBoard() {
    retryBtn.classList.remove('d-none');

    retryBtn.addEventListener('click', function () {
        boxes.forEach(function (box) {
            box.innerHTML = "";
            box.classList.remove('checked');
        });

        filledCount = 0;

        playerTurn();

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

// make the boxes as checked so that they can not be clicked
function checkedBoxes() {
    boxes.forEach(function (box) {
        if (!box.classList.contains('checked')) {
            box.classList.add('checked');
        }
    });
}

// remove active circle or player turn circle after game is completed
function removeActiveStatus() {
    document.querySelectorAll('.activeCircle').forEach(function (circle) {
        circle.classList.add('invisible');
    })
}

// declare winner(show the winner name)
function declareWinner(player) {
    winner.classList.remove('d-none');
    winnerName.innerHTML = player;

    removeActiveStatus()
}

// logic to see if there is a win
function checkWinner(player) {
    var winningPattern = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

    winningPattern.forEach(function (pattern) {
        if (boxes[pattern[0]].innerHTML == boxes[pattern[1]].innerHTML && boxes[pattern[0]].innerHTML == boxes[pattern[2]].innerHTML && boxes[pattern[0]].innerHTML != "") {

            declareWinner(player);

            checkedBoxes();

            resetBoard();

            win = true
        }
    });

}

// start game
function startGame() {
    boxes.forEach(function (box) {

        box.addEventListener('click', function () {
            if (!box.classList.contains('checked')) {

                playerTurn();

                box.innerHTML = playerSign;

                if (playerSign == playerOneSign) {
                    toggleTurn(playerTwo, playerOne);
                } else {
                    toggleTurn(playerOne, playerTwo);
                }

                box.classList.add('checked');

                filledCount += 1;

                if (filledCount > 2) {
                    checkWinner(playerSign);

                    if (!win && filledCount == 9) {
                        draw.classList.remove('d-none');
                        removeActiveStatus();
                        resetBoard();
                    }
                }
            }

        });

    });
}

startGame();
