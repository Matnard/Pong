PONG.Instruction = function(){
    PONG.Entity.apply(this, arguments);
    this.graphics = [
        
        new PONG.Rect(0,0,8,19, this.color),
        new PONG.Rect(15,0,8,19, this.color),
        new PONG.Rect(3,18,17,4, this.color),
        
        new PONG.Rect(26,6,17,4, this.color),
        new PONG.Rect(24,9,8,4, this.color),
        new PONG.Rect(27,12,17,4, this.color),
        new PONG.Rect(39,15,8,4, this.color),
        new PONG.Rect(24,18,20,4, this.color),
        
        new PONG.Rect(48,9,8,10, this.color),
        new PONG.Rect(51,6,17,4, this.color),
        new PONG.Rect(63,9,8,7, this.color),
        new PONG.Rect(56,12,7,4, this.color),
        new PONG.Rect(51,18,17,4, this.color),
        
        new PONG.Rect(96,6,8,16, this.color),
        new PONG.Rect(111,6,8,16, this.color),
        new PONG.Rect(99,3,8,4, this.color),
        new PONG.Rect(108,3,8,4, this.color),
        new PONG.Rect(102,0,11,4, this.color),
        new PONG.Rect(104,12,7,4, this.color), 
        
        new PONG.Rect(147,6,17,4, this.color),
        new PONG.Rect(159,9,8,13, this.color),
        new PONG.Rect(147,12,12,4, this.color),
        new PONG.Rect(144,15,8,4, this.color),
        new PONG.Rect(147,18,20,4, this.color),
        
        new PONG.Rect(168,6,8,16, this.color),
        new PONG.Rect(176,6,12,4, this.color),
        new PONG.Rect(183,9,8,13, this.color),
        
        new PONG.Rect(192,9,8,10, this.color),
        new PONG.Rect(195,6,12,4, this.color),
        new PONG.Rect(207,0,8,22, this.color),
        new PONG.Rect(195,18,12,4, this.color),
        
        new PONG.Rect(240,0,8,22, this.color),
        new PONG.Rect(248,0,9,4, this.color),
        new PONG.Rect(252,3,8,4, this.color),
        new PONG.Rect(255,6,8,10, this.color),
        new PONG.Rect(252,15,8,4, this.color),
        new PONG.Rect(248,18,9,4, this.color)

    ];
    this.z = 7;
};

PONG.Instruction.prototype = Object.create( PONG.Entity.prototype );
PONG.Instruction.prototype.constructor = PONG.Instruction;