
// Las constantes de las imagenes
const fuente = document.getElementById("fuente");
const cole = document.getElementById("cole");
const valvula1 = document.getElementById("valvula1");
const camion1 = document.getElementById("camion1")

// tubos
const tubo_recto = document.getElementById("tubo_recto");


// establecer las posiciones de cada nivel
const nivel1= [
    
    fuente, valvula1, " ", " ", " ", " ", " ",
    " ", " ", " ", camion1, " ", " ", camion1,
    " ", " ", " ", " ", " ", " ", cole,
    " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ",

];
 
// Selecciona el contenedor del tablero en el HTML
const tablero = document.getElementById("tablero");

function crearTablero() {
    nivel1.forEach((elemento) => {
        // Crea un nuevo div
        const div = document.createElement('div');

        // Si el elemento es una imagen (no está vacío), agrégala al div
        if (elemento !== " ") {
            div.appendChild(elemento.cloneNode(true)); // Clona la imagen para agregarla
        }

        // Agrega el div al contenedor del tablero
        tablero.appendChild(div);
    });
}

// Llama a la función para crear el tablero
crearTablero();


