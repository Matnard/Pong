PONG.WebGLRenderer = function() {
    var stage, gl, vertexShader, fragmentShader, program, positionLocation, colorLocation, resolutionLocation, buffer, //TODO: remove

    sceneEntities = [], gameEntities = [], introEntities = [], outroEntities = [], sceneBuffersInitialized = false;
    introBuffersInitialized = false;
    gameBuffersInitialized = false;
    gameOverBuffersInitialized = false;

    rectToVertices = function(rect) {
        var x1 = rect.x;
        var x2 = rect.x + rect.width;
        var y1 = rect.y;
        var y2 = rect.y + rect.height;

        return [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
    }, 
    
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
    
    initSceneBuffers = function() {
        console.log("init scene buffers");

        for (var i = 0, j = PONG.backgroundList.length; i < j; i++) {
            console.log(PONG.backgroundList[i]);
            var vertices;

            sceneEntities[i] = {
                buffer : gl.createBuffer(),
                color : PONG.backgroundList[i].rgba
            };

            gl.bindBuffer(gl.ARRAY_BUFFER, sceneEntities[i].buffer);

            vertices = rectToVertices(PONG.backgroundList[i]);
            //debugger;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            //debugger;
            sceneEntities[i].buffer.numItems = vertices.length * 0.5;
            //debugger;
        };
        sceneBuffersInitialized = true;
    }, 
    
    initIntroBuffers = function() {
        console.log("init intro buffers");
        var vertices = [];
        
        introEntities[0] = {
            buffer : gl.createBuffer(),
            color : PONG.titles.INTRO[0].rgba
        };
        gl.bindBuffer(gl.ARRAY_BUFFER, introEntities[0].buffer);

        for (var i = 0, j = PONG.titles.INTRO.length; i < j; i++) {
            console.log(PONG.titles.INTRO[i]);
            vertices = vertices.concat(rectToVertices(PONG.titles.INTRO[i]));
        };
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        introEntities[0].buffer.numItems = vertices.length * 0.5;
        
        console.log(introEntities[0].buffer.numItems);
        //debugger;

        introBuffersInitialized = true;
    }, 
    
    initGameBuffers = function() {
        console.log("init game buffers");
        gameBuffersInitialized = true;
    }, 
    
    initGameOverBuffers = function() {
        console.log("init game over buffers");
        gameOverBuffersInitialized = true;
    }, 
    
    init = function() {
        stage = document.createElement("canvas");
        stage.setAttribute("width", window.innerWidth + "px");
        stage.setAttribute("height", window.innerHeight + "px");

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

        /*
        initSceneBuffers();
                initIntroBuffers();
                initGameBuffers();
                initGameOverBuffers();*/
        

        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    }(), 
    
    drawScene = function() {
        for(var i=0,j=sceneEntities.length; i<j; i++){
          var buffer = sceneEntities[i].buffer;
          console.log(buffer);
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          //console.log(i, buffer.numItems);
        };
        //debugger;
        
    },
    
    drawIntro = function() {
        
    },
    
    drawRect = function(gl, rect) {
        var x1 = rect.x;
        var x2 = rect.x + rect.width;
        var y1 = rect.y;
        var y2 = rect.y + rect.height;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
        gl.uniform4f(colorLocation, rect.rgba.r / 255, rect.rgba.g / 255, rect.rgba.b / 255, 1);

        // Draw the rectangle.
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }, 
    
    
    
    render = function() {
            //TODO: check Tx and Ty in the loop
            //clear
            gl.clear(gl.COLOR_BUFFER_BIT);
            for (var i = 0; i < PONG.displayList.length; i++) {
                drawRect(gl, PONG.displayList[i]); 
            }
        }
    
    /*
    render = function() {
            //TODO: check Tx and Ty in the loop
            //clear
            //gl.clear(gl.COLOR_BUFFER_BIT);
            drawScene();
        }
    */
    ;
    return {
        init : init,
        drawRect : drawRect,
        render : render
    };
};
