PONG.DomRenderer = function(){
    var body = document.body,
    stage,
    init = function () {
        stage = document.createElement("div");
        stage.style.position = "relative";
        body.appendChild(stage);
    }(),
    drawRect = function(rect) {
        var shape = document.createElement("div");
        shape.style.position = "absolute";
        shape.style.left = rect.x+"px";
        shape.style.top = rect.y+"px";
        shape.style.width = rect.width+"px";
        shape.style.height = rect.height+"px";
        shape.style.backgroundColor = rect.color;
        stage.appendChild(shape);
        return shape;
    },
    render = function () {
        //clear
        $(stage).html("");
        for(var i=0; i<PONG.displayList.length; i++){
            drawRect(PONG.displayList[i]);
        }
    };
    
    return{
      init: init,
      drawRect: drawRect,
      render: render
    };
};
