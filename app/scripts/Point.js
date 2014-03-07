PONG.Point = function(x, y, z){
    PONG.Entity.apply(this, arguments);
    this.width = this.height = 7;
    this.x = x;
    this.y = y;
    this.graphics = [new PONG.Rect(this.x,this.y,this.width,this.height, this.color)];
    this.z = z;
};

PONG.Point.prototype = Object.create( PONG.Entity.prototype );
PONG.Point.prototype.constructor = PONG.Point;