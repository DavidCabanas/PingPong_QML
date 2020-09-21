var ballObj //Local reference
function getBallObj() { return ballObj;}


function moveBall(gameBall) {

    var i=1;


    if (gameBall.x == 0){
        while ( gameBall.x < 600)
        gameBall.x = gameBall.x + i;
    }
    if (gameBall.y == 0){
        while ( gameBall.y < 300)
        gameBall.y = gameBall.y + i;
    }
    if (gameBall.x >= 600){
        while (gameBall.x > 0)
        gameBall.x = gameBall.x - i;
    }
    if (gameBall.y >= 300){
        while (gameBall.y > 0)
        gameBall.y = gameBall.y - i;
    }

}

function boundariesBoard (){

}

