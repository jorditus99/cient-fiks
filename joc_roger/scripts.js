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

// Escolta de l'esdeveniment keydown
document.addEventListener('keydown', moure_personatge);
