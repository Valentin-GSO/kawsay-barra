let puntos = 0;
let tiempo = 20;
let activo = false;

function iniciarJuego(){

    puntos = 0;
    tiempo = 20;
    activo = true;

    moverObjetivo();

}

function moverObjetivo(){

    if(!activo) return;

    let x=Math.random()*460;
    let y=Math.random()*310;

    let objetivo=document.getElementById("objetivo");

    objetivo.style.left=x+"px";
    objetivo.style.top=y+"px";

}

document.getElementById("objetivo").onclick=function(){

    puntos++;

    document.getElementById("puntos").innerHTML=puntos;

    moverObjetivo();

    if(puntos>=10){

        document.getElementById("premio").innerHTML=
        "🎉 Ganaste 5% de descuento";

    }

}
