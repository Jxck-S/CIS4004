import React from "react";
import "./ConnectFour.css";

class ConnectFour extends React.Component {
    // Define the constructor method, parameter list includes props
    constructor(props) {
        // Call the super method and pass the props as an argument
        super(props);
        // Initialize the state object
        this.state = {
            initialMatrix: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            currentPlayer: 1
        };
    }

    // Define function fillbox, receives one parameter, e
    fillBox = (e) => {
        // Declare variable colValue set equal to function parseInt() of
        //parameter e, object target, function getAttribute, passing as
        // argument "data-value"
        let colValue = parseInt(e.target.getAttribute("data-value"));
        // Call function this.setPiece, passing arguments 5 (because we have 6
        //rows, 0 - 5) and variable colValue
        this.setPiece(5, colValue);
        // Call method this.setState to update the state of property
        // currentPlayer, if currently 1 then 2, if currently 2, then 1
        this.setState({
            currentPlayer: this.state.currentPlayer === 1 ? 2: 1
        });
    };


    // Define function setPiece, receives two parameters, startCount and colValue
    setPiece = (startCount, colValue) => {
        //Declare variable initialMatrix intialized to state property initialMatrix
        let initialMatrix = this.state.initialMatrix;
        // Declare variable rows initialized to object document, method
        // querySelectorAll, passing argument class ".grid-row"
        let rows = document.querySelectorAll(".grid-row");
        try {
            // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT
            //identical to 0
            if (initialMatrix[startCount][colValue] !== 0) {
                //Decrement parameter startCount by 1
                startCount--;
                //Call function this.setPiece, passing as
                //arguments parameters startCount and colValue
                this.setPiece(startCount, colValue);
            }
            else {
                // Declare variable currentRow initialized to array rows, index startCount, method
                // querySelectorAll, passing as an argument
                //class ".grid-box"
                let currentRow = rows[startCount].querySelectorAll(".grid-box");
                // Modify currentRow, index colValue, object
                //classlist, method add, passing as arguments
                //"filled" and player${`this.state.currentPlayer}`
                currentRow[colValue].classList.add(`player${this.state.currentPlayer}`);
                currentRow[colValue].classList.add("filled");
                // Update array initialMatrix, indexes startCount and colValue, set equal to
                // this.state.currentPlayer
                initialMatrix[startCount][colValue] = this.state.currentPlayer;
                // If function call this.winCheck is true
                if (this.winCheck()) {
                    //Display an alert dialog box with message "Player " + this.state.currentPlayer + " wins!"
                    setTimeout(() => {
                        alert("Player " + this.state.currentPlayer + " wins!");
                    }, 90);
                    return true;
                }

            }


        }
        catch (e) {
            // Display an alert dialog box with message "Column full, select again"
            alert("Column full, select again");
            console.log(e)
        }
        // Call function this.gameOverCheck
        this.gameOverCheck();

    };

    // Define function winCheck, no parameters
    winCheck = () => {
        if (this.checkHorizontal() || this.checkVertical() || this.checkPositiveDiagonal() || this.checkNegativeDiagonal()) {
            return true;
        }
        return false;
    };


    //Define function checkHorizontal, no parameters
    checkHorizontal = () => {
        //Write a nested for loop to iterate through the rows and columns
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                //If the currentPlayer has four discs in a row horizontally, return true
                if (this.state.initialMatrix[row][col] === this.state.currentPlayer && this.state.initialMatrix[row][col + 1] === this.state.currentPlayer && this.state.initialMatrix[row][col + 2] === this.state.currentPlayer && this.state.initialMatrix[row][col + 3] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        return false;
    };


    // Define function checkVertical, no parameters
    checkVertical = () => {
        //Write a nested for loop to iterate through the rows and columns
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 7; col++) {
                //If the currentPlayer has four discs in a row vertically, return true
                if (this.state.initialMatrix[row][col] === this.state.currentPlayer && this.state.initialMatrix[row + 1][col] === this.state.currentPlayer && this.state.initialMatrix[row + 2][col] === this.state.currentPlayer && this.state.initialMatrix[row + 3][col] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        return false;
    };
    // Define function checkPositiveDiagonal, no parameters
    checkPositiveDiagonal = () => {
        //Write a nested for loop to iterate through the rows and columns
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                // If the currentPlayer has four discs in a row diagonally,
                // bottom right to top left, return true
                if (this.state.initialMatrix[row][col] === this.state.currentPlayer && this.state.initialMatrix[row - 1][col + 1] === this.state.currentPlayer && this.state.initialMatrix[row - 2][col + 2] === this.state.currentPlayer && this.state.initialMatrix[row - 3][col + 3] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        return false;
    };
    // Define function checkNegativeDiagonal, no parameters
    checkNegativeDiagonal = () => {
        //Write a nested for loop to iterate through the rows and columns
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                // If the currentPlayer has four discs in a row diagonally,
                // bottom left to top right, return true
                if (this.state.initialMatrix[row][col] === this.state.currentPlayer && this.state.initialMatrix[row + 1][col + 1] === this.state.currentPlayer && this.state.initialMatrix[row + 2][col + 2] === this.state.currentPlayer && this.state.initialMatrix[row + 3][col + 3] === this.state.currentPlayer) {
                    return true;
                }
            }
        }
        return false;
    };

    // Define function gameOverCheck, no parameters
    gameOverCheck = () => {
        let count = 0;
        let initialMatrix = this.state.initialMatrix;
        // Write a for/of loop to iterate through the rows, loop control variable
        // innerArray, in 2d array initialMatrix
        for (let innerArray of initialMatrix) {
            // If object innerArray, function every(val => (val) != 0))
                //increment variable count by 1
            if (innerArray.every(val => (val) !== 0)) {
                count++;
            }
            else {
                return false;
            }
        }
        if (count === 6) {
            alert("Game Over");
            return true;
        }
    }

    // Define function render() {
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    {this.state.initialMatrix.map((row, rowIndex) => (
                    <div className="grid-row" key={rowIndex}>
                        {row.map((col, colIndex) => (
                        <div className="grid-box" data-value={colIndex} onClick= {(e) => this.fillBox(e)}key={colIndex}></div>
                        ))}
                    </div>
                    ))}
                </div>
                <div id="information">
                    <div className="playerwrappers">
                        <div>Player 1</div>
                        <div className="player1"></div>
                    </div>
                    <div className="playerwrappers">
                        <div>Player 2</div>
                        <div className="player2"></div>
                    </div>
                </div>
                <div className="reset">
                    <button onClick={this.resetGame}>Reset Game</button>
                </div>

            </div>
        );

    }
    resetGame = () => {
        this.setState({
            initialMatrix: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            currentPlayer: 1
        });
        let filled = document.querySelectorAll(".filled");
        filled.forEach((box) => {
            box.classList.remove("filled");
            box.classList.remove("player1");
            box.classList.remove("player2");
        });
    };

}

export default ConnectFour;