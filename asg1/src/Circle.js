class Circle {
    _color;
    _vertices;
    _numVertices;

    constructor(centerX, centerY, radius, segments, color) {
        this._color = color;

        this._calculateVertices(centerX, centerY, radius, segments);
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
    _calculateVertices(centerX, centerY, radius, segments) {
        let n = segments + 2;
        let verts = new Float32Array(2 * n);

        // Set center vertex
        verts[0] = 0; verts[1] = 0;
        // Set righthand starting vertex
        verts[2] = 1; verts[3] = 0;

        // Calculate angle between each vertex
        let deltaAngle = (2 * Math.PI) / segments;

        // Set all other vertices
        for (let segI = 0; segI < segments; segI++) {
            // Calculate index of the x-component of this vertex
            let vertexI = 2 * (segI + 2);

            // Set vertex coordinates based on segI
            verts[vertexI]     = Math.cos((segI + 1) * deltaAngle);
            verts[vertexI + 1] = Math.sin((segI + 1) * deltaAngle);
        }

        // Translate and scale
        radius /= 200;
        for (let i = 0; i < verts.length; i += 2) {
            verts[i]   = verts[i]   * radius + centerX;
            verts[i+1] = verts[i+1] * radius + centerY;

        }

        this._vertices = verts;
        this._numVertices = n;
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