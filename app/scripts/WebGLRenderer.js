PONG.WebGLRenderer = function(){
    var stage,
    gl,
    vertexShader,
    fragmentShader,
    program,
    positionLocation,
    colorLocation,
    resolutionLocation,
    buffer,
    buffers = {
        topBound: {},
        bottomBound: {},
        scene: {},
        pongTitle: {},
        ball: {},
        paddle1: {},
        paddle2: {},
        gameOverTitle: {}        
    }

    getShader = function(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
    
        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }
    
        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
    
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
    
        return shader;
    }, 
    
    init = function () {
        stage = document.createElement("canvas");
        //stage.setAttribute("width", PONG.stageWidth+"px");
        //stage.setAttribute("height", PONG.stageHeight+"px");
        stage.setAttribute("width", window.innerWidth+"px");
        stage.setAttribute("height", window.innerHeight+"px");
        
        document.body.appendChild(stage);
        
        try {
            gl = stage.getContext("experimental-webgl");
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
            return false;
        }
        
        gl.viewportWidth = stage.width;
        gl.viewportHeight = stage.height;
        
        vertexShader = getShader(gl, "shader-vs");
        fragmentShader = getShader(gl, "shader-fs");
        program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
    
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    
        gl.useProgram(program);
        
        // look up where the vertex data needs to go.
        positionLocation = gl.getAttribLocation(program, "a_position");
        colorLocation = gl.getUniformLocation(program, "u_color");
        resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(resolutionLocation, stage.width, stage.height);
    
        // Create a buffer
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        
        
        
    }(),
    drawRect = function(gl, rect) {
      var x1 = rect.x;
      var x2 = rect.x + rect.width;
      var y1 = rect.y;
      var y2 = rect.y + rect.height;
      
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
         x1, y1,
         x2, y1,
         x1, y2,
         x1, y2,
         x2, y1,
         x2, y2]), gl.STATIC_DRAW);
      gl.uniform4f(colorLocation, rect.rgba.r/255, rect.rgba.g/255, rect.rgba.b/255, 1);
    
      // Draw the rectangle.
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    render = function () {
        
        /*
        //TODO:        
        switch MODE
        init buffers
        check Tx and Ty in the loop
        */
        
        //clear
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(var i=0; i<PONG.displayList.length; i++){
            //drawRect(gl, PONG.displayList[i]);
        }
    };
    
    return{
      init: init,
      drawRect: drawRect,
      render: render
    };
};
