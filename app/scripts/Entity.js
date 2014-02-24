PONG.Entity = function(x, y, width, height, color, rgba){
    this.graphics = [];
    this._x = x || 0;
    this._y = y || 0;
    this._Tx = 0;
    this._Ty = 0;
    this._width = width || 0;
    this._height = height || 0;
    //TODO: parse # or rgba() get a string
    this._color = color || "#FFFFFF";
    this._rgba = rgba || {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    };
    this.type = PONG.types.ENTITY;
};

PONG.Entity.prototype.clearTranslations = function() {
    this._Tx = 0;
    this._Ty = 0;
};

Object.defineProperty(PONG.Entity.prototype, 'x', {
    get: function() {
        return this._x;
    },
    set: function(value) {
        this._Tx = value - this._x;
        
        //move children
        for(var i=0,j=this.graphics.length; i<j; i++){
            this.graphics[i].x += this._Tx;
        };
        
        this._x = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'y', {
    get: function() {
        return this._y;
    },
    set: function(value) {
        this._Ty = value - this._y;
        
        //move children
        for(var i=0,j=this.graphics.length; i<j; i++){
            this.graphics[i].y += this._Ty;
        };
        
        this._y = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'Tx', {
    get: function() {
        return this._Tx;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'Ty', {
    get: function() {
        return this._Ty;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'color', {
    get: function() {
        return this._color;
    },
    set: function(value) {
        this._color = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'rgba', {
    get: function() {
        return this._rgba;
    },
    set: function(value) {
        this._rgba = value;
    }
});