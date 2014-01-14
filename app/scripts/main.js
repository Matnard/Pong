PONG.main = function (){
    
    var scene,
        ball,
        player1,
        player2;
    
    
    var resetPositions = function(){
        player1.x = 0;
        player1.y = 50;
        //
        player2.x = 300;
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
        scene = new PONG.Scene();
        ball = new PONG.Ball();
        player1 = new PONG.Paddle();
        player2 = new PONG.Paddle();
        PONG.addChild(scene);
        PONG.addChild(ball);
        PONG.addChild(player1);
        PONG.addChild(player2);
        
        resetPositions();
        
        PONG.renderer = PONG.DomRenderer;
        requestAnimationFrame(onEnterFrame);
    }();
       
}();

