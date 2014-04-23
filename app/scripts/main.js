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
  var that = this;
  
  this.game = game;
  this.foregroundList = PONG.EntityCollection.pull( PONG.categories.INTRO );
   
  this.onEvent = function (event) {
      if(event == PONG.event.START){
          PONG.animation.goToSide(function(){
            game.setNextScreen( new PONG.GameScreen(game) );
          });
      }
  };
   
  this.run = function () {
      PONG.currentScreen = PONG.screens.INTRO_SCREEN; 
      PONG.displayList = PONG.EntityCollection.pull( PONG.categories.BACKGROUND ).concat(that.foregroundList);
  };
};

PONG.GameScreen = function(game) {
  this.game = game;

  this.onEvent = function (event) {
      if(event == PONG.event.DIE){
         game.setNextScreen( new PONG.GameOverScreen(game) );
      }
  };
  this.run = function () {
      var dislayListTemp = [],
          bg = PONG.EntityCollection.pull( PONG.categories.BACKGROUND ),
          gameEntities = PONG.EntityCollection.pull( PONG.categories.GAME_ENTITIES ),
          gamePoints1 = PONG.EntityCollection.pull( PONG.categories.PLAYER1_POINTS ),
          gamePoints2 = PONG.EntityCollection.pull( PONG.categories.PLAYER2_POINTS );
      
      
      
      dislayListTemp = bg;
      dislayListTemp = dislayListTemp.concat(gameEntities);
      dislayListTemp = dislayListTemp.concat(gamePoints1);
      dislayListTemp = dislayListTemp.concat(gamePoints2);
      PONG.displayList = dislayListTemp;
      PONG.currentScreen = PONG.screens.GAME_SCREEN;
      
  };
};

PONG.GameOverScreen = function(game) {
  var that = this;

  this.game = game;
  this.foregroundList = PONG.EntityCollection.pull( PONG.categories.OUTRO );
   
  this.onEvent = function (event) {
    if(event == PONG.event.START_OVER){
        game.setNextScreen( new PONG.IntroScreen(game) );
    }
  };
  this.run = function () {
      PONG.animation.goToFront();
      PONG.currentScreen = PONG.screens.GAME_OVER_SCREEN;
      PONG.displayList = PONG.EntityCollection.pull( PONG.categories.BACKGROUND ).concat(that.foregroundList);
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
        introEntity,
        instruction,
        pressEnter,
        outroEntity,
        
        score = {
            player1: 0,
            player2: 0,
            reset: function() {
                this.player1 = 0;
                this.player2 = 0;
            }
        },
        
        LEFT_SIDE = "LEFT_SIDE",
        RIGHT_SIDE = "RIGHT_SIDE",
        WALL = "WALL",
        PADDLE = "PADDLE",
        
        TOP_COLLISION_LINE,
        BOTTOM_COLLISION_LINE,
        LEFT_COLLISION_LINE,
        RIGHT_COLLISION_LINE,
        MIDDLE_Y_POSITION,
        
        introSnd, pointSnd, gameoverSnd, touchSnd;
    
    
    
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
                touchSnd.play();
            } 
            
            else if(ball.x >= RIGHT_COLLISION_LINE-ball.width){ 
                ball.x = RIGHT_COLLISION_LINE-ball.width; 
                ball.speed.x *= -1; 
                touchSnd.play();
            }
        },
    
        updateGame = function () {
            elapsedTime += 1/60;
                
            ball.x += ball.speed.x;
            ball.y += ball.speed.y;
            //ball.degreeRotation += 1;
            
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
            gameoverSnd.play();
            resetScore();
            game.trigger(PONG.event.DIE);
        }, 
       
        startOver = function () {
            game.trigger(PONG.event.START_OVER);
        },
       
        printScore = function(){
            
            if(score.player1 != 0){
                PONG.EntityCollection.pull( PONG.categories.PLAYER1_POINTS )[score.player1 - 1].rgba = {
                    r:255,
                    g:255,
                    b:255,
                    a:255
                };
            }
            
            if(score.player2 != 0){
                PONG.EntityCollection.pull( PONG.categories.PLAYER2_POINTS )[score.player2 - 1].rgba = {
                    r:255,
                    g:255,
                    b:255,
                    a:255
                };
            }
            
        },
        
        updateScore = function(){
            printScore();
            pointSnd.play();
            if(score.player1 == 3 || score.player2 == 3)
                die();
        },
        
        resetScore = function(){
            score.player1 = 0;
            score.player2 = 0;
            
            (function(){
                var playerPoints = PONG.EntityCollection.pull( PONG.categories.PLAYER1_POINTS );
                for(var i=0,j=playerPoints.length; i<j; i++){
                  playerPoints[i].rgba = {
                        r:0,
                        g:0,
                        b:0,
                        a:0
                    };
                };
                
                playerPoints = PONG.EntityCollection.pull( PONG.categories.PLAYER2_POINTS );
                for(var i=0,j=playerPoints.length; i<j; i++){
                  playerPoints[i].rgba = {
                        r:0,
                        g:0,
                        b:0,
                        a:0
                    };
                };
            })();
            
            updateScore();
        },
        
        reset = function(){
            introEntity.x = 140;
            introEntity.y = 150;
            
            instruction.x = 159;
            instruction.y = 240;
            
            pressEnter.x = 159;
            pressEnter.y = 272;
            
            score.reset();
            
            player1.x = 0;
            player1.y = MIDDLE_Y_POSITION;
            
            player2.x = RIGHT_COLLISION_LINE;
            player2.y = MIDDLE_Y_POSITION;
            
            ball.x = (PONG.stageWidth - ball.width) * 0.5;
            ball.y = (PONG.stageHeight - ball.height) * 0.5;

            bottomBound.y = PONG.stageHeight - bottomBound.height;

            outroEntity.x = 90;
            outroEntity.y = 150;

            resetScore();
        },
        
        init = function () {
            
            introSnd = new Audio('http://www.mathieu-mence.name/misc/pong/intro.wav');
            pointSnd = new Audio('http://www.mathieu-mence.name/misc/pong/point.wav');
            touchSnd = new Audio('http://www.mathieu-mence.name/misc/pong/touch.wav');    
            gameoverSnd = new Audio('http://www.mathieu-mence.name/misc/pong/gameover.wav');
            
            introSnd.play();
            
            introEntity = new PONG.IntroTitle();
            instruction = new PONG.Instruction();
            pressEnter = new PONG.PressEnter();
            
            for(var i=0,j=instruction.graphics.length; i<j; i++){
              instruction.graphics[i].depth = 0;
            };
            
            for(var i=0,j=pressEnter.graphics.length; i<j; i++){
              pressEnter.graphics[i].depth = 0;
            };
            
            PONG.EntityCollection.push(introEntity, PONG.categories.INTRO);
            PONG.EntityCollection.push(instruction, PONG.categories.INTRO);
            PONG.EntityCollection.push(pressEnter, PONG.categories.INTRO);
            
            outroEntity = new PONG.OutroTitle();
            PONG.EntityCollection.push(outroEntity, PONG.categories.OUTRO);
            PONG.EntityCollection.push(pressEnter, PONG.categories.OUTRO);
            
            topBound = new PONG.Bound();
            bottomBound = new PONG.Bound();
            scene = new PONG.Scene();
            
            PONG.EntityCollection.push(scene, PONG.categories.BACKGROUND);
            PONG.EntityCollection.push(bottomBound, PONG.categories.BACKGROUND);
            PONG.EntityCollection.push(topBound, PONG.categories.BACKGROUND);
            
            ball = new PONG.Ball();
            player1 = new PONG.Paddle();
            player1.direction = 0;
            player2 = new PONG.Paddle();
            
            
            
            PONG.EntityCollection.push(ball, PONG.categories.GAME_ENTITIES);
            PONG.EntityCollection.push(player1, PONG.categories.GAME_ENTITIES);
            PONG.EntityCollection.push(player2, PONG.categories.GAME_ENTITIES);
            
            for(var i=0,j=3; i<j; i++){
              var point = new PONG.Point(0, 13 + i*7, 33);
              point.rgba = {r:0, g:0, b:0, a:0};
              PONG.EntityCollection.push(point, PONG.categories.PLAYER1_POINTS);
            };
            
            for(var i=0,j=3; i<j; i++){
              var point = new PONG.Point(0 , 200 - (13+7* i) +13, 33);
              point.rgba = {r:0, g:0, b:0, a:0};
              PONG.EntityCollection.push(point, PONG.categories.PLAYER2_POINTS);
            };
            
            
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
                        case 97: player1.direction = -1; break;
                        case 100: player1.direction = 1; break;
                    }
                }
            };
            
            document.addEventListener("touchstart",function(){
                                        
                switch(PONG.currentScreen){
                    case PONG.screens.INTRO_SCREEN: {
                        start(); 
                        break;
                    }
                    case PONG.screens.GAME_SCREEN: {
                        if(player1.direction == 0 ) player1.direction = 1;
                        
                        player1.direction *= -1; 
                        break;
                    }
                    case PONG.screens.GAME_OVER_SCREEN: {
                        startOver();
                        break;
                    }
                }
            }, true);
            
            
            //PONG.renderer = PONG.DomRenderer();
            //PONG.renderer = PONG.CanvasRenderer();
            //PONG.renderer = PONG.WebGLRenderer();
            PONG.renderer = PONG.WebGL3DRenderer();
            
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

