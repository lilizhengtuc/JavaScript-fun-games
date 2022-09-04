const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width/tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

// game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return;
    }

    
    clearScreen();
    

    checkAppleCollision();
    drawSnake();
    drawApple();

    drawScore();

    if(score>2){
        speed=11;
    }

    if(score>5){
        speed=15;
    }

    setTimeout(drawGame, 1000/speed);
}

function isGameOver() {
    let gameOver = false;

    if(xVelocity===0 && yVelocity===0){
        return false;
    }
        
    

    // walls
    if(headX<0){
        gameOver=true;
    }

    else if(headX===tileCount){
        gameOver=true;

    }

    else if(headY<0){
        gameOver=true;
    }

    else if(headY===tileCount){
        gameOver=true;

    }

    for (let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x===headX && part.y===headY){
            gameOver = true;
            break;
        }
    }




    if(gameOver){
        context.fillStyle = "white";
        context.font = "50px Verdana";

        if (gameOver) {
            context.fillStyle = "white";
            context.font = "50px Verdana";

            var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // fill with gradient
            context.fillStyle = gradient;
            context.fillText("Game Over!", canvas.width/6.5, canvas.height/2);
        }

        
        


    }
    return gameOver;
}

function drawScore(){
    context.fillStyle = 'white';
    context.font = '10px Verdana';
    context.fillText("Score " + score, canvas.width-50, 10);
}


function clearScreen() {
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake() {

    context.fillStyle = 'orange';
    for(let i=0; i<snakeParts.length;i++){
        let part = snakeParts[i];
        context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length>tailLength){
        snakeParts.shift();
    }

    context.fillStyle = 'pink';
    context.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    context.fillStyle = 'green';
    context.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);
}

function checkAppleCollision() {
    if(appleX===headX && appleY===headY){
        appleX = Math.floor(Math.random()* tileCount);
        appleY = Math.floor(Math.random()* tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity=-1;
        xVelocity=0;
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity=1;
        xVelocity=0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity=0;
        xVelocity=-1;
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity=0;
        xVelocity=1;
    }
}

drawGame();
