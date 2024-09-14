# Basic Five in a Row
**This project implements a two-player Five-in-a-Row game, traditionally played with black and white stones on a 19x19 grid. The goal of the game is for one player to be the first to form an unbroken row of five stones, either horizontally, vertically, or diagonally.**


## Features:

- **Interactive Game Board:** Local players take turns placing black and white stones on a 19x19 grid using a web-based interface.
- **Turn-Based Gameplay:** The game alternates turns between the black and white teams, with the black team always starting first.
- **Win Detection:** The game automatically detects when a player forms five stones in a row.
- **Score Tracking:** A points system keeps track of how many games each team has won.
- **Game Reset:** A reset button allows players to clear the board and start a new game.


## How to Run the Game:

- Clone the repository.

- Install the required dependencies using requirements.txt:

`pip install -r requirements.txt`

- Run the Flask server:

`python server.py`

Open the game in your browser and start playing!



## Technologies Used:

- **JavaScript:** For the interactive game logic and handling user input.

- **HTML5 Canvas:** To render the game board and stones.

- **Python (Flask):** To manage the game state and handle server-side logic.

- **AJAX:** For client-server communication to process moves and update the game state in real time.



## Extra Notes:

Here are the commands to download the dependencies when using a virtual environment.

`python3 -m venv venv`

`source venv/bin/activate`  (On Windows, use `venv\Scripts\activate`)

`pip install -r requirements.txt`
