console.log("Script carregado")

const canvas = document.getElementById('baseGame');
const scoreElemento = document.getElementById("score");
const recordElemento = document.getElementById("record");
const botaoReniciar = document.getElementById("reiniciar");

botaoReniciar.style.display = "none";
botaoReniciar.addEventListener("click", reiniciarJogo);

const ctx = canvas.getContext('2d');


// criação do quadrado
/**
 * 
 * @param {number} x - Posição X do canto superior esquerdo
 * @param {number} y - Posição Y do canto superior esquerdo
 * @param {number} tamanho - Lado do quadrado em pixels
 * @param {string} cor - Cor de preenchimento (CSS color)
 */

function desenharQuadrado(x, y, tamanho, cor){

    if(typeof x !== 'number' || typeof y !== 'number' || typeof tamanho !== 'number') {
        console.error('Coordenadas e tamanho devem ser números');
        return;
    }

    if(tamanho <= 0){
        console.error('O tamanho do quadrado deve ser positivo.');
        return;
    }

    ctx.fillStyle = cor || 'black';
    ctx.fillRect(x, y, tamanho, tamanho);
}


// movimentação e criação da cobra e maçã

const maca = { 
    x: 25, 
    y: 25 
};

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

let score = 0;

let recorde = Number(localStorage.getItem("recorde")) || 0;

recordElemento.innerHTML = recorde;



function mover(moveCobra){

    if (!rodando) return;


    if (moveCobra - ultimoFrame > intervalo){

        ultimoFrame = moveCobra;


        ctx.clearRect(0,0, canvas.width, canvas.height);



        for (let i = snake.length - 1; i > 0; i--){

            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;

        }



        snake[0].x += dx;
        snake[0].y += dy;


        console.log(snake[0].x, snake[0].y, dx, dy);



        // cobra
        snake.forEach(parte => {

            desenharQuadrado(parte.x, parte.y, 25, 'green');

        });



        // maçã
        ctx.beginPath();

        ctx.arc(
            maca.x, 
            maca.y, 
            raioMaca, 
            0, 
            Math.PI * 2
        );

        ctx.fillStyle = '#ff0000';

        ctx.fill();

        ctx.strokeStyle = '#2c3e50';

        ctx.stroke();



        if(
            snake[0].x == maca.x && 
            snake[0].y == maca.y
        ){

            gerarMaca();


            const cauda = snake[snake.length -1];


            snake.push({
                x: cauda.x,
                y: cauda.y
            });


            score += 1;

            scoreElemento.innerHTML = score;

        }



        if(score > recorde){

            recorde = score;

            recordElemento.innerHTML = recorde;

            localStorage.setItem("recorde", recorde);

        }




        for(let i = 1; i < snake.length; i++){

            if(
                snake[0].x == snake[i].x &&
                snake[0].y == snake[i].y
            ){

                rodando = false;

                botaoReniciar.style.display = "block";

                console.log("Game Over");

            }


            if(
                snake[0].x < 0 ||
                snake[0].y < 0 ||
                snake[0].x + 25 > canvas.width ||
                snake[0].y + 25 > canvas.height
            ){

                rodando = false;

                botaoReniciar.style.display = "block";

                console.log("Game Over!");

                return;

            }

        }

    }


    requestAnimationFrame(mover);

}


requestAnimationFrame(mover);




// movimentação com teclas

document.addEventListener("keydown", teclasMovimentos);



function teclasMovimentos(event){

    console.log("Antes",dx,dy);



    if(event.key == "ArrowRight" && dx !== -25){

        dx = 25;
        dy = 0;

    }


    if(event.key == "ArrowLeft" && dx !== 25){

        dx = -25;
        dy = 0;

    }


    if(event.key == "ArrowUp" && dy !== 25){

        dx = 0;
        dy = -25;

    }


    if(event.key == "ArrowDown" && dy !== -25){

        dx = 0;
        dy = 25;

    }


    console.log("Depois", dx,dy);

}



//Gera novas maças sem que as maças fiquem em cima da cobra
function gerarMaca(){

    let posicaoValida = false;

    let novoXmaca;
    let novoYmaca;



    while(posicaoValida == false){


        novoXmaca = Math.floor(Math.random() * 24) * 25;

        novoYmaca = Math.floor(Math.random() * 24) * 25;


        posicaoValida = true;



        for(let i = 0; i < snake.length; i++){

            if(
                novoXmaca == snake[i].x &&
                novoYmaca == snake[i].y
            ){

                posicaoValida = false;

                break;

            }

        }


    }



    maca.x = novoXmaca;

    maca.y = novoYmaca;


}



//reiniciar o game
function reiniciarJogo(){


    score = 0;

    scoreElemento.innerHTML = score;



    snake.splice(0, snake.length);



    snake.push(
        { x: 250, y: 250 },
        { x: 225, y: 250 },
        { x: 200, y: 250 }
    );



    dx = 25;

    dy = 0;



    rodando = true;

    ultimoFrame = 0;



    gerarMaca();


    botaoReniciar.style.display = "none";


    requestAnimationFrame(mover);


}