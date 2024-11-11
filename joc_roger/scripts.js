const imatge_fons = document.getElementById("image_container");
let fons = document.getElementById("fons");
let posicioTop = 0;
let obstacles = ["../img/img_roger/petroli.png", "../img/img_roger/llauna.png"];
let velocitat = 10;
let vides = [];

function moure_img_principal() {
    const imatges = document.querySelectorAll(".img_principal");
    let posicioX = 0;

    console.log("Moure imatge principal");

    imatges.forEach((img) => {
        img.style.position = "absolute";
        img.style.left = posicioX + "px";
        posicioX += img.width; // Posicionar la segona imatge just després de la primera
    });

    const moviment = setInterval(() => {
        imatges.forEach((img) => {
            let posicioActual = parseInt(img.style.left, 10);
            posicioActual -= velocitat;
            img.style.left = posicioActual + "px";

            // Quan la imatge surt de la pantalla, la retornem al costat de l'altra
            if (posicioActual <= -img.width) {
                img.style.left = window.innerWidth + "px";
            }
        });
    }, 10);
}


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
    // Seleccionar una imatge aleatòria de l'array obstacles
    let imgSrc = obstacles[Math.floor(Math.random() * obstacles.length)];
    
    // Crear l'element img per l'obstacle
    let obstacle = document.createElement('img');
    obstacle.src = imgSrc;
    obstacle.alt = "Obstacle";
    obstacle.style.position = "absolute"; 
    obstacle.style.left = "2000px"; 
    obstacle.style.width = "100px"; 

    // Valors possibles per a la posició `top`
    const posicionsTop = [0, 210, 420];
    
    // Seleccionar una posició aleatòria del `top`
    obstacle.style.top = posicionsTop[Math.floor(Math.random() * posicionsTop.length)] + "px";

    // Afegir l'obstacle al contenidor de fons
    imatge_fons.appendChild(obstacle);
  
    // Cridar la funció per moure l'obstacle
    moure_obstacle(obstacle);+

    // Eliminar l'obstacle quan sigui necessari
    eliminar_obstacle(obstacle);
}

 
  
  // Executar crear_obstacle cada 3 segons
  setInterval(crear_obstacle, 3000);


function moure_obstacle(obstacle) {
    let posicioX = parseInt(obstacle.style.left); 

    // Moure la imatge cada 10 ms
    const moviment = setInterval(() => {
        posicioX -= velocitat;
        obstacle.style.left = posicioX + 'px';

        // Quan la imatge surt de la pantalla, la tornem a l'inici
        if (posicioX < -obstacle.width) {
            posicioX = window.innerWidth;
        }
    }, 10);
}
function detectar_colisio() {
    const personatge = document.getElementById("personatge");
    const obstacle = imatge_fons.querySelector('img[alt="Obstacle"]');

    if (!personatge || !obstacle) {
        console.log("Personatge o obstacle no trobat");
        return;
    }

    //Treiem el tamany de l'obstacle i del nostre personatge
    const rectPersonatge = personatge.getBoundingClientRect();
    const rectObstacle = obstacle.getBoundingClientRect();

    // console.log("Personatge:", rectPersonatge, "Obstacle:", rectObstacle);

    // Comprovem si es solapen
    if (
        rectPersonatge.top < rectObstacle.bottom &&
        rectPersonatge.bottom > rectObstacle.top &&
        rectPersonatge.left < rectObstacle.right &&
        rectPersonatge.right > rectObstacle.left
    ) {

        pantalla_perdre();
    }
}

function eliminar_obstacle(obstacle) {

    console.log("Dins d'eliminar");
    let positon = parseInt(obstacle.style.left);
    if (positon <= 0 ) {
        console.log("obstacle tret");
        obstacle.remove();
    }

}

function pantalla_perdre() {
    alert("T'has xocat");
}

function crear_cor () {

    let cor = document.createElement('img')   
    vides.push(cor);
    cor.className = "cor"
    cor.src = '/img/vida.png';
    cor.style.position = "absolute;"
    container_vides.appendChild(cor);
    console.log("crear cor esta activa")

}

function definir_vides () {

    let vides = 3;


}

function iniciar_joc() {
    // Crida a la funció `detectar_colisio` cada 10 ms per monitoritzar les col·lisions
    setInterval(detectar_colisio, 10);
  
    // Inicialització
    moure_img_principal();
    crear_personatge();
    crear_obstacle();
  }
  
  // Per iniciar el joc, només caldria cridar
  iniciar_joc();


// Escolta de l'esdeveniment keydown
document.addEventListener('keydown', moure_personatge);
