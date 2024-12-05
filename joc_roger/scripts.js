const imatge_fons = document.getElementById("image_container");
let fons = document.getElementById("fons");
let posicioTop = 0;
let obstacles = ["../img/img_roger/petroli.png", "../img/img_roger/llauna.png"];
let velocitat = 5;
let vides = [];
const container_vides = document.getElementById("container_vides");
let punts = document.getElementById("punts");
let puntuacio = 0;
let intervalId;

function moure_img_principal() {
    const imatges = document.querySelectorAll(".img_principal");
    let posicioX = 0;

    imatges.forEach((img) => {
        img.style.position = "absolute";
        img.style.left = posicioX + "px";
        posicioX += img.width;
    });

    const moviment = setInterval(() => {
        imatges.forEach((img) => {
            let posicioActual = parseInt(img.style.left, 10);
            posicioActual -= velocitat;
            img.style.left = posicioActual + "px";

            if (posicioActual <= -img.width) {
                img.style.left = window.innerWidth + "px";
            }
        });
    }, 10);
}

function crear_personatge() {

    const personatge = document.createElement('img');
    personatge.src = "../img/shark.gif";
    personatge.alt = "Personatge";
    personatge.classList.add("imatge_personatge");
    personatge.id = "personatge";
    personatge.style.position = "absolute";
    personatge.style.top = posicioTop + "px";
    personatge.style.left = "50px";
    personatge.style.border = "1px solid white";
    imatge_fons.appendChild(personatge);
}

function moure_personatge(event) {
    const personatge = document.getElementById("personatge");
    if (!personatge) return;

    switch (event.key) {
        case 'ArrowUp':
            posicioTop -= 210;
            personatge.style.top = posicioTop + "px";
            break;
        case 'ArrowDown':
            posicioTop += 210;
            personatge.style.top = posicioTop + "px";
            break;
        default:
            return;
    }
}

function crear_obstacle() {

    const posicionsTop = [0, 210, 420, 630];
    let imgSrc = obstacles[Math.floor(Math.random() * obstacles.length)];

    let obstacle = document.createElement('img');
    obstacle.src = imgSrc;
    obstacle.alt = "Obstacle";
    obstacle.style.position = "absolute";
    obstacle.style.left = "2000px";
    obstacle.style.width = "100px";
    obstacle.style.border = "1px solid white";

    obstacle.style.top = posicionsTop[Math.floor(Math.random() * posicionsTop.length)] + "px";

    imatge_fons.appendChild(obstacle);

    moure_obstacle(obstacle);

    setInterval(() => eliminar_obstacle(obstacle), 10);
}

function moure_obstacle(obstacle) {
    let posicioX = parseInt(obstacle.style.left);


    const moviment = setInterval(() => {
        posicioX -= velocitat;
        obstacle.style.left = posicioX + 'px';

        if (posicioX < -obstacle.width) {
            posicioX = window.innerWidth;
        }
    }, 10);
}
function detectar_colisio() {
    const personatge = document.getElementById("personatge");
    const obstacle = imatge_fons.querySelector('img[alt="Obstacle"]');

    if (!personatge || !obstacle) {
        return;
    }

    const rectPersonatge = personatge.getBoundingClientRect();
    const rectObstacle = obstacle.getBoundingClientRect();

    if (
        rectPersonatge.top < rectObstacle.bottom &&
        rectPersonatge.bottom > rectObstacle.top &&
        rectPersonatge.left < rectObstacle.right &&
        rectPersonatge.right > rectObstacle.left
    ) {
        obstacle.remove();
        eliminar_vides();
    }
}

function eliminar_vides() {
    if (vides.length > 0) {
        const vidaEliminada = vides.pop(); // Elimina l'última vida de l'array
        vidaEliminada.remove(); // Elimina l'element corresponent del DOM
        console.log("Vida eliminada");
    } else {
        console.log("No queden vides!");
        // Aquí pots cridar la funció `pantalla_perdre` o el que necessitis
        // pantalla_perdre();
        gameOver();
    }

}


function eliminar_obstacle(obstacle) {

    // console.log("Dins d'eliminar");
    let positon = parseInt(obstacle.style.left);
    if (positon <= 0) {
        // console.log("obstacle tret");
        obstacle.remove();
    }
}

function pantalla_perdre() {
    // alert("T'has xocat");
    // console.log("T'has xocat");
    velocitat = 0;
    alert("Has perdut");
    enviar_puntuacio(puntuacio)
}

function crear_cor() {
    let cor = document.createElement('img');
    cor.className = "cor";
    cor.src = '../img/vida.png';
    cor.classList.add("vida");
    container_vides.appendChild(cor);
    vides.push(cor);
    console.log("Cor creat i afegit");
}

function definir_vides(numVides) {

    container_vides.innerHTML = '';
    vides = [];

    for (let i = 0; i < numVides; i++) {
        crear_cor();
    }
}

function afegir_puntuacio() {

    if (vides.length > 0) {
        puntuacio += 5;
        punts.innerHTML = puntuacio;
        augmentar_velocitat();
    } else {
        clearInterval(intervalId);
    }
}

function augmentar_velocitat() {
    
    if (puntuacio == 10) {
        
        velocitat = 7;
    }
    else if(puntuacio == 50 ){

        velocitat = 10;
    }
    else if(puntuacio == 100 ){

        velocitat = 15;
    }
}


function iniciar_joc() {

    definir_vides(3);
    setInterval(detectar_colisio, 30);
    moure_img_principal();
    crear_personatge();
    setInterval(crear_obstacle, 750);
    intervalId = setInterval(afegir_puntuacio, 5000);
}

iniciar_joc();

function enviar_puntuacio(puntuacio) {

    fetch('../php_library/puntuacio.php?id_juego=2&puntuacio=' + puntuacio)
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

function gameOver() {

    velocitat = 0;
    const gameArea = document.getElementById('fons');

    let byeDiv = document.createElement("div");
    byeDiv.classList.add('tutorial-container');

    let byeDivtext = document.createElement("div");
    byeDivtext.classList.add('tutorial-container-text');

    let h1 = document.createElement("h1");
    h1.textContent = "FELICITATS!!";

    let byeTextP = document.createElement("p");
    byeTextP.textContent = "Has aconseguit activar totes les manetes i...";

    let byeTextScore = document.createElement("p");
    byeTextScore.setAttribute('class', 'punts2');
    byeTextScore.textContent = " " + puntuacio + " punts!"; // Cambia punts por puntuacio

    let enlaceBoton = document.createElement("a");
    enlaceBoton.href = '../jocs.html';

    let botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar";

    byeDivtext.appendChild(h1);
    byeDivtext.appendChild(byeTextP);
    byeDivtext.appendChild(byeTextScore);
    enlaceBoton.appendChild(botonContinuar);
    byeDivtext.appendChild(enlaceBoton); // Añade el enlace al contenedor de texto
    byeDiv.appendChild(byeDivtext);

    gameArea.appendChild(byeDiv);
}

document.addEventListener('keydown', moure_personatge);
