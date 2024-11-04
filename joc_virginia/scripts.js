const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
let basketPosition = gameArea.clientWidth / 2;
const basketSpeed = 15;
const objectSpeed = 2; // Velocidad de caída de los objetos
const scoreDisplay = document.getElementById('score');
let score = 0;
const imagenes = {
    pez: '../img/img_virginia/Pixel-Art-Fish.png',
    lata: '../img/img_virginia/lata.png',
    botella: '../img/img_virginia/plastic.png'
};

// Posicionar la cesta al inicio
basket.style.left = basketPosition + 'px';

// Función para mover la cesta
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        basketPosition = Math.max(0, basketPosition - basketSpeed);
    } else if (event.key === 'ArrowRight') {
        basketPosition = Math.min(gameArea.clientWidth - basket.offsetWidth, basketPosition + basketSpeed);
    }
    basket.style.left = basketPosition + 'px';
});

// Función para crear objetos en posiciones aleatorias
function createFallingObject() {
    const object = document.createElement('div');
    const img = document.createElement('img');
    const keys = Object.keys(imagenes); // Obtiene los nombres ["pez", "lata", "botella"]
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomImage = imagenes[randomKey];
    img.src = randomImage;
    img.classList.add('calse_imagen')
    object.classList.add('fallingObject');
    object.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    object.style.top = '0px';
    object.appendChild(img);
    gameArea.appendChild(object);

    // Guardar el índice o ruta de la imagen como un atributo en el objeto
    object.setAttribute('data-image-name', randomKey);

    // Caída del objeto
    const fallInterval = setInterval(() => {
        const currentTop = parseFloat(object.style.top);
        object.style.top = currentTop + objectSpeed + 'px';
        // Obtener las posiciones horizontales del objeto y de la cesta
    const objectLeft = parseFloat(object.style.left);
    const objectRight = objectLeft + object.offsetWidth;
    const basketLeft = parseFloat(basket.style.left);
    const basketRight = basketLeft + basket.offsetWidth;

    // Verificar si el objeto ha alcanzado la altura de la cesta
    if (currentTop >= gameArea.clientHeight - basket.offsetHeight - object.offsetHeight) {
        // Verificar si el objeto está dentro de los límites de la cesta
        if (objectRight > basketLeft && objectLeft < basketRight) {
            const imageName = object.getAttribute('data-image-name');
            if (imageName === 'lata' || imageName === 'botella') {
                score += 10;
            }

            // Actualizar el contador de puntos en la pantalla
            scoreDisplay.textContent = 'Puntos: ' + score;
            console.log("Objeto recogido" + imageName) // Objeto recogido
            object.remove(); // Eliminar el objeto
            clearInterval(fallInterval); // Detener la caída del objeto
            return; // Salir de la función para evitar que siga bajando
        }
    }

    // Verificar si el objeto ha alcanzado el fondo del área de juego
    if (currentTop >= gameArea.clientHeight - object.offsetHeight) {
        const imageName = object.getAttribute('data-image-name');
        console.log('Objeto no recogido. Imagen: ' + imageName);
        object.remove(); // Eliminar el objeto
        clearInterval(fallInterval); // Detener la caída del objeto
    }

}, 20);

    // Chequear si el objeto ha llegado al fondo o fue recogido
    /*if (currentTop > gameArea.clientHeight - basket.offsetHeight - 30) {
        const objectLeft = parseFloat(object.style.left);
        const basketLeft = parseFloat(basket.style.left);

        // Verificar si el objeto está dentro de los límites de la cesta
        if (objectLeft > basketLeft && objectLeft < basketLeft + basket.offsetWidth) {
            // Recogido
            alert('¡Objeto recogido!');
        }

        object.remove(); // Eliminar el objeto después de tocar el fondo o la cesta
        clearInterval(fallInterval); // Detener la caída del objeto
    }
}, 20);*/
}

// Generar un objeto nuevo cada 1 segundo
setInterval(createFallingObject, 3000);