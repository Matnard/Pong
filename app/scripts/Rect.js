PONG.Rect = function(x, y, width, height, color, rgba){
    this._x = x || 0;
    this._y = y || 0;
    this._Tx = 0;
    this._Ty = 0;
    this._width = width || 0;
    this._height = height || 0;
    this._color = color || "#FFFFFF";
    this._rgba = rgba || {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    };
    this.type = PONG.types.RECT;
};

Object.defineProperty(PONG.Rect.prototype, 'x', {
    get: function() {
        return this._x;
    },
    set: function(value) {
        this._x = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'y', {
    get: function() {
        return this._y;
    },
    set: function(value) {
        this._y = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'Tx', {
    get: function() {
        return this._Tx;
    },
    set: function(value) {
        this._Tx = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'Ty', {
    get: function() {
        return this._Ty;
    },
    set: function(value) {
        this._Ty = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'color', {
    get: function() {
        return this._color;
    },
    set: function(value) {
        this._color = value;
    }
});

Object.defineProperty(PONG.Rect.prototype, 'rgba', {
    get: function() {
        return this._rgba;
    },
    set: function(value) {
        this._rgba = value;
    }
});