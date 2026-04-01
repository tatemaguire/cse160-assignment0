// Globals
var ctx;
var canvas_center;

// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');
  
  // Set canvas center
  canvas_center = new Vector3([
    Math.floor(canvas.width / 2), 
    Math.floor(canvas.height / 2),
    0,
  ]);
    
  // Retrieve draw button and setup callback
  var draw_button = document.getElementById('draw_button');
  draw_button.addEventListener("click", handleDrawEvent);

  // Retrieve draw operation button and setup callback
  var draw_operation_button = document.getElementById('draw_operation_button');
  draw_operation_button.addEventListener("click", handleDrawOperationEvent);

  // Initialize canvas
  handleDrawEvent();
}

// Draw vector v on canvas from center, with specified color
function drawVector(v, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  var start = canvas_center.elements;
  var offset = v.elements;

  // Scale *20, reflect on y axis
  offset[0] *= 20;
  offset[1] *= -20;

  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(start[0] + offset[0], start[1] + offset[1]);
  ctx.stroke();
}

// called when user presses draw_button
// gets input and draws v1 and v2
function handleDrawEvent() {
  // Clear canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  // Retrieve vector input
  var [v1, v2] = getVectorInput();

  // Draw vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");
}

// called when user presses draw_operation_button
//gets input and draws v1 and v2 as well as operation result in green
function handleDrawOperationEvent() {

}

// Get vector input from v1 and v2, and return them as Vector3s
function getVectorInput() {
  // Retrieve input values
  var x1 = document.getElementById("x1_input").value;
  var y1 = document.getElementById("y1_input").value;
  var x2 = document.getElementById("x2_input").value;
  var y2 = document.getElementById("y2_input").value;

  // Create vectors from input
  var v1 = new Vector3([x1, y1, 0]);
  var v2 = new Vector3([x2, y2, 0]);

  return [v1, v2];
}