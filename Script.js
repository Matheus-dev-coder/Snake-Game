const canvas = document.getElementById('baseGame');
const ctx = canvas.getContext('2d');


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


const snake = [
    {x: 250, y: 250},
    {x: 225, y: 250},
    {x: 200, y: 250}
];

let dx = 25;
let dy = 0;
const speed = 0;
let rodando = true;
let ultimoFrame = 0;
const intervalo = 200;

function mover(moveCobra){
   if (!rodando) return;

   if (moveCobra - ultimoFrame > intervalo){
       ultimoFrame = moveCobra;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    snake[0].x += dx;
    snake[0].y += dy;

    for (let i = snake.length -1; i > 0; i--){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }

    snake.forEach(parte => {
      desenharQuadrado(parte.x, parte.y, 25, 'green');
    }); 

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

