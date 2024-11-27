let gotes = [];
let vides = [];
let lletra = "A"; // Lletra per defecte de les gotes
let lletra_no_potable = "A"; // lletra per defecte de els gotes NO potables
let lletres = []; //Array complet amb totes les lletres
let lletres_a_comparar = []; // Array amb les lletres de les gotes gotes 
let punts = document.getElementById("punts");
let puntuacio = 0;

let aparicio_gotes = 2000;
let increment_aparicio_gotes = 500;

let gota_interval = 0;
let gota_no_potable_intervaL = 0;

let left = 0;



//Creació de gota i els seus parametres

function crear_gota() {

    // Crear el contenidor que inclourà la gota i la lletra
    let container_gota = crear_container_gota();

    // Crear la gota dins del container_gota
    let gota = document.createElement('img');
    gota.className = "gota";
    gota.src = '/img/gota.png';
    gota.setAttribute('data-potable', 'true');
    container_gota.appendChild(gota);

    // Crear la lletra aleatoria dins del contenidor
    lletra = aparenca_lletra_random(0);
    container_gota.className = container_gota.className + " " + lletra.innerText;
    container_gota.appendChild(lletra);
    lletres_a_comparar.push(lletra.innerText);
    console.log(lletres_a_comparar);

    // Afegir el contenidor a fons
    document.getElementById("fons").appendChild(container_gota);

    // Guardar el contenidor a l'array de gotes
    gotes.push(container_gota);
}

function crear_no_potable() {

    console.log("La funció crear_no_potable FUNCIONA!");

    // Crear el contenidor que inclourà la gota i la lletra
    let container_gota = crear_container_gota();

    // Crear la gota dins del container_gota
    let gota_no_potable = document.createElement('img');
    gota_no_potable.className = "gota";
    gota_no_potable.src = '/img/no_potable.png';
    gota_no_potable.setAttribute('data-potable', 'false');
    container_gota.appendChild(gota_no_potable);

    // Crear la lletra aleatoria dins del contenidor
    lletra_no_potable = aparenca_lletra_random(0);
    container_gota.className = container_gota.className + " " + lletra_no_potable.innerText;
    container_gota.appendChild(lletra_no_potable);
    lletres_a_comparar.push(lletra.innerText);

    lletra_no_potable.classList.add("lletra_no_potable");


    // Afegir el contenidor a fons
    document.getElementById("fons").appendChild(container_gota);

    // Guardar el contenidor a l'array de gotes
    gotes.push(container_gota);
}

function crear_container_gota() {

    let container_gota = document.createElement("div");
    container_gota.className = "container_gota";
    container_gota.style.position = "absolute";
    container_gota.style.top = "160px";
    left = Math.random() * (1476 - 354) + 354;
    container_gota.style.left = left + "px";

    return container_gota

}

function aparenca_lletra_random(left) {

    let lletra = document.createElement("div");
    lletra.className = "lletra_gota"
    lletra.innerText = lletra_random();
    lletra.style.position = "absolute;"
    lletra.style.top = "0px";
    lletra.style.left = left + "px";

    return lletra;

}

function lletra_random() {

    const lletres = "QWERYUIOPASDFJKÑÇXCVBNM"
    return lletres.charAt(Math.floor(Math.random() * lletres.length));

}

function joc() {

    imprimir_vides();

    let positon = 0;

    gota_interval = setInterval(() => {
        crear_gota();

    }, 2000)

    gota_no_potable_intervaL = setInterval(() => {
        crear_no_potable();
    }, 6800)


    let interval = setInterval(() => {
        moure_gota();
        moure_lletra();
        colisio();
    }, 16)

    document.addEventListener("keydown", clickar_tecla);

    increment_velocitat_no_potable();
}


function moure_gota() {
    for (let container_gota of gotes) {
        let position = parseInt(container_gota.style.top);
        position += 5;
        container_gota.style.top = position + "px";
    }
}

function moure_lletra() {
    for (lletra of lletres) {
        positon = parseInt(lletra.style.top);
        position += 5;
        lletra.style.top = position + "px";
    }

}

//Eliminar gota i lletra al xocar

function colisio() {
    for (let i = gotes.length - 1; i >= 0; i--) {
        let container_gota = gotes[i];
        let position = parseInt(container_gota.style.top);

        if (position >= 750) {
            let gota = container_gota.querySelector('.gota');
            let lletra = container_gota.innerText;


            // if (gota.dataset.potable === 'true') {
            //     perdre_vida();
            // }

            if (gota.getAttribute('data-potable') === 'true') {
                perdre_vida();
            }

            if (lletra) {
                let i = lletres_a_comparar.indexOf(lletra);
                if (i != -1) {
                    lletres_a_comparar.splice(i, 1);
                }
            }

            container_gota.remove();
            gotes.splice(i, 1);
        }
    }
}

function perdre_vida() {
    if (vides.length > 0) {
        let vida = vides.pop();
        let corActiu = document.getElementById(vida.id);
        container_vides.removeChild(corActiu);

        joc_perdut();
    }
}


function crear_cor(num) {

    let cor = document.createElement('img')
    vides.push(cor);
    cor.className = "cor";
    cor.id = num + 1;
    cor.src = '/img/vida.png';
    cor.style.position = "absolute;"
    let fons = document.getElementById("fons");
    container_vides.appendChild(cor);

}

function imprimir_vides() {

    for (let i = 0; i < 3; i++) {
        crear_cor(i);
    }
}

function clickar_tecla(event) {

    let tecla = event.key;
    console.log("Tecla presionada:", tecla);
    verificar_encert(tecla);

}

function verificar_encert(tecla) {

    for (let i = 0; i < gotes.length; i++) {
        let container_gota = gotes[i];
        let lletra = container_gota.querySelector('.lletra_gota');
        let gota = container_gota.querySelector('.gota');

        if (lletra && lletra.innerText === tecla.toUpperCase()) {
            // Comprovar si la gota és no potable
            if (gota && gota.getAttribute('data-potable') === 'false') {
                perdre_vida();
            } else {
                let index = lletres_a_comparar.indexOf(lletra.innerText);
                if (index !== -1) {
                    lletres_a_comparar.splice(index, 1);
                }
                sumar_punts();
            }

            container_gota.remove();
            gotes.splice(i, 1);
        }
    }
}

function sumar_punts() {

    puntuacio += 5;
    punts.innerText = puntuacio;

    if (puntuacio === 50) {

        clearInterval(gota_interval);

        gota_interval = setInterval(() => {
            crear_gota();
        }, 1500)

    } else if (puntuacio === 100) {

        clearInterval(gota_interval);

        gota_interval = setInterval(() => {
            crear_gota();
        }, 1000)

    } else if (puntuacio === 150) {

        clearInterval(gota_interval);

        gota_interval = setInterval(() => {
            crear_gota();
        }, 500)

    }

}

function increment_velocitat_no_potable() {

    if (puntuacio === 50) {

        clearInterval(gota_no_potable_intervaL);

        gota_no_potable_intervaL = setInterval(() => {
            crear_no_potable();
        }, 4800)

    } else if (puntuacio === 100) {

        clearInterval(gota_no_potable_intervaL);

        gota_no_potable_intervaL = setInterval(() => {
            crear_no_potable();
        }, 2800)

    } else if (puntuacio === 150) {

        clearInterval(gota_no_potable_intervaL);

        gota_no_potable_intervaL = setInterval(() => {
            crear_no_potable();
        }, 1800)

    }

}

function joc_perdut() {

    if (vides.length === 0) {

        alert("Molt bé! Has aconseguit" + " " + puntuacio + " " + "punts");
    }


}

joc();