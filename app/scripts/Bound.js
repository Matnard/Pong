PONG.Bound = function(){
    PONG.Entity.apply(this, arguments);
    this.width = 600;
    this.height = this.z = 13;
    this.graphics = [new PONG.Rect(0,0,this.width, this.height, this.color)];
};

PONG.Bound.prototype = Object.create( PONG.Entity.prototype );
PONG.Bound.prototype.constructor = PONG.Bound;