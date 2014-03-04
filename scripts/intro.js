
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    
    document.body.appendChild( stats.domElement );
    
    


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
        INTRO: "INTRO",
        OUTRO: "OUTRO"
    },
    
    displayList: []    
};



