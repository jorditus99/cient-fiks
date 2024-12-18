document.addEventListener("DOMContentLoaded", loadPage);

let maze = [
    `#########################################`,
    `#.#......?.#........#.....#..?.#..#.....#`,
    `#.######...####.#########.##...#.######.#`,
    `#.............#.........#......#........#`,
    `###.####.###.##.#########.###.###.#######`,
    `#.#...#.........#.......#.#.............#`,
    `#.#.#.####.#########.##.###########.#####`,
    `#.#.#......#.........#........#.........#`,
    `#.#.######.###.##.##.#.########.#######.#`,
    `#......#.#.....#...#.#........#.......#.#`,
    `####.#.#.#.#.#.#?....######.#.#.#####...#`,
    `#.#..#.#.###.#.#...#......#.#...#.#.#..?#`,
    `#.#..#.#.....#.#####.####.#.#####.#.....#`,
    `#.####.#.#####...#......#.#.......#.##.##`,
    `#........#...#####.########.#####...#...#`,
    `#.###.######..........#...#.#...#####.###`,
    `#.#...#........##.#######.###.#.#.......#`,
    `#.###.#.######.#..#.....#.#...###.#######`,
    `#...#.#.#....#.#.##.#####.#.#.#.#.#.....#`,
    `###.###.#.####.#.#..#...#.#.#.#.#.#.###.#`,
    `#.#.....#......#.#..#...#...#.........#.#`,
    `#.#...#####.####.##.#.#.###.####.######.#`,
    `#...?............#....#........#!#......#`,
    `#########################################`
];


let currentLevel = maze;
let tableDiv = document.getElementById('background');
let table = document.querySelector('table');
let scoreDisplay, timerDisplay;
const lifeContainer = document.getElementById('life');
const tableContainer = document.getElementById('table-container');
let isImmune = false;
let timeRemaining;
let score = timeRemaining;
let keyStates = new Map();
let activatedKeyTiles = 0;
let life = 3;
let gameInterval;
let vides = [];

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `Temps: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function gameWin() {

    const gameArea = document.getElementById('table-container');

    clearInterval(gameInterval);

    const player = document.getElementById('player');
    if (player) {
        player.style.display = 'none';
    }

    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        enemy.style.display = 'none';
    });

    let byeDiv = document.createElement("div");
    byeDiv.classList.add('tutorial-container');

    let byeDivtext = document.createElement("div");
    byeDivtext.classList.add('tutorial-container-text');

    let h1 = document.createElement("h1");
    h1.textContent = "FELICITATS!!";

    let byeTextP = document.createElement("p");
    byeTextP.textContent = "Has aconseguit activar totes les manetes i...";

    let byeTextScore = document.createElement("p");
    byeTextScore.setAttribute('class', 'punts');
    byeTextScore.textContent = " " + score + " punts!";

    let enlaceBoton = document.createElement("a");
  
    enlaceBoton.href = '../ranquing.php'; // Set the URL
    enlaceBoton.style.textDecoration = "none"; // Optional: Remove underline for the link

    let botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar";

    enlaceBoton.appendChild(botonContinuar);
    byeDivtext.appendChild(h1);
    byeDivtext.appendChild(byeTextP);
    byeDivtext.appendChild(byeTextScore);
    byeDivtext.appendChild(enlaceBoton);

    byeDiv.appendChild(byeDivtext);

    gameArea.appendChild(byeDiv);

}

function gameOver() {

    const gameArea = document.getElementById('table-container');

    clearInterval(gameInterval);

    const player = document.getElementById('player');
    if (player) {
        player.style.display = 'none';
    }

    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        enemy.style.display = 'none';
    });

    let byeDiv = document.createElement("div");
    byeDiv.classList.add('tutorial-container');

    let byeDivtext = document.createElement("div");
    byeDivtext.classList.add('tutorial-container-text');

    let h1 = document.createElement("h1");
    h1.textContent = "OH NO!!";

    let byeTextP = document.createElement("p");
    byeTextP.textContent = "T'has quedat sense vides! Torna-ho a provar...";

    let botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar";
    botonContinuar.addEventListener('click', () => {
        location.reload();
    });


    byeDivtext.appendChild(h1);
    byeDivtext.appendChild(byeTextP);
    byeDivtext.appendChild(botonContinuar);
    byeDiv.appendChild(byeDivtext);

    gameArea.appendChild(byeDiv);

}

function timeIsUp() {
    const gameArea = document.getElementById('table-container');

    clearInterval(gameInterval);

    const player = document.getElementById('player');
    if (player) {
        player.style.display = 'none';
    }

    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        enemy.style.display = 'none';
    });

    let byeDiv = document.createElement("div");
    byeDiv.classList.add('tutorial-container');

    let byeDivtext = document.createElement("div");
    byeDivtext.classList.add('tutorial-container-text');

    let h1 = document.createElement("h1");
    h1.textContent = "OH NO!!";

    let byeTextP = document.createElement("p");
    byeTextP.textContent = "S'ha acabat el temps! Torna-ho a provar...";

    let botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar";
    botonContinuar.addEventListener('click', () => {
        location.reload();
    });


    byeDivtext.appendChild(h1);
    byeDivtext.appendChild(byeTextP);
    byeDivtext.appendChild(botonContinuar);
    byeDiv.appendChild(byeDivtext);

    gameArea.appendChild(byeDiv);
}

function startCountdownTimer() {
    gameInterval = setInterval(() => {
        timeRemaining -= 1;
        score = timeRemaining;

        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {

            clearInterval(gameInterval);
            timeIsUp();

        }
    }, 1000);
}

function createGameUI() {

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    scoreDiv.textContent = 'Manetes: 0/5';
    tableContainer.insertBefore(scoreDiv, tableContainer.firstChild);

    const timerDiv = document.createElement('div');
    timerDiv.id = 'timer';
    timerDiv.textContent = 'Temps: 4:00';
    tableContainer.insertBefore(timerDiv, scoreDiv.nextSibling);

    scoreDisplay = document.getElementById('score');
    timerDisplay = document.getElementById('timer');
}


function loadPage() {

    function updateElementSizeAndPosition() {
        const containerWidth = tableContainer.offsetWidth;
        const containerHeight = tableContainer.offsetHeight;

        // Set maxTableHeight as a percentage of the container's height (e.g., 50%)
        const maxTableHeight = containerHeight * 0.9; // Adjust 0.5 for the desired percentage

        const rows = maze.length;
        const columns = maze[0].length;

        // Calculate cell sizes
        const cellWidth = containerWidth / columns;
        const cellHeight = Math.min(containerHeight / rows, maxTableHeight / rows);

        // Update the size of each cell
        document.querySelectorAll('td').forEach(cell => {
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;
        });

        const player = document.getElementById('player');
        if (player) {
            player.style.width = `${cellWidth * 0.6}px`;  // Make player 60% of the cell width
            player.style.height = `${cellHeight * 0.8}px`; // Make player 80% of the cell height
        }

        document.querySelectorAll('.enemy').forEach(enemy => {
            enemy.style.width = `${cellWidth * 0.8}px`;  // Make enemies % of the cell width
            enemy.style.height = `${cellHeight * 0.6}px`; // Make enemies % of the cell height
        });
    }

    createGameUI();

    timeRemaining = 240; // Establece segundos de juego
    score = timeRemaining;
    updateTimerDisplay(timeRemaining);
    startCountdownTimer();

    let mover = document.createElement('div');
    mover.style.left = '18.7%';
    mover.style.top = '18%';
    mover.setAttribute('id', 'player');
    mover.style.backgroundImage = "url('/img/img_natalia/player_down2.png')";
    tableDiv.appendChild(mover);


    function createEnemy(left, top) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.left = `${left}%`;
        enemy.style.top = `${top}%`;
        tableDiv.appendChild(enemy);
        return enemy;
    }


    let enemies = [
        { element: createEnemy(30, 29.4), direction: -1 },
        { element: createEnemy(56, 36.5), direction: -1 },
        { element: createEnemy(29, 68.4), direction: -1 },
        { element: createEnemy(70, 82.7), direction: -1 }
    ];


    for (let i = 0; i < currentLevel.length; i++) {
        let row = document.createElement('tr');
        table.appendChild(row);
        for (let x = 0; x < currentLevel[i].length; x++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            cell.innerHTML = maze[i].charAt(x);
            switch (maze[i].charAt(x)) {
                case '#':
                    cell.classList.add('wall');
                    break;
                case '.':
                    cell.classList.add('freespace');
                    break;
                case '_':
                    cell.id = 'start';
                    break;
                case '!':
                    cell.id = 'win';
                    cell.style.backgroundImage = "url('/img/img_natalia/door_off.png')";
                    break;
                case '?':
                    cell.classList.add('key');
                    keyStates.set(cell, false);
                    cell.style.backgroundImage = "url('/img/img_natalia/manivela_off.png')";
                    break;
            }
        }
    }

    updateElementSizeAndPosition();

    window.addEventListener('resize', updateElementSizeAndPosition);


    function moveEnemy(enemyObj) {
        const enemy = enemyObj.element;
        let enemyPosition = parseFloat(window.getComputedStyle(enemy).left);
        let direction = enemyObj.direction;


        const updateGraphic = () => {

            enemy.style.backgroundImage = direction > 0 
                ? "url('/img/img_natalia/rat_right.gif')" 
                : "url('/img/img_natalia/rat_left.gif')";
        };
        updateGraphic();

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
                updateGraphic();
            } else {
                enemyPosition = nextPosition;
                enemy.style.left = `${enemyPosition}px`;
            }


            checkCollisionWithEnemies();
        }, 30);
    }


    enemies.forEach(enemyObj => moveEnemy(enemyObj));


    window.addEventListener('keydown', (event) => {
        let pos = mover.getBoundingClientRect();
        let newPos = { left: pos.left, top: pos.top };


        const updatePlayerGraphic = (direction) => {
            switch (direction) {
                case 'up': mover.style.backgroundImage = "url('/img/img_natalia/player_up.gif')"; break;
                case 'down': mover.style.backgroundImage = "url('/img/img_natalia/player_down.gif')"; break;
                case 'left': mover.style.backgroundImage = "url('/img/img_natalia/player_left.gif')"; break;
                case 'right': mover.style.backgroundImage = "url('/img/img_natalia/player_right.gif')"; break;
            }
        };

        switch (event.key) {
            case 'ArrowUp':
                newPos.top -= 5;
                updatePlayerGraphic('up');
                break;
            case 'ArrowDown':
                newPos.top += 5;
                updatePlayerGraphic('down');
                break;
            case 'ArrowLeft':
                newPos.left -= 5;
                updatePlayerGraphic('left');
                break;
            case 'ArrowRight':
                newPos.left += 5;
                updatePlayerGraphic('right');
                break;
            case 'w':
            case 'W':
                newPos.top -= 5;
                updatePlayerGraphic('up');
                break;
            case 's':
            case 'S':
                newPos.top += 5;
                updatePlayerGraphic('down');
                break;
            case 'a':
            case 'A':
                newPos.left -= 5;
                updatePlayerGraphic('left');
                break;
            case 'd':
            case 'D':
                newPos.left += 5;
                updatePlayerGraphic('right');
                break;
            case 'x':
            case 'X':

                if (isOnKeyTile && keyTile) {
                    const deactivatedImage = '/img/img_natalia/manivela_off.png';
                    const activatedImage = '/img/img_natalia/manivela_on.png';

                    if (keyStates.get(keyTile)) {
                        keyTile.style.backgroundImage = `url(${deactivatedImage})`;
                        keyStates.set(keyTile, false);
                        activatedKeyTiles--;
                    } else {
                        keyTile.style.backgroundImage = `url(${activatedImage})`;
                        keyStates.set(keyTile, true);
                        activatedKeyTiles++;
                    }

                    scoreDisplay.textContent = 'Manetes: ' + activatedKeyTiles + '/5';

                    let winTile = document.getElementById('win');
                    if ([...keyStates.values()].every(Boolean)) {

                        winTile.style.backgroundImage = "url('/img/img_natalia/door_on.png')"; 
                    } else {
                        winTile.style.backgroundImage = "url('/img/img_natalia/door_off.png')";
                    }

                }
                return;
        }


        let collides = [...document.querySelectorAll('.wall')].some(tile => {
            let tileRect = tile.getBoundingClientRect();
            return newPos.left < tileRect.right && newPos.left + pos.width > tileRect.left &&
                newPos.top < tileRect.bottom && newPos.top + pos.height > tileRect.top;
        });


        if (!collides) {
            mover.style.left = newPos.left + 'px';
            mover.style.top = newPos.top + 'px';
        }

        detectKeyTile();
        checkWinCollision();
    });


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

    detectKeyTile();


    function checkCollisionWithEnemies() {

        if (isImmune) return;

        const playerRect = mover.getBoundingClientRect();

        for (let enemyObj of enemies) {
            const enemyRect = enemyObj.element.getBoundingClientRect();

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

    function checkWinCollision() {
        const playerRect = mover.getBoundingClientRect();
        const winTile = document.getElementById("win");
        const winTileRect = winTile.getBoundingClientRect();
    
        if (winTile.style.backgroundImage.includes("door_on.png") &&

            playerRect.left < winTileRect.right &&
            playerRect.right > winTileRect.left &&
            playerRect.top < winTileRect.bottom &&
            playerRect.bottom > winTileRect.top) {


            clearInterval(gameInterval);
            enviar_puntuacio(score);
            gameWin();

        }
    }

    function enviar_puntuacio(score) {

        fetch('../php_library/puntuacio.php?id_juego=5&puntuacio=' + score)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error al enviar la puntuación:', error);
            });
    }


    // Update life and check if game over
    function updateLifeStatus() {
        life -= 1;
        if (life <= 0) {

            clearInterval(gameInterval);
            gameOver();

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