var PONG = {};

PONG.currentScreen = null;

PONG.screens = {
    INTRO_SCREEN: "INTRO_SCREEN",
    GAME_SCREEN: "GAME_SCREEN",
    GAME_OVER_SCREEN: "GAME_OVER_SCREEN"
};
    
PONG.event = {
    START : "START",
    DIE : "DIE",
    START_OVER: "START_OVER"
};

PONG.types = {
  RECT: "RECT",
  SCENE: "SCENE",
  BALL: "BALL",
  BOUND: "BOUND",
  PADDLE: "PADDLE",
  INTRO_TITLE: "INTRO_TITLE",
  GAME_OVER_TITLE: "GAME_OVER_TITLE"
};


PONG.stageWidth = 600;
PONG.stageHeight = 446;
PONG.displayList = [];
PONG.backgroundList = [];
PONG.gameScreenList = [];

