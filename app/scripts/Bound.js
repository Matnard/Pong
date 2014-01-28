PONG.Bound = function(){
    PONG.Rect.apply(this, arguments);
    this.width = 600;
    this.height = 13;
    this.type = "Bound";
};

PONG.Bound.prototype = Object.create( PONG.Rect.prototype );
PONG.Bound.prototype.constructor = PONG.Bound;