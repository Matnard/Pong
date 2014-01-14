PONG.Paddle = function(){
    PONG.Rect.apply(this, arguments);
    this.width = 13;
    this.height = 70;
    this.type = "Paddle";
};

PONG.Paddle.prototype = Object.create( PONG.Rect.prototype );
PONG.Paddle.prototype.constructor = PONG.Paddle;