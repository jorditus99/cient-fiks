let gotas = [];
let vides = [];

//Creació de gota i els seus parametres

function crear_gota() {

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

function joc() {

    imprimir_vides();

    let positon = 0;

    setTimeout(() => crear_gota(), 1000);

    setTimeout(() => crear_gota(), 3000);

    setTimeout(() => crear_no_potable(), 5000);

    setTimeout(() => crear_gota(), 6000);


    let interval = setInterval(() => {
        moure_gota();
        colisio();
    }, 100)
}

function moure_gota() {
    for (gota of gotas) {
        position = parseInt(gota.style.top);
        position += 5;
        gota.style.top = position + "px";
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