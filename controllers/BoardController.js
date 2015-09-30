function createBoard() {
  var board = {};
  board.rows = [];

  for(var i = 0; i < 3; i++) {
    var row = {};
    row.dots = [];

    for(var j = 0; j < 3; j++) {
      var dot = {};
      dot.hasDot = true;
      row.dots.push(dot);
    }
    board.rows.push(dot);
    console.log(board.rows);
  }
  return board;
};

circlesSquares.controller('BoardCtrl', function BoardCtrl($scope) {
  $scope.board = createBoard();

});
