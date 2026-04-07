class Triangle {
  centerX;
  centerY;
  size;
  color;

  _vertexBuffer;
  _numVertices = 3;

  constructor(centerX, centerY, size, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.size = size;
    this.color = color;
  }

  render(gl, a_Position, a_PointSize, u_FragColor) {
    this.initVertexBuffer(gl, a_Position);
    let rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.drawArrays(gl.TRIANGLES, 0, this._numVertices);
    gl.disableVertexAttribArray(a_Position);
  }

  initVertexBuffer(gl, a_Position) {
    // Triangle shape before offset
    let vertices = new Float32Array([
      0, 0.005,   -0.005, -0.005,   0.005, -0.005
    ]);
    // Apply size and centerXY offset
    for (let i = 0; i < vertices.length; i += 2) {
      vertices[i]   = vertices[i]   * this.size + this.centerX;
      vertices[i+1] = vertices[i+1] * this.size + this.centerY;
    }

    // Create a buffer object
    this._vertexBuffer = gl.createBuffer();
    if (!this._vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  }
}