var PONG = {
    stageWidth: 600,
    stageHeight: 446,
    currentScreen: null,
    
    screens: {
        INTRO_SCREEN: "INTRO_SCREEN",
        GAME_SCREEN: "GAME_SCREEN",
        GAME_OVER_SCREEN: "GAME_OVER_SCREEN"
    },
        
    event: {
        START : "START",
        DIE : "DIE",
        START_OVER: "START_OVER"
    },
    
    categories: {
        BACKGROUND: "BACKGROUND",
        GAME_ENTITIES: "GAME_ENTITIES",
        PLAYER1_POINTS: "PLAYER1_POINTS",
        PLAYER2_POINTS: "PLAYER2_POINTS",
        INTRO: "INTRO",
        OUTRO: "OUTRO"
    },
    
    displayList: []    
};

PONG.vars = {
    rotationX: 180,
    rotationY: 0,
    rotationZ: 0,
    translX: 0,
    translY: 0,
    translZ: -493,
    fieldOfViewRadians: 70
};

PONG.animation = {
  goToSide: function (callback) {
    var tl = new TimelineLite();
    tl.to(PONG.vars, 1, { rotationX: 120 }).to(PONG.vars, 1, { rotationX: 110, rotationZ: -90, onComplete: callback });
  },
  goToFront: function () {
    var tl2 = new TimelineLite();
    tl2.to(PONG.vars, 0.5, { rotationX: 120, rotationZ: 0}).to(PONG.vars, 0.5, { rotationX: 180 });
  }  
};

