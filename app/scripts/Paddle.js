PONG.Paddle = function(){
    PONG.Entity.apply(this, arguments);
    this.width = 13;
    this.height = 70;
    this.graphics = [new PONG.Rect(0,0, this.width, this.height, this.color)];
};

PONG.Paddle.prototype = Object.create( PONG.Entity.prototype );
PONG.Paddle.prototype.constructor = PONG.Paddle;