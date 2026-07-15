const canvas = document.getElementById('baseGame');
const ctx = canvas.getContext('2d');

//criação do quadrado
/**
* @param {number} x -Posição X do canto superior esquerdo
* @param {number} y -Posição Y do canto superior esquerdo
* @param {number} tamanho -Lado do quadrado em pixels
* @param {string} cor -Cor de preeenchimento (CSS color)
*/

function desenharQuadrado(x, y, tamanho, cor){
    if(typeof x !== 'number' || typeof y !== 'number' || typeof tamanho !== 'number') {
        console.error('Coordenadas e tamanho devem ser números');
        return
    }
    if (tamanho <=0){
        console.error('O tamanho do quadrado deve ser positivo.')
        return
    }
    ctx.fillStyle = cor || 'black';
    ctx.fillRect(x, y, tamanho, tamanho)
}


//movimentação e criação da cobra e maça.(la ele)

const maca = { x: 60, y: 60 };
const raioMaca = 10;

const snake = [
    {x: 250, y: 250},
    {x: 225, y: 250},
    {x: 200, y: 250}
];

let dx = 25;
let dy = 0;
let rodando = true;
let ultimoFrame = 0;
const intervalo = 200;

function mover(moveCobra){
   if (!rodando) return;

   if (moveCobra - ultimoFrame > intervalo){
       ultimoFrame = moveCobra;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    for (let i = snake.length -1; i > 0; i--){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }

     snake[0].x += dx;
     snake[0].y += dy;

    //cobra
    snake.forEach(parte => {
      desenharQuadrado(parte.x, parte.y, 25, 'green');
    }); 

    //maça
    ctx.beginPath();
    ctx.arc(maca.x, maca.y, raioMaca, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.stroke();


   if (
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snake[0].x + 25 > canvas.width ||
    snake[0].y + 25 > canvas.height
   ){
    rodando = false;
    console.log("Game Over!");
    return;
   }
  }
    requestAnimationFrame(mover)
}
requestAnimationFrame(mover)

//movimentção com teclas:

document.addEventListener("keydown", TeclasMovimentos)

function teclasMovimentos(event){

     if (event.key == "ArrowRight" && dx !== -25){
           dx= 25;
           dy= 0;
     }

     if (event.key == "ArrowLeft" && dx !== 25){
          dx= -25;
          dy= 0;
     }

     if (event.key == "ArrowUp" && dy !== 25){
           dx= 0;
           dy= -25;
     }

     if (event.key == "ArrowDown" && dy !== -25){
           dx= 0;
           dy= 25;
     }
     
}

