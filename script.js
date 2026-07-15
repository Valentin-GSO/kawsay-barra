let puntos = 0;
let tiempo = 20;
let activo = false;
let movimiento;
let reloj;


// Iniciar juego
function iniciarJuego(){

    puntos = 0;
    tiempo = 20;
    activo = true;

    document.getElementById("puntos").innerHTML = puntos;
    document.getElementById("premio").innerHTML = "";

    moverObjetivo();

    // mueve el objetivo automáticamente
    movimiento = setInterval(function(){
        moverObjetivo();
    },800);


    // contador
    reloj = setInterval(function(){

        tiempo--;

        document.getElementById("tiempo").innerHTML =
        "Tiempo: " + tiempo;


        if(tiempo <= 0){
            perder();
        }

    },1000);
}



// Mover círculo
function moverObjetivo(){

    if(!activo) return;


    let juego = document.getElementById("juego");
    let objetivo = document.getElementById("objetivo");


    let ancho = juego.clientWidth - objetivo.clientWidth;
    let alto = juego.clientHeight - objetivo.clientHeight;


    let x = Math.random() * ancho;
    let y = Math.random() * alto;


    objetivo.style.left = x + "px";
    objetivo.style.top = y + "px";

}



// Cuando lo tocan
function acertar(){

    if(!activo) return;


    puntos++;

    document.getElementById("puntos").innerHTML = puntos;


    moverObjetivo();


    if(puntos >= 10){

        ganar();

    }

}



// Mouse y celular
document.getElementById("objetivo").onclick = acertar;

document.getElementById("objetivo").ontouchstart = function(e){

    e.preventDefault();

    acertar();

};



// Ganar
function ganar(){

    activo=false;

    clearInterval(movimiento);
    clearInterval(reloj);


    document.getElementById("premio").innerHTML =
    "🎉 GANASTE: Cupón de 5% de descuento";

}



// Perder
function perder(){

    activo=false;

    clearInterval(movimiento);
    clearInterval(reloj);


    document.getElementById("premio").innerHTML =
    "❌ Tiempo agotado, intenta otra vez";

}
