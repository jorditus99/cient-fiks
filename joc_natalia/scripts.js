document.addEventListener("DOMContentLoaded", loadPage);

// Maze definition
let maze = [
    `#_#######################################`,
    `#.#.....?..#........#.....#..?.#..#.....#`,
    `#.#####....####.#########.##...#.######.#`,
    `#.............#.........#......#........#`,
    `###.####.###.##.#########.###.###.#######`,
    `#.#...#.........#.......#.#.............#`,
    `#.#.#.####.#########.##.###########.#####`,
    `#.#.#......#.........#........#.........#`,
    `#.#.######.###.##.##.#.########.#######.#`,
    `#......#.#.....#...#.#........#.......#.#`,
    `#.##.#.#.#.#.#.#?....######.#.#.#####...#`,
    `#.#..#.#.###.#.#...#......#.#...#.#.#..?#`,
    `#.#..#.#.....#.#####.####.#.#####.#.....#`,
    `#.####.#.#####...#......#.#.......#.##.##`,
    `#........#...#####.########.#####...#...#`,
    `#####.######..........#...#.#...#####.###`,
    `#.#...#........##.#######.###.#.#.......#`,
    `#.###.#.######.#..#.....#.#...###.#######`,
    `#...#.#.#....#.#.##.#####.#.#.#.#.#.....#`,
    `###.###.#.####.#.#..#...#.#.#.#.#.#.###.#`,
    `#.......#......#.#.##.#.#...#.........#.#`,
    `#.#...#####.####.#..#.#.###.####.######.#`,
    `#.#.?.......#.........#..........#......#`,
    `################################!########`
];

// GLOBAL VARIABLES
// GLOBAL VARIABLES
let currentLevel = maze;
let tableDiv = document.getElementById('background');
let table = document.querySelector('table');
let scoreDisplay, timerDisplay, pointsDisplay;  // Change these to let so they can be reassigned
const lifeContainer = document.getElementById('life');
const tableContainer = document.getElementById('table-container');
let isImmune = false;
let timeRemaining = 240;  // 4 minutes in seconds
let points = timeRemaining;  // Points equal to the countdown time initially
let keyStates = new Map();
let activatedKeyTiles = 0;
let score = 0;
let life = 3;
let gameInterval;
let vides = [];

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `Temps: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function startCountdownTimer() {
    gameInterval = setInterval(() => {
        timeRemaining -= 1;
        points = timeRemaining;

        // Update displays
        updateTimerDisplay(timeRemaining);
        pointsDisplay.textContent = 'Punts: ' + points;

        if (timeRemaining <= 0) {
            clearInterval(gameInterval);
            alert("Oh no, s'ha acabat el temps!");
            location.reload();
        }
    }, 1000);
}

function createGameUI() {
    // Create and append "Manetes" score display
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    scoreDiv.textContent = 'Manetes: 0/5';
    tableContainer.insertBefore(scoreDiv, tableContainer.firstChild);

    // Create and append "Temps" timer display
    const timerDiv = document.createElement('div');
    timerDiv.id = 'timer';
    timerDiv.textContent = 'Temps: 4:00';
    tableContainer.insertBefore(timerDiv, scoreDiv.nextSibling);

    // Create and append "Punts" points display
    const pointsDiv = document.createElement('div');
    pointsDiv.id = 'points';
    pointsDiv.textContent = 'Punts: ' + points;
    tableContainer.insertBefore(pointsDiv, timerDiv.nextSibling);

    // Update global references
    scoreDisplay = document.getElementById('score');
    timerDisplay = document.getElementById('timer');
    pointsDisplay = document.getElementById('points');
}

// DRAWING OF MAZE
function loadPage() {

    // Call createGameUI to create and show the UI elements
    createGameUI();

    // Set initial points and start the countdown timer
    points = 240; // 4 minutes in seconds
    timeRemaining = 240;
    pointsDisplay.textContent = 'Punts: ' + points;
    updateTimerDisplay(timeRemaining); // Initial display as "4:00"
    startCountdownTimer();

    let mover = document.createElement('div');
    mover.style.left = '19.5%';
    mover.style.top = '15%';
    mover.setAttribute('id', 'player');
    mover.textContent = '@';
    tableDiv.appendChild(mover);

    // Function to create an enemy
    function createEnemy(left, top) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.left = `${left}%`;
        enemy.style.top = `${top}%`;
        tableDiv.appendChild(enemy);
        return enemy;
    }

    // Initialize multiple enemies
    let enemies = [
        { element: createEnemy(30, 31), direction: -1 },
        { element: createEnemy(56, 37), direction: -1 },
        { element: createEnemy(29, 66), direction: -1 },
        { element: createEnemy(64, 79), direction: -1 }
    ];

    // Draw the maze
    for (let i = 0; i < currentLevel.length; i++) {
        let row = document.createElement('tr');
        table.appendChild(row);
        for (let x = 0; x < currentLevel[i].length; x++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            cell.innerHTML = maze[i].charAt(x);
            switch (maze[i].charAt(x)) {
                case '#': cell.classList.add('wall'); break;
                case '.': cell.classList.add('freespace'); break;
                case '_': cell.id = 'start'; break;
                case '!': cell.id = 'win'; break;
                case '?': 
                    cell.classList.add('key'); 
                    keyStates.set(cell, false); 
                    break;
            }
        }
    }


    // Enemy movement function
    // Update enemy movement to include collision check
    function moveEnemy(enemyObj) {
        const enemy = enemyObj.element;
        let enemyPosition = parseFloat(window.getComputedStyle(enemy).left);
        let direction = enemyObj.direction;

        setInterval(() => {
            const nextPosition = enemyPosition + direction * 2;
            let collidesWithWall = false;
            const impassableTiles = document.querySelectorAll('.wall');

            for (let tile of impassableTiles) {
                const tileRect = tile.getBoundingClientRect();
                const enemyRect = enemy.getBoundingClientRect();
                if (nextPosition < tileRect.right && nextPosition + enemyRect.width > tileRect.left &&
                    enemyRect.top < tileRect.bottom && enemyRect.bottom > tileRect.top) {
                    collidesWithWall = true;
                    break;
                }
            }

            if (collidesWithWall) {
                direction *= -1;
                enemyObj.direction = direction;
            } else {
                enemyPosition = nextPosition;
                enemy.style.left = `${enemyPosition}px`;
            }

            // Check collision with player
            checkCollisionWithEnemies();
        }, 30);
    }

    // Start enemy movements
    enemies.forEach(enemyObj => moveEnemy(enemyObj));

    // Player movement and key interactions
    window.addEventListener('keydown', (event) => {
        let pos = mover.getBoundingClientRect();
        let newPos = { left: pos.left, top: pos.top };

        // Move based on arrow keys
        switch (event.key) {
            case 'ArrowUp': newPos.top -= 5; break;
            case 'ArrowDown': newPos.top += 5; break;
            case 'ArrowLeft': newPos.left -= 5; break;
            case 'ArrowRight': newPos.left += 5; break;
            case 'x':
            case 'X':
                if (isOnKeyTile && keyTile) {
                    // Toggle key tile color
                    keyTile.style.backgroundColor = keyStates.get(keyTile) ? originalColor : 'blue';
                    keyStates.set(keyTile, !keyStates.get(keyTile));

                    // Update activated key tiles count and score display
                    if (keyStates.get(keyTile)) {
                        activatedKeyTiles++;
                    } else {
                        activatedKeyTiles--;
                    }
                    scoreDisplay.textContent = 'Manetes: ' + activatedKeyTiles + '/5';

                    // Update win tile color if all keys are activated
                    let winTile = document.getElementById('win');
                    winTile.style.backgroundColor = [...keyStates.values()].every(Boolean) ? 'gold' : '';
                }
                return;
        }

        // Check for wall collision
        let collides = [...document.querySelectorAll('.wall')].some(tile => {
            let tileRect = tile.getBoundingClientRect();
            return newPos.left < tileRect.right && newPos.left + pos.width > tileRect.left &&
                   newPos.top < tileRect.bottom && newPos.top + pos.height > tileRect.top;
        });

        // Update position if no collision
        if (!collides) {
            mover.style.left = newPos.left + 'px';
            mover.style.top = newPos.top + 'px';
        }

        detectKeyTile();
        checkWinCollision();
    });

    // Detect if player is on a key tile
    function detectKeyTile() {
        const playerRect = mover.getBoundingClientRect();
        isOnKeyTile = false;
        keyTile = null;
        for (const [tile, active] of keyStates.entries()) {
            const tileRect = tile.getBoundingClientRect();
            if (playerRect.left < tileRect.right && playerRect.right > tileRect.left &&
                playerRect.top < tileRect.bottom && playerRect.bottom > tileRect.top) {
                isOnKeyTile = true;
                keyTile = tile;
                break;
            }
        }
    }

    // Initial detection
    detectKeyTile();


    // Collision detection function
    function checkCollisionWithEnemies() {
        if (isImmune) return; // Exit if the player is currently immune

        const playerRect = mover.getBoundingClientRect();

        for (let enemyObj of enemies) {
            const enemyRect = enemyObj.element.getBoundingClientRect();

            // Check if player and enemy rectangles intersect
            if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left &&
                playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
                
                // Collision detected
                perdre_vida();
                updateLifeStatus();
                console.log("Player hit an enemy! Lives left: ", life);

                // Activate immunity for 3 seconds
                isImmune = true;
                mover.classList.add("immune"); // Optional: visually indicate immunity (e.g., with a CSS effect)

                // Remove immunity after 3 seconds
                setTimeout(() => {
                    isImmune = false;
                    mover.classList.remove("immune"); // Optional: remove the visual indication
                    console.log("Immunity ended");
                }, 3000);

                // Stop further checks to prevent multiple damage events
                break;
            }
        }
    }

    // Check for collision with win tile when it's gold
    function checkWinCollision() {
        const playerRect = mover.getBoundingClientRect();
        const winTile = document.getElementById("win");
        const winTileRect = winTile.getBoundingClientRect();

        // Check if the win tile is gold and player collides with it
        if (winTile.style.backgroundColor === "gold" &&
            playerRect.left < winTileRect.right &&
            playerRect.right > winTileRect.left &&
            playerRect.top < winTileRect.bottom &&
            playerRect.bottom > winTileRect.top) {

            // Stop the countdown
            clearInterval(gameInterval);

            // Show final points and congratulatory message
            alert("Felicitats! Has guanyat amb " + points + " punts!");

            // End the game or reload
            endGame();
            location.reload();
        }
    }


    // Function to end the game
    function endGame() {
        // Remove the event listener for player movement
        window.removeEventListener("keydown", arguments.callee);

        // Stop enemy movement (assuming they use setInterval for movement)
        enemies.forEach((enemyObj) => {
            clearInterval(enemyObj.movementInterval);
        });

        // Optionally, add any additional logic to disable further interactions
    }

    // Actualizar el puntaje y vidas según el tipo de objeto recogido
    function updateScore(imageName) {
        if (imageName === 'lata' || imageName === 'botella') {
            score += 10;
        } else if (imageName === 'pez') {
            life = life - 1;
            perdre_vida();
            checkLives();
            console.log(life);
        }
        scoreDisplay.textContent = 'Puntos: ' + score;

    }

    // Update life and check if game over
    function updateLifeStatus() {
        life -= 1;
        if (life <= 0) {
            alert("Oh no, has perdut!");
            // Optionally reload or reset the game
            location.reload(); // Or handle game reset logic here
        }
    }

    function crear_cor(num) {
        let cor = document.createElement('img');
        vides.push(cor);
        cor.className = "cor";
        cor.id = num + 1;
        cor.src = '../img/vida.png';
        
        // Add position and spacing for hearts
        cor.style.position = "relative"; // Position relative to lifeContainer
        cor.style.left = `${num * 0}px`; // Adjust '30px' as needed to add space between hearts
        
        // Append to life container
        lifeContainer.appendChild(cor);
        tableContainer.appendChild(lifeContainer); // Ensure lifeContainer is appended only once to tableContainer
    }

    function imprimir_vides() {
        for (let i = 0; i < 3; i++) {
            crear_cor(i);
        }
    }

    function perdre_vida() {
        if (vides.length > 0) {
            let vida = vides.pop();
            let corActiu = document.getElementById(vida.id);
            lifeContainer.removeChild(corActiu);
        }
    }

    imprimir_vides();
}