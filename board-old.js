function addSquare(square) {
  var squareClasses = ["dark-square", "light-square"]
  var newSquare = document.createElement('div');
  newSquare.setAttribute('id', square["squareId"]);
  newSquare.setAttribute('class', squareClasses[square["color"]]);
  boardDiv.appendChild(newSquare);
  return newSquare;
}

function createGrid() {
  var chessSquares = [];
  var row = 1;
  var color = 0;
  var chessboardFiles = ["a","b","c","d","e","f","g","h"]
  for (var i=0; i < chessboardFiles.length; i++){
    if (row%2 == 0 ){ color = 1}
    else { color = 0 };
    var thisRank = []
    for (var j=0; j<8; j++){
      var squareId = chessboardFiles[i] + (j+1);
      var thisColor = color%2;
      thisRank.push({"squareId":squareId, "color":thisColor});
      color++;
    }
    chessSquares.push(thisRank)
    row++
  }
  return chessSquares;
}

function drawBoard() {
  var squareSize = $(boardDiv).width() / 8;
  var boardXY = $(boardDiv).offset();
  var firstRank = boardXY.top + (squareSize * 7);
  for (i=0; i<chessSquares.length; i++){
    var squareY = firstRank - (i * squareSize);
    for (j=0; j<chessSquares[i].length; j++){
      var squareX = boardXY.left + (j * squareSize);
      var drawSquare = chessSquares[i][j];
      $(drawSquare).width(squareSize);
      $(drawSquare).height(squareSize);
      $(drawSquare).offset({top: squareY, left:squareX})
      $(drawSquare).css({'font-size': squareSize + "px",
                         'line-height': squareSize + "px"})
    }
  }
}

function drawPiece() {
  var king = "&#9812"  
}


var boardDiv = document.getElementById("chessboard");
var chessGrid = createGrid();
var chessSquares = [];
for (i=0; i<chessGrid.length; i++){
  var thisRank = [];
  for (j=0; j<chessGrid[i].length; j++){
    thisRank.push(addSquare(chessGrid[i][j]));    
  }
  chessSquares.push(thisRank);
}

var pieces = {king:"\u265A",
              wqueen:"&#9813",
              wrook:"&#9814;",
              wbishiop:"&#9815;",
              wknight:"&#9816;",
              wpawn:"&#9817;",
              bking:"&#9818;",
              bqueen:"&#9819;",
              brook:"&#9820;",
              bbishop:"&#9821;",
              bknight:"&#9822;",
              bpawn:"&#9823;"
             }

drawBoard();

var wking = document.createElement("div");
wking.setAttribute('id', "wking");
var newpiece = document.createTextNode(pieces["king"]);
wking.appendChild(newpiece);
chessSquares[0][4].appendChild(wking);
$("#wking").addClass("white-piece");

var bking = document.createElement("div");
bking.setAttribute('id', "bking");
var newpiece2 = document.createTextNode(pieces["king"]);
bking.appendChild(newpiece2);
chessSquares[7][4].appendChild(bking);
$("#bking").addClass("black-piece");

var newXY = $(chessSquares[1][4]).offset();

$("#e2").append($("#wking"));

// $("#wking").animate({
//   top: newXY.top,
//   left: newXY.left
// }, 200)
