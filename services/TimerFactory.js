circlesSquares.factory('TimerFactory', function TimerFactory() {
  var factory = {};
  factory.board = {};
  factory.boardMin = 0;
  factory.boardMax = 10;
  factory.score = 0;

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
    if(factory.timerValue == 28){
      factory.boardIncrease();
      console.log(factory.board);
      // console.log(factory.timerValue);
      return factory.timerValue;
    }
  }
//board increase
   factory.boardIncrease = function() {
      factory.boardMax++;
      factory.boardAdd();
      console.log(factory.boardMax);
      // factory.createBoard();
      // factory.repopulate();
      // factory.dotDrop();
  }

  factory.boardAdd = function() {
      newRow = {};
      newRow.dots = [];

      for(var i = 0; i < factory.boardMax; i++){

        dot = {};
        dot.hasDot = true;
        dot.xPos = i;
        dot.yPos = factory.boardMax;
        dot.color = factory.randomColorGenerator();
        newRow.dots.push(dot);
        }
        factory.board.rows.push(newRow);
      // for(var j = 0; j < factory.boardMax; j++){
      //   dot = {};
      //   dot.hasDot = true;
      //   dot.xPos = factory.boardMax;
      //   dot.yPos = j;
      //   dot.color = factory.randomColorGenerator();
      //   newRow.dots.push(dot);
      // }
    //

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
    factory.dotDrop = function(dot) {
      for(var i = factory.dotMin; i < factory.dotMax + 1; i++) {
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
          }
        }
      }
    }


  return factory;
});
