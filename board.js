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

function squareElements(parentDiv, squareData){
  var chessSquares = []
  var squareClasses = ["dark-square", "light-square"]
  var squares = Object.keys(squareData)
  for (var i=0; i < squares.length; i++){
    var newSquare = document.createElement('div')
    newSquare.setAttribute('id', squares[i])
    var thisClass = squareClasses[squareData[squares[i]].color]
    newSquare.setAttribute('class', thisClass)
    parentDiv.appendChild(newSquare)
    chessSquares.push(newSquare)
  }
  return chessSquares
}

function drawSquares(chessSquares, dimensions, squareData){
  for (var i=0; i<chessSquares.length; i++){
    var thisSquare = chessSquares[i]
    var thisLeft = squareData[thisSquare.id].left
    var thisTop = squareData[thisSquare.id].top
    $(thisSquare).width(dimensions.squareSize)
    $(thisSquare).height(dimensions.squareSize)
    $(thisSquare).offset({top:thisTop, left:thisLeft})
  }
}

function findSquare(x, y){
  var thisFile = ''
  var thisRank = ''
  var chessFileX = {a:board.a1.left, b:board.b1.left, c:board.c1.left,
                    d:board.d1.left, e:board.e1.left, f:board.f1.left,
                    g:board.g1.left, h:board.h1.left}
  var chessFiles = Object.keys(chessFileX)
  for (var i=0; i < chessFiles.length; i++ ){
    if (x > chessFileX[chessFiles[i]]){ thisFile = chessFiles[i]}
  }
  var chessRankY = {1:board.a1.top, 2:board.a2.top, 3:board.a3.top,
                    4:board.a4.top, 5:board.a5.top, 6:board.a6.top,
                    7:board.a7.top, 8:board.a8.top}
  // Need to reverse ranks to check 8th rank first and then subtract
  var chessRanks = Object.keys(chessRankY).reverse()
  for (var i=0; i < chessRanks.length; i++ ){
    if (y > chessRankY[chessRanks[i]]){ thisRank = chessRanks[i]}
  }
  return thisFile + thisRank
}

function setPiece(square, piece, squareData){
  var pieces = {
    bking:'./pieces/bking.svg',
    bqueen:'./pieces/bqueen.svg',
    bbishop:'./pieces/bbishop.svg',
    bknight:'./pieces/bknight.svg',
    brook:'./pieces/brook.svg',
    bpawn:'./pieces/bpawn.svg',
    wking:'./pieces/wking.svg',
    wqueen:'./pieces/wqueen.svg',
    wbishop:'./pieces/wbishop.svg',
    wknight:'./pieces/wknight.svg',
    wrook:'./pieces/wrook.svg',
    wpawn:'./pieces/wpawn.svg'
  }
  var newPiece = document.createElement('img')
  squareData[square].piece = newPiece
  // Should fix this: trying to determine if piece is in piecebox
  if (squareData == window.piecebox){
    $(newPiece).addClass('new-piece')
  }
  $(newPiece).addClass('chess-piece')
  newPiece.setAttribute('src', pieces[piece])
  squareData[square].piece = newPiece
}

function drag(){
  $('.chess-piece').draggable(
    {start:function(e){
       squareStart = (findSquare(e.pageX, e.pageY))
       $(e.target).css('zIndex', '10')
     },
     stop:function(e){
       squareEnd = (findSquare(e.pageX, e.pageY))
       movePiece(squareStart, squareEnd, e)
     }
    })
  $('.new-piece').draggable(
    {start:function(e){
       console.log('k')
     },
     stop:function(e){
       squareEnd = (findSquare(e.pageX, e.pageY))
       newPiece(squareEnd, e)
     }
  })
}

function newPiece(){
  console.log('yo!')
}

function drawPiece(square, squareData, parentDiv){
  var piece = squareData[square].piece
  parentDiv.appendChild(piece)
  var thisLeft = squareData[square].left
  var thisTop = squareData[square].top
  $(piece).width(dimensions.squareSize)
  $(piece).height(dimensions.squareSize)
  $(piece).offset({top:thisTop, left:thisLeft})
  drag()
}

function drawAllPieces(squareData, parentDiv){
  var squares = Object.keys(squareData)
  for (var i=0; i<squares.length; i++){
    if ($(squareData[squares[i]].piece).hasClass('chess-piece')){
      drawPiece(squares[i], squareData, parentDiv)
    }
  }
  drag()
}

function removePiece(square){
  if (board[square].piece != null){
    boardDiv.removeChild(board[square].piece)
    board[square].piece = null
  }
}

function getMove(squareFrom, squareTo){
  var moveTop = board[squareTo].top - squareFrom.top
  var moveLeft = board[squareTo].left - squareFrom.left
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

function movePiece(squareFrom, squareTo, e){
  var startPosition
  var piece = board[squareFrom].piece
  if (e == undefined){startPosition = squareFrom }
  else {startPosition = {
    left:$(e.target).offset().left,
    top:$(e.target).offset().top}}
  var moves = getMove(startPosition, squareTo)
  $(piece).css("zIndex", 10)
  $(piece).animate({top:moves[0],left:moves[1]}, 200, function(){
    $(piece).css("zIndex", 3)
    removePiece(squareTo)
    board[squareTo].piece = piece
    board[squareFrom].piece = null
  })
}

function setFromFEN(fen){
  function fenArray(rankFEN){
    var re = /\d/;
    var thisRank = rankFEN.split('')
    var newRank = []
    for (var i=0; i<thisRank.length; i++){
      var blanks = thisRank[i].match(re)
      if (blanks){
        for (var j=0; j<blanks[0]; j++)
          newRank.push('1')
      } else {
        newRank.push(thisRank[i])}
    }
    return newRank
  }
  var pieces = {k:'bking',
                q:'bqueen',
                b:'bbishop',
                n:'bknight',
                r:'brook',
                p:'bpawn',
                K:'wking',
                Q:'wqueen',
                B:'wbishop',
                N:'wknight',
                R:'wrook',
                P:'wpawn',
                1:null}
  fen = fen.split(' ')
  var chessFiles = 'abcdefgh'
  var position = fen[0]
  var boardSetup = {}
  position = position.split('/')
  position.reverse() // So position[0+1] will be rank 1
  for (var i=0; i<position.length; i++){
    var rankArray = fenArray(position[i])
    var thisRank = i+1
    for (var k=0; k<rankArray.length; k++){
      var thisFile = chessFiles[k]
      var thisSquare = thisFile + thisRank
      if (pieces[rankArray[k]] != null){
        setPiece(thisSquare, pieces[rankArray[k]], board)
      }
    }
  }
}

var startPosition ='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

var boardDiv = document.getElementById('chessboard')
var dimensions = getDimensions()
getPositions(dimensions)
var chessSquares = squareElements(boardDiv, board)
drawSquares(chessSquares, dimensions, board)
var squareStart = ''
var squareEnd = ''

setFromFEN(startPosition)
drawAllPieces(board, boardDiv)