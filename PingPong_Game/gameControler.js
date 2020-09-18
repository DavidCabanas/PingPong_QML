function moveBall() {

    this.move = function(){
        if (this.y < 1)
            this.vy = 4;
        if (this.y > height)
            this.vy = -4;
            this.x += this.vx;
            this.y += this.vy;
    }

}
