// Declare constant container set equal to object document, method querySelector, passing as an argument class ".container"
const container = document.querySelector(".container");

// Declare constant playerTurn set equal to object document, method getElementById, passing as an argument id "playerTurn"
const playerTurn = document.getElementById("playerTurn");

// Declare constant message set equal to object document, method getElementById, passing as an argument id "message"
const message = document.getElementById("message");

// Declare variable initialMatrix as a 2d array, 6 rows, 7 columns, initialized to all 0s
const rows = 6;
const columns = 7;

// Create a 2D array (matrix) with all elements initialized to 0
const initialMatrix = Array.from({ length: rows }, () => Array(columns).fill(0));


// Declare variable currentPlayer to store the current player
let currentPlayer;



// Check for game over
function gameOverCheck() {
    // Declare variable count, initialized to 0
    var count = 0;
    // Iterate through the 2d array initialMatrix

    // Write a for/of loop to iterate through the rows, loop control variable innerArray, in    2d array initialMatrix\
    for (let innerArray of initialMatrix) {
        if (innerArray.every(val => val !== 0)) {
             // increment variable count by 1
            count++;
        } else {

            return false;
        }
    }
    // If variable count is equal to 6
    if (count === 6) {
        // Set constant message, property innerText, equal to "Game Over"
        message.innerText = "Game Over";
        console.log("Game Over");
        // return false
        return false;
}

}


function checkHorizontal() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i][j + 1] === currentPlayer && initialMatrix[i][j + 2] === currentPlayer && initialMatrix[i][j + 3] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

function checkVertical() {
    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows - 3; i++) {
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i + 1][j] === currentPlayer && initialMatrix[i + 2][j] === currentPlayer && initialMatrix[i + 3][j] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

function checkPositiveDiagonal() {
    for (let i = 3; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i - 1][j + 1] === currentPlayer && initialMatrix[i - 2][j + 2] === currentPlayer && initialMatrix[i - 3][j + 3] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

function checkNegativeDiagonal() {
    for (let i = 3; i < rows; i++) {
        for (let j = 3; j < columns; j++) {
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i - 1][j - 1] === currentPlayer && initialMatrix[i - 2][j - 2] === currentPlayer && initialMatrix[i - 3][j - 3] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

function winCheck(row, column) {
    console.log("winCheck");
    if (checkHorizontal(row, column) || checkVertical(row, column) || checkPositiveDiagonal(row, column) || checkNegativeDiagonal(row, column)) {
        return true;
    } else {
        return false;
    }

}

// Write function setPiece
function setPiece(startCount, colValue) {
    console.log("setPiece")
    try {
        // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
        let rows = document.querySelectorAll(".grid-row")

        //If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0 i. Decrement parameter startCount by 1 ii. Call function setPiece, passing as arguments parameters startCount and colValue
        if (initialMatrix[startCount][colValue] !== 0) {
            startCount--;
            setPiece(startCount, colValue);
        }
        else {
            //Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
            let currentRow = rows[startCount].querySelectorAll(".grid-box");

            //Modify currentRow, index colValue, object classlist, method add, passing as arguments "filled" and `player${currentPlayer}`
            currentRow[colValue].classList.add("filled", `player${currentPlayer}`);

            //Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
            initialMatrix[startCount][colValue] = currentPlayer;

            // If function call winCheck, passing as arguments parameters startCount and colValue, is true 1. Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins` 2. Return false
            if (winCheck(startCount, colValue)) {
                message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
                return false;
            }
        }
    } catch (e) {
        console.log("Column full, select again");
        alert("Column full, select again");
    }


    gameOverCheck();
}


// Write function fillBox
function fillBox(e) {
    console.log("fillBox");

    // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
    let colValue = parseInt(e.target.getAttribute("data-value"));

    // Call function setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue
    setPiece(5, colValue);

    // Switch the currentPlayer, if currently 1 then 2, if currently 2, then 1
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}


// Write function createBoard
function createBoard() {
    console.log("Creating Board");

    // Write an outer for in loop to iterate through the rows, loop control variable innerArray, in 2d array initial Matrix
    for (let innerArray in initialMatrix) {
        // Declare variable outerDiv set equal to object
        // document, method createElement, passing
        // "div" as an argument
        let outerDiv = document.createElement("div");
        // Modify outerDiv, object classList, calling
        // method add, passing argument "grid-row"
        outerDiv.classList.add("grid-row");
        //Modify outerDiv calling method setAttribute,
        // passing arguments "data-value" and loop
        // control variable innerArray
        outerDiv.setAttribute("data-value", innerArray);
        // Write an inner for in loop to iterate through
        //the columns, loop control variable j, in 2d
        //array initialMatrix, index innerArray
        for (let j in initialMatrix[innerArray]) {
            // Set each element in array initialMatrix to the value of 0
            initialMatrix[innerArray][j] = 0;
            // Declare variable innerDiv set equal to
            // object document, method
            // CreateElement, passing "div" as an argument
            let innerDiv = document.createElement("div");
            // Modify innerDiv, object classList,
            //method add, passing argument "gridbox"
            innerDiv.classList.add("grid-box");
            // Modify innerDiv, calling method
            //setAttribute, passing arguments
            // "data-value" and loop control variable
            innerDiv.setAttribute("data-value", j);
            // Modify innerDiv, method
            //addEventListener, passing arguments
            //"click" and (e) => { fillBox(e); }
            innerDiv.addEventListener("click", (e) => { fillBox(e); });
            // Modify outerDiv, method
            //appendChild, passing argument innerDiv
            outerDiv.appendChild(innerDiv);
        }
        // Modify container. method appendChild, passing argument outerDiv
        container.appendChild(outerDiv);

    }
}


// Write function startGame
function startGame() {
    console.log("Starting Game");

    // Set currentPlayer to 1, player 1 always goes first
    currentPlayer = 1;

    // Set the container's innerHTML to an empty string
    container.innerHTML = "";

    // Call function createBoard
    createBoard();

    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;

}
// Extra Reset Button
// Write function resetGame
function resetGame() {
    console.log("Resetting Game");

    // Reset the initialMatrix to all 0s
    initialMatrix.forEach(row => row.fill(0));

    // Remove player1 and player2 classes from all grid boxes
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes.forEach(box => {
        box.classList.remove("player1", "player2");
    });

    // Clear the message
    message.innerText = "";

    // Start the game again
    startGame();
}

// For the window.onload event, call function startGame
window.onload = startGame;

