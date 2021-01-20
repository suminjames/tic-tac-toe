let selectGameType = document.querySelector('.selectGameType');

getSelectedGame(selectGameType.value);

selectGameType.addEventListener('change', function () {
    getSelectedGame(this.value)
});

// get game according to the selected game type
function getSelectedGame(gameType) {
    let threeSquareBoard = document.querySelector('.threeSquareBoard');
    let sixSquareBoard = document.querySelector('.sixSquareBoard');
    let minWinnerCheckMove;
    if (gameType == 3) {
        minWinnerCheckMove = 4;
        toggleBoard(threeSquareBoard, sixSquareBoard, parseInt(gameType), minWinnerCheckMove)
    } else if (gameType == 6) {
        minWinnerCheckMove = 10;
        toggleBoard(sixSquareBoard, threeSquareBoard, parseInt(gameType), minWinnerCheckMove)
    }
}

// toggle board depending on the selected game type
function toggleBoard(showBoard, hideBoard, gameType, minWinnerCheckMove) {
    if (showBoard.classList.contains('d-none')) {
        showBoard.classList.remove('d-none');
        showBoard.classList.add('d-flex');

        hideBoard.classList.add('d-none');
        hideBoard.classList.remove('d-flex');
    }

    initializeGame(showBoard, gameType, minWinnerCheckMove);
}

// initialize a game
function initializeGame(board, gameType, minWinnerCheckMove) {
    var boxes = board.querySelectorAll('.box');

    var playerOne = board.querySelector('.playerOne');
    var playerTwo = board.querySelector('.playerTwo');
    var retryBtn = board.querySelector('.retryBtn');

    var player = {'X': 'Player One', 'O': 'Player Two'};
    var playerOneSign = "X";
    var playerTwoSign = "O";
    var moveMadeCount = 0;
    var playerInputSign;
    var win = false;

    var winner = board.querySelector('.winner');
    var winnerName = winner.querySelector('.winnerName');
    var draw = board.querySelector('.draw');

    var maxMove = gameType * gameType;
    var rowCount = gameType;

    var winningPattern = [];

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

    // get horizontal winning pattern which can be used to check the winner
    function getHorizontalPattern() {
        let increaseBy = 0;
        let matchingPattern = [];
        for (let i = 0; i < rowCount; i++) {
            let horizontalMatchPattern = [];
            for (let row = 0; row < rowCount; row++) {
                horizontalMatchPattern.push(row + increaseBy);
            }
            increaseBy += rowCount;
            // console.log(horizontalMatchPattern);
            matchingPattern.push(horizontalMatchPattern)
        }
        // console.log(matchingPattern);
        return matchingPattern;
    }

    // get vertical winning pattern which can be used to check the winner
    function getVerticalPattern() {
        let matchingPattern = [];
        for (let i = 0; i < rowCount; i++) {
            let increaseBy = 0;
            let verticalMatchPattern = [];
            for (let row = 0; row < rowCount; row++) {
                verticalMatchPattern.push(i + increaseBy);
                increaseBy += rowCount;
            }
            // console.log(verticalMatchPattern);
            matchingPattern.push(verticalMatchPattern)
        }
        // console.log(matchingPattern);
        return matchingPattern;
    }

    // get left diagonal winning pattern which can be used to check the winner
    function getLeftDiagonalPattern() {
        let increaseBy = 0;
        let diagonalMatchPattern = [];
        for (let i = 0; i < rowCount; i++) {
            diagonalMatchPattern.push(i + increaseBy);
            increaseBy += rowCount;
        }
        // console.log(diagonalMatchPattern);
        return diagonalMatchPattern;
    }

    // get right diagonal winning pattern which can be used to check the winner
    function getRightDiagonalPattern() {
        let initial = rowCount - 1;
        let increaseBy = 0;
        let diagonalMatchPattern = [];
        for (let i = 0; i < rowCount; i++) {
            diagonalMatchPattern.push(initial + increaseBy);
            increaseBy += rowCount;
            initial -= 1;
        }

        // console.log(diagonalMatchPattern);
        return diagonalMatchPattern;
    }

    // get combined winning pattern and assign it to a array
    function getWinningPattern() {
        winningPattern = getHorizontalPattern().concat(getVerticalPattern());
        winningPattern.push(getLeftDiagonalPattern());
        winningPattern.push(getRightDiagonalPattern());
        console.log(winningPattern)
    }

    // check if there is a win, depending on the matched winning patterns
    function checkWinningPattern() {
        for (let pattern of winningPattern) {
            let sameElement = false;
            // debugger;
            let initialElement = boxes[pattern[0]].innerHTML;
            for (let i = 1; i < rowCount; i++) {
                let nextElement = boxes[pattern[i]].innerHTML;
                if (initialElement == nextElement && initialElement != "") {
                    sameElement = true;
                    initialElement = nextElement
                } else {
                    sameElement = false;
                    break;
                }
            }
            if (sameElement) {
                win = true;
                break;
            }
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
            checkWinningPattern();

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
        getWinningPattern();

        boxes.forEach(function (box) {
            changePlayerInputSign();
            handleClick(box)
        });
    }

    startGame();
}

