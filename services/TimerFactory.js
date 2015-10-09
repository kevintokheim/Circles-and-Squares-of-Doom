circlesSquares.factory('TimerFactory', function TimerFactory() {
  var factory = {};
  factory.board = {};
  factory.board.rows = [];

  factory.boardMin = 0;
  factory.boardMax = 10;
  factory.score = 0;
  factory.boardShrink = 10;

  factory.dotMin = 0;
  factory.dotMax = 10;
  factory.timerValue = 30;
//`time`r
  factory.countdown = function() {
    setInterval(factory.timer, 1000);
    console.log('countdown works');
  }
  factory.timer = function()
  {
    factory.timerValue -= 1;
    if(factory.timerValue == 0){
      factory.boardIncrease();
      console.log(factory.board);
      factory.timerValue = 30;
      return factory.timerValue;
    }
  }
//board increase
   factory.boardIncrease = function() {
      factory.boardMax++;
      factory.dotMax++;
      // factory.boardAdd();
      console.log(factory.boardMax);
      console.log(factory.dotMax);
      factory.createBoard();
      factory.placeInitialDots();
      // factory.repopulate();
  }

factory.boardSinker = function() {
  if( factory.boardShrink == 0 ) {
    factory.boardDecrease();
    factory.boardShrink = 10;
  }

}
  //board decrease
    factory.boardDecrease = function() {
        factory.boardMax--;
        factory.dotMax--;
        // factory.boardAdd();
        console.log(factory.boardMax);
        console.log(factory.dotMax);
        factory.createBoard();
        factory.placeInitialDots();
        // factory.repopulate();
    }

//createBoard
  factory.createBoard = function() {
    factory.board = {};
    factory.board.rows = [];

    for(var i = factory.boardMin; i < factory.boardMax; i++) {
      row = {};
      row.dots = [];

      for(var j = factory.boardMin; j < factory.boardMax; j++) {
        dot = {};
        dot.hasDot = false;
        row.dots.push(dot);
      }
      factory.board.rows.push(row);
    }
    return factory.board;
  };

///////
    factory.randomColorGenerator = function() {
    factory.number = Math.round(Math.random() * 4);
    factory.color = "";
    switch(factory.number) {
      case 0: factory.color = "red"; break;
      case 1: factory.color = "orange"; break;
      case 2: factory.color = "yellow"; break;
      case 3: factory.color = "green"; break;
      case 4: factory.color = "blue"; break;
    }
    return factory.color;
  }

//gets the position of a dot, returns that dot object
    factory.getDot = function(board, row, column){
    return factory.board.rows[row].dots[column];
  }

  //checks for a dot above the empty spot and moves it down
     factory.dotDrop = function() {
       for(var i = factory.dotMin; i < factory.dotMax; i++) {
         for(var j = factory.dotMin; j < factory.dotMax; j++) {
           //if the current position is empty and the position above is not empty...
           if ((factory.board.rows[i].dots[j].hasDot == false) && (factory.board.rows[factory.dotMin].dots[j].hasDot != false)) {
             //sets the empty hasDot spot to true
             factory.board.rows[i].dots[j].hasDot = true;
             //sets the spot to the color of the spot directly above.
             factory.board.rows[i].dots[j].color = factory.board.rows[i-1].dots[j].color;
             //sets the spot directly above to false making an empty spot.
             factory.board.rows[i-1].dots[j].hasDot = false;
                   }
         }
       }
     }

//populates the board on start
//changes all dots within range to hasDot = true
    factory.placeInitialDots = function(board) {
    for(var i = factory.dotMin; i < factory.dotMax; i++) {
      for(var j = factory.dotMin; j < factory.dotMax; j++) {
        factory.board.rows[i].dots[j].hasDot = true;
        factory.board.rows[i].dots[j].xPos = j;
        factory.board.rows[i].dots[j].yPos = i;
        factory.board.rows[i].dots[j].color = factory.randomColorGenerator();
      }
    }
  }
  //repopulates by looking at top row of the board and "generating" new dots.
    factory.repopulate = function(dot) {
      for(var i = factory.dotMin; i < factory.dotMin + 1; i++) {
        for(var j = factory.dotMin; j < factory.dotMax; j++) {
          if (factory.board.rows[i].dots[j].hasDot == false){
            factory.board.rows[i].dots[j].hasDot = true;
            factory.board.rows[i].dots[j].color = factory.randomColorGenerator();
            factory.score++;
            factory.boardShrink--;
          }
        }
      }
    }

//////////////////CLICK FUNCTIONS

//makes the magic happen Steven?
  factory.addClick = function(dot) {
    factory.clicked = true;
    factory.clickedColor = dot.color;
    factory.hoverXPos = dot.xPos;
    factory.hoverYPos = dot.yPos;
    factory.OGDot = dot;
    factory.counter++;
    // $scope.repopulate(dot);
  }
  //mouse holddown functionality
  factory.mouseEnter = function(dot) {
    if (factory.clicked == true) {

      //Prevents user from changing the colors of dots that are not in the line or square
      if((dot.color == factory.clickedColor) && (dot.hasDot)) {
        if(Math.abs(dot.xPos - factory.hoverXPos) + Math.abs(dot.yPos - factory.hoverYPos) <= 1) {
          dot.hasDot = false;
          factory.OGDot.hasDot = false;
          factory.hoverXPos = dot.xPos;
          factory.hoverYPos = dot.yPos;
          factory.counter++;

          //Checking for squares - will delete all dots on the board of the same color when a square is made
          if((factory.counter>=4) && (Math.abs(dot.xPos - factory.OGDot.xPos) + Math.abs(dot.yPos - factory.OGDot.yPos) <= 1)) {

            //plays square sound
            var squarescore = document.getElementById("squareScore");
            squarescore.play();

            //deletes all dots of one color when a square is made
            for(var i = factory.dotMin; i < factory.dotMax; i++) {
              for(var j = factory.dotMin; j < factory.dotMax; j++) {
                if(factory.board.rows[i].dots[j].color == dot.color){
                  factory.board.rows[i].dots[j].hasDot = false;
                  factory.score++;
                  factory.boardShrink--;
                }
              }
            }
          } //end checksquare if

        } else {
          factory.hoverXPos = 100;
          factory.hoverYPos = 100;
        }
      }
    }
  }
  //mouse unclick, repopulate, plays sound, sets counter to 0
  factory.mouseUp = function(dot) {
    factory.clicked = false;
    //check each position, drop the dots all down and repopulate the top row
    for(var i = factory.dotMin; i < factory.dotMax; i++) {
      for(var j = factory.dotMin; j < factory.dotMax; j++) {
        factory.dotDrop();
        factory.boardSinker();
        factory.repopulate();
      }
    }
    if ((factory.counter > 1) && (factory.counter < 4)){
      var scoreSound = document.getElementById("scoreSound");
      scoreSound.play();
    }
    if (factory.counter >= 4) {
      var scoreSound2 = document.getElementById("scoreSound2");
      scoreSound2.play();
    }

    factory.counter = 0;
  }


  factory.playSoundtrack = function() {
    var soundTrack = document.getElementById("soundTrack");
    soundTrack.loop = true;
    if (soundTrack.paused) {
      soundTrack.play();
    } else {
      soundTrack.pause();
    }
  }



  return factory;
});
