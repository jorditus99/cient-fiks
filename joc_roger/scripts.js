const personatge = document.getElementById('personatge');


console.log(personatge.src);

function moure_personatge(event) {
    switch (event.key) {
        case 'ArrowUp':
            console.log("Fletxa damunt");
            break;
        case 'ArrowDown':
            console.log("Fletxa abaix");
            break;
        default:
            return; // No fa res si no és 'ArrowUp' o 'ArrowDown'
    }
}

// Escolta de l'esdeveniment keydown
document.addEventListener('keydown', moure_personatge);
