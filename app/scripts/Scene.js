PONG.Scene = function(){
    PONG.Entity.apply(this, arguments);
    this.color = "#5856D6";
    this.rgba = {
        r: 88,
        g: 86,
        b: 214,
        a: 255
    };
    this.graphics = [new PONG.Rect(0,13,600,420, this.color, this.rgba)];
    this.z = 14;
};

PONG.Scene.prototype = Object.create( PONG.Entity.prototype );
PONG.Scene.prototype.constructor = PONG.Scene;