function createBoard() {
  var board = {};
  board.rows = [];

  for(var i = 0; i < 30; i++) {
    var row = {};
    row.dots = [];

    for(var j = 0; j < 30; j++) {
      var dot = {};
      dot.hasDot = false;
      row.dots.push(dot);
    }
    board.rows.push(row);
  }
  return board;
};

function randomColorGenerator() {
  var number = Math.round(Math.random() * 4);
  var color = "";
  switch(number) {
    case 0: color = "red"; break;
    case 1: color = "orange"; break;
    case 2: color = "yellow"; break;
    case 3: color = "green"; break;
    case 4: color = "blue"; break;
  }
  return color;
}

function getDot(board, row, column) {
  return board.rows[row].dots[column];
}


function placeInitialDots(board) {
  for(var i = 10; i < 20; i++) {
    for(var j = 10; j < 20; j++) {
      board.rows[i].dots[j].hasDot = true;
      board.rows[i].dots[j].xPos = j;
      board.rows[i].dots[j].yPos = i;
      board.rows[i].dots[j].color = randomColorGenerator();
    }
  }
}


circlesSquares.controller('BoardCtrl', function BoardCtrl($scope) {
  var soundTrack = document.getElementById("soundTrack");
  soundTrack.play();
  $scope.board = createBoard();
  placeInitialDots($scope.board);
  $scope.clicked = false;
  $scope.clickedColor = "";
  $scope.hoverXPos;
  $scope.hoverYPos;
  $scope.counter = 0;

  $scope.repopulate = function() {
    for(var i = 10; i < 20; i++) {
      for(var j = 10; j < 20; j++) {
        if ($scope.board.rows[i].dots[j].hasDot == false){
          $scope.board.rows[i].dots[j].hasDot = true;
          $scope.board.rows[i].dots[j].color = randomColorGenerator();
        }
      }
    }
  }

  $scope.checkForMatch = function(dot) {
    var dotUp = getDot( $scope.board, dot.xPos - 1, dot.yPos);
    var dotLeft = getDot( $scope.board, dot.xPos, dot.yPos - 1);
    var dotDown = getDot( $scope.board, dot.xPos + 1, dot.yPos);
    var dotRight = getDot( $scope.board, dot.xPos, dot.yPos + 1);
  }

  $scope.addClick = function(dot) {
    $scope.clicked = true;
    $scope.clickedColor = dot.color;
    $scope.hoverXPos = dot.xPos;
    $scope.hoverYPos = dot.yPos;
    $scope.OGDot = dot;
    $scope.counter++;
  }

  $scope.mouseEnter = function(dot) {
    if ($scope.clicked == true) {

      //Prevents user from changing the colors of dots that are not in the line or square
      if((dot.color == $scope.clickedColor) && (dot.hasDot)) {
        if(Math.abs(dot.xPos - $scope.hoverXPos) + Math.abs(dot.yPos - $scope.hoverYPos) <= 1) {
          dot.hasDot = false;
          $scope.OGDot.hasDot = false;
          $scope.hoverXPos = dot.xPos;
          $scope.hoverYPos = dot.yPos;
          $scope.counter++;


          //Checking for squares - will delete all dots of the same color when a square is made
          if(($scope.counter>=4) && (Math.abs(dot.xPos - $scope.OGDot.xPos) + Math.abs(dot.yPos - $scope.OGDot.yPos) <= 1)) {
            var squarescore = document.getElementById("squareScore");
            squarescore.play();
            for(var i = 10; i < 20; i++) {
              for(var j = 10; j < 20; j++) {
                if($scope.board.rows[i].dots[j].color == dot.color){
                  $scope.board.rows[i].dots[j].hasDot = false;
                }
              }
            }
          }

        } else {
          $scope.hoverXPos = 100;
          $scope.hoverYPos = 100;
        }
      }
    }
  }

  $scope.mouseUp = function() {
    $scope.clicked = false;
    $scope.repopulate();
    if ($scope.counter > 1){
      var scoreSound = document.getElementById("scoreSound");
      scoreSound.play();
    }
    $scope.counter = 0;
  }

});
