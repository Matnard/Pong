PONG.Ball = function(){
    PONG.Entity.apply(this, arguments);
    this.type = PONG.types.BALL;
    this.width = this.height = 13;
    this.speed = {
        x: -3,
        y: -2
    };
    this.graphics = [new PONG.Rect(0,0,this.width,this.height, this.color)];
};

PONG.Ball.prototype = Object.create( PONG.Entity.prototype );
PONG.Ball.prototype.constructor = PONG.Ball;