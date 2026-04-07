class Point {
    x;
    y;
    pointSize;
    color;

    constructor(x, y, pointSize, color) {
        this.x = x;
        this.y = y;
        this.pointSize = pointSize;
        this.color = color;
    }

    render(gl, a_Position, a_PointSize, u_FragColor) {
        // Send point data to GPU
        gl.vertexAttrib2f(a_Position, this.x, this.y);
        gl.vertexAttrib1f(a_PointSize, this.pointSize);
        let rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        
        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}