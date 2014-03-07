PONG.Entity = function(x, y, width, height, color, rgba){
    this.graphics = [];
    this._x = x || 0;
    this._y = y || 0;
    this._z = 0;
    this._width = width || 0;
    this._height = height || 0;
    this._depth = 13;
    this._scale = [1,1,1];
    this._degree = 0;
    this._rad = 0;
    this._rotation = [0,1];
    //TODO: parse # or rgba() get a string
    this._color = color || "#FFFFFF";
    this._rgba = rgba || {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    };
};

Object.defineProperty(PONG.Entity.prototype, 'x', {
    get: function() {
        return this._x;
    },
    set: function(value) {
        //move children
        for(var i=0,j=this.graphics.length; i<j; i++){
            this.graphics[i].x += value - this._x;
        };
        
        this._x = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'y', {
    get: function() {
        return this._y;
    },
    set: function(value) {
        //move children
        for(var i=0,j=this.graphics.length; i<j; i++){
            this.graphics[i].y += value - this._y;
        };
        
        this._y = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'z', {
    get: function() {
        return this._z;
    },
    set: function(value) {  
        for(var i=0,j=this.graphics.length; i<j; i++){
            this.graphics[i].z = value;
        };      
        this._z = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'translation', {
    get: function() {
        return [this._x, this._y, this._z];
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

Object.defineProperty(PONG.Entity.prototype, 'depth', {
    get: function() {
        return this._depth;
    },
    set: function(value) {
        for(var i=0,j=this.graphics.length; i<j; i++){
            this.graphics[i].depth = value;
        }; 
        this._depth = value;
    }
});


Object.defineProperty(PONG.Entity.prototype, 'degreeRotation', {
    get: function() {
        return this._degree;
    },
    set: function(value) {
        this._degree = value;
        this._rad = value * Math.PI / 180;
        this._rotation = [Math.sin(this._rad), Math.cos(this._rad)];
    }
});

Object.defineProperty(PONG.Entity.prototype, 'radRotation', {
    get: function() {
        return this._degree;
    },
    set: function(value) {
        this._rad = value;
        this._degree = value * 180 / Math.PI;
        this._rotation = [Math.sin(this._rad), Math.cos(this._rad)];
    }
});

Object.defineProperty(PONG.Entity.prototype, 'rotation', {
    get: function() {
        return this._rotation;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'scaleX', {
    get: function() {
        return this._scale[0];
    },
    set: function(value) {
        this._scale[0] = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'scaleY', {
    get: function() {
        return this._scale[1];
    },
    set: function(value) {
        this._scale[1] = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'scaleZ', {
    get: function() {
        return this._scale[2];
    },
    set: function(value) {
        this._scale[2] = value;
    }
});

Object.defineProperty(PONG.Entity.prototype, 'scale', {
    set: function(value) {
        this._scale = [value, value];
    },
    get: function() {
        return this._scale;
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

Object.defineProperty(PONG.Entity.prototype, 'alpha', {
    get: function() {
        return this._rgba.a / 255;
    },
    set: function(value) {
        this._rgba.a = value * 255;
    }
});