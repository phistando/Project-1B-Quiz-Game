
//define canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;

//define ball radius, starting position and direction
var x = canvas.width/2;
var y = canvas.height/2;
var ballRadius = 10;
var dx = 4;
var dy = 4;

//draw ball function
function drawBall() {
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#000095";
ctx.fill();
ctx.closePath();
x += dx;
y += dy;
}


//define variables for player One paddle (height/width/start)
var paddleOneHeight = 70;
var paddleOneWidth = 15;
var paddleOneStart = (canvas.height-paddleOneHeight)/2;

//player One draw paddle function
function drawPaddleOne() {
  ctx.beginPath();
  ctx.rect(0, paddleOneStart, paddleOneWidth, paddleOneHeight);
  ctx.fillStyle = "#009500";
  ctx.fill();
  ctx.closePath();
}

//define variable for player Two paddle (height/width/start)
var paddleTwoHeight = 70;
var paddleTwoWidth = 15;
var paddleTwoStart = (canvas.height-paddleTwoHeight)/2;

//player Two draw paddle function
function drawPaddleTwo() {
  ctx.beginPath();
  ctx.rect(canvas.width-paddleTwoWidth, paddleTwoStart, paddleTwoWidth, paddleTwoHeight);
  ctx.fillStyle = "#950000";
  ctx.fill();
  ctx.closePath();
}



//--------------------Player 1 control button-----------------------//

//define variables for player One control buttons
var playerOneUpPressed = false;
var playerOneDownPressed = false;

//add event listener for player One control buttons
document.addEventListener("keydown", playerOneKeyDownHandler);
document.addEventListener("keyup", playerOneKeyUpHandler);


//define functions for player One key handlers
function playerOneKeyDownHandler(e) {
    if(e.keyCode == 87) {
        playerOneUpPressed = true;
    }
    else if(e.keyCode == 83) {
        playerOneDownPressed = true;
    }
}

function playerOneKeyUpHandler(e) {
    if(e.keyCode == 87) {
        playerOneUpPressed = false;
    }
    else if(e.keyCode == 83) {
        playerOneDownPressed = false;
    }
}

//---------------------player 2 control button-------------------//

//define variables for player Two control buttons
var playerTwoUpPressed = false;
var playerTwoDownPressed = false;

//add event listener for player Two control buttons
document.addEventListener("keydown", playerTwoKeyDownHandler);
document.addEventListener("keyup", playerTwoKeyUpHandler);


//define functions for player Two key handlers
function playerTwoKeyDownHandler(e) {
    if(e.keyCode == 79) {
        playerTwoUpPressed = true;
    }
    else if(e.keyCode == 76) {
        playerTwoDownPressed = true;
    }
}

function playerTwoKeyUpHandler(e) {
    if(e.keyCode == 79) {
        playerTwoUpPressed = false;
    }
    else if(e.keyCode == 76) {
        playerTwoDownPressed = false;
    }
}

//--------------------end of control button coding----------------//


//draw function to start game flow
function draw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBall();
  drawPaddleOne();
  drawPaddleTwo();
  ctx.font = "45px Comic Sans MS";
  ctx.fillStyle = "blue";
  ctx.textAlign = "center";


//bouncing off the top and bottom wall
  if(y > canvas.height-ballRadius || y < ballRadius) {
    dy = -dy;
  }

//paddle detection collision
  if(x+ballRadius > canvas.width-paddleOneWidth && x-ballRadius < canvas.width &&
    y+ballRadius > paddleTwoStart && y-ballRadius < paddleTwoStart + paddleTwoHeight)
    {dx *= -1;
  }else if
  (x+ballRadius > 0 && x-ballRadius < paddleOneWidth && y+ballRadius > paddleOneStart && y-ballRadius < paddleOneStart + paddleOneHeight) {
    dx *= -1;
  }else if
  (x+ballRadius < 0) {
    ctx.fillText("Player 2 wins!",canvas.width/2, canvas.height/2);
    clearInterval(timerId);
    $('#restart').toggle();

  }else if
  (x-ballRadius > canvas.width) {
    ctx.fillText("Player 1 wins!",canvas.width/2, canvas.height/2);
    clearInterval(timerId);
    $('#restart').toggle();

  }


//playerOne movement
  if(playerOneUpPressed && paddleOneStart > 0) {
      paddleOneStart -= 4;
  }
  else if(playerOneDownPressed && paddleOneStart < canvas.height-paddleOneHeight) {
      paddleOneStart += 4;
  }


//playerTwo movement
if(playerTwoUpPressed && paddleTwoStart > 0) {
    paddleTwoStart -= 4;
}
else if(playerTwoDownPressed && paddleTwoStart < canvas.height-paddleTwoHeight) {
    paddleTwoStart += 4;
  }
}


//----funtion to start the game by activating the draw function in setInterval

var timerId;

function startGame() {
  timerId = setInterval(draw, 10);

}



//--------------------------button spacebar to begin----------------------

var pressStart = false;


document.addEventListener("keydown", pressStartDownHandler);
document.addEventListener("keyup", pressStartUpHandler);

function pressStartDownHandler(e) {
    if(e.keyCode == 32) {
        pressStart = true;
    }
    if(pressStart) {
      startGame();

      $('#startText').toggle();
    }
  }

  function pressStartUpHandler(e) {
      if(e.keyCode == 32) {
          pressStart = false;
      }
    }


    //--------------------------button Enter to restart----------------------


    var pressEnter = false;


    document.addEventListener("keydown", pressEnterDownHandler);
    document.addEventListener("keyup", pressEnterUpHandler);

    function pressEnterDownHandler(e) {
        if(e.keyCode == 13) {
            pressEnter = true;
        }
        if(pressEnter) {
          location.reload();
          clearInterval(timerId);
        }
      }

      function pressEnterUpHandler(e) {
          if(e.keyCode == 13) {
              pressEnter = false;
          }
        }
