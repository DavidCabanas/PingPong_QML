let     destination;
let     destinationSet = false;
let     resetGame = false;
let     firstTick = false;
let     ballBouncesPaddle = false;
let     hypotenuse = 4;
let     paddleSpeed = 5;
const   distance = 1;
const   gameWidth = 601;
const   gameHeight = 301;
let     minWidth = 0;
const   mediumWidth = 300;
let     maxWidth = 600;
const   minHeight = 0;
const   maxHeight = 300;
let     angleOne = 0, angleTwo = 0;
const   angleFortyFive = Math.PI / 4;
const   angleNinety = Math.PI / 2;
const   angleOneHundredEighty = Math.PI;
let     ball;
let     leftRacket;
let     leftCounter = 0;
let     rightRacket;
let     rightCounter = 0;
let     leftResult;
let     rightResult;
let     youWin;
let     youLose;
let     previousStartingPoint = {'x':0 , 'y':0};
let     previousBall = {'x':0 , 'y':0};
let     endPoint = {'x':0, 'y':0};

function gameSetup(ballObj, leftRacketObj, rightRacketObj, leftResultObj, rightResultObj, youWinObj, youLoseObj){
    ball = ballObj;
    leftRacket = leftRacketObj;
    rightRacket = rightRacketObj;
    leftResult = leftResultObj;
    rightResult = rightResultObj;
    youWin = youWinObj;
    youLose = youLoseObj;
}

function tick(){
    if(resetGame === false){
        console.log('tick')
        boundariesBoard();
        boundariesRackets();
        destination = setDestination();
        console.log("x: ", destination.x, " y: ", destination.y);
        ball.x = destination.x;
        ball.y = destination.y;
        updateLocationRightRacket();
        minWidth = 0;
        maxWidth = 600;
    }
}

function setDestination(){
    let dest = updateBallLocation()

    return dest
}

function getRandomLocation(){
    let point = {'x':0 , 'y':0}

    point['x']= Math.round(Math.random() * gameWidth)
    point['y']= Math.round(Math.random() * gameHeight)

    return point;
}

function getMiddlePointLocation(){
    let startingPoint = {'x':0 , 'y':0}, middlePoint = {'x':0 , 'y':0};
    let oppositeSide = 0, adjacentSide = 0;

    startingPoint = ball;
    oppositeSide = Math.sin(angleOne) * distance;
    adjacentSide = Math.cos(angleOne) * distance;

    if (startingPoint.x <= minWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
        if(startingPoint.y > previousStartingPoint.y){
            middlePoint.y = startingPoint.y + adjacentSide;
            middlePoint.x = oppositeSide;
        }else{
            middlePoint.y = startingPoint.y - adjacentSide;
            middlePoint.x = oppositeSide;
        }
    }
    if (startingPoint.x >= maxWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
        if(startingPoint.y > previousStartingPoint.y){
            middlePoint.y = startingPoint.y + adjacentSide;
            middlePoint.x = maxWidth - oppositeSide;
        }else{
            middlePoint.y = startingPoint.y - adjacentSide;
            middlePoint.x = maxWidth - oppositeSide;
        }
    }
    if (startingPoint.y <= minHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
        if(startingPoint.x > previousStartingPoint.x){
            middlePoint.x = startingPoint.x + adjacentSide;
            middlePoint.y = oppositeSide;
        }else{
            middlePoint.x = startingPoint.x - adjacentSide;
            middlePoint.y = oppositeSide;
        }
    }
    if (startingPoint.y >= maxHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
        if(startingPoint.x > previousStartingPoint.x){
            middlePoint.x = startingPoint.x + adjacentSide;
            middlePoint.y = maxHeight - oppositeSide;
        }else{
            middlePoint.x = startingPoint.x - adjacentSide;
            middlePoint.y = maxHeight - oppositeSide;
        }
    }

    return middlePoint;
}

function getDiagonalAngle(){
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, angle = 0;

    startingPoint = {'x':ball.x, 'y':ball.y};
    middlePoint = getMiddlePointLocation();

    if(startingPoint.x <= minWidth || startingPoint.x >= maxWidth){
        if(startingPoint.y > middlePoint.y){
            angle = Math.atan(maxWidth / startingPoint.y)
        }else{
            angle = Math.atan(maxWidth / (maxHeight - startingPoint.y))
        }
    }
    if(startingPoint.y <= minHeight || startingPoint.y >= maxHeight){
        if(startingPoint.x > middlePoint.x){
            angle = Math.atan(maxHeight / startingPoint.x)
        }else{
            angle = Math.atan(maxHeight / (maxWidth - startingPoint.x))
        }
    }

    return angle;
}

function getEndPointFromLocation(){
    let finalPoint = {'x':0, 'y':0};

    if(firstTick === false){// case 1: ball in starting position
        return finalPoint = ballStartingPosition();
    }else{                  // case 2: ball in play
        return finalPoint = ballInPlay();
    }
}

function ballStartingPosition(){
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, finalPoint = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0;

    startingPoint = {'x':ball.x, 'y':ball.y};
    previousStartingPoint = {'x':ball.x, 'y':ball.y};
    middlePoint = getRandomLocation();

    if (startingPoint.x > middlePoint.x){
        adjacentSide = startingPoint.x - middlePoint.x;
        oppositeSide = middlePoint.y;
        angleOne = Math.atan(oppositeSide / adjacentSide);

        if(angleOne > angleFortyFive){
            oppositeSide = maxHeight;
            adjacentSide = Math.round(oppositeSide / Math.tan(angleOne));
            finalPoint.x = startingPoint.x - adjacentSide;
            finalPoint.y = oppositeSide;
        }else{
            adjacentSide = startingPoint.x;
            oppositeSide = Math.round(Math.tan(angleOne) * adjacentSide);
            finalPoint.x = minWidth;
            finalPoint.y = oppositeSide;
        }
    }else{
        adjacentSide = middlePoint.x - startingPoint.x;
        oppositeSide = middlePoint.y;
        angleOne = Math.atan(oppositeSide / adjacentSide);
        if (angleOne > angleFortyFive){
            oppositeSide = maxHeight;
            adjacentSide = Math.round(oppositeSide / Math.tan(angleOne));
            finalPoint.x = startingPoint.x + adjacentSide;
            finalPoint.y = oppositeSide;
        }else{
            adjacentSide = maxWidth - startingPoint.x;
            oppositeSide = Math.round(Math.tan(angleOne) * adjacentSide);
            finalPoint.x = maxWidth;
            finalPoint.y = oppositeSide;
        }
    }
    firstTick = true;

    return finalPoint;
}

function ballInPlay(){
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, finalPoint = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0;
    startingPoint = {'x':ball.x, 'y':ball.y};
    middlePoint = getMiddlePointLocation();
    angleTwo = angleOneHundredEighty - (angleNinety + angleOne);

    if(startingPoint.x <= minWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
        if(startingPoint.y > middlePoint.y){
            if(angleOne > getDiagonalAngle()){
                oppositeSide = maxWidth;
                adjacentSide = oppositeSide / Math.tan(angleOne);
                finalPoint.x = maxWidth;
                finalPoint.y = startingPoint.y - adjacentSide;
            }else{
                adjacentSide = startingPoint.y;
                oppositeSide = adjacentSide * Math.tan(angleOne);
                finalPoint.x = oppositeSide;
                finalPoint.y = minHeight;
            }
        }else{
            if(angleOne > getDiagonalAngle()){
                oppositeSide = maxWidth;
                adjacentSide = oppositeSide / Math.tan(angleOne);
                finalPoint.x = maxWidth;
                finalPoint.y = startingPoint.y + adjacentSide;
            }else{
                adjacentSide = maxHeight - startingPoint.y;
                oppositeSide = adjacentSide * Math.tan(angleOne);
                finalPoint.x = oppositeSide;
                finalPoint.y = maxHeight;
            }
        }
    }

    if(startingPoint.x >= maxWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
        if(startingPoint.y > middlePoint.y){
            if(angleOne > getDiagonalAngle()){
                oppositeSide = maxWidth;
                adjacentSide = oppositeSide / Math.tan(angleOne);
                finalPoint.x = minWidth;
                finalPoint.y = startingPoint.y - adjacentSide;
            }else{
                adjacentSide = startingPoint.y;
                oppositeSide = adjacentSide * Math.tan(angleOne);
                finalPoint.x = maxWidth - oppositeSide;
                finalPoint.y = minHeight;
            }
        }else{
            if(angleOne > getDiagonalAngle()){
                oppositeSide = maxWidth;
                adjacentSide = oppositeSide / Math.tan(angleOne);
                finalPoint.x = minWidth;
                finalPoint.y = startingPoint.y + adjacentSide;
            }else{
                adjacentSide = maxHeight - startingPoint.y;
                oppositeSide = adjacentSide * Math.tan(angleOne);
                finalPoint.x = maxWidth - oppositeSide;
                finalPoint.y = maxHeight;
            }
        }
    }

    if(startingPoint.y <= minHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
        if(startingPoint.x < mediumWidth){
            if(startingPoint.x > middlePoint.x){
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x - adjacentSide;
                    finalPoint.y = maxHeight;
                }else{
                    adjacentSide = startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = minWidth;
                    finalPoint.y = oppositeSide;
                }
            }else{
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x + adjacentSide;
                    finalPoint.y = maxHeight;
                }else{
                    adjacentSide = maxWidth - startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = maxWidth;
                    finalPoint.y = oppositeSide;
                }
            }
        }else{
            if(startingPoint.x > middlePoint.x){
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x - adjacentSide;
                    finalPoint.y = maxHeight;
                }else{
                    adjacentSide = startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = minWidth;
                    finalPoint.y = oppositeSide;
                }
            }else{
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = adjacentSide + startingPoint.x;
                    finalPoint.y = maxHeight;
                }else{
                    adjacentSide = maxWidth - startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = maxWidth;
                    finalPoint.y = oppositeSide;
                }
            }
        }

        if(startingPoint.x === mediumWidth){
            if(startingPoint.x > middlePoint){
                if(angleOne > angleFortyFive){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x - adjacentSide;
                    finalPoint.y = maxHeight;
                }else{
                    adjacentSide = startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = minWidth;
                    finalPoint.y = oppositeSide;
                }
            }else{
                if(angleOne > angleFortyFive){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = adjacentSide + startingPoint.x;
                    finalPoint.y = maxHeight;
                }else{
                    adjacentSide = maxWidth - startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = maxWidth;
                    finalPoint.y = oppositeSide;
                }
            }
        }
    }

    if(startingPoint.y >= maxHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
        if(startingPoint.x < mediumWidth){
            if(startingPoint.x > middlePoint.x){
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x - adjacentSide;
                    finalPoint.y = minHeight;
                }else{
                    adjacentSide = startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = minWidth;
                    finalPoint.y = maxHeight - oppositeSide;
                }
            }else{
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x + adjacentSide;
                    finalPoint.y = minHeight;
                }else{
                    adjacentSide = maxWidth - startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = maxWidth;
                    finalPoint.y = maxHeight - oppositeSide;
                }
            }
        }else{
            if(startingPoint.x > middlePoint.x){
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x - adjacentSide;
                    finalPoint.y = minHeight;
                }else{
                    adjacentSide = startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = minWidth;
                    finalPoint.y = maxHeight - oppositeSide;
                }
            }else{
                if(angleOne > getDiagonalAngle()){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x + adjacentSide;
                    finalPoint.y = minHeight;
                }else{
                    adjacentSide = maxWidth - startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = maxWidth;
                    finalPoint.y = maxHeight - oppositeSide;
                }
            }
        }

        if(startingPoint.x === mediumWidth){
            if(startingPoint.x > middlePoint){
                if(angleOne > angleFortyFive){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x - adjacentSide;
                    finalPoint.y = minHeight;
                }else{
                    adjacentSide = startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = minWidth;
                    finalPoint.y = maxHeight - oppositeSide;
                }
            }else{
                if(angleOne > angleFortyFive){
                    oppositeSide = maxHeight;
                    adjacentSide = oppositeSide / Math.tan(angleOne);
                    finalPoint.x = startingPoint.x + adjacentSide;
                    finalPoint.y = minHeight;
                }else{
                    adjacentSide = maxWidth - startingPoint.x;
                    oppositeSide = adjacentSide * Math.tan(angleOne);
                    finalPoint.x = maxWidth;
                    finalPoint.y = maxHeight - oppositeSide;
                }
            }
        }

    }

    previousStartingPoint = {'x':ball.x, 'y':ball.y};

    return finalPoint;
}

function updateBallLocation(){
    let startingPoint = {'x':0, 'y':0}, updateBall = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0;

    startingPoint = {'x':ball.x, 'y':ball.y};
    increaseBallSpeed();
    adjacentSide = Math.cos(angleOne) * hypotenuse;
    oppositeSide = Math.sin(angleOne) * hypotenuse;

    if (startingPoint.x > endPoint.x){
        updateBall.x = startingPoint.x - adjacentSide
    }else{
        updateBall.x = startingPoint.x + adjacentSide
    }

    if (startingPoint.y > endPoint.y){
        updateBall.y = startingPoint.y - oppositeSide
    }else{
        updateBall.y = startingPoint.y + oppositeSide
    }

    if(updateBall.x > maxWidth - 1){
        updateBall.x = maxWidth;
    }

    if(updateBall.x < minWidth + 1){
        updateBall.x = minWidth;
    }

    if(updateBall.y > maxHeight - 1){
        updateBall.y = maxHeight;
    }

    if(updateBall.y < minHeight + 1){
        updateBall.y = minHeight;
    }

    return updateBall;
}

function boundariesBoard(){
    if(ball.y <= minHeight || ball.y >= maxHeight){
        endPoint = getEndPointFromLocation();
    }
    if(ball.x <= minWidth || ball.x >= maxWidth){
        resultCounter();
        endPoint = getEndPointFromLocation();
    }
}

function boundariesRackets(){
    if(ball.x <= leftRacket.width && (ball.y >= leftRacket.y && (ball.y <= leftRacket.y + leftRacket.height) )){
        minWidth = leftRacket.width;
        endPoint = getEndPointFromLocation();
        ballBouncesPaddle = true;
    }
    if(ball.x >= (maxWidth - rightRacket.width) && (ball.y >= rightRacket.y && (ball.y <= rightRacket.y + rightRacket.height) )){
        maxWidth = maxWidth - rightRacket.width;
        endPoint = getEndPointFromLocation();
        ballBouncesPaddle = true;
    }
}

function resultCounter(){
    if(ball.x <= minWidth){
        rightCounter = rightCounter + 1;
        rightResult.text = rightCounter;
        resetBall();
    }
    if(ball.x >= maxWidth){
        leftCounter = leftCounter + 1;
        leftResult.text = leftCounter;
        paddleSpeed = paddleSpeed + 2;
        resetBall();
    }
    if(leftCounter === 5){
        paddleSpeed = 5;
        hypotenuse = 4;
        youWin.visible = true;
        resetGame = true;
    }
    if(rightCounter === 5){
        paddleSpeed = 5;
        hypotenuse = 4;
        youLose.visible = true;
        resetGame = true;
    }
}

function resetBall(){
    ball.x = mediumWidth;
    ball.y = minHeight;
    firstTick = false;
    hypotenuse = 4;
}

function updateLocationRightRacket(){
    if(ball.x >= mediumWidth && previousStartingPoint.x < endPoint.x){
        if (ball.y > rightRacket.y){
            rightRacket.y += paddleSpeed;
        }
        if (ball.y < rightRacket.y){
            rightRacket.y -= paddleSpeed;
        }
        if(rightRacket.y >= (maxHeight - rightRacket.height)){
            rightRacket.y = maxHeight - rightRacket.height;
        }
        if(rightRacket.y <= minHeight){
            rightRacket.y = minHeight;
        }
    }
}

function increaseBallSpeed(){
    if(ballBouncesPaddle === true){
        hypotenuse = hypotenuse + 1;
        ballBouncesPaddle = false;
    }
}

