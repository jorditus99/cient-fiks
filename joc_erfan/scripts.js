

function crear_gota () {

let gota = document.createElement('img')
gota.src = '/img/gota.png';

let fons = document.getElementById("fons");
fons.appendChild(gota);

}

let gota = crear_gota();


function moure_gota () {

let gota = document.createElement('img')
let positon = 0;

let interval = setInterval(() => {

position = postion + 5;

gota.style.top = position;

})

    



    



}