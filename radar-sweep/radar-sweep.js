// Definitely gonna want a 'sweeper' object and an init function, 
// but just prototyping stuff out now

function getAngles(){
  var angles = []
  for (var i=0; i<360; i++){
    // var thisAngle = ((i * Math.PI)/180).toPrecision(3)
    var thisAngle = i * (Math.PI/180)
    angles.push(thisAngle)
  }

  return angles
}

function drawCircle(ctx){
  var path = new Path2D()
  path.arc(250, 250, 200, 0, 2*Math.PI, false)
  ctx.stroke(path)
}

function drawLine(ctx, radians){
  console.log(radians)
  var path = new Path2D()
  var x = 250 + 200 * Math.cos(radians)
  var y = 250 + 200 * Math.sin(radians)
  path.moveTo(250, 250)
  path.lineTo(x, y)
  ctx.stroke(path)
}

function radarSweep(){
  var angles = getAngles()
  var prevAngle = 0
  var canvas = document.getElementById('radar-sweep');
  var ctx = canvas.getContext('2d');
  drawCircle(ctx)
  var angle = prevAngle + 1
  drawLine(ctx, angles[30])
}

