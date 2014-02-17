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


PONG.stageWidth = 600;
PONG.stageHeight = 446;
PONG.displayList = [];
PONG.backgroundList = [];
PONG.gameScreenList = [];

