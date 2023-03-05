const c = document.getElementById('canvas').getContext('2d')

c.fillStyle = 'black'
c.strokeRect(0, 0, 500, 400)

c.fillStyle = ''
c.fillRect(10, 10, 480, 380)

c.fillStyle = 'orange'
c.font = 'small-caps bold 24px sans-serif'
c.textAlign = 'center'
c.fillText('Hello code hackerz!', 250, 200)

var num = 30;
var w = c.canvas.width;
var h = c.canvas.height;

for (var i = 0; i < num; i = i + 1) {
  var x = i * w / (num - 1);
  var y = i * h / (num - 1);
  c.strokeStyle = randomRGBA();
  drawLine(0, y, x, h);
  c.strokeStyle = randomRGBA();
  drawLine(x, 0, w, y);
}

function randomRGBA() {
  var r = randInt(255);
  var g = randInt(255);
  var b = randInt(255);
  var a = Math.random();
  var rgba = [r,g,b,a].join(",");
  return "rgba(" + rgba + ")";
}
function randInt(limit) {
  var x = Math.random() * limit;
  return Math.floor(x);
}
function drawLine(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}

