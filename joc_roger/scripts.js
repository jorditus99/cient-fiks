const obstacles = document.getElementById("obstacles");
const personatge = document.getElementById("personatge");
let posicioTop = 0;
console.log(personatge.src);

function moure_personatge(event) {
    switch (event.key) {
        case 'ArrowUp':
            posicioTop -= 210; // Mou cap amunt
            personatge.style.top = posicioTop + "px";
            console.log("Fletxa damunt");
            break;
        case 'ArrowDown':
            posicioTop += 210; // Mou cap avall
            personatge.style.top = posicioTop + "px";
            console.log("Fletxa abaix");
            break;
        default:
            return; // No fa res si no és 'ArrowUp' o 'ArrowDown'
    }
}

function crear_obstacle() {
    
    let img_petroli = document.createElement('img');
    img_petroli.src = "../img/img_roger/petroli.png";
    img_petroli.alt = "Obstacle petroli";
    img_petroli.style.position = "absolute"; 
    img_petroli.style.top = "100px"; 
    img_petroli.style.left = "200px"; 
    img_petroli.style.width = "100px"; 

    obstacles.appendChild(img_petroli);
}


function moure_obstacle() { 
    
}

// Escolta de l'esdeveniment keydown
document.addEventListener('keydown', moure_personatge);

crear_obstacle();