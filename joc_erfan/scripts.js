let gotas = [];
let vides = [];

function crear_gota () {

let gota = document.createElement('img')
gotas.push(gota);
gota.className = "gota"
gota.src = '/img/gota.png';
gota.style.position = "absolute;"
gota.style.top = "160px";
let left = Math.random() * (1466 - 262) + 262;
console.log(left);
gota.style.left = left + "px";
console.log("crear " + gota.style.top);
let fons = document.getElementById("fons");
fons.appendChild(gota);


}


function crear_no_potable () {

let gota2 = document.createElement('img')
gotas.push(gota2);
gota2.className = "gota"
gota2.src = '/img/no_potable.png';
gota2.style.position = "absolute;"
gota2.style.top = "160px";
let left = Math.random() * (1466 - 262) + 262;
console.log(left);
gota2.style.left = left + "px";
console.log("crear " + gota2.style.top);
let fons = document.getElementById("fons");
fons.appendChild(gota2);



}

function joc () {

    crear_cor();


let positon = 0;

setTimeout(()=> crear_gota(),1000);

setTimeout(()=> crear_gota(),2000);

setTimeout(()=> crear_no_potable(),3000);

setTimeout(()=> crear_gota(),4000);


let interval = setInterval(() => {
    moure_gota();
    colisio();
    },100)
}

function moure_gota () {
for ( gota of gotas) {
position = parseInt(gota.style.top);
position += 5;
gota.style.top = position + "px";
}
}

function colisio () {

    for (let gota of gotas) {
        let position = parseInt(gota.style.top);

        if (position >= 750) {
            gota.remove();
        }
    }
    
}

function sumar_punts () {




}

function perdre_vida () {




}

function crear_cor () {

    let cor = document.createElement('img')   
    vides.push(cor);
    cor.className = "cor"
    cor.src = '/img/vida.png';
    cor.style.position = "absolute;"
    let fons = document.getElementById("fons");
    container_vides.appendChild(cor);
    console.log("crear cor esta activa")

}

function definir_vides () {

    let vides = 3;


}


joc();