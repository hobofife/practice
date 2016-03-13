var piecebox = {y1:{left:0,top:0,color:0,piece:'wking'},y2:{left:0,top:0,color:1,piece:'wqueen'},y3:{left:0,top:0,color:0,piece:'wrook'},y4:{left:0,top:0,color:1,piece:'wbishop'},y5:{left:0,top:0,color:0,piece:'wknight'},y6:{left:0,top:0,color:1,piece:'wpawn'},z1:{left:0,top:0,color:1,piece:'bking'},z2:{left:0,top:0,color:0,piece:'bqueen'},z3:{left:0,top:0,color:1,piece:'brook'},z4:{left:0,top:0,color:0,piece:'bbishop'},z5:{left:0,top:0,color:1,piece:'bknight'},z6:{left:0,top:0,color:0,piece:'bpawn'}}

var boxDiv = document.getElementById('piece-box')
function drawBox(){
  var squares = Object.keys(piecebox)
  var boxFiles = 'yz'
  function onTheRight(){
    var boxTop = dimensions.top
    var boxLeft = dimensions.left + (dimensions.squareSize * 9)
    for (var i=0; i<squares.length; i++){
      var thisFile = squares[i].charAt(0)
      var thisRank = squares[i].charAt(1)
      var thisLeft = boxLeft + (dimensions.squareSize *
                                        (boxFiles.indexOf(thisFile)))
      var thisTop = boxTop + (dimensions.squareSize * (6-thisRank))
      piecebox[squares[i]].left = thisLeft
      piecebox[squares[i]].top = thisTop
    }
  }
  onTheRight()
  var boxSquares = squareElements(boxDiv, piecebox)
  drawSquares(boxSquares, dimensions, piecebox)
}

function setBox(){
  squares = Object.keys(piecebox)
  for (var i=0; i<squares.length; i++){
    setPiece(squares[i], piecebox[squares[i]].piece, piecebox)
  }
}

drawBox()
setBox()
drawAllPieces(piecebox, boxDiv)