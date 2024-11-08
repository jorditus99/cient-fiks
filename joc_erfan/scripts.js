let gotes = [];
let vides = [];
let lletres = [];
let lletres_no_potables = [];
let punts = document.getElementById("punts");
let puntuacio = 0;



//Creació de gota i els seus parametres

function crear_gota() {

    // Crear el contenidor que inclourà la gota i la lletra
    let container_gota = document.createElement("div");
    container_gota.className = "container_gota";
    container_gota.style.position = "absolute";
    container_gota.style.top = "160px";  // 
    let left = Math.random() * (1476 - 354) + 354;
    container_gota.style.left = left + "px";

    // Crear la gota dins del container_gota
    let gota = document.createElement('img');
    gota.className = "gota";
    gota.src = '/img/gota.png';
    gota.setAttribute('data-potable', 'true');
    container_gota.appendChild(gota); 

    // Crear la letra aleatoria dins del contenidor
    let lletra = aparenca_lletra_random(0);
    container_gota.className = container_gota.className + " " + lletra.innerText;
    container_gota.appendChild(lletra);

    // Afegir el contenidor a fons
    document.getElementById("fons").appendChild(container_gota);

    // Guardar el contenidor a l'array de gotes
    gotes.push(container_gota);
}

function aparenca_lletra_random (left) {

    let lletra = document.createElement("span");
    lletra.className = "lletra_gota"
    lletra.innerText = lletra_random();
    lletra.style.position = "absolute;"
    lletra.style.top = "0px";
    lletra.style.left = left + "px";

    return lletra;
    
}

function crear_no_potable() {

    let gota2 = document.createElement('img')
    gotes.push(gota2);
    gota2.className = "gota"
    gota2.src = '/img/no_potable.png';
    gota2.style.position = "absolute;"
    gota2.style.top = "160px";
    let left = Math.random() * (1466 - 262) + 262;
    gota2.style.left = left + "px";
    let fons = document.getElementById("fons");
    fons.appendChild(gota2);
    gota2.setAttribute('data-potable', 'false');
    
}

function lletra_random() {

    const lletres = "QWERYUIOPASDFGJKÑÇXCVBNM"
    return lletres.charAt(Math.floor(Math.random() *  lletres.length));

}

function joc() {

    imprimir_vides();

    let positon = 0;

    let gota_interval = setInterval(() => {
        crear_gota();
    },500) 


    let interval = setInterval(() => {
        moure_gota();
        moure_lletra();
        colisio();
    }, 16)

    document.addEventListener("keydown", clickar_tecla);

    joc_perdut();
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
    for (let i = 0; i < gotes.length; i++) {
        let container_gota = gotes[i];
        let position = parseInt(container_gota.style.top);

        if (position >= 750) {
            let gota = container_gota.querySelector('.gota');


            // if (gota.dataset.potable === 'true') {
            //     perdre_vida();
            // }

            if (gota.getAttribute('data-potable') === 'true') {
                perdre_vida();
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

function clickar_tecla (event) {

    let tecla = event.key;
    console.log("Tecla presionada:", tecla);
    verificar_encert(tecla);
    
}

function verificar_encert (tecla) {

    for (let i = 0; i < gotes.length; i++) {
        let container_gota = gotes[i];
        let lletra = container_gota.querySelector('.lletra_gota');

        if (lletra && lletra.innerText === tecla.toUpperCase()) {
            container_gota.remove();
            gotes.splice(i, 1);
            sumar_punts();
            break;
        }
    }
}

function sumar_punts () {

    puntuacio += 5;
    punts.innerText = puntuacio;
   
}

function joc_perdut () {

    if (vides.length === 0) {

        alert("Molt bé! Has aconseguit" + " " + puntuacio + " " + "punts" );
    }


}

joc();