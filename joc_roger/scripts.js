const imatge_fons = document.getElementById("image_container");
let posicioTop = 0;
let obstacles = ["../img/img_roger/petroli.png", "../img/img_roger/llauna.png", ""];
let velocitat = 10;
let vides = [];

// Creació del personatge
function crear_personatge() {
    console.log("Personatge creat");
    const personatge = document.createElement('img');
    personatge.src = "../img/shark.gif";
    personatge.alt = "Personatge";
    personatge.classList.add("imatge_personatge"); // Classe coherent amb el CSS
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

// Creació dels obstacles
function crear_obstacle() {
    let img_petroli = document.createElement('img');
    img_petroli.src = "../img/img_roger/petroli.png";
    img_petroli.alt = "Obstacle petroli";
    img_petroli.style.position = "absolute"; 
    // img_petroli.style.top = "50px"; 
    img_petroli.style.left = "1000px"; 
    img_petroli.style.width = "100px"; 

    imatge_fons.appendChild(img_petroli);

    moure_obstacle(img_petroli);
}


function moure_obstacle(img_petroli) {
    let posicioX = parseInt(img_petroli.style.left); 

    // Moure la imatge cada 10 ms
    const moviment = setInterval(() => {
        posicioX -= velocitat;
        img_petroli.style.left = posicioX + 'px';

        // Quan la imatge surt de la pantalla, la tornem a l'inici
        if (posicioX < -img_petroli.width) {
            posicioX = window.innerWidth;
        }
    }, 5);
}
// Inicialització
crear_personatge();
crear_obstacle();

// Escolta de l'esdeveniment keydown
document.addEventListener('keydown', moure_personatge);
