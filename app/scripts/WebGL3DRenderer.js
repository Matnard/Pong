PONG.WebGL3DRenderer = function() {
    var stage, 
    gl, 
    vertexShader, 
    fragmentShader, 
    program, 
    positionLocation, 
    colorLocation, 

    matrixLocation,
    resolutionLocation,
    projection2D;

    rectToVertices = function(rect) {
        var x1 = rect.x,
            x2 = rect.x + rect.width,
            y1 = rect.y,
            y2 = rect.y + rect.height,
            z  = 0;

        return [
            x1, y1, z,
            x2, y1, z,
            x1, y2, z,
            x1, y2, z,
            x2, y1, z,
            x2, y2, z
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
        for (var i = 0, j = PONG.backgroundList.length; i < j; i++) {
            var vertices;
            PONG.backgroundList[i].buffer = gl.createBuffer();  
            gl.bindBuffer(gl.ARRAY_BUFFER, PONG.backgroundList[i].buffer);
            vertices = rectToVertices(PONG.backgroundList[i].graphics[0]);
            console.log(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            PONG.backgroundList[i].buffer.numItems = vertices.length / 3;
        };
    }, 
    
    initIntroBuffers = function() {
        var vertices = [];
        PONG.titles.INTRO.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, PONG.titles.INTRO.buffer);

        for (var i = 0, j = PONG.titles.INTRO.graphics.length; i < j; i++) {
            vertices = vertices.concat(rectToVertices(PONG.titles.INTRO.graphics[i]));
        };
        console.log(vertices);
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        PONG.titles.INTRO.buffer.numItems = vertices.length / 3;
    }, 
    
    initGameBuffers = function() {
        for (var i = 0, j = PONG.gameScreenList.length; i < j; i++) {
            var vertices;
            PONG.gameScreenList[i].buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, PONG.gameScreenList[i].buffer);
            vertices = rectToVertices(PONG.gameScreenList[i].graphics[0]);
            console.log(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            PONG.gameScreenList[i].buffer.numItems = vertices.length / 3;
        };
    }, 
    
    initGameOverBuffers = function() {
        var vertices = [];
        PONG.titles.GAME_OVER.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, PONG.titles.GAME_OVER.buffer);

        for (var i = 0, j = PONG.titles.GAME_OVER.graphics.length; i < j; i++) {
            vertices = vertices.concat(rectToVertices(PONG.titles.GAME_OVER.graphics[i]));
            //console.log(vertices);
        };
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        PONG.titles.GAME_OVER.buffer.numItems = vertices.length / 3;
    }, 
    
    make2DProjection = function(width, height, depth) {
      return [
         2 / width, 0, 0, 0,
         0, -2 / height, 0, 0,
         0, 0, 2 / depth, 0,
        -1, 1, 0, 1,
      ];
    },
    
    init = function() {
        
        PONG.vars = {
            translX: 241,
            translY: 121,
            translZ: 0,
            rotationX: 31,
            rotationY: 92,
            rotationZ: 47
        };
        
        var gui = new dat.GUI();
        gui.add(PONG.vars, "translX").min(0).max(600);
        gui.add(PONG.vars, "translY").min(0).max(446);
        gui.add(PONG.vars, "translZ").min(0).max(600);
        gui.add(PONG.vars, "rotationX").min(0).max(180);
        gui.add(PONG.vars, "rotationY").min(0).max(180);
        gui.add(PONG.vars, "rotationZ").min(0).max(180);
        
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

        vertexShader = getShader(gl, "3d-vertex-shader");
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
        matrixLocation      = gl.getUniformLocation(program, "u_matrix");

        initSceneBuffers();
        initIntroBuffers();
        initGameBuffers();
        initGameOverBuffers();
        
        projection2D = make2DProjection(stage.width, stage.height, stage.width);
    }(), 
    
    
    
    
    getTranslationMatrix = function (translation) {
      var tx = translation[0],
          ty = translation[1],
          tz = translation[2];
      return [
         1,  0, 0, 0,
         0,  1, 0, 0,
         0,  0, 1, 0,
        tx, ty, tz, 1, 
      ];
    },
    
    getXRotationMatrix = function (rotation) {
      var s = rotation[0],
      c = rotation[1];
      return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1
      ];
    },
    
    getYRotationMatrix = function (rotation) {
      var s = rotation[0],
      c = rotation[1];
      return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1
      ];
    },
    
    getZRotationMatrix = function (rotation) {
      var s = rotation[0],
      c = rotation[1];
      return [
        c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1,
      ];
    },
    
    getScaleMatrix = function (scale) {
      var sx = scale[0],
          sy = scale[1],
          sz = scale[2];
      
      return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
      ];
    },
    
    matrix4x4Multiply = function (a, b) {
        var a00 = a[0*4+0];
  var a01 = a[0*4+1];
  var a02 = a[0*4+2];
  var a03 = a[0*4+3];
  var a10 = a[1*4+0];
  var a11 = a[1*4+1];
  var a12 = a[1*4+2];
  var a13 = a[1*4+3];
  var a20 = a[2*4+0];
  var a21 = a[2*4+1];
  var a22 = a[2*4+2];
  var a23 = a[2*4+3];
  var a30 = a[3*4+0];
  var a31 = a[3*4+1];
  var a32 = a[3*4+2];
  var a33 = a[3*4+3];
  var b00 = b[0*4+0];
  var b01 = b[0*4+1];
  var b02 = b[0*4+2];
  var b03 = b[0*4+3];
  var b10 = b[1*4+0];
  var b11 = b[1*4+1];
  var b12 = b[1*4+2];
  var b13 = b[1*4+3];
  var b20 = b[2*4+0];
  var b21 = b[2*4+1];
  var b22 = b[2*4+2];
  var b23 = b[2*4+3];
  var b30 = b[3*4+0];
  var b31 = b[3*4+1];
  var b32 = b[3*4+2];
  var b33 = b[3*4+3];
  return [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
          a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
          a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
          a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
          a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
          a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
          a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
          a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
          a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
          a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
          a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
          a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
          a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
          a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
          a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
          a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33];
        
    }, 
    
    
    drawEntities = function (entitiesArray){
        
        if(!Array.isArray(entitiesArray)){
            entitiesArray = [entitiesArray];
        }
        
        for(var i=0,j=entitiesArray.length; i<j; i++){
          var buffer,
              transformMatrix,
              translationMatrix,
              rotationXMatrix,
              rotationYMatrix,
              rotationZMatrix,
              scaleMatrix;
          
          buffer = entitiesArray[i].buffer;         
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
          gl.uniform4f(colorLocation, entitiesArray[i].rgba.r/255, entitiesArray[i].rgba.g/255, entitiesArray[i].rgba.b/255, entitiesArray[i].rgba.a/255);
            
            
          var trans = [
            PONG.vars.translX + entitiesArray[i].translation[0],
            PONG.vars.translY + entitiesArray[i].translation[1],
            PONG.vars.translZ + entitiesArray[i].translation[2]
          ];
          
            
          translationMatrix = getTranslationMatrix(trans);
          rotationXMatrix = getXRotationMatrix([Math.sin(PONG.vars.rotationX * Math.PI / 360), Math.cos(PONG.vars.rotationX * Math.PI / 360)]);
          rotationYMatrix = getYRotationMatrix([Math.sin(PONG.vars.rotationY * Math.PI / 360), Math.cos(PONG.vars.rotationY * Math.PI / 360)]);
          rotationZMatrix = getZRotationMatrix([Math.sin(PONG.vars.rotationZ * Math.PI / 360), Math.cos(PONG.vars.rotationZ * Math.PI / 360)]);
          scaleMatrix = getScaleMatrix(entitiesArray[i].scale);
          
          
          transformMatrix = matrix4x4Multiply(scaleMatrix, rotationZMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, rotationYMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, rotationXMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, translationMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, projection2D);
          
          //getTranslationMatrix(entitiesArray[i].translation)
          //getXRotationMatrix(entitiesArray[i].rotation)
          //getYRotationMatrix(entitiesArray[i].rotation)
          //getZRotationMatrix(entitiesArray[i].rotation)
          
          
          
         
          
          gl.uniformMatrix4fv(matrixLocation, false, transformMatrix);
          gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
        };
    },
   
    
    render = function() {
        //clear
        gl.clear(gl.COLOR_BUFFER_BIT);
        drawEntities(PONG.backgroundList);
        
        switch(PONG.currentScreen){
            case PONG.screens.INTRO_SCREEN:{
                drawEntities(PONG.titles.INTRO);
                break;
            }
            case PONG.screens.GAME_SCREEN:{
                drawEntities(PONG.gameScreenList);
                break;
            }
            case PONG.screens.GAME_OVER_SCREEN:{
                drawEntities(PONG.titles.GAME_OVER);
                break;
            }
        }
        
    };
    
    return {
        init : init,
        render : render
    };
};
