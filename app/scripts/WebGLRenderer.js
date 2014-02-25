PONG.WebGLRenderer = function() {
    var stage, 
    gl, 
    vertexShader, 
    fragmentShader, 
    program, 
    positionLocation, 
    colorLocation, 
    translationLocation,
    resolutionLocation;

    rectToVertices = function(rect) {
        var x1 = rect.x,
            x2 = rect.x + rect.width,
            y1 = rect.y,
            y2 = rect.y + rect.height;

        return [
            x1, y1, 
            x2, y1, 
            x1, y2, 
            x1, y2, 
            x2, y1, 
            x2, y2
        ];
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
            var vertices;
            PONG.backgroundList[i].buffer = gl.createBuffer();  
            gl.bindBuffer(gl.ARRAY_BUFFER, PONG.backgroundList[i].buffer);
            //PONG.backgroundList[i].graphics[0].x = 0;
            //PONG.backgroundList[i].graphics[0].y = 0;
            vertices = rectToVertices(PONG.backgroundList[i].graphics[0]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            PONG.backgroundList[i].buffer.numItems = vertices.length * 0.5;
        };
    }, 
    
    initIntroBuffers = function() {
        console.log("init intro buffers");
        var vertices = [];
        PONG.titles.INTRO.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, PONG.titles.INTRO.buffer);

        for (var i = 0, j = PONG.titles.INTRO.graphics.length; i < j; i++) {
            //PONG.titles.INTRO.graphics[i].x = 0;
            //PONG.titles.INTRO.graphics[i].y = 0;
            vertices = vertices.concat(rectToVertices(PONG.titles.INTRO.graphics[i]));
        };
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        PONG.titles.INTRO.buffer.numItems = vertices.length * 0.5;
    }, 
    
    initGameBuffers = function() {
        console.log("init game buffers", PONG.gameScreenList);
        for (var i = 0, j = PONG.gameScreenList.length; i < j; i++) {
            var vertices;
            PONG.gameScreenList[i].buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, PONG.gameScreenList[i].buffer);
            //PONG.gameScreenList[i].graphics[0].x = 0;
            //PONG.gameScreenList[i].graphics[0].y = 0;
            vertices = rectToVertices(PONG.gameScreenList[i].graphics[0]);
            console.log(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            PONG.gameScreenList[i].buffer.numItems = vertices.length * 0.5;
        };
    }, 
    
    initGameOverBuffers = function() {
        console.log("init game over buffers");
        var vertices = [];
        PONG.titles.GAME_OVER.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, PONG.titles.GAME_OVER.buffer);

        for (var i = 0, j = PONG.titles.GAME_OVER.graphics.length; i < j; i++) {
            //PONG.titles.GAME_OVER.graphics[i].x = 0;
            //PONG.titles.GAME_OVER.graphics[i].y = 0;
            vertices = vertices.concat(rectToVertices(PONG.titles.GAME_OVER.graphics[i]));
        };
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        PONG.titles.GAME_OVER.buffer.numItems = vertices.length * 0.5;
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
        positionLocation    = gl.getAttribLocation(program, "a_position");
        colorLocation       = gl.getUniformLocation(program, "u_color");
        translationLocation = gl.getUniformLocation(program, "u_translation");
        resolutionLocation  = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(resolutionLocation, stage.width, stage.height);

        initSceneBuffers();
        initIntroBuffers();
        initGameBuffers();
        initGameOverBuffers();
    }(), 
    
    drawScene = function() {
        for(var i=0,j=PONG.backgroundList.length; i<j; i++){
          var buffer = PONG.backgroundList[i].buffer;
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.uniform4f(colorLocation, PONG.backgroundList[i].rgba.r/255, PONG.backgroundList[i].rgba.g/255, PONG.backgroundList[i].rgba.b/255, PONG.backgroundList[i].rgba.a/255);
          gl.uniform2fv(translationLocation, [PONG.backgroundList[i].x, PONG.backgroundList[i].y]);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(positionLocation);
          gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
        };
    },
    
    drawIntro = function() {
        //var subject = PONG.titles.INTRO;
        var buffer = PONG.titles.INTRO.buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.uniform4f(colorLocation, 1,1,1,1);
        gl.uniform2fv(translationLocation, [PONG.titles.INTRO.x, PONG.titles.INTRO.y]);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);
        gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
        console.log(PONG.titles.INTRO.x, PONG.titles.INTRO.y);
    },
    drawGame = function() {
        for(var i=0,j=PONG.gameScreenList.length; i<j; i++){
          var buffer = PONG.gameScreenList[i].buffer;
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.uniform4f(colorLocation, 1,1,1,1);
          gl.uniform2fv(translationLocation, [PONG.gameScreenList[i].x, PONG.gameScreenList[i].y]);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(positionLocation);
          gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
        };
    },
    
    drawOutro = function() {
        var buffer = PONG.titles.GAME_OVER.buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.uniform4f(colorLocation, 1,1,1,1);
        gl.uniform2fv(translationLocation, [PONG.titles.GAME_OVER.x, PONG.titles.GAME_OVER.y]);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);
        gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
    },
    
    render = function() {
        //clear
        gl.clear(gl.COLOR_BUFFER_BIT);
        drawScene();
        
        switch(PONG.currentScreen){
            case PONG.screens.INTRO_SCREEN:{
                drawIntro();
                break;
            }
            case PONG.screens.GAME_SCREEN:{
                drawGame();
                break;
            }
            case PONG.screens.GAME_OVER_SCREEN:{
                drawOutro();
                break;
            }
        }
        
    };
    
    return {
        init : init,
        render : render
    };
};
