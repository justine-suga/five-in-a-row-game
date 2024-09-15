// Talk to index.html
const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

// Size of the grid
const gridSize = 30;
const boardSize = 19;

// Draw the grid on the canvas
function drawBoard() {
    for (let i = 0; i <= boardSize; i++) {
        // vertical lines
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, boardSize * gridSize);
        
        // horizontal lines
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(boardSize * gridSize, i * gridSize);
    }
    ctx.strokeStyle = "#604CC3";
    ctx.stroke();
}

// Call the function to draw the board
drawBoard();

let currentPlayer = 'black'; // Black starts the game

// array to store the current state of the board
// let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

// Function to draw a stone on the board
function drawStone(x, y, player) {
    ctx.beginPath();
    ctx.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
    ctx.fillStyle = player;
    ctx.fill();
    ctx.closePath();
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
}

// Define point system
let blackPoints = 0;
let whitePoints = 0;

// Function to handle canvas clicks
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize);
    const y = Math.floor((e.clientY - rect.top) / gridSize);

    // Send the move to the server
    fetch('/make-move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x: x, y: y, player: currentPlayer }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.validMove) {
            drawStone(x, y, currentPlayer);

            if (data.winner) {
                alert(`${data.winner.toUpperCase()} wins!`);
                
                if (data.winner === 'black') {
                    blackPoints += 1;
                    document.getElementById('blackPoints').textContent = blackPoints;
                    currentPlayer = 'black';
                } else if (data.winner === 'white') {
                    whitePoints += 1;
                    currentPlayer = 'white';
                    document.getElementById('whitePoints').textContent = whitePoints;
                }
                // Optionally: Disable further moves or reset the game
            } else {
                currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
                document.getElementById('currentPlayer').textContent = currentPlayer.toUpperCase();
            }
        } else {
            alert('Invalid move!');
        }
    });
});

resetButton.addEventListener('click', () => {
    // Send reset request to the server
    fetch('/reset-game', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.reset) {
            currentPlayer = 'black'; // Reset to black starting the game
            clearBoard(); // Clear the board
            alert('Game reset!'); // Show a message
            //drawBoard(); // Redraw the board
        }
    });
});
