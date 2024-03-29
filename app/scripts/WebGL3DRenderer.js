PONG.WebGL3DRenderer = function() {
    var stage, 
    gl, 
    vertexShader, 
    fragmentShader, 
    program, 
    positionLocation, 
    colorLocation, 
    aspect,
    matrixLocation,
    resolutionLocation;

    rectToVertices = function(rect) {
        var x1 = rect.x,
            x2 = rect.x + rect.width,
            y1 = rect.y,
            y2 = rect.y + rect.height,
            z  = rect.depth;

        return [
            //front face
            x1, y1, 0,
            x2, y1, 0,
            x1, y2, 0,
            x1, y2, 0,
            x2, y1, 0,
            x2, y2, 0,
            
            //rear face
            x2, y1, z, 
            x1, y1, z, 
            x2, y2, z, 
            x2, y2, z, 
            x1, y1, z, 
            x1, y2, z, 
            
            //top face
            x1, y1, z,
            x2, y1, z,
            x1, y1, 0,
            x1, y1, 0,
            x2, y1, z,
            x2, y1, 0,
            
            //bottom face
            x2, y2, z,
            x1, y2, z,
            x2, y2, 0,
            x2, y2, 0,
            x1, y2, z,
            x1 ,y2, 0,

            
            
            //left face
            x1, y1, 0,
            x1, y2, 0,
            x1, y1, z,
            
            x1, y1, z,
            x1, y2, 0,
            x1, y2, z,
          

            
            //right face
            x2, y1, 0,
            x2, y1, z,
            x2, y2, 0,
            x2, y2, 0,
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
    
    initEntityBuffer = function (entity) {
        var vertices = [];
        entity.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer);

        for (var i = 0, j = entity.graphics.length; i < j; i++) {
            vertices = vertices.concat(rectToVertices(entity.graphics[i]));
        };
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        entity.buffer.numItems = vertices.length / 3;
    },

    init = function() {
        
        var entities;
        

        
        /*var gui = new dat.GUI();
        var f1 = gui.addFolder('Rotations');
        f1.add(PONG.vars, "rotationX").min(-180).max(180);
        f1.add(PONG.vars, "rotationY").min(-180).max(180);
        f1.add(PONG.vars, "rotationZ").min(-180).max(180);
        
        var f2 = gui.addFolder('Translations');
        f2.add(PONG.vars, "translX").min(-200).max(200);
        f2.add(PONG.vars, "translY").min(-200).max(200);
        f2.add(PONG.vars, "translZ").min(-1000).max(0);
        gui.add(PONG.vars, "fieldOfViewRadians").min(1).max(179);
        
        f1.open();
        f2.open();*/
        
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
        
        aspect = stage.width / stage.height;
        

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
        
        
        entities = PONG.EntityCollection.pull();
        for(var i=0,j=entities.length; i<j; i++){
          initEntityBuffer(entities[i]);
        };
        
        //projection2D = make2DProjection(stage.width, stage.height, stage.width*2);
        
        
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
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
    
    makeZToWMatrix = function (fudgeFactor) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, fudgeFactor,
            0, 0, 0, 1,
        ];
    },
    
    makePerspective = function (fieldOfViewInRadians, aspect, near, far) {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians ),
        rangeInv = 1.0 / (near - far);
         
        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        ];
    },
    
    matrix4x4Multiply = function (a, b) {
        var a00 = a[0*4+0],
            a01 = a[0*4+1],
            a02 = a[0*4+2],
            a03 = a[0*4+3],
            a10 = a[1*4+0],
            a11 = a[1*4+1],
            a12 = a[1*4+2],
            a13 = a[1*4+3],
            a20 = a[2*4+0],
            a21 = a[2*4+1],
            a22 = a[2*4+2],
            a23 = a[2*4+3],
            a30 = a[3*4+0],
            a31 = a[3*4+1],
            a32 = a[3*4+2],
            a33 = a[3*4+3],
            b00 = b[0*4+0],
            b01 = b[0*4+1],
            b02 = b[0*4+2],
            b03 = b[0*4+3],
            b10 = b[1*4+0],
            b11 = b[1*4+1],
            b12 = b[1*4+2],
            b13 = b[1*4+3],
            b20 = b[2*4+0],
            b21 = b[2*4+1],
            b22 = b[2*4+2],
            b23 = b[2*4+3],
            b30 = b[3*4+0],
            b31 = b[3*4+1],
            b32 = b[3*4+2],
            b33 = b[3*4+3];
            
        return [
            a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
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
            a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33
        ];
        
    }, 
    
    
    getSinCos = function (angleInDegrees) {
        var sin, cos;
        
        
        return [sin, cos];
    },
    
    drawEntities = function (entitiesArray){
        for(var i=0,j=entitiesArray.length; i<j; i++){
          var buffer,
              transformMatrix,
              moveOriginMatrix,
              screenCenteringTranslation,
              guiTranlsationMatrix,
              translationMatrix,
              rotationXMatrix,
              rotationYMatrix,
              rotationZMatrix,
              zToWMatrix,
              scaleMatrix,
              projectionMatrix;
          
          
              buffer = entitiesArray[i].buffer;         

          
          
          
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
          gl.uniform4f(colorLocation, entitiesArray[i].rgba.r/255, entitiesArray[i].rgba.g/255, entitiesArray[i].rgba.b/255, entitiesArray[i].rgba.a/255);
            
          moveOriginMatrix = getTranslationMatrix([-300, -223, 0]);
          screenCenteringTranslation = getTranslationMatrix([ 0.5*window.innerWidth, 0.5*window.innerHeight, 0.5*window.innerWidth]);
          guiTranlsationMatrix = getTranslationMatrix([PONG.vars.translX, PONG.vars.translY, PONG.vars.translZ]);
          translationMatrix = getTranslationMatrix(entitiesArray[i].translation); 
          rotationXMatrix = getXRotationMatrix([Math.sin(PONG.vars.rotationX * Math.PI / 180), Math.cos(PONG.vars.rotationX * Math.PI / 180)]);
          rotationYMatrix = getYRotationMatrix([Math.sin(PONG.vars.rotationY * Math.PI / 180), Math.cos(PONG.vars.rotationY * Math.PI / 180)]);
          rotationZMatrix = getZRotationMatrix([Math.sin(PONG.vars.rotationZ * Math.PI / 180), Math.cos(PONG.vars.rotationZ * Math.PI / 180)]);
          scaleMatrix = getScaleMatrix(entitiesArray[i].scale);//[0.2, 0.2, 0.2]);
          zToWMatrix = makeZToWMatrix(PONG.vars.fudgeFactor);
          projectionMatrix = makePerspective(PONG.vars.fieldOfViewRadians * Math.PI / 180, aspect, 1, 2000);
          
          transformMatrix = matrix4x4Multiply(moveOriginMatrix, translationMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, scaleMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, rotationZMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, rotationYMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, rotationXMatrix);
          //transformMatrix = matrix4x4Multiply(transformMatrix, screenCenteringTranslation);
          transformMatrix = matrix4x4Multiply(transformMatrix, guiTranlsationMatrix);
          transformMatrix = matrix4x4Multiply(transformMatrix, projectionMatrix);
          
          gl.uniformMatrix4fv(matrixLocation, false, transformMatrix);

          //gl.drawArrays(gl.LINE_STRIP, 0, buffer.numItems);
          //gl.drawArrays(gl.LINES, 0, buffer.numItems);
          //gl.drawArrays(gl.POINTS, 0, buffer.numItems);
          //gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.numItems);
          gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
        };
    },
   
    
    render = function() {
        //clear
        //gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        drawEntities(PONG.displayList);
    };
    
    return {
        init : init,
        render : render
    };
};
