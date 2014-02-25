PONG.instruction = function () {
    var info = document.getElementById('info'),
    
    display = function(message){
        console.log(message);
        //info.innerHTML = message;
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
  title = PONG.titles.INTRO;
  
  this.game = game;
  this.foregroundList = []; 
  
  
  this.foregroundList = this.foregroundList.concat(title);
  
  this.onEvent = function (event) {
      if(event == PONG.event.START){
          game.setNextScreen( new PONG.GameScreen(game) );
      }
  };
   
  this.run = function () {
      PONG.instruction.display("press ENTER to play. Use W and S to move.");
      PONG.currentScreen = PONG.screens.INTRO_SCREEN; 
      PONG.displayList = PONG.backgroundList.concat(that.foregroundList);
      //PONG.main.start(); //skip //TODO: remove       
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
      PONG.displayList = PONG.backgroundList.concat( PONG.gameScreenList );
      PONG.currentScreen = PONG.screens.GAME_SCREEN;
  };
};

PONG.GameOverScreen = function(game) {
  var that = this,
  title = PONG.titles.GAME_OVER;

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
            
            
            if( ball.y > (player.y + player.height) || (ball.y + ball.height) < player.y )
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
            
            PONG.renderer.render();
            
            if(PONG.currentScreen == PONG.screens.GAME_SCREEN){
                updateGame();
            }
            
            requestAnimationFrame(onEnterFrame);
        },
        
        start = function () {
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
            return;
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
            //debugger;
            console.log("reset game position");
            PONG.titles.INTRO.x = 140;
            PONG.titles.INTRO.y = 150;
            
            
            player1.x = 0;
            player1.y = MIDDLE_Y_POSITION;
            
            player2.x = RIGHT_COLLISION_LINE;
            player2.y = MIDDLE_Y_POSITION;
            
            ball.x = (PONG.stageWidth - ball.width) * 0.5;
            ball.y = (PONG.stageHeight - ball.height) * 0.5;

            bottomBound.y = PONG.stageHeight - bottomBound.height;

            PONG.titles.GAME_OVER.x = 90;
            PONG.titles.GAME_OVER.y = 150;

            resetScore();
        },
        
        init = function () {
            
            PONG.titles.INTRO = new PONG.IntroTitle();
            PONG.titles.GAME_OVER = new PONG.OutroTitle();
            topBound = new PONG.Bound();
            bottomBound = new PONG.Bound();
            scene = new PONG.Scene();
            PONG.backgroundList.push(scene);
            PONG.backgroundList.push(bottomBound);
            PONG.backgroundList.push(topBound);
            
            ball = new PONG.Ball();
            player1 = new PONG.Paddle();
            player1.direction = 0;
            player2 = new PONG.Paddle();
            
            PONG.gameScreenList.push(ball);
            PONG.gameScreenList.push(player1);
            PONG.gameScreenList.push(player2);
            
            TOP_COLLISION_LINE = topBound.height;
            BOTTOM_COLLISION_LINE = PONG.stageHeight - bottomBound.height;
            LEFT_COLLISION_LINE = player1.width;
            RIGHT_COLLISION_LINE = PONG.stageWidth - player2.width;
            MIDDLE_Y_POSITION = (PONG.stageHeight - player1.height)*0.5;
    
            
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
            
            
            //PONG.renderer = PONG.DomRenderer();
            //PONG.renderer = PONG.CanvasRenderer();
            PONG.renderer = PONG.WebGLRenderer();
            
            reset();
            
            game = new PONG.Game();
            game.start();
            
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

