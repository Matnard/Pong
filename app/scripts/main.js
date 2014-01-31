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
  title = [new PONG.Rect(0, 250, 50, 50, "#00FF00"), new PONG.Rect(50, 250, 50, 50, "#0000FF")];
  //texture = "";
  
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
      PONG.displayList = PONG.backgroundList.concat( PONG.gameScreenList );
  };
};

PONG.GameOverScreen = function(game) {
  var that = this,
  title = [new PONG.Rect(50, 250, 50, 50, "#FF0000"), new PONG.Rect(100, 250, 50, 50, "#0000FF")];
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
      PONG.displayList = PONG.backgroundList.concat(that.foregroundList);
  };
};

PONG.main = function (){
    
    var game,
        scene,
        topBound,
        bottomBound,
        
        ball,
        player1,
        player2;
    
    var resetPositions = function(){
        
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
    
   start = function () {
        resetPositions();
        game.trigger(PONG.event.START);
   },
   
   die = function () {
        game.trigger(PONG.event.DIE);
   }, 
   
   startOver = function () {
        game.trigger(PONG.event.START_OVER);
   },
    
   init = function () {
        topBound = new PONG.Bound();
        bottomBound = new PONG.Bound();
        bottomBound.y = 433;
        scene = new PONG.Scene();
        PONG.backgroundList.push(topBound);
        PONG.backgroundList.push(bottomBound);
        PONG.backgroundList.push(scene);
        
        ball = new PONG.Ball();
        player1 = new PONG.Paddle();
        player2 = new PONG.Paddle();
        PONG.gameScreenList.push(ball);
        PONG.gameScreenList.push(player1);
        PONG.gameScreenList.push(player2);
        
        game = new PONG.Game();
        game.start();
        
        //PONG.renderer = PONG.DomRenderer;
        PONG.renderer = PONG.CanvasRenderer;
        requestAnimationFrame(onEnterFrame);
    }();
    
    return {
        start: start,
        die: die,
        startOver: startOver
    };
       
}();



