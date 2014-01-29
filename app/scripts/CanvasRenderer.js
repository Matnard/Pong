PONG.CanvasRenderer = function(){
    var body = document.body,
    stage,
    ctx,
    init = function () {
        stage = document.createElement("canvas");
        stage.setAttribute("width", PONG.stageWidth+"px");
        stage.setAttribute("height", PONG.stageHeight+"px");
        ctx = stage.getContext("2d");
        console.log(ctx);
        body.appendChild(stage);
    }(),
    drawRect = function(rect) {
        var shape;
        ctx.fillStyle = rect.color;
        shape = ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        return shape;
    },
    render = function () {
        //clear
        ctx.clearRect ( 0 , 0 , PONG.stageWidth , PONG.stageHeight );
        for(var i=0; i<PONG.displayList.length; i++){
            drawRect(PONG.displayList[i]);
        }
    };
    
    return{
      init: init,
      drawRect: drawRect,
      render: render
    };
}();
