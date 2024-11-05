let gotas = [];
let vides = [];
let lletres = [];
let lletres_no_potables = [];


//Creació de gota i els seus parametres

function crear_gota() {

    // Crear contenidor per la gota i la lletra -- Funció crear_container_gota
    let container_gota = document.createElement("div")
    container_gota.className = "container_gota"

    //Crear la gota
    let gota = document.createElement('img')
    gotas.push(gota);
    gota.className = "gota"
    gota.src = '/img/gota.png';
    gota.style.position = "absolute;"
    gota.style.top = "160px";
    let left = Math.random() * (1466 - 262) + 262;
    gota.style.left = left + "px";
    let fons = document.getElementById("fons");
    fons.appendChild(gota);
    gota.setAttribute('data-potable', 'true');

    //Crear imatge lletra random  -- Funció crear aparença de lletra random
   
    let lletra = patata(left);
    

    //Ficar gota i lletra al container_gota -- Funció?
    container_gota.appendChild(gota);
    container_gota.appendChild(lletra);


    //Afegir el container_gota al fons -- Dins de crear_container_gota 
    document.getElementById("fons").appendChild(container_gota);

}

function patata (left) {

    let lletra = document.createElement("span");
    lletra.className = "lletra_gota"
    lletra.innerText = lletra_random();
    lletra.style.position = "absolute;"
    lletra.style.top = "160px";
    lletra.style.left = left + "px";

    return lletra;
    
}



function crear_no_potable() {

    let gota2 = document.createElement('img')
    gotas.push(gota2);
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

    const lletres = "QWERTYUIOPASDFGHJKLÑÇZXCVBNM"
    return lletres.charAt(Math.floor(Math.random() *  lletres.length));

}

function joc() {

    imprimir_vides();

    let positon = 0;

    setTimeout(() => crear_gota(), 1000);

    setTimeout(() => crear_gota(), 3000);

    setTimeout(() => crear_no_potable(), 5000);

    setTimeout(() => crear_gota(), 6000);


    let interval = setInterval(() => {
        moure_gota();
        moure_lletra();
        colisio();
    }, 100)
}

function moure_gota() {
    for (gota of gotas) {
        position = parseInt(gota.style.top);
        position += 5;
        gota.style.top = position + "px";

        let lletra = gota.nextSibling; // Obtener el elemento de letra
        if (lletra) {
            lletra.style.top = position + "px"; // Mover la letra con la gota
        }
    }
}

function moure_lletra() {
    for (lletra of lletres) {
        positon = parseInt(lletra.style.top);
        position += 5;
        lletra.style.top = position + "px";
    }

}

function colisio() {
    for (let i = gotas.length - 1; i >= 0; i--) {
        let gota = gotas[i];
        let position = parseInt(gota.style.top);

        if (position >= 750) {

            if (gota.getAttribute('data-potable') === 'true') {
                perdre_vida();
            }
            gota.remove();
            gotas.splice(i, 1);

            //No funciona
            lletra.remove();
            lletres.splice(i,1);
        }
    }
}

function perdre_vida() {
    if (vides.length > 0) {
        let vida = vides.pop();
        let corActiu = document.getElementById(vida.id);
        container_vides.removeChild(corActiu);
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

joc();