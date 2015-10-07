//creates board(grid) object
// with a rows[] array containing row{} objects.
//each row{} object has a dots array[] which contain dot objects
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

//generates random color and returns that color
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

//gets the position of a dot, returns that dot object
function getDot(board, row, column) {
  return board.rows[row].dots[column];
}

//populates the board on start
//changes all dots within range to hasDot = true
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
  $scope.clicked = false;
  $scope.board = createBoard();
  placeInitialDots($scope.board);
  $scope.clickedColor = "";
  $scope.hoverXPos;
  $scope.hoverYPos;
  $scope.counter = 0;
  $scope.score = 0;


//repopulates by looking at top row of the board and "generating" new dots.
  $scope.repopulate = function(dot) {
    for(var i = 10; i < 11; i++) {
      for(var j = 10; j < 20; j++) {
        if ($scope.board.rows[i].dots[j].hasDot == false){
          $scope.board.rows[i].dots[j].hasDot = true;
          $scope.board.rows[i].dots[j].color = randomColorGenerator();
          $scope.score++;
        }
      }
    }
  }

//checks for a dot above the empty spot and moves it down
  $scope.dotDrop = function(dot) {
    for(var i = 10; i < 20; i++) {
      for(var j = 10; j < 20; j++) {
        //if the current position is empty and the position above is not empty...
        if (($scope.board.rows[i].dots[j].hasDot == false) && ($scope.board.rows[i-1].dots[j].hasDot != false)) {
          //sets the empty hasDot spot to true
          $scope.board.rows[i].dots[j].hasDot = true;
          //sets the spot to the color of the spot directly above.
          $scope.board.rows[i].dots[j].color = $scope.board.rows[i-1].dots[j].color;
          //sets the spot directly above to false making an empty spot.
          $scope.board.rows[i-1].dots[j].hasDot = false;
        }
      }
    }
  }

//timer
  $scope.timerClicked = false;

  // $scope.time = $(".timerValue").text();
  $scope.time=30;

  $scope.timer = function()
  {
    $scope.time -= 1;
  console.log($scope.time);
  }

  $scope.countdown = function(){
  setInterval($scope.timer, 1000);
  }

//makes the magic happen Steven?
  $scope.addClick = function(dot) {
    $scope.clicked = true;
    $scope.clickedColor = dot.color;
    $scope.hoverXPos = dot.xPos;
    $scope.hoverYPos = dot.yPos;
    $scope.OGDot = dot;
    $scope.counter++;
    // $scope.repopulate(dot);
  }
  //mouse holddown functionality
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

          //Checking for squares - will delete all dots on the board of the same color when a square is made
          if(($scope.counter>=4) && (Math.abs(dot.xPos - $scope.OGDot.xPos) + Math.abs(dot.yPos - $scope.OGDot.yPos) <= 1)) {

            //plays square sound
            var squarescore = document.getElementById("squareScore");
            squarescore.play();

            //deletes all dots of one color when a square is made
            for(var i = 10; i < 20; i++) {
              for(var j = 10; j < 20; j++) {
                if($scope.board.rows[i].dots[j].color == dot.color){
                  $scope.board.rows[i].dots[j].hasDot = false;
                  $scope.score++;
                }
              }
            }
          } //end checksquare if

        } else {
          $scope.hoverXPos = 100;
          $scope.hoverYPos = 100;
        }
      }
    }
  }
  //mouse unclick, repopulate, plays sound, sets counter to 0
  $scope.mouseUp = function(dot) {
    $scope.clicked = false;
    //check each position, drop the dots all down and repopulate the top row
    for(var i = 10; i < 20; i++) {
      for(var j = 10; j < 20; j++) {
        $scope.dotDrop();
        $scope.repopulate();
      }
    }
    if (($scope.counter > 1) && ($scope.counter < 4)){
      var scoreSound = document.getElementById("scoreSound");
      scoreSound.play();
    }
    if ($scope.counter >= 4) {
      var scoreSound2 = document.getElementById("scoreSound2");
      scoreSound2.play();
    }

    $scope.counter = 0;
  }


  $scope.playSoundtrack = function() {
    var soundTrack = document.getElementById("soundTrack");
    soundTrack.loop = true;
    if (soundTrack.paused) {
      soundTrack.play();
    } else {
      soundTrack.pause();
    }
  }


});
