PONG.main = function (){
    
    var scene,
        topBound,
        bottomBound,
        ball,
        player1,
        player2;
     
    
    var resetPositions = function(){
        bottomBound.y = 433;
        player1.x = 0;
        player1.y = 50;
        //
        player2.x = 600-13;
        player2.y = 50;
        //
        ball.x = 250;
        ball.y = 250;
    },
    onEnterFrame = function() {
        PONG.renderer.render();
        requestAnimationFrame(onEnterFrame);
    },
   init = function () {
        topBound = new PONG.Bound();
        bottomBound = new PONG.Bound();
        scene = new PONG.Scene();
        ball = new PONG.Ball();
        player1 = new PONG.Paddle();
        player2 = new PONG.Paddle();
        PONG.addChild(topBound);
        PONG.addChild(bottomBound);
        PONG.addChild(scene);
        PONG.addChild(ball);
        PONG.addChild(player1);
        PONG.addChild(player2);
        
        resetPositions();
        
        PONG.renderer = PONG.DomRenderer;
        requestAnimationFrame(onEnterFrame);
    }();
       
}();

