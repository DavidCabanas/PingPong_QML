let destination;
const destinationSet = false;
const distance = 10;
const gameWidth = 601;
const gameHeight = 301;
const startWidth = 0;
const endWidth = 600;
const mediumWidth = 300;
const maxHeight = 300;
const zeroHeight = 0;
const angleFortyFive = Math.PI / 4;
function tick(){
    console.log('tick')
    if(!destinationSet){
        destination = setDestination()
        destinationSet = true;
    }
    updateBallLocation()
}
function ballPosition(ball){
    let ballLocation = {'x':ball.x , 'y': ball.y}
    return ballLocation
}
function setDestination(){
    const randomLoc = getRandomLocation();
    const dest = getEndPointFromLocaiton();
    return dest
}
function getRandomLocation(){
    // generate random location
    let point = {'x':0 , 'y':0}
    point['x']= Math.round(Math.random() * gameWidth)
    point['y']= Math.round(Math.random() * gameHeight)
    if (point['x'] == mediumWidth || point['y'] == zeroHeight){
        while (point['x'] == mediumWidth){
            point['x']= Math.round(Math.random() * gameWidth)
        }
        while (point['y'] == zeroHeight){
            point['y']= Math.round(Math.random() * gameHeight)
        }
    }

    return point;
}
function getEndPointFromLocation(){
    // calculate end location
    let startingPoint = {'x':0, 'y':0}, middlePoint = {'x':0, 'y':0}, finalPoint = {'x':0, 'y':0};
    let oppositeSide = 0, adjacentSide = 0, angle = 0;
    // case 1: ball in starting position
    startingPoint = ballPosition();
    middlePoint = getRandomLocation();
    if (startingPoint.x > middlePoint.x){
        adjacentSide = startingPoint.x - middlePoint.x;
        oppositeSide = middlePoint.y;
        angle = Math.atan(oppositeSide / adjacentSide);
        if(angle > angleFortyFive){
            adjacentSide = oppositeSide / Math.tan(angle);
            finalPoint.x = adjacentSide;
            finalPoint.y = maxHeight;
        }
        else{
            oppositeSide = Math.tan(angle) * adjacentSide;
            finalPoint.x = startWidth;
            finalPoint.y = oppositeSide;
        }
    }
    else{
        adjacentSide = middlePoint.x - startingPoint.x;
        oppositeSide = middlePoint.y;
        angle = Math.atan(oppositeSide / adjacentSide);
        if (angle > angleFortyFive){
            adjacentSide = oppositeSide / Math.tan(angle);
            finalPoint.x = adjacentSide;
            finalPoint.y = maxHeight;
        }
        else{
            oppositeSide = Math.tan(angle) * adjacentSide;
            finalPoint.x = endWidth;
            finalPoint.y = oppositeSide;
        }
    }

    return finalPoint;
    // case 2: ball in play

}
function updateBallLocation(){
    // Take currentLocation and destination, and move towards that destination by distance


    newLocation = someFunMaths()
}
function boundariesBoard (){

}

