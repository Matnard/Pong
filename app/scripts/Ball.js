PONG.Ball = function(){
    PONG.Rect.apply(this, arguments);
    this.width = 13;
    this.height = 13;
    this.type = PONG.types.BALL;
    this.speed = {
        x: -3,
        y: -2
    };
};

PONG.Ball.prototype = Object.create( PONG.Rect.prototype );
PONG.Ball.prototype.constructor = PONG.Ball;