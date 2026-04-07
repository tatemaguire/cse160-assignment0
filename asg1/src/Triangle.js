class Triangle {
  centerX;
  centerY;
  color;

  constructor(centerX, centerY, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
  }

  render(gl, a_Position, a_PointSize, u_FragColor) {
    let n = initVertexBuffers(gl, a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  initVertexBuffers(gl, a_Position) {
    var n = 3; // The number of vertices
    var vertices = new Float32Array([
      0, 0.5,   -0.5, -0.5,   0.5, -0.5
    ]);
    for (let i = 0; i < vertices.length; i += 2) {
      vertices[i] += this.centerX;
      vertices[i+1] += this.centerY;
    }

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
  }
}