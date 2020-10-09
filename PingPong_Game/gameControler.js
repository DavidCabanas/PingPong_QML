let     destination;
let     destinationSet = false;
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
let     rightRacket;
let     previousStartingPoint = {'x':0 , 'y':0};
let     hypotenuse = 10;
let     endPoint = {'x':0, 'y':0};

function gameSetup(ballObj, leftRacketObj, rightRacketObj){
    ball = ballObj;
    leftRacket = leftRacketObj;
    rightRacket = rightRacketObj;
}

function tick(){
    console.log('tick')
    /*if(!destinationSet){
        destination = setDestination();
        destinationSet = true;
    }*/

    boundariesBoard();
    boundariesRackets();
    destination = setDestination();
    console.log("x: ", destination.x, " y: ", destination.y);
    ball.x = destination.x// - ball.width / 2;
    ball.y = destination.y// - ball.height / 2;
    minWidth = 0;
    maxWidth = 600;
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

    if (startingPoint.x === minWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
        if(startingPoint.y > previousStartingPoint.y){
            middlePoint.y = startingPoint.y + adjacentSide;
            middlePoint.x = oppositeSide;
        }else{
            middlePoint.y = startingPoint.y - adjacentSide;
            middlePoint.x = oppositeSide;
        }
    }
    if (startingPoint.x === maxWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
        if(startingPoint.y > previousStartingPoint.y){
            middlePoint.y = startingPoint.y + adjacentSide;
            middlePoint.x = maxWidth - oppositeSide;
        }else{
            middlePoint.y = startingPoint.y - adjacentSide;
            middlePoint.x = maxWidth - oppositeSide;
        }
    }
    if (startingPoint.y === minHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
        if(startingPoint.x > previousStartingPoint.x){
            middlePoint.x = startingPoint.x + adjacentSide;
            middlePoint.y = oppositeSide;
        }else{
            middlePoint.x = startingPoint.x - adjacentSide;
            middlePoint.y = oppositeSide;
        }
    }
    if (startingPoint.y === maxHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
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

function getDiagonalAngle (){
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, angle = 0;

    startingPoint = {'x':ball.x, 'y':ball.y};
    middlePoint = getMiddlePointLocation();

    if(startingPoint.x === minWidth || startingPoint.x === maxWidth){
        if(startingPoint.y > middlePoint.y){
            angle = Math.atan(maxWidth / startingPoint.y)
        }else{
            angle = Math.atan(maxWidth / (maxHeight - startingPoint.y))
        }
    }
    if(startingPoint.y === minHeight || startingPoint.y === maxHeight){
        if(startingPoint.x > middlePoint.x){
            angle = Math.atan(maxHeight / startingPoint.x)
        }else{
            angle = Math.atan(maxHeight / (maxWidth - startingPoint.x))
        }
    }

    return angle;
}

function getEndPointFromLocation(){
    // calculate end location
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, finalPoint = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0;

    // case 1: ball in starting position
    if(ball.x === 300 && ball.y === 0){
        startingPoint = ball;
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

        return finalPoint;
    }

    // case 2: ball in play
    else{
        startingPoint = ball;
        middlePoint = getMiddlePointLocation();
        angleTwo = angleOneHundredEighty - (angleNinety + angleOne);

        if(startingPoint.x === minWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
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

        if(startingPoint.x === maxWidth && (startingPoint.y !== minHeight || startingPoint.y !== maxHeight)){
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

        if(startingPoint.y === minHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
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

        if(startingPoint.y === maxHeight && (startingPoint.x !== minWidth || startingPoint.x !== maxWidth)){
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
}

function updateBallLocation(){
    let startingPoint = {'x':0, 'y':0}, updateBall = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0;

    startingPoint = {'x':ball.x, 'y':ball.y};

    if (startingPoint.x === mediumWidth && startingPoint.y === minHeight){
        endPoint = getEndPointFromLocation();
    }

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
    }
}

function boundariesRackets(){
    if(ball.x <= leftRacket.width && (ball.y >= leftRacket.y && (ball.y <= leftRacket.y + leftRacket.height) )){
        minWidth = leftRacket.width;
        endPoint = getEndPointFromLocation();
    }
    if(ball.x >= (maxWidth - rightRacket.width) && (ball.y >= rightRacket.y && (ball.y <= rightRacket.y + rightRacket.height) )){
        maxWidth = maxWidth - rightRacket.width;
        endPoint = getEndPointFromLocation();
    }
}

