class Circle {
    _color;
    _vertices;
    _numVertices;

    constructor(centerX, centerY, radius, color) {
        this._color = color;

        this._calculateVertices(centerX, centerY, radius);
    }

    render(gl, a_Position, a_PointSize, u_FragColor) {
        this._initVertexBuffer(gl, a_Position);

        // Set color
        let rgba = this._color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Draw. Enabling a_Position's pointer to buffer
        gl.enableVertexAttribArray(a_Position);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this._numVertices);
        gl.disableVertexAttribArray(a_Position);
    }

    // Calculate vertices and store them in _vertices, _numVertices
    _calculateVertices() {
        this._vertices = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            -1, 0,
            0, -1,
            1, 0
        ]);
        this._numVertices = 6;
    }

    // Initialize buffers with vertex data, assigned to a_Position
    _initVertexBuffer(gl, a_Position) {
        // Create buffer
        let vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        // Make this the active buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        // Insert vertex data
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.STATIC_DRAW);

        // Bind data to vertex attribute
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    }
}