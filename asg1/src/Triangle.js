class Triangle {
  color;

  _vertices;
  _numVertices;

  constructor(centerX, centerY, size, color) {
    this.color = color;

    this._calculateVertices(centerX, centerY, size);
  }

  render(gl, a_Position, a_PointSize, u_FragColor) {
    this._initVertexBuffer(gl, a_Position);

    let rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, this._numVertices);
    gl.disableVertexAttribArray(a_Position);
  }

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


// class EquilateralTriangle extends Triangle {
  
// }