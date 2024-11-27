
const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const lifeContainer = document.getElementById('life')


const basketSpeed = 20; // Velocidad de movimiento de la cesta
const objectSpeed = 5; // Velocidad de caída de los objetos
let fallSpeedMultiplier = 1;
let spawnInterval = 2000;
let basketPosition = gameArea.clientWidth / 2; // Posiciona la cesta en la mitad de gamearea
let score = 0;
let life = 3;
let gameInterval;
let vides = [];

// Definir imágenes de objetos con nombres descriptivos
const imagenes = {
    pez: '../img/img_virginia/Pixel-Art-Fish.png',
    pezYellow:'../img/img_virginia/Pixel-Art-Fish-removebg-preview (2).png',
    pezBlue:'../img/img_virginia/Pixel-Art-Fish-removebg.png',
    lata: '../img/img_virginia/lata.png',
    botella: '../img/img_virginia/plastic.png',
    bolsa:'../img/img_virginia/bolsa-ajustada-removebg-preview.png',
    jellifish: '../img/img_virginia/jellifish-removebg-preview.png'
};

// Inicializar el juego
function initializeGame() {
    imprimir_vides();
    basket.style.left = basketPosition + 'px'; // Posicionar la cesta al inicio
    document.addEventListener('keydown', moveBasket); // EventListener para el movimiento de la cesta
    startGameInterval();

}


// Mover la cesta según las teclas presionadas
function moveBasket(event) {
    if (event.key === 'ArrowLeft') {
        basketPosition = Math.max(0, basketPosition - basketSpeed);
    } else if (event.key === 'ArrowRight') {
        basketPosition = Math.min(gameArea.clientWidth - basket.offsetWidth, basketPosition + basketSpeed);
    }
    basket.style.left = basketPosition + 'px';
}

function startGameInterval() {
    gameInterval = setInterval(createFallingObject, spawnInterval);
}

// Crear un nuevo objeto en una posición aleatoria
function createFallingObject() {
    const object = document.createElement('div');
    const img = document.createElement('img');

    // Seleccionar imagen al azar
    const keys = Object.keys(imagenes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomImage = imagenes[randomKey];

    // Configuración del objeto y agregarlo a la pantalla
    img.src = randomImage;
    img.classList.add('calse_imagen');
    object.classList.add('fallingObject');
    object.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    object.style.top = '0px';
    object.appendChild(img);
    gameArea.appendChild(object);

    // Guardar el nombre de la imagen en el objeto
    object.setAttribute('data-image-name', randomKey);

    // Empezar la caída del objeto
    startFalling(object);
}

// Iniciar la caída del objeto y verificar la colisión con la cesta
function startFalling(object) {
    const fallInterval = setInterval(() => {
        const currentTop = parseFloat(object.style.top);
        object.style.top = currentTop + objectSpeed + 'px';

        // Verificar si el objeto toca la cesta o el fondo
        if (objectReachedBasket(object) || objectReachedBottom(object)) {
            clearInterval(fallInterval); // Detener la caída del objeto
        }
    }, 20);
}

// Verificar si el objeto toca la cesta
function objectReachedBasket(object) {
    const currentTop = parseFloat(object.style.top);
    const objectLeft = parseFloat(object.style.left);
    const objectRight = objectLeft + object.offsetWidth;
    const basketLeft = parseFloat(basket.style.left);
    const basketRight = basketLeft + basket.offsetWidth;

    // Verificar si el objeto ha alcanzado la altura de la cesta
    if (currentTop >= gameArea.clientHeight - basket.offsetHeight - object.offsetHeight) {
        if (objectRight > basketLeft && objectLeft < basketRight) {
            const imageName = object.getAttribute('data-image-name');
            updateScore(imageName);
            object.remove(); // Eliminar el objeto
            return true;
        }
    }
    return false;
}

// Verificar si el objeto ha alcanzado el fondo del área de juego
function objectReachedBottom(object) {
    const currentTop = parseFloat(object.style.top);
    if (currentTop >= gameArea.clientHeight - object.offsetHeight) {
        const imageName = object.getAttribute('data-image-name');
        updateLife(imageName);
        console.log('Objeto no recogido. Imagen: ' + imageName);
        object.remove();
        return true;
    }
    return false;
}

// Actualizar el puntaje y vidas según el tipo de objeto recogido
function updateScore(imageName) {
    if (imageName === 'lata' || imageName === 'botella'|| imageName === 'bolsa') {
        score += 10;
    } else if (imageName === 'pez' || imageName === 'pezYellow'|| imageName === 'pezBlue'|| imageName === 'jellifish') {
        life = life - 1;
        perdre_vida();
        checkLives();
        console.log(life);
    }
    scoreDisplay.textContent = 'Puntos: ' + score;

    if (score % 50 === 0) {
        increaseFallSpeed();
        decreaseSpawnInterval();
    }

}

function increaseFallSpeed() {
    fallSpeedMultiplier += 0.5; // Incrementar el multiplicador para hacer que los objetos caigan más rápido
}

function decreaseSpawnInterval() {
    spawnInterval = Math.max(1000, spawnInterval - 500); // Reducir el intervalo hasta un mínimo de 1000 ms
    clearInterval(gameInterval); // Detener el intervalo actual
    startGameInterval(); // Reiniciar con el nuevo intervalo reducido
}

// Actualizar el vidas según el tipo de objeto no recogido
function updateLife(imageName) {
    if (imageName === 'lata' || imageName === 'botella'|| imageName === 'bolsa') {
        life = life - 1;
        perdre_vida();
        checkLives();
        console.log(life);
    }

}

function endGame() {
    clearInterval(gameInterval); // Detener la creación de objetos
    basket.style.display = 'none'; // Ocultar la cesta
    let elements = document.querySelectorAll('.fallingObject');
    elements.forEach(element => {
        element.remove();
    });
    let byeDiv = document.createElement("div");
    byeDiv.classList.add('tutorial-container');
    let byeDivtext = document.createElement("div");
    byeDivtext.classList.add('tutorial-container-text');
    let byeText = document.createElement("h1");
    byeText.textContent = "FELICITATS";
    let byeTextP = document.createElement("p");
    byeTextP.textContent = "Has conseguido";
    let byeTextScore = document.createElement("p");
    byeTextScore.textContent = " " + score + "";
    let byeTextPuntos = document.createElement("p");
    byeTextPuntos.textContent = "puntos";
    let enlaceBoton = document.createElement("a");
    enlaceBoton.href = '../jocs.html';
    let botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar"
    



    // byeText.classList.add('byeText');
    // byeTextP.classList.add('byeText');

    byeDivtext.appendChild(byeText);
    byeDivtext.appendChild(byeTextP);
    byeDivtext.appendChild(byeTextScore);
    byeDivtext.appendChild(byeTextPuntos);
    enlaceBoton.appendChild(botonContinuar);
    byeDiv.appendChild(byeDivtext);
    byeDiv.appendChild(enlaceBoton);
    // byeDiv.appendChild(byeTextP);

    gameArea.appendChild(byeDiv);

}

function checkLives() {
    if (life <= 0) {
        endGame();
    }
}

function crear_cor(num) {

    let cor = document.createElement('img')
    vides.push(cor);
    cor.className = "cor";
    cor.id = num + 1;
    cor.src = '../img/vida.png';
    cor.style.position = "absolute;"
    lifeContainer.appendChild(cor);
    gameArea.appendChild(lifeContainer);


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




// Inicializar el juego al cargar
initializeGame();