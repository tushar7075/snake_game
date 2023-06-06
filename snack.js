var blocksize = 25;
var rows = 24;
var cols = 24;
var board;
var context;
//***********snack head */
var snakeX = blocksize*6;
var snakeY = blocksize*6;

//***************food */
var foodX ;
var foodY ;

// *************move the snack
var velocityX=0;
var velocityY=0;

var snakebody = [];
var gameover = false;
var count;
window.onload = function(){
    count = 0;
    board=document.getElementById('board');
    board.height = rows*blocksize;
    board.width = cols*blocksize;
    context = board.getContext("2d"); 
    placefood();
    document.addEventListener("keyup",changeDirection);
    // update();
    setInterval(update,100);
}

function update(){
    if(gameover){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle='red';
    context.fillRect(foodX,foodY,blocksize,blocksize);

    if(snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX, foodY]);
        count++;
        placefood();
    }

    for(let i = snakebody.length-1 ; i > 0; i--){
        snakebody[i]=snakebody[i-1];
    }

    if(snakebody.length){
        snakebody[0]=[snakeX,snakeY];
    }
    context.fillStyle="lime";
    snakeX+=velocityX*blocksize;
    snakeY+=velocityY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    //fillRect(x,y,width,height);

    for(let i=0;i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }

    //gameover conditions
    if(snakeX<0 || snakeX > (cols*blocksize) -1 || snakeY<0 || snakeY>(rows*blocksize)-1){
        gameover = true;
        alert("Game Over!! Your score is: "+count);
    }
    for(let i =0;i<snakebody.length;i++){
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
            gameover=true;
            alert("Game Over!! Your score is: "+count);
        }
    }
    

}

function placefood(){
    foodX = Math.floor(Math.random()*cols)*blocksize;
    foodY = Math.floor(Math.random()*rows)*blocksize;

}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code == "ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    if(e.code == "ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    if(e.code == "ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}