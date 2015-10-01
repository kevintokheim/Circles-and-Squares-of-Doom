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
  $scope.board = createBoard();
  placeInitialDots($scope.board);
  $scope.clicked = false;
  $scope.clickedColor = "";

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
    console.log(dot.color);
  }

  $scope.mouseEnter = function(dot) {
    if ($scope.clicked == true) {
      if(dot.color == $scope.clickedColor) {
        dot.hasDot = false;
      }
    }
  }

  $scope.mouseUp = function() {
    $scope.clicked = false;
    $scope.repopulate();
  }

});
