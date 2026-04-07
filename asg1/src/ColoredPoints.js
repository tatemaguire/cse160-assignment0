// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
let VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute float a_PointSize;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_PointSize;\n' +
  '}\n';

// Fragment shader program
let FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';


// Global References
let canvas;
let gl;

// Shader Variable Locations
let a_Position;
let a_PointSize;
let u_FragColor;

// Shape Data
let g_points = [];  // The array for the position of a mouse press
let g_colors = [];  // The array to store the color of a point
let g_sizes = [];   // The array to store the size of a point


function main() {

  setupWebGL();
  setupShadersWithVariables();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}


// Setup 'canvas' and 'gl'
function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}


// Compile shaders and get variable locations
function setupShadersWithVariables() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of a_PointSize
  a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
}

// Handle a click event
function click(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  // Translates ClientXY into WebGL space, (-1 to 1)
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  // Store the coordinates to g_points array
  g_points.push([x, y]);
  // Get color from HTML DOM
  var color = getColorInput();
  g_colors.push(color);

  // TODO: 
  g_sizes.push(10);

  renderAllShapes();
}


// Renders all shapes tracked by g_points
function renderAllShapes() {
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw all points
  let len = g_points.length;
  for(let i = 0; i < len; i++) {
    let xy = g_points[i];
    let rgba = g_colors[i];
    let size = g_sizes[i];

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the size of a point into vertex shader
    gl.vertexAttrib1f(a_PointSize, size);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}


// returns color (array [r,g,b,a]) from HTML DOM inputs
function getColorInput() {
  let color = new Array(4);

  color[0] = document.getElementById("color_r").value;
  color[1] = document.getElementById("color_g").value;
  color[2] = document.getElementById("color_b").value;
  color[3] = 1;

  return color;
}