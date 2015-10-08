
circlesSquares.controller('BoardCtrl', function BoardCtrl($scope) {

  //creates board(grid) object
  // with a rows[] array containing row{} objects.
  //each row{} object has a dots array[] which contain dot objects
  $scope.boardMin = 0;
  $scope.boardMax = 10;

  $scope.dotMin = 0;
  $scope.dotMax = 10;

  $scope.createBoard = function(){
    $scope.board = {};
    $scope.board.rows = [];

    for(var i = $scope.boardMin; i < $scope.boardMax; i++) {
      $scope.row = {};
      $scope.row.dots = [];

      for(var j = $scope.boardMin; j < $scope.boardMax; j++) {
        $scope.dot = {};
        $scope.dot.hasDot = false;
        $scope.row.dots.push($scope.dot);
      }
      $scope.board.rows.push($scope.row);
    }
    return $scope.board;
  };

  //generates random color and returns that color
  $scope.randomColorGenerator = function() {
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
  $scope.getDot = function(board, row, column) {
    return board.rows[row].dots[column];
  }

  //populates the board on start
  //changes all dots within range to hasDot = true
  $scope.placeInitialDots = function(board) {
    for(var i = $scope.dotMin; i < $scope.dotMax; i++) {
      for(var j = $scope.dotMin; j < $scope.dotMax; j++) {
        $scope.board.rows[i].dots[j].hasDot = true;
        $scope.board.rows[i].dots[j].xPos = j;
        $scope.board.rows[i].dots[j].yPos = i;
        $scope.board.rows[i].dots[j].color = $scope.randomColorGenerator();
      }
    }
  }



  $scope.clicked = false;
  $scope.board = $scope.createBoard();
  $scope.placeInitialDots($scope.board);
  $scope.clickedColor = "";
  $scope.hoverXPos;
  $scope.hoverYPos;
  $scope.counter = 0;
  $scope.score = 0;




//repopulates by looking at top row of the board and "generating" new dots.
  $scope.repopulate = function(dot) {
    for(var i = $scope.dotMin; i < $scope.dotMax + 1; i++) {
      for(var j = $scope.dotMin; j < $scope.dotMax; j++) {
        if ($scope.board.rows[i].dots[j].hasDot == false){
          $scope.board.rows[i].dots[j].hasDot = true;
          $scope.board.rows[i].dots[j].color = $scope.randomColorGenerator();
          $scope.score++;
        }
      }
    }
  }

//checks for a dot above the empty spot and moves it down
  $scope.dotDrop = function(dot) {
    for(var i = $scope.dotMin; i < $scope.dotMax; i++) {
      for(var j = $scope.dotMin; j < $scope.dotMax; j++) {
        //if the current position is empty and the position above is not empty...
        if (($scope.board.rows[i].dots[j].hasDot == false) && ($scope.board.rows[$scope.dotMin].dots[j].hasDot != false)) {
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
    if($scope.time == 25){
      $scope.boardIncrease();
      // console.log($scope.boardMax);
    }
  console.log($scope.time);
  }

  $scope.countdown = function(){
  setInterval($scope.timer, 1000);
  }

  $scope.boardIncrease = function() {
      // $scope.boardMax++;
      $scope.createBoard();
      $scope.placeInitialDots();
      $scope.repopulate();
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
          $scope.dot.hasDot = false;
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
            for(var i = $scope.dotMin; i < $scope.dotMax; i++) {
              for(var j = $scope.dotMin; j < $scope.dotMax; j++) {
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
    for(var i = $scope.dotMin; i < $scope.dotMax; i++) {
      for(var j = $scope.dotMin; j < $scope.dotMax; j++) {
        $scope.dotDrop();
        // $scope.delayDrop();
        $scope.repopulate();
        // $scope.dropInterval();
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
