PONG.IntroTitle = function(){
    PONG.Entity.apply(this, arguments);
    this.type = PONG.types.INTRO_TITLE;
    this.graphics = [
        //P
        /*new PONG.Rect(0,0,23,71, this.color),
        new PONG.Rect(23,0,38,13, this.color),
        new PONG.Rect(23,39,38,13, this.color),
        new PONG.Rect(49,10,22,32, this.color),
        
        //O
        new PONG.Rect(78,10,23,51, this.color),
        new PONG.Rect(127,10,23,51, this.color),
        new PONG.Rect(88,0,51,13, this.color),
        new PONG.Rect(88,58,51,13, this.color),
        
        //N
        new PONG.Rect(156,0,23,71, this.color),
        new PONG.Rect(205,0,23,71, this.color),
        new PONG.Rect(179,10,9,32, this.color),
        new PONG.Rect(185,20,13,32, this.color),
        new PONG.Rect(195,29,10,32, this.color),
        
        //G
        new PONG.Rect(234,20,10,32, this.color),
        new PONG.Rect(244,10,13,51, this.color),
        new PONG.Rect(254,0,12,23, this.color),
        new PONG.Rect(266,0,39,13, this.color),
        new PONG.Rect(254,49,12,22, this.color),
        new PONG.Rect(266,58,39,13, this.color),
        new PONG.Rect(283,45,22,13, this.color),
        new PONG.Rect(273,32,32,13, this.color)
       */
       //F from the blog post
       new PONG.Rect(0,0,30,150, this.color),
       new PONG.Rect(30,0,70,30, this.color),
       new PONG.Rect(30,60,37,30, this.color)
       
    ];
};

PONG.IntroTitle.prototype = Object.create( PONG.Entity.prototype );
PONG.IntroTitle.prototype.constructor = PONG.IntroTitle;