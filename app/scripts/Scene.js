PONG.Scene = function(){
    PONG.Rect.apply(this, arguments);
    this.y = 13;
    this.width = 600;
    this.height = 420;
    this.color = "#5856D6";
    this.type = "Scene";
};

PONG.Scene.prototype = Object.create( PONG.Rect.prototype );
PONG.Scene.prototype.constructor = PONG.Scene;