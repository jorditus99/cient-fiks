let gotas = [];

function crear_gota (left) {

let gota = document.createElement('img')
gotas.push(gota);
gota.className = "gota"
gota.src = '/img/gota.png';
gota.style.position = "absolute;"
gota.style.top = "160px";
gota.style.left = left + "px";
console.log("crear " + gota.style.top);
let fons = document.getElementById("fons");
fons.appendChild(gota);


}

function joc () {

let positon = 0;

setTimeout(()=> crear_gota(1080),1000);

setTimeout(()=> crear_gota(880),3000);

setTimeout(()=> crear_gota(500),2000);

let interval = setInterval(() => {
    moure_gota();
    },100)
}



function moure_gota () {
for ( gota of gotas) {
position = parseInt(gota.style.top);
position += 5;
gota.style.top = position + "px";
}
}

joc();