PONG.Paddle = function(){
    PONG.Rect.apply(this, arguments);
    this.width = 13;
    this.height = 70;
    this.type = PONG.types.PADDLE;
};

PONG.Paddle.prototype = Object.create( PONG.Rect.prototype );
PONG.Paddle.prototype.constructor = PONG.Paddle;