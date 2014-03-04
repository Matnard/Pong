PONG.OutroTitle = function(){
    PONG.Entity.apply(this, arguments);
    this.graphics = [
        //G
        new PONG.Rect(0,12,14,19, this.color), 
        new PONG.Rect(6,6,14,7, this.color),
        new PONG.Rect(12,0,32,7, this.color), 
        new PONG.Rect(6,30,14,7, this.color),
        new PONG.Rect(12,36,32,7, this.color),
        new PONG.Rect(30,25,14,11, this.color),
        new PONG.Rect(24,18,20,7, this.color),
    
        //A
        new PONG.Rect(48,12,14,31, this.color),
        new PONG.Rect(78,12,14,31, this.color),
        new PONG.Rect(54,6,14,7, this.color),
        new PONG.Rect(72,6,14,7, this.color),
        new PONG.Rect(60,0,20,7, this.color),
        new PONG.Rect(61,24,18,7, this.color),
    
        //M
        new PONG.Rect(96,0,14,43, this.color),
        new PONG.Rect(126,0,14,43, this.color),
        new PONG.Rect(110,6,6,19, this.color),
        new PONG.Rect(120,6,6,19, this.color),
        new PONG.Rect(114,12,8,19  , this.color),
       
        //E
        new PONG.Rect(144,0,14,43, this.color),
        new PONG.Rect(158,0,30,7, this.color),
        new PONG.Rect(158,18,24,7, this.color),
        new PONG.Rect(158,36,30,7 , this.color),
       
        //O
        new PONG.Rect(240,6,14,31, this.color),
        new PONG.Rect(270,6,14,31, this.color),
        new PONG.Rect(246,0,32,7, this.color),
        new PONG.Rect(246,36,32,7, this.color),
        
        //V
        new PONG.Rect(288,0,14,25 , this.color),
        new PONG.Rect(318,0,14,25, this.color), 
        new PONG.Rect(306,24,8,19, this.color),
        new PONG.Rect(294,18,14,13, this.color),
        new PONG.Rect(312,18,14,13, this.color),
        new PONG.Rect(300,31,20,6, this.color),  
        
        //E
        new PONG.Rect(336,0,44,7, this.color),
        new PONG.Rect(336,36,44,7, this.color),
        new PONG.Rect(336,7,14,29, this.color),
        new PONG.Rect(350,18,24,7, this.color),
        
        //R
        new PONG.Rect(384,0,14,43, this.color),
        new PONG.Rect(398,0,24,7, this.color),
        new PONG.Rect(414,6,14,19, this.color),
        new PONG.Rect(408,18,6,6, this.color),
        new PONG.Rect(398,24,18,7, this.color),
        new PONG.Rect(402,30,20,7, this.color),
        new PONG.Rect(408,36,20,7, this.color)   
    ];
    
    this.z = 0;
};

PONG.OutroTitle.prototype = Object.create( PONG.Entity.prototype );
PONG.OutroTitle.prototype.constructor = PONG.OutroTitle;