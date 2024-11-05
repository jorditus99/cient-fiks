
// Las constantes de las imagenes
const fuente = document.getElementById("fuente");
const cole = document.getElementById("cole");
const valvula1 = document.getElementById("valvula1");
const camion1 = document.getElementById("camion1")


// tubos






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
        const div = document.createElement('div'); // Crea un nuevo div

        // Si el elemento es una imagen (no está vacío), agrégala al div
        if (elemento !== " ") {
            div.appendChild(elemento.cloneNode(true)); // Clona la imagen para agregarla
        } else {
            // Si está vacío, añade los eventos para permitir el drop
            div.addEventListener('dragenter', e => {
                console.log('Drag Enter');
            });

            div.addEventListener('dragleave', e => {
                console.log('Drag Leave');
            });

            div.addEventListener('dragover', e => {
                e.preventDefault(); // Necesario para permitir el drop
                console.log('Drag Over');
            });

            div.addEventListener('drop', e => {
                e.preventDefault();
                console.log('Drop');
                
                // Obtén el elemento arrastrado desde el evento
                const id = e.dataTransfer.getData('text');
                const elementoArrastrado = document.getElementById(id).cloneNode(true);

                // Agrega el elemento arrastrado al div
                div.appendChild(elementoArrastrado);
            });
        }

        // Agrega el div al contenedor del tablero
        tablero.appendChild(div);
    });
}

// Llama a la función para crear el tablero
crearTablero();


// añadir los eventos a los tubos que se puedan poner en el tablero

const tubo_recto= document.getElementById("recta_horizontal");
tubo_recto.setAttribute("draggable", "true");

// Eventos para el tubo cuando se arrastra
tubo_recto.addEventListener('dragstart', e => {
    console.log('Drag Start');
    e.dataTransfer.setData('text', e.target.id);  // Guarda el ID del tubo
});

tubo_recto.addEventListener('dragend', e => {
    console.log('Drag End');
});

tubo_recto.addEventListener('drag', e => {
    console.log('Drag');
});

