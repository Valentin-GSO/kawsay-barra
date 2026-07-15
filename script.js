/*==================================================
        KAWSAY
        Juego: El Camino del Inca
        Parte 1
===================================================*/


//===========================
// Animaciones al hacer Scroll
//===========================

const reveals = document.querySelectorAll(
".card, .mision-card, .beneficios-grid div, .contacto-grid div"
);

function revealScroll(){

reveals.forEach((element)=>{

const top = element.getBoundingClientRect().top;

const visible = window.innerHeight - 120;

if(top < visible){

element.classList.add("active");

}

});

}

window.addEventListener("scroll",revealScroll);

revealScroll();


//===========================
// Canvas del Juego
//===========================

const canvas = document.createElement("canvas");

canvas.id="gameCanvas";

canvas.width=900;

canvas.height=500;

canvas.style.display="none";

canvas.style.margin="40px auto";

canvas.style.borderRadius="20px";

canvas.style.boxShadow="0 15px 40px rgba(0,0,0,.35)";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");


//===========================
// Botón para iniciar
//===========================

const playButton=document.createElement("button");

playButton.innerHTML="🎮 JUGAR EL CAMINO DEL INCA";

playButton.className="boton";

playButton.style.display="block";

playButton.style.margin="60px auto";

document.body.insertBefore(playButton,canvas);

playButton.onclick=()=>{

canvas.style.display="block";

playButton.style.display="none";

startGame();

};


//===========================
// Variables
//===========================

let score=0;

let lives=3;

let gameRunning=false;

let keys={};


//===========================
// Jugador
//===========================

const player={

x:100,

y:250,

w:40,

h:40,

speed:5,

color:"#FFD54A"

};


//===========================
// Teclado
//===========================

window.addEventListener("keydown",(e)=>{

keys[e.key]=true;

});

window.addEventListener("keyup",(e)=>{

keys[e.key]=false;

});


//===========================
// Movimiento
//===========================

function movePlayer(){

if(keys["ArrowUp"]||keys["w"]) player.y-=player.speed;

if(keys["ArrowDown"]||keys["s"]) player.y+=player.speed;

if(keys["ArrowLeft"]||keys["a"]) player.x-=player.speed;

if(keys["ArrowRight"]||keys["d"]) player.x+=player.speed;

if(player.x<0) player.x=0;

if(player.y<0) player.y=0;

if(player.x>canvas.width-player.w)

player.x=canvas.width-player.w;

if(player.y>canvas.height-player.h)

player.y=canvas.height-player.h;

}


//===========================
// Dibujar Jugador
//===========================

function drawPlayer(){

ctx.fillStyle=player.color;

ctx.beginPath();

ctx.arc(

player.x+20,

player.y+20,

20,

0,

Math.PI*2

);

ctx.fill();

}


//===========================
// Fondo
//===========================

function drawBackground(){

ctx.fillStyle="#d9c28b";

ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#4F772D";

ctx.fillRect(0,430,900,70);

}


//===========================
// HUD
//===========================

function drawHUD(){

ctx.fillStyle="#000";

ctx.font="22px Poppins";

ctx.fillText("⭐ Puntos: "+score,20,30);

ctx.fillText("❤️ Vidas: "+lives,20,60);

}


//===========================
// Loop principal
//===========================

function gameLoop(){

if(!gameRunning)return;

ctx.clearRect(0,0,900,500);

drawBackground();

movePlayer();

drawPlayer();

drawHUD();

requestAnimationFrame(gameLoop);

}


//===========================
// Iniciar juego
//===========================

function startGame(){

gameRunning=true;

gameLoop();

}/*==================================================
        PARTE 2
        Ingredientes + Colisiones
==================================================*/

//==================================
// Ingredientes del juego
//==================================

const ingredientNames=[

"🌾",
"🥜",
"🍯",
"🌰",
"🌿",
"🟡"

];

let ingredients=[];


//==================================
// Crear ingrediente
//==================================

function createIngredient(){

ingredients.push({

x:Math.random()*760+60,

y:Math.random()*360+60,

size:35,

emoji:ingredientNames[

Math.floor(

Math.random()*ingredientNames.length

)

]

});

}


//==================================
// Crear varios
//==================================

for(let i=0;i<6;i++){

createIngredient();

}


//==================================
// Dibujar ingredientes
//==================================

function drawIngredients(){

ctx.font="32px Arial";

ingredients.forEach(item=>{

ctx.fillText(

item.emoji,

item.x,

item.y

);

});

}


//==================================
// Colisiones
//==================================

function collision(a,b){

return(

a.x < b.x+b.size &&

a.x+a.w > b.x &&

a.y < b.y+b.size &&

a.y+a.h > b.y

);

}


//==================================
// Recoger ingredientes
//==================================

function collectIngredients(){

for(let i=ingredients.length-1;i>=0;i--){

if(

collision(player,ingredients[i])

){

score+=100;

ingredients.splice(i,1);

createIngredient();

}

}

}


//==================================
// Obstáculos
//==================================

let rocks=[];


//==================================
// Crear rocas
//==================================

function createRock(){

rocks.push({

x:950,

y:Math.random()*380+20,

w:45,

h:45,

speed:3+Math.random()*3

});

}


//==================================
// Primeras rocas
//==================================

for(let i=0;i<4;i++){

createRock();

}


//==================================
// Dibujar rocas
//==================================

function drawRocks(){

ctx.fillStyle="#666";

rocks.forEach(r=>{

ctx.beginPath();

ctx.arc(

r.x,

r.y,

20,

0,

Math.PI*2

);

ctx.fill();

});

}


//==================================
// Mover rocas
//==================================

function moveRocks(){

rocks.forEach(r=>{

r.x-=r.speed;

if(r.x<-30){

r.x=930;

r.y=Math.random()*400+20;

}

});

}


//==================================
// Golpes
//==================================

function checkRockHit(){

rocks.forEach(r=>{

if(

player.x<r.x+20 &&

player.x+40>r.x-20 &&

player.y<r.y+20 &&

player.y+40>r.y-20

){

lives--;

player.x=100;

player.y=250;

r.x=930;

if(lives<=0){

gameOver();

}

}

});

}


//==================================
// Game Over
//==================================

function gameOver(){

gameRunning=false;

ctx.fillStyle="rgba(0,0,0,.7)";

ctx.fillRect(0,0,900,500);

ctx.fillStyle="white";

ctx.font="55px Poppins";

ctx.fillText(

"GAME OVER",

250,

220

);

ctx.font="28px Poppins";

ctx.fillText(

"Puntaje: "+score,

340,

280

);

}


//==================================
// Reemplaza tu gameLoop()
//==================================

function gameLoop(){

if(!gameRunning)return;

ctx.clearRect(0,0,900,500);

drawBackground();

movePlayer();

moveRocks();

drawIngredients();

drawRocks();

collectIngredients();

checkRockHit();

drawPlayer();

drawHUD();

requestAnimationFrame(gameLoop);

}/*==================================================
        PARTE 3
        Niveles + Enemigos + Victoria
==================================================*/

//==============================
// Variables del juego
//==============================

let level = 1;
let timer = 90;
let gameWon = false;

setInterval(() => {

    if (gameRunning && !gameWon) {

        timer--;

        if (timer <= 0) {

            gameOver();

        }

    }

},1000);

//==============================
// Enemigos
//==============================

let enemies=[];

function createEnemy(){

    enemies.push({

        x:Math.random()*800+50,
        y:Math.random()*400+20,

        size:35,

        speed:1.5

    });

}

for(let i=0;i<2;i++){

    createEnemy();

}

//==============================

function drawEnemies(){

    ctx.fillStyle="#8B0000";

    enemies.forEach(e=>{

        ctx.beginPath();

        ctx.arc(e.x,e.y,e.size/2,0,Math.PI*2);

        ctx.fill();

    });

}

//==============================

function moveEnemies(){

    enemies.forEach(e=>{

        let dx=player.x-e.x;

        let dy=player.y-e.y;

        let dist=Math.sqrt(dx*dx+dy*dy);

        if(dist>0){

            e.x+=dx/dist*e.speed;

            e.y+=dy/dist*e.speed;
        }

    });

}

//==============================
// Colisión enemigo
//==============================

function enemyCollision(){

    enemies.forEach(e=>{

        if(

            player.x<e.x+20 &&
            player.x+40>e.x-20 &&
            player.y<e.y+20 &&
            player.y+40>e.y-20

        ){

            lives--;

            player.x=100;
            player.y=250;

            if(lives<=0){

                gameOver();

            }

        }

    });

}

//==============================
// Partículas
//==============================

let particles=[];

function createParticles(x,y){

    for(let i=0;i<12;i++){

        particles.push({

            x:x,

            y:y,

            vx:(Math.random()-0.5)*5,

            vy:(Math.random()-0.5)*5,

            life:40

        });

    }

}

function drawParticles(){

    ctx.fillStyle="#FFD700";

    particles.forEach(p=>{

        ctx.fillRect(p.x,p.y,4,4);

        p.x+=p.vx;

        p.y+=p.vy;

        p.life--;

    });

    particles=particles.filter(p=>p.life>0);

}

//==============================
// Reemplaza collectIngredients()
//==============================

function collectIngredients(){

    for(let i=ingredients.length-1;i>=0;i--){

        if(collision(player,ingredients[i])){

            score+=100;

            createParticles(

                ingredients[i].x,

                ingredients[i].y

            );

            ingredients.splice(i,1);

            createIngredient();

            // Subir nivel
            if(score==500){

                level=2;

                enemies.push({

                    x:700,
                    y:100,
                    size:35,
                    speed:2.3

                });

            }

            if(score==1000){

                level=3;

                enemies.push({

                    x:500,
                    y:300,
                    size:35,
                    speed:3

                });

            }

            if(score>=2000){

                victory();

            }

        }

    }

}

//==============================
// Victoria
//==============================

function randomCode(){

    return "KWS-"+Math.floor(

        1000+Math.random()*9000

    );

}

function victory(){

    gameWon=true;

    gameRunning=false;

    const code=randomCode();

    ctx.fillStyle="rgba(0,0,0,.8)";
    ctx.fillRect(0,0,900,500);

    ctx.fillStyle="#FFD700";

    ctx.font="55px Poppins";

    ctx.fillText("¡GANASTE!",280,120);

    ctx.font="28px Poppins";

    ctx.fillStyle="white";

    ctx.fillText("Código de descuento:",260,190);

    ctx.font="40px Poppins";

    ctx.fillStyle="#00FF66";

    ctx.fillText(code,320,250);

    ctx.font="22px Poppins";

    ctx.fillStyle="white";

    ctx.fillText(

        "Obtén un 5% de descuento al comprar 2 barras KAWSAY.",

        70,

        340

    );

    ctx.fillText(

        "¡Gracias por jugar!",

        300,

        390

    );

}

//==============================
// HUD
//==============================

function drawHUD(){

    ctx.fillStyle="#000";

    ctx.font="22px Poppins";

    ctx.fillText("⭐ "+score,20,30);

    ctx.fillText("❤️ "+lives,20,60);

    ctx.fillText("🏆 Nivel "+level,20,90);

    ctx.fillText("⏱ "+timer+" s",20,120);

}

//==============================
// Nuevo Game Loop
//==============================

function gameLoop(){

    if(!gameRunning)return;

    ctx.clearRect(0,0,900,500);

    drawBackground();

    movePlayer();

    moveRocks();

    moveEnemies();

    collectIngredients();

    enemyCollision();

    checkRockHit();

    drawIngredients();

    drawRocks();

    drawEnemies();

    drawParticles();

    drawPlayer();

    drawHUD();

    requestAnimationFrame(gameLoop);

}