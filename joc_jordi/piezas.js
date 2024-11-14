// Las constantes de las imágenes
const fuente = document.getElementById("fuente");
const cole = document.getElementById("cole");
const camion1 = document.getElementById("camion1");
const valvula_inicial = document.getElementById("valvula_inicial");
const valvula_final = document.getElementById("valvula_final");

const recta_horizontal = document.getElementById("recta_horizontal");
const recta_vertical = document.getElementById("recta_vertical");
const curva_arriba_drcha = document.getElementById("curva_arriba_drcha");
const curva_abajo_drcha = document.getElementById("curva_abajo_drcha");
const curva_iz_abajo = document.getElementById("curva_iz_abajo");
const curva_iz_arriba = document.getElementById("curva_iz_arriba");

const ed3 = document.getElementById("ed3");
const ed4 = document.getElementById("ed4");
const ed5 = document.getElementById("ed5");
const ed6 = document.getElementById("ed6");
const ed7 = document.getElementById("ed7");
const ed8 = document.getElementById("ed8");
const ed9 = document.getElementById("ed9");

const escabadora1 = document.getElementById("escabadora1");
const escabadora2 = document.getElementById("escabadora2");
const escabadora3 = document.getElementById("escabadora3");

// Array para las cosas dragables
const tubos = [
    recta_horizontal, recta_vertical, curva_abajo_drcha,
    curva_arriba_drcha, curva_iz_abajo, curva_iz_arriba
];

// Función para hacer que los tubos sean arrastrables
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

// Arrays de niveles
const nivel1 = [
    valvula_inicial, " ", ed4, " ", camion1, ed5, " ",
    " ", " ", " ", " ", ed6, " ", " ",
    " ", camion1, " ", " ", " ", " ", " ",
    " ", " ", " ", ed7, " ", " ", " ",
    " ", " ", " ", " ", ed3, ed3, " ",
    " ", " ", escabadora1, " ", " ", " ", cole,
    " ", " ", " ", " ", " ", escabadora3, " "
];

const nivel2 = [
    " ", escabadora1, " ", ed4, " ", camion1, " ", " ", " ",
    " ", " ", " ", " ", ed5, " ", " ", " ", " ",
    " ", " ", escabadora2, " ", " ", " ", " ", " ", " ",
    " ", camion1, " ", ed6, " ", " ", " ", " ", " ",
    " ", " ", ed7, " ", " ", ed8, " ", " ", " ",
    " ", " ", " ", " ", escabadora3, " ", cole, " ", " ",
    valvula_inicial, " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ", " "
];

// Variable para controlar el nivel actual
let nivelActual = nivel1;

// Selecciona el contenedor del tablero en el HTML
const tablero = document.getElementById("tablero");

const obstaculos = [
    "camion1", "fuente",
    "ed3", "ed4", "ed5", "ed6", "ed7", "ed8", "ed9",
    "escabadora1", "escabadora2", "escabadora3"
];

// Array para almacenar las posiciones donde se colocan las tuberías
let posicionesTuberias = [];

// Función para crear el tablero
function crearTablero() {
    const dimension = Math.sqrt(nivelActual.length); // Calcula la dimensión del tablero

    nivelActual.forEach((elemento, index) => {
        const div = document.createElement('div'); // Crea un nuevo div

        // Calcula la fila y columna
        const fila = Math.floor(index / dimension);
        const columna = index % dimension;

        // Asigna los atributos data-fila y data-columna
        div.setAttribute('data-fila', fila);
        div.setAttribute('data-columna', columna);

        // Si el elemento es una imagen, agrégala al div
        if (elemento !== " ") {
            div.appendChild(elemento.cloneNode(true)); // Clona la imagen para agregarla
        } else {
            // Si está vacío, añade los eventos para permitir el drop
            div.addEventListener('dragover', e => {
                e.preventDefault(); // Necesario para permitir el drop
                console.log('Drag Over');
            });

            div.addEventListener('drop', e => {
                e.preventDefault();
                console.log('Drop');

                // Verificar si la celda ya tiene una tubería
                if (div.hasChildNodes()) {
                    alert("¡Esta celda ya tiene una tubería! No se puede colocar otra.");
                    return;
                }

                // Obtén el elemento arrastrado desde el evento
                const id = e.dataTransfer.getData('text');
                const elementoArrastrado = document.getElementById(id).cloneNode(true);

                // Verificar que la tubería no se conecte a un obstáculo
                if (hayConexionHaciaObstaculo(div, elementoArrastrado)) {
                    alert("¡No se puede colocar esta tubería aquí porque se conecta a un obstáculo!");
                    return;
                }

                // Verificar si la celda es la celda de victoria y si el elemento arrastrado es una tubería recta
                const esCasillaVictoria = div === document.querySelector(`[data-fila="5"][data-columna="5"]`);
                const esTuberiaRecta = (id === "recta_horizontal" || id === "recta_vertical");

                if (esCasillaVictoria && !esTuberiaRecta) {
                    alert("¡Solo se puede colocar una tubería recta en la celda de victoria!");
                    return;
                }

                // Clona los atributos data de la tubería
                const direcciones = ["izquierda", "derecha", "arriba", "abajo"];
                direcciones.forEach(direccion => {
                    elementoArrastrado.setAttribute(`data-${direccion}`, document.getElementById(id).getAttribute(`data-${direccion}`));
                });

                // Verificar si hay una tubería en una de las celdas adyacentes
                const esConexionValida = validarConexion(div, elementoArrastrado);
                if (!esConexionValida) {
                    alert("¡Conexión no válida! No se puede colocar aquí.");
                    return;
                }

                // Si la conexión es válida y la celda está vacía, agrega el elemento arrastrado al div
                div.appendChild(elementoArrastrado);

                // Guardar la posición de la nueva tubería en el array
                const fila = div.getAttribute('data-fila');
                const columna = div.getAttribute('data-columna');
                posicionesTuberias.push({ fila, columna });
                console.log("Posiciones de las tuberías: ", posicionesTuberias);

                // Verificar si se ha colocado la tubería en la celda de victoria
                if (esCasillaVictoria) {
                    alert("¡Has ganado el nivel 1!");
                    nivelActual = nivel2; // Cambiar al segundo nivel
                    resetearTablero(); // Cargar el nuevo nivel
                }
            });
        }

        // Agrega el div al contenedor del tablero
        tablero.appendChild(div);
    });
}

// Función para resetear el tablero y cargar el nuevo nivel
function resetearTablero() {
    tablero.innerHTML = ""; // Limpia el tablero



    crearTablero(); // Crea el tablero con el nuevo nivel
}

// Función para validar la conexión entre la celda actual y las celdas adyacentes
function validarConexion(celdaDestino, tuberiaNueva) {
    const fila = parseInt(celdaDestino.getAttribute('data-fila'));
    const columna = parseInt(celdaDestino.getAttribute('data-columna'));

    const celdasAdyacentes = [
        { fila: fila - 1, columna, direccionTuberia: 'arriba', direccionCelda: 'abajo' },
        { fila: fila + 1, columna, direccionTuberia: 'abajo', direccionCelda: 'arriba' },
        { fila, columna: columna - 1, direccionTuberia: 'izquierda', direccionCelda: 'derecha' },
        { fila, columna: columna + 1, direccionTuberia: 'derecha', direccionCelda: 'izquierda' }
    ];

    for (const adyacente of celdasAdyacentes) {
        const celdaVecina = document.querySelector(`div[data-fila="${adyacente.fila}"][data-columna="${adyacente.columna}"]`);
        
        if (celdaVecina && celdaVecina.firstChild) {
            const tuberiaVecina = celdaVecina.firstChild;
            const conexionVecina = tuberiaVecina.getAttribute(`data-${adyacente.direccionCelda}`);
            const conexionTuberiaNueva = tuberiaNueva.getAttribute(`data-${adyacente.direccionTuberia}`);

            if (conexionVecina === 'true' && conexionTuberiaNueva === 'true') {
                return true; // Conexión válida
            }
        }
    }

    return false; // Si no hay conexiones válidas
}

// Función para verificar si hay conexión hacia un obstáculo desde la posición actual
function hayConexionHaciaObstaculo(celda, tuberiaNueva) {
    const fila = parseInt(celda.getAttribute('data-fila'));
    const columna = parseInt(celda.getAttribute('data-columna'));

    const celdasAdyacentes = [
        { fila: fila - 1, columna, direccion: 'arriba' },
        { fila: fila + 1, columna, direccion: 'abajo' },
        { fila, columna: columna - 1, direccion: 'izquierda' },
        { fila, columna: columna + 1, direccion: 'derecha' }
    ];

    return celdasAdyacentes.some(adyacente => {
        const celdaVecina = document.querySelector(`div[data-fila="${adyacente.fila}"][data-columna="${adyacente.columna}"]`);
        return celdaVecina && celdaVecina.firstChild && obstaculos.includes(celdaVecina.firstChild.id) &&
               tuberiaNueva.getAttribute(`data-${adyacente.direccion}`) === "true";
    });
}

// Función para ajustar el tamaño del tablero
function ajustarTamañoTablero() {
    const dimension = Math.sqrt(nivelActual.length);
    tablero.className = dimension === 9 ? "tablero tablero-nivel-2" : "tablero";
}

// Función para resetear el tablero y cargar el nuevo nivel
function resetearTablero() {
    tablero.innerHTML = ""; // Limpia el tablero
    ajustarTamañoTablero(); // Ajusta el tamaño del tablero
    crearTablero(); // Crea el tablero con el nuevo nivel
}

// Selecciona el botón de reinicio
const botonReiniciar = document.getElementById("reiniciar");

// Agrega el evento click para reiniciar el nivel
botonReiniciar.addEventListener("click", () => {
    resetearTablero(); // Llama a la función para reiniciar el tablero
});

// Llama a la función para crear el tablero inicial
crearTablero();


