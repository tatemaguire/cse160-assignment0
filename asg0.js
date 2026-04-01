// Globals
var canvas, ctx, canvas_center;

// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
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
  clearCanvas();

  // Retrieve vector input
  var [v1, v2] = getVectorInput();

  // Draw vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");
}

// Called when user presses draw_operation_button
// Gets input and draws v1 and v2 as well as operation result in green
function handleDrawOperationEvent() {

  // --------- 1. Get Input ----------

  // Retrieve vector input
  var [v1, v2] = getVectorInput();

  // Get operation type and scalar from input
  var operation_type = document.getElementById('operation_type').value;
  var scalar = document.getElementById('operation_scalar').value;

  // --------- 2. Calculate ------------

  // Declare v3 and v4 for results
  var v3, v4;

  // Perform operation on v1 v2
  switch (operation_type) {
    case "add":
      v3 = new Vector3();
      v3.set(v1);
      v3.add(v2);

      break;
    case "sub":
      v3 = new Vector3();
      v3.set(v1);
      v3.sub(v2);

      break;
    case "mul":
      v3 = new Vector3();
      v3.set(v1);
      v3.mul(scalar);

      v4 = new Vector3();
      v4.set(v2);
      v4.mul(scalar);

      break;
    case "div":
      v3 = new Vector3();
      v3.set(v1);
      v3.div(scalar);

      v4 = new Vector3();
      v4.set(v2);
      v4.div(scalar);

      break;
    case "magnitude":
      let m1 = v1.magnitude();
      console.log("Magnitude v1:", m1);

      let m2 = v2.magnitude();
      console.log("Magnitude v2:", m2);

      break;
    case "normalize":
      v3 = new Vector3();
      v3.set(v1);
      v3.normalize();

      v4 = new Vector3();
      v4.set(v2);
      v4.normalize();

      break;
  }
  
  // ------- 3. Draw ----------

  clearCanvas();

  // Draw input vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");

  // Draw result vectors
  if (v3) drawVector(v3, "green");
  if (v4) drawVector(v4, "green");
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

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}