var board = {a1:{left:0,top:0,color:0,piece:null},a2:{left:0,top:0,color:1,piece:null},a3:{left:0,top:0,color:0,piece:null},a4:{left:0,top:0,color:1,piece:null},a5:{left:0,top:0,color:0,piece:null},a6:{left:0,top:0,color:1,piece:null},a7:{left:0,top:0,color:0,piece:null},a8:{left:0,top:0,color:1,piece:null},b1:{left:0,top:0,color:1,piece:null},b2:{left:0,top:0,color:0,piece:null},b3:{left:0,top:0,color:1,piece:null},b4:{left:0,top:0,color:0,piece:null},b5:{left:0,top:0,color:1,piece:null},b6:{left:0,top:0,color:0,piece:null},b7:{left:0,top:0,color:1,piece:null},b8:{left:0,top:0,color:0,piece:null},c1:{left:0,top:0,color:0,piece:null},c2:{left:0,top:0,color:1,piece:null},c3:{left:0,top:0,color:0,piece:null},c4:{left:0,top:0,color:1,piece:null},c5:{left:0,top:0,color:0,piece:null},c6:{left:0,top:0,color:1,piece:null},c7:{left:0,top:0,color:0,piece:null},c8:{left:0,top:0,color:1,piece:null},d1:{left:0,top:0,color:1,piece:null},d2:{left:0,top:0,color:0,piece:null},d3:{left:0,top:0,color:1,piece:null},d4:{left:0,top:0,color:0,piece:null},d5:{left:0,top:0,color:1,piece:null},d6:{left:0,top:0,color:0,piece:null},d7:{left:0,top:0,color:1,piece:null},d8:{left:0,top:0,color:0,piece:null},e1:{left:0,top:0,color:0,piece:null},e2:{left:0,top:0,color:1,piece:null},e3:{left:0,top:0,color:0,piece:null},e4:{left:0,top:0,color:1,piece:null},e5:{left:0,top:0,color:0,piece:null},e6:{left:0,top:0,color:1,piece:null},e7:{left:0,top:0,color:0,piece:null},e8:{left:0,top:0,color:1,piece:null},f1:{left:0,top:0,color:1,piece:null},f2:{left:0,top:0,color:0,piece:null},f3:{left:0,top:0,color:1,piece:null},f4:{left:0,top:0,color:0,piece:null},f5:{left:0,top:0,color:1,piece:null},f6:{left:0,top:0,color:0,piece:null},f7:{left:0,top:0,color:1,piece:null},f8:{left:0,top:0,color:0,piece:null},g1:{left:0,top:0,color:0,piece:null},g2:{left:0,top:0,color:1,piece:null},g3:{left:0,top:0,color:0,piece:null},g4:{left:0,top:0,color:1,piece:null},g5:{left:0,top:0,color:0,piece:null},g6:{left:0,top:0,color:1,piece:null},g7:{left:0,top:0,color:0,piece:null},g8:{left:0,top:0,color:1,piece:null},h1:{left:0,top:0,color:1,piece:null},h2:{left:0,top:0,color:0,piece:null},h3:{left:0,top:0,color:1,piece:null},h4:{left:0,top:0,color:0,piece:null},h5:{left:0,top:0,color:1,piece:null},h6:{left:0,top:0,color:0,piece:null},h7:{left:0,top:0,color:1,piece:null},h8:{left:0,top:0,color:0,piece:null}}

function getDimensions(){
  var dimensions = {top:0, left:0, squareSize:0}
  dimensions.squareSize = $(boardDiv).width() / 8
  var boardXY = $(boardDiv).offset()
  dimensions.top = boardXY.top
  dimensions.left = boardXY.left
  return dimensions
}

function getPositions(dimensions){
  var squares = Object.keys(board)
  var chessFiles = 'abcdefgh'
  for (var i=0; i < squares.length; i++){
    var thisFile = squares[i].charAt(0)
    var thisRank = squares[i].charAt(1)
    var thisLeft = dimensions.left + (dimensions.squareSize *
                                     (chessFiles.indexOf(thisFile)))
    var thisTop = dimensions.top + (dimensions.squareSize * (8-thisRank))
    board[squares[i]].left = thisLeft
    board[squares[i]].top = thisTop
  }
}

function initialSquares(){
  var chessSquares = []
  var squareClasses = ["dark-square", "light-square"]
  var squares = Object.keys(board)
  for (var i=0; i < squares.length; i++){
    var newSquare = document.createElement('div')
    newSquare.setAttribute('id', squares[i])
    var thisClass = squareClasses[board[squares[i]].color]
    newSquare.setAttribute('class', thisClass)
    boardDiv.appendChild(newSquare)
    chessSquares.push(newSquare)
  }
  return chessSquares
}

function drawSquares(chessSquares, dimensions){
  for (var i=0; i<chessSquares.length; i++){
    var thisSquare = chessSquares[i]
    var thisLeft = board[thisSquare.id].left
    var thisTop = board[thisSquare.id].top
    $(thisSquare).width(dimensions.squareSize)
    $(thisSquare).height(dimensions.squareSize)
    $(thisSquare).offset({top:thisTop, left:thisLeft})
    // To Check:
    // var thisText = document.createTextNode(thisSquare.id)
    // $(thisSquare).append(thisText)
  }
}

function setPiece(square, piece, color){
  // should add code to remove existing piece if 
  // board[square].piece is not null
  var colorClass = {white:'white-piece', black:'black-piece'}
  var pieces = {king:'\u265A', queen:'\u265B', rook:'\u265C',
                bishop:'\u265D', knight:'\u265E', pawn:'\u265F'}
  var newPiece = document.createElement('div')
  var pieceImage = document.createTextNode(pieces[piece])
  $(newPiece).append(pieceImage)
  $(newPiece).addClass('chess-piece')
  $(newPiece).addClass(piece)
  $(newPiece).addClass(colorClass[color])
  // can I move font-size and line-height up to the boardDiv?
  // Also, can't I set the height and width for all child element?
  $(newPiece).css({'font-size': dimensions.squareSize + "px",
                     'line-height': dimensions.squareSize + "px"})
  board[square].piece = newPiece
}

function drawPiece(square){
  var piece = board[square].piece
  boardDiv.appendChild(piece)
  var thisLeft = board[square].left
  var thisTop = board[square].top
  $(piece).width(dimensions.squareSize)
  $(piece).height(dimensions.squareSize)
  $(piece).offset({top:thisTop, left:thisLeft})
}

function drawAllPieces(){
  var squares = Object.keys(board)
  for (var i=0; i<squares.length; i++){
    if ($(board[squares[i]].piece).hasClass('chess-piece')){
      drawPiece(squares[i])
    }
  }
}

function removePiece(square){
  if (board[square].piece != null){
    console.log(board[square].piece)
    boardDiv.removeChild(board[square].piece)
    board[square].piece = null
  }
}

function getMove(squareFrom, squareTo){
  var moveTop = board[squareTo].top - board[squareFrom].top
  var moveLeft = board[squareTo].left - board[squareFrom].left
  if (moveTop<0) {
    moveTop = Math.abs(moveTop)
    moveTop = "-=" + moveTop.toString()
  } else {
    moveTop = "+=" + moveTop.toString()
  }
  if (moveLeft<0) {
    moveLeft = Math.abs(moveLeft)
    moveLeft = "-=" + moveLeft.toString()
  } else {
    moveLeft = "+=" + moveLeft.toString()
  }
  return [moveTop, moveLeft]
}

function movePiece(squareFrom, squareTo){
  var piece = board[squareFrom].piece
  var moves = getMove(squareFrom, squareTo)
  $(piece).css("zIndex", 10)
  $(piece).animate({top:moves[0],left:moves[1]}, 200)
  $(piece).css("zIndex", 3)
  removePiece(squareTo)
  board[squareTo].piece = piece
  board[squareFrom].piece = null
}

var boardDiv = document.getElementById('chessboard')
var dimensions = getDimensions()
getPositions(dimensions)
var chessSquares = initialSquares()
drawSquares(chessSquares, dimensions)
setPiece('e1', 'king', 'white')
setPiece('e7', 'king', 'black')
setPiece('e5', 'knight', 'white')
setPiece('c6', 'knight', 'black')
drawAllPieces()
