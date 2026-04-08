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
let shapesList = [];


function main() {

  setupWebGL();
  setupShadersWithVariables();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = drawShapeAtEvent;
  canvas.onmousemove = handleMouseMotion;

  document.getElementById("clear_button").onmousedown = clearCanvas;
  document.getElementById("draw_peacock_button").onmousedown = () => {
    loadJSON("./peacock.json").then(drawJSON);
  };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // TODO: remove
  // for testing purposes
  loadJSON("./peacock.json").then(drawJSON);
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


// Handle mouse motion. can forward event to drawPointAtEvent
function handleMouseMotion(ev) {
  if (ev.buttons === 1) {
    drawShapeAtEvent(ev);
  }
}


// Handle a click event
// Draws point at mouse position of event
function drawShapeAtEvent(ev) {
  let x = ev.clientX; // x coordinate of a mouse pointer
  let y = ev.clientY; // y coordinate of a mouse pointer
  let rect = ev.target.getBoundingClientRect();

  // Translates ClientXY into WebGL space, (-1 to 1)
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  // Get all HTML input
  let color = getColorInput();
  let shapeSize = document.getElementById("shape_size").value;
  let circleSegments = document.getElementById("segments").value;
  let toolSelection = document.getElementById("tool_selection").value;

  // Add shape to shapesList depending on tool selection
  switch (toolSelection) {
    case "point":
      // draw point
      let point = new Point(x, y, shapeSize, color);
      shapesList.push(point);
      break;
    case "triangle":
      // draw triangle
      let tri = new EquilateralTriangle(x, y, shapeSize, color);
      shapesList.push(tri);
      break;
    case "circle":
      // draw circle
      let circle = new Circle(x, y, shapeSize, circleSegments, color);
      shapesList.push(circle);
      break;
  }

  renderAllShapes();
}


// Renders all shapes tracked by shapesList
function renderAllShapes() {
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw all points
  for (let shape of shapesList) {
    shape.render(gl, a_Position, a_PointSize, u_FragColor);
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


// empties shapesList and redraws
function clearCanvas() {
  shapesList = [];
  renderAllShapes();
}


// Load JSON data, returns promise
async function loadJSON(filename) {
  const request = new Request(filename);
  const response = await fetch(request);
  const JSON = await response.json();

  return JSON;
}


// draws tris from JSON data
function drawJSON(JSON) {
  // Check validity
  if (JSON.triangles.length !== JSON.colors.length) {
    throw new Error("JSON parsing error: triangles.length != colors.length");
  }

  // Make data easier to index
  const tris = JSON.triangles;
  const colors = JSON.colors;

  for (let i = 0; i < tris.length; i++) {
    // Check validity of this vertex
    if (tris[i].length !== 6 || colors[i].length !== 4) {
      throw new Error("JSON parsing error: vertex " + i + " is invalid");
    }

    // Create tri and add to shapesList
    let tri = new Triangle(tris[i], colors[i]);
    shapesList.push(tri);
  }

  renderAllShapes();
}