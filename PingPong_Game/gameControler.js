let     destination;
let     destinationSet = false;
const   distance = 10;
const   gameWidth = 601;
const   gameHeight = 301;
const   minWidth = 0;
const   mediumWidth = 300;
const   maxWidth = 600;
const   minHeight = 0;
const   maxHeight = 300;
let     angleOne = 0, angleTwo = 0, angleThree = 0;
const   angleFortyFive = Math.PI / 4;
let     ball;
function setBallObject(ballObj){
    ball = ballObj;
}

function tick(){
    console.log('tick')
    if(!destinationSet){
        destination = setDestination();
        destinationSet = true;
    }
    ball.x = destination.x - ball.width / 2;
    ball.y = destination.y - ball.height / 2;
    //updateBallLocation()
}

function setDestination(){
    const randomLoc = getRandomLocation();
    const dest = getEndPointFromLocation();

    return dest
}

function getRandomLocation(){
    // generate random location
    let point = {'x':0 , 'y':0}
    point['x']= Math.round(Math.random() * gameWidth)
    point['y']= Math.round(Math.random() * gameHeight)

    /*if (point['x'] === mediumWidth || point['y'] === minHeight){
        while (point['x'] === mediumWidth){
            point['x']= Math.round(Math.random() * gameWidth)
        }
        while (point['y'] === minHeight){
            point['y']= Math.round(Math.random() * gameHeight)
        }
    }*/

    return point;
}

function getEndPointFromLocation(){
    // calculate end location
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, finalPoint = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0;

    // case 1: ball in starting position
    startingPoint = ball;
    middlePoint = getRandomLocation();

    if (startingPoint.x > middlePoint.x){
        adjacentSide = startingPoint.x - middlePoint.x;
        oppositeSide = middlePoint.y;
        angleOne = Math.atan(oppositeSide / adjacentSide);

        if(angleOne > angleFortyFive){
            adjacentSide = Math.round(maxHeight / Math.tan(angleOne));
            finalPoint.x = adjacentSide;
            finalPoint.y = maxHeight;
        }else{
            oppositeSide = Math.round(Math.tan(angleOne) * mediumWidth);
            finalPoint.x = minWidth;
            finalPoint.y = oppositeSide;
        }
    }else{
        adjacentSide = middlePoint.x - startingPoint.x;
        oppositeSide = middlePoint.y;
        angleOne = Math.atan(oppositeSide / adjacentSide);
        if (angleOne > angleFortyFive){
            adjacentSide = Math.round(maxHeight / Math.tan(angleOne));
            finalPoint.x = adjacentSide;
            finalPoint.y = maxHeight;
        }else{
            oppositeSide = Math.round(Math.tan(angleOne) * mediumWidth);
            finalPoint.x = maxWidth;
            finalPoint.y = oppositeSide;
        }
    }

    return finalPoint;

    // case 2: ball in play
}

function updateBallLocation(){
    // Take currentLocation and destination, and move towards that destination by distance
}

function boundariesBoard (){

}

