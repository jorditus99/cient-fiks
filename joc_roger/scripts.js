const imatge_fons = document.getElementById("image_container");
let posicioTop = 0;

// Creació del personatge
function crear_personatge() {
    const personatge = document.createElement('img');
    personatge.src = "../img/shark.gif";
    personatge.alt = "Personatge";
    personatge.classList.add("image-personatge");
    personatge.id = "personatge";
    personatge.style.position = "absolute";
    personatge.style.top = posicioTop + "px";
    personatge.style.left = "50px"; // Posició inicial a l'esquerra
    imatge_fons.appendChild(personatge);
}

// Funció per moure el personatge
function moure_personatge(event) {
    const personatge = document.getElementById("personatge");
    if (!personatge) return;

    switch (event.key) {
        case 'ArrowUp':
            posicioTop -= 210; // Mou cap amunt
            personatge.style.top = posicioTop + "px";
            break;
        case 'ArrowDown':
            posicioTop += 210; // Mou cap avall
            personatge.style.top = posicioTop + "px";
            break;
        default:
            return; // No fa res si no és 'ArrowUp' o 'ArrowDown'
    }
}

// Creació de l'obstacle
function crear_obstacle() {
    const img_petroli = document.createElement('img');
    img_petroli.src = "../img/img_roger/petroli.png";
    img_petroli.alt = "Obstacle petroli";
    img_petroli.style.position = "absolute"; 
    // img_petroli.style.top = "50px"; 
    img_petroli.style.left = "200px"; 
    img_petroli.style.width = "100px"; 

    imatge_fons.appendChild(img_petroli);
}

// Inicialització
crear_personatge();
crear_obstacle();

// Escolta de l'esdeveniment keydown
document.addEventListener('keydown', moure_personatge);
