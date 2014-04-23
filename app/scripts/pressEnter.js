PONG.PressEnter = function(){
    PONG.Entity.apply(this, arguments);
    this.graphics = [
        //P
        new PONG.Rect(0,0,8,22, this.color),
        new PONG.Rect(8,0,12,4, this.color),
        new PONG.Rect(15,3,8,10, this.color),
        new PONG.Rect(8,12,12,4, this.color),
        
        new PONG.Rect(27,6,8,16, this.color),
        new PONG.Rect(35,9,3,4, this.color),
        new PONG.Rect(36,6,11,4, this.color),
        new PONG.Rect(8,12,12,4, this.color),
        
        new PONG.Rect(48,9,8,10, this.color),
        new PONG.Rect(51,6,17,4, this.color),
        new PONG.Rect(63,9,8,7, this.color),
        new PONG.Rect(56,12,7,4, this.color),
        new PONG.Rect(51,18,17,4, this.color),
        
        new PONG.Rect(75,6,17,4, this.color),
        new PONG.Rect(72,9,8,4, this.color),
        new PONG.Rect(75,12,17,4, this.color),
        new PONG.Rect(87,15,8,4, this.color),
        new PONG.Rect(72,18,20,4, this.color),
        
        new PONG.Rect(99,6,17,4, this.color),
        new PONG.Rect(96,9,8,4, this.color),
        new PONG.Rect(99,12,17,4, this.color),
        new PONG.Rect(111,15,8,4, this.color),
        new PONG.Rect(96,18,20,4, this.color),
        
        new PONG.Rect(144,0,8,22, this.color),
        new PONG.Rect(152,0,15,4, this.color),
        new PONG.Rect(152,9,12,4, this.color),
        new PONG.Rect(152,18,15,4, this.color),
        
        new PONG.Rect(168,0,8,22, this.color),
        new PONG.Rect(176,3,3,10, this.color),
        new PONG.Rect(177,6,5,10, this.color),
        new PONG.Rect(180,9,4,10, this.color),
        new PONG.Rect(183,0,8,22, this.color),
        
        new PONG.Rect(195,0,20,4, this.color),
        new PONG.Rect(201,4,8,18, this.color),
        
        new PONG.Rect(216,0,8,22, this.color),
        new PONG.Rect(224,0,15,4, this.color),
        new PONG.Rect(224,9,12,4, this.color),
        new PONG.Rect(224,18,15,4, this.color),
        
        new PONG.Rect(240,0,8,22, this.color),
        new PONG.Rect(248,0,12,4, this.color),
        new PONG.Rect(255,3,8,10, this.color),
        new PONG.Rect(252,9,5,3, this.color),
        new PONG.Rect(248,12,9,4, this.color),
        new PONG.Rect(249,15,11,4, this.color),
        new PONG.Rect(252,18,11,4, this.color)
       
    ];
    this.z = 0;
};

PONG.PressEnter.prototype = Object.create( PONG.Entity.prototype );
PONG.PressEnter.prototype.constructor = PONG.PressEnter;