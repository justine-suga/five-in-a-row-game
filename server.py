from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Initialize the game state
board_size = 19
game_state = [[None for _ in range(board_size)] for _ in range(board_size)]

# Directions for checking rows: (dx, dy) for horizontal, vertical, and diagonal directions
directions = [(1, 0), (0, 1), (1, 1), (1, -1)]

def check_winner(x, y, player):
    """ Check if the current move at (x, y) by 'player' results in a win (5 in a row). """
    for dx, dy in directions:
        count = 1  # Include the current stone

        # Check in the positive direction (dx, dy)
        count += count_stones(x, y, player, dx, dy)
        
        # Check in the negative direction (-dx, -dy)
        count += count_stones(x, y, player, -dx, -dy)

        # If 5 or more stones are aligned, we have a winner
        if count >= 5:
            return True

    return False

def count_stones(x, y, player, dx, dy):
    """ Count the number of consecutive stones in one direction (dx, dy). """
    count = 0
    for i in range(1, 5):  # Check up to 4 steps in each direction
        nx, ny = x + i * dx, y + i * dy
        if 0 <= nx < board_size and 0 <= ny < board_size and game_state[ny][nx] == player:
            count += 1
        else:
            break
    return count

@app.route('/make-move', methods=['POST'])
def make_move():
    move = request.json
    x = move['x']
    y = move['y']
    player = move['player']

    # Check if the spot is empty
    if game_state[y][x] is None:
        game_state[y][x] = player  # Update the game state

        # Check if this move results in a win
        if check_winner(x, y, player):
            return jsonify({'validMove': True, 'winner': player})
        else:
            return jsonify({'validMove': True, 'winner': None})
    else:
        return jsonify({'validMove': False})

# Reset the game state
@app.route('/reset-game', methods=['POST'])
def reset_game():
    global game_state
    game_state = [[None for _ in range(board_size)] for _ in range(board_size)]  # Clear the game state
    return jsonify({'reset': True})

if __name__ == '__main__':
    app.run(debug=True)
