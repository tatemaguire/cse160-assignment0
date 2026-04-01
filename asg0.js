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
  canvas_center = new Vector3(
    [Math.floor(canvas.width / 2), 
     Math.floor(canvas.height / 2),
     0]
  );

  // Draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  // Draw a red vector
  var v1 = new Vector3([1, 1, 0]);
  drawVector(v1, "red");
  console.log(v1);

}

// Draw vector v on canvas from center, with specified color
function drawVector(v, color) {
  ctx.strokeStyle = color;

  var start = canvas_center.elements;
  var offset = v.elements;

  // Scale *20, reflect on y axis
  offset[0] *= 20;
  offset[1] *= -20;
  console.log(offset);

  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(start[0] + offset[0], start[1] + offset[1]);
  ctx.stroke();
}
