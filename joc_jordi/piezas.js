
// Las constantes de las imagenes
const fuente = document.getElementById("fuente");
const cole = document.getElementById("cole");
const camion1 = document.getElementById("camion1");
const valvula_inicial = document.getElementById("valvula_inicial")
const valvula_final = document.getElementById("valvula_final")

const recta_horizontal = document.getElementById("recta_horizontal")
const recta_vertical = document.getElementById("recta_vertical")
const curva_arriba_drcha = document.getElementById("curva_arriba_drcha")
const curva_abajo_drcha = document.getElementById("curva_abajo_drcha")
const curva_iz_abajo = document.getElementById("curva_iz_abajo")
const curva_iz_arriba = document.getElementById("curva_iz_arriba")

// array para las cosas dragables
const tubos= [
    recta_horizontal, recta_vertical, curva_abajo_drcha,
    curva_arriba_drcha, curva_iz_abajo, curva_iz_arriba
];


function dragables(tubos) {
    tubos.forEach(tubo => {
        tubo.setAttribute("draggable", "true");

        tubo.addEventListener('dragstart', e => {
            console.log('Drag Start');
            e.dataTransfer.setData('text', e.target.id);
        });

        tubo.addEventListener('dragend', e => {
            console.log('Drag End');
        });

        tubo.addEventListener('drag', e => {
            console.log('Drag');
        });
    });
}

dragables(tubos);


// establecer las posiciones de cada nivel
const nivel1= [
    
    fuente, valvula_inicial, " ", " ", " ", " ", " ",
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
    nivel1.forEach((elemento, index) => {
        const div = document.createElement('div'); // Crea un nuevo div

        // Asigna un id único al div basado en el índice
        div.id = `${index}`;

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

                // Clona los atributos data de la tubería
                const direcciones = ["izquierda", "derecha", "arriba", "abajo"];
                direcciones.forEach(direccion => {
                    elementoArrastrado.setAttribute(`data-${direccion}`, document.getElementById(id).getAttribute(`data-${direccion}`));
                });

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

