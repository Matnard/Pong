PONG.Bound = function(){
    PONG.Entity.apply(this, arguments);
    this.width = 600;
    this.height = 13;
    this.z = 0;
    this.graphics = [new PONG.Rect(0,0,this.width, this.height, this.color)];
    this.depth = 26;
};

PONG.Bound.prototype = Object.create( PONG.Entity.prototype );
PONG.Bound.prototype.constructor = PONG.Bound;