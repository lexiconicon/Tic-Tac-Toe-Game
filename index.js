
/* Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on 
whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw, a 
Bootstrap alert or similar Bootstrap component should appear across the screen 
announcing the winner. */

let all = []; //this array holds all moves that are made in the game
let playerX = []; //holds all of Player X's moves
let playerO = []; //holds all of Player O's moves
let currentPlayer = 'X'; //sets starting player as X


let winningCombinations = [ //provides all possible winning combinations to compare to
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];


document.getElementById('startAlert').style.display = "block"; //shows the start game alert

for (let i = 1; i <= 9; i++) { //sets an event listener for each square
    let square = document.getElementById(`square${i}`);
    
    square.addEventListener('click', function(){
        if (square.innerHTML === '') {
            square.innerHTML = currentPlayer; //sets the box to display the currentPlayer value
            squareClicked(i);
        } 
    });
}


function squareClicked(id) { //function for when a square is clicked
    document.getElementById('startAlert').style.display = 'none'; //once a square is clicked, hide the start game alert
    console.log('Square clicked');
    all.push(id); //pushes all moves to the all array
  
    if (currentPlayer === 'X') { //if X is the current player, add to their array and check for  a win
        playerX.push(id);
        if (checkForWin(playerX)) {
            showWinnerAlert('X');
            return;
        }
    } else { //add to player O array and check for a win
        playerO.push(id);
        if (checkForWin(playerO)) {
            showWinnerAlert('O');
            return;
        }
    } 
    //check for a tie when all squares are filled without a winner
    if (all.length === 9) {
        showTieAlert();
        return;
    }
    //Switch player every turn and update the heading
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turnMarker').innerText = currentPlayer + "'s Turn!";
}


function checkForWin(playerMoves) { //compares the player's moves to the winning combinations array
    return winningCombinations.some(combination => 
        combination.every(value => playerMoves.includes(value)));
}

function showWinnerAlert(winner) { //show the winner alert
    let winnerAlert = document.getElementById('winnerAlert');
    winnerAlert.innerHTML = `${winner} Wins!`;
    winnerAlert.style.display = 'block';
}

function showTieAlert() { //show the tie alert
    let tieAlert = document.getElementById('tieAlert');
    tieAlert.style.display = 'block'; 
}

function resetGame() { //function to reset game
    //reset the arrays, current player, and turn marker
    all = [];
    playerX = [];
    playerO = [];
    currentPlayer = "X";
    document.getElementById('turnMarker').innerText = "X's Turn!";

    for (let i = 1; i <= 9; i++) { //clear the squares
        document.getElementById(`square${i}`).innerHTML= '';
    }
    //reset alerts
    document.getElementById('winnerAlert').style.display = 'none';
    document.getElementById('tieAlert').style.display = 'none';
    document.getElementById('startAlert').style.display = 'block'; 
}

document.getElementById('newGameBtn').addEventListener('click', resetGame); //reset function on button click