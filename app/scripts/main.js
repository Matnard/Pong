PONG.instruction = function () {
    var info = document.getElementById('info'),
    
    display = function(message){
        console.log(info);
        info.innerHTML = message;
    };
    
    return {
        display: display
    };
}();


PONG.Game = function () {
  var currentScreen = new PONG.IntroScreen(this);  
  
  this.setNextScreen = function (nextScreen) {
    currentScreen = nextScreen;
    currentScreen.run();
  };
  
  this.start = function () {
    currentScreen.run();
  };
  
  this.trigger = function (event) {
      currentScreen.onEvent(event);
  };
  
};

PONG.IntroScreen = function(game) {
  var that = this,
  offsetX = 140,
  offsetY = 150,
  title = [
    //P
    new PONG.Rect(0, 0, 23, 71, "#FFFFFF"), 
    new PONG.Rect(23, 0, 38, 13, "#FFFFFF"),
    new PONG.Rect(23, 39, 38, 13, "#FFFFFF"), 
    new PONG.Rect(49, 10, 22, 32, "#FFFFFF"),
    
    //O
    new PONG.Rect(78, 10, 23, 51, "#FFFFFF"), 
    new PONG.Rect(127, 10, 23, 51, "#FFFFFF"),
    new PONG.Rect(88, 0, 51, 13, "#FFFFFF"), 
    new PONG.Rect(88, 58, 51, 13, "#FFFFFF"),
    
    //N
    new PONG.Rect(156, 0, 23, 71, "#FFFFFF"), 
    new PONG.Rect(205, 0, 23, 71, "#FFFFFF"),
    new PONG.Rect(179, 10, 9, 32, "#FFFFFF"), 
    new PONG.Rect(185, 20, 13, 32, "#FFFFFF"),
    new PONG.Rect(195,29,10,32, "#FFFFFF"),
    
    //G
    new PONG.Rect(234,20,10,32, "#FFFFFF"),
    new PONG.Rect(244,10,13,51, "#FFFFFF"),
    new PONG.Rect(254,0,12,23, "#FFFFFF"),
    new PONG.Rect(266,0,39,13, "#FFFFFF"),
    new PONG.Rect(254,49,12,22, "#FFFFFF"),
    new PONG.Rect(266,58,39,13, "#FFFFFF"),
    new PONG.Rect(283,45,22,13, "#FFFFFF"),
    new PONG.Rect(273,32,32,13, "#FFFFFF")
    ];
  //texture = "";
  
  //offset
  for(var i=0,j=title.length; i<j; i++){
    title[i].x += offsetX;
    title[i].y += offsetY;
  };
  
  this.game = game;
  this.foregroundList = []; 
  
  
  this.foregroundList = this.foregroundList.concat(title);
  
  this.onEvent = function (event) {
      if(event == PONG.event.START){
          game.setNextScreen( new PONG.GameScreen(game) );
      }
  };
   
  //
  this.run = function () {
      PONG.instruction.display("press ENTER to play. Use W and S to move.");
      PONG.currentScreen = PONG.screens.INTRO_SCREEN;
      PONG.displayList = PONG.backgroundList.concat(that.foregroundList);
  };
};

PONG.GameScreen = function(game) {
  this.game = game;
  this.foregroundList = [];

  this.onEvent = function (event) {
      if(event == PONG.event.DIE){
          game.setNextScreen( new PONG.GameOverScreen(game) );
      }
  };
  this.run = function () {
      PONG.currentScreen = PONG.screens.GAME_SCREEN;
      PONG.displayList = PONG.backgroundList.concat( PONG.gameScreenList );
  };
};

PONG.GameOverScreen = function(game) {
  var that = this,
  offsetX = 90,
  offsetY = 150,
  title = [
    //G
    new PONG.Rect(0,12,14,19, "#FFFFFF"), 
    new PONG.Rect(6,6,14,7, "#FFFFFF"),
    new PONG.Rect(12,0,32,7, "#FFFFFF"), 
    new PONG.Rect(6,30,14,7, "#FFFFFF"),
    new PONG.Rect(12,36,32,7, "#FFFFFF"),
    new PONG.Rect(30,25,14,11, "#FFFFFF"),
    new PONG.Rect(24,18,20,7, "#FFFFFF"),

    //A
    new PONG.Rect(48,12,14,31, "#FFFFFF"),
    new PONG.Rect(78,12,14,31, "#FFFFFF"),
    new PONG.Rect(54,6,14,7, "#FFFFFF"),
    new PONG.Rect(72,6,14,7, "#FFFFFF"),
    new PONG.Rect(60,0,20,7, "#FFFFFF"),
    new PONG.Rect(61,24,18,7, "#FFFFFF"),

    //M
    new PONG.Rect(96,0,14,43, "#FFFFFF"),
    new PONG.Rect(126,0,14,43, "#FFFFFF"),
    new PONG.Rect(110,6,6,19, "#FFFFFF"),
    new PONG.Rect(120,6,6,19, "#FFFFFF"),
    new PONG.Rect(114,12,8,19  , "#FFFFFF"),
   
    //E
    new PONG.Rect(144,0,14,43, "#FFFFFF"),
    new PONG.Rect(158,0,30,7, "#FFFFFF"),
    new PONG.Rect(158,18,24,7, "#FFFFFF"),
    new PONG.Rect(158,36,30,7 , "#FFFFFF"),
   
    //O
    new PONG.Rect(240,6,14,31, "#FFFFFF"),
    new PONG.Rect(270,6,14,31, "#FFFFFF"),
    new PONG.Rect(246,0,32,7, "#FFFFFF"),
    new PONG.Rect(246,36,32,7, "#FFFFFF"),
    
    //V
    new PONG.Rect(288,0,14,25 , "#FFFFFF"),
    new PONG.Rect(318,0,14,25, "#FFFFFF"), 
    new PONG.Rect(306,24,8,19, "#FFFFFF"),
    new PONG.Rect(294,18,14,13, "#FFFFFF"),
    new PONG.Rect(312,18,14,13, "#FFFFFF"),
    new PONG.Rect(300,31,20,6, "#FFFFFF"),  
    
    //E
    new PONG.Rect(336,0,44,7, "#FFFFFF"),
    new PONG.Rect(336,36,44,7, "#FFFFFF"),
    new PONG.Rect(336,7,14,29, "#FFFFFF"),
    new PONG.Rect(350,18,24,7, "#FFFFFF"),
    
    //R
    new PONG.Rect(384,0,14,43, "#FFFFFF"),
    new PONG.Rect(398,0,24,7, "#FFFFFF"),
    new PONG.Rect(414,6,14,19, "#FFFFFF"),
    new PONG.Rect(408,18,6,6, "#FFFFFF"),
    new PONG.Rect(398,24,18,7, "#FFFFFF"),
    new PONG.Rect(402,30,20,7, "#FFFFFF"),
    new PONG.Rect(408,36,20,7, "#FFFFFF")  
  ];
  
  //offset
  for(var i=0,j=title.length; i<j; i++){
    title[i].x += offsetX;
    title[i].y += offsetY;
  };
  //texture = "";
  this.game = game;
  this.foregroundList = []; 
  this.foregroundList = this.foregroundList.concat(title);
   
  this.onEvent = function (event) {
    if(event == PONG.event.START_OVER){
        game.setNextScreen( new PONG.IntroScreen(game) );
    }
  };
  this.run = function () {
      PONG.instruction.display("press ENTER to play.");
      PONG.currentScreen = PONG.screens.GAME_OVER_SCREEN;
      PONG.displayList = PONG.backgroundList.concat(that.foregroundList);
  };
};

PONG.main = function (){
    
    var game,
        scene,
        topBound,
        bottomBound,
        elapsedTime = 0,
        
        ball,
        player1,
        player2,
        
        score = {
            player1: 0,
            player2: 0
        },
        
        LEFT_SIDE = "LEFT_SIDE",
        RIGHT_SIDE = "RIGHT_SIDE",
        WALL = "WALL",
        PADDLE = "PADDLE",
        
        TOP_COLLISION_LINE,
        BOTTOM_COLLISION_LINE,
        LEFT_COLLISION_LINE,
        RIGHT_COLLISION_LINE,
        MIDDLE_Y_POSITION;
    
    var playerYCheck = function(){
                
            var player;
            
            if (ball.x < PONG.stageWidth*0.5)
                player = player1;
            else
                player = player2;
            
            
            if( ball.y > (player.y + player.height) || (ball.y+ball.height) < player.y )
                return WALL;
            else
                return PADDLE;
        },
        checkWall = function(){
            if(ball.x <= 0){ 
                ball.x = 0; 
                ball.speed.x *= -1; 
                score.player2 += 1;
                updateScore();
            } 
            
            else if(ball.x >= PONG.stageWidth-ball.width){ 
                ball.x = PONG.stageWidth-ball.width; 
                ball.speed.x *= -1; 
                score.player1 += 1;
                updateScore();
            }
        },
        checkPaddle = function(){
            if(ball.x <= LEFT_COLLISION_LINE){ 
                ball.x = LEFT_COLLISION_LINE; 
                ball.speed.x *= -1; 
            //touchSnd.play();
            } 
            
            else if(ball.x >= RIGHT_COLLISION_LINE-ball.width){ 
                ball.x = RIGHT_COLLISION_LINE-ball.width; 
                ball.speed.x *= -1; 
            //touchSnd.play();
            }
        },
    
        updateGame = function () {
            elapsedTime += 1/60;
                
            ball.x += ball.speed.x;
            ball.y += ball.speed.y;
            
            player1.y += player1.direction * 3;
            
            if(player1.y <= TOP_COLLISION_LINE ) 
                player1.y = TOP_COLLISION_LINE;
                        
            if(player1.y >= BOTTOM_COLLISION_LINE - player1.height ) 
                player1.y = BOTTOM_COLLISION_LINE - player1.height;
            
            
            
            amplitude = (1 + Math.sin(elapsedTime)) * 0.5;
            player2.y = (BOTTOM_COLLISION_LINE-player2.height-TOP_COLLISION_LINE) * amplitude + TOP_COLLISION_LINE;
            
                        
            switch( playerYCheck() ){
                case WALL :{
                    checkWall();
                    break;
                }
                case PADDLE: {
                    checkPaddle();
                    break;
                }
            }
            
            if(ball.y <= TOP_COLLISION_LINE){ 
                ball.y = TOP_COLLISION_LINE; 
                ball.speed.y *= -1; 
            } 
                
            else if(ball.y >= BOTTOM_COLLISION_LINE-ball.height){ 
                ball.y = BOTTOM_COLLISION_LINE-ball.height; 
                ball.speed.y *= -1; 
            }
        },
    
        onEnterFrame = function() {
            var amplitude;
           
            if(PONG.currentScreen == PONG.screens.GAME_SCREEN)
                updateGame();
        
            PONG.renderer.render();
            requestAnimationFrame(onEnterFrame);
        },
        
        start = function () {
            reset();
            game.trigger(PONG.event.START);
        },
       
        die = function () {
            game.trigger(PONG.event.DIE);
        }, 
       
        startOver = function () {
            game.trigger(PONG.event.START_OVER);
        },
       
        printScore = function(){

            PONG.instruction.display(score.player1+" - "+score.player2);
        },
        
        updateScore = function(){
            printScore();
            if(score.player1 == 3 || score.player2 == 3)
                die();
        },
        
        resetScore = function(){
            score.player1 = 0;
            score.player2 = 0;
            updateScore();
        },
        
        reset = function(){
            resetScore();
            player1.x = 0;
            player1.y = MIDDLE_Y_POSITION;
            
            player2.x = RIGHT_COLLISION_LINE;
            player2.y = MIDDLE_Y_POSITION;
            
            ball.x = (PONG.stageWidth - ball.width) * 0.5;
            ball.y = (PONG.stageHeight - ball.height) * 0.5;
        },
        
        init = function () {
            
            
            
            topBound = new PONG.Bound();
            bottomBound = new PONG.Bound();
            bottomBound.y = PONG.stageHeight - bottomBound.height;
            scene = new PONG.Scene();
            PONG.backgroundList.push(scene);
            PONG.backgroundList.push(topBound);
            PONG.backgroundList.push(bottomBound);
            
            ball = new PONG.Ball();
            player1 = new PONG.Paddle();
            player1.direction = 0;
            player2 = new PONG.Paddle();
            
            
            PONG.gameScreenList.push(ball);
            PONG.gameScreenList.push(player1);
            PONG.gameScreenList.push(player2);
            
            TOP_COLLISION_LINE = topBound.height;
            BOTTOM_COLLISION_LINE = bottomBound.y;
            LEFT_COLLISION_LINE = player1.width;
            RIGHT_COLLISION_LINE = PONG.stageWidth - player2.width;
            MIDDLE_Y_POSITION = (PONG.stageHeight - player1.height)*0.5;
    
            console.table(LEFT_COLLISION_LINE,
            RIGHT_COLLISION_LINE,
            MIDDLE_Y_POSITION);
            
            
            document.onkeypress = function(e) {
                e = e || window.event;
                var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
                if (charCode) {
                                        
                    switch(charCode){
                        case 13: {
                            if(PONG.currentScreen == PONG.screens.INTRO_SCREEN) start(); 
                            if(PONG.currentScreen == PONG.screens.GAME_OVER_SCREEN) startOver();
                            break;
                        }
                        case 119: player1.direction = -1; break;
                        case 115: player1.direction = 1; break;
                    }
                }
            };
            
            
            game = new PONG.Game();
            game.start();
            
            //PONG.renderer = PONG.DomRenderer();
            //PONG.renderer = PONG.CanvasRenderer();
            PONG.renderer = PONG.WebGLRenderer();
            requestAnimationFrame(onEnterFrame);
        };
        
    document.addEventListener('DOMContentLoaded', function(){
        init();
    });
    
    return {
        init: init,
        start: start,
        die: die,
        startOver: startOver
    };
       
}();

