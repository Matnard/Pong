PONG.Scene = function(){
    PONG.Rect.apply(this, arguments);
    this.width = PONG.stageWidth;
    this.height = PONG.stageHeight;
    this.color = "#5856D6";
    this.type = "Scene";
};

PONG.Scene.prototype = Object.create( PONG.Rect.prototype );
PONG.Scene.prototype.constructor = PONG.Scene;