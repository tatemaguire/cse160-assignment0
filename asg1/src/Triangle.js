class Triangle {
  color;

  _vertices;
  _numVertices;

  
  constructor(vertices, color) {
    this.color = color;
    this._vertices = new Float32Array(vertices);
    this._numVertices = 3;
  }


  render(gl, a_Position, a_PointSize, u_FragColor) {
    // Prep buffer, store vertices inside it
    this._initVertexBuffer(gl, a_Position);

    // Set color
    let rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // Draw. Enabling a_Position's pointer to buffer
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, this._numVertices);
    gl.disableVertexAttribArray(a_Position);
  }


  // Prep buffer, store vertices inside it
  _initVertexBuffer(gl, a_Position) {
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  }
}


// Draws Equilateral triangle using center coords and size
class EquilateralTriangle extends Triangle {
  constructor(centerX, centerY, size, color) {
    super(null, color);
    this._calculateVertices(centerX, centerY, size);
  }

  // Calculate vertices in an equilateral triangle
  _calculateVertices(centerX, centerY, size) {
    // Triangle shape before offset
    let vertices = new Float32Array([
      0, 0.005,   -0.005, -0.005,   0.005, -0.005
    ]);

    // Apply size and centerXY offset
    for (let i = 0; i < vertices.length; i += 2) {
      vertices[i]   = vertices[i]   * size + centerX;
      vertices[i+1] = vertices[i+1] * size + centerY;
    }

    this._vertices = vertices;
    this._numVertices = 3;
  }
}