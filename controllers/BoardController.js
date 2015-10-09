circlesSquares.controller('BoardCtrl', function BoardCtrl($scope, TimerFactory) {
  $scope.TimerFactory = TimerFactory;
  $scope.board = TimerFactory.board;
  var boardMin = TimerFactory.boardMin;
  var boardMax = TimerFactory.boardMax;
  var dotMin = TimerFactory.dotMin;
  var dotMax = TimerFactory.dotMax;
  $scope.score = TimerFactory.score;
  $scope.timerValue = TimerFactory.timerValue;
  $scope.clicked = false;
  TimerFactory.createBoard();
  console.log($scope.dot);
  TimerFactory.placeInitialDots($scope.board);
  $scope.clickedColor = "";
  $scope.hoverXPos;
  $scope.hoverYPos;
  $scope.counter = 0;



  // //board increase
  //  $scope.boardIncrease = function() {
  //     TimerFactory.boardMax++;
  //     console.log(TimerFactory.boardMax);
  //     TimerFactory.createBoard();
  //     TimerFactory.repopulate();
  // }
// //board increase
//    $scope.boardIncrease = function() {
//       TimerFactory.boardMax++;
//       $scope.repopulate();
//   }

// //checks for a dot above the empty spot and moves it down
//   $scope.dotDrop = function(dot) {
//     for(var i = dotMin; i < dotMax; i++) {
//       for(var j = dotMin; j < dotMax; j++) {
//         //if the current position is empty and the position above is not empty...
//         if (($scope.board.rows[i].dots[j].hasDot == false) && ($scope.board.rows[dotMin].dots[j].hasDot != false)) {
//           //sets the empty hasDot spot to true
//           $scope.board.rows[i].dots[j].hasDot = true;
//           //sets the spot to the color of the spot directly above.
//           $scope.board.rows[i].dots[j].color = $scope.board.rows[i-1].dots[j].color;
//           //sets the spot directly above to false making an empty spot.
//           $scope.board.rows[i-1].dots[j].hasDot = false;
//                 }
//       }
//     }
//   }

// //makes the magic happen Steven?
//   $scope.addClick = function(dot) {
//     $scope.clicked = true;
//     $scope.clickedColor = dot.color;
//     $scope.hoverXPos = dot.xPos;
//     $scope.hoverYPos = dot.yPos;
//     $scope.OGDot = dot;
//     $scope.counter++;
//     // $scope.repopulate(dot);
//   }
//   //mouse holddown functionality
//   $scope.mouseEnter = function(dot) {
//     if ($scope.clicked == true) {
//
//       //Prevents user from changing the colors of dots that are not in the line or square
//       if((dot.color == $scope.clickedColor) && (dot.hasDot)) {
//         if(Math.abs(dot.xPos - $scope.hoverXPos) + Math.abs(dot.yPos - $scope.hoverYPos) <= 1) {
//           dot.hasDot = false;
//           $scope.OGDot.hasDot = false;
//           $scope.hoverXPos = dot.xPos;
//           $scope.hoverYPos = dot.yPos;
//           $scope.counter++;
//
//           //Checking for squares - will delete all dots on the board of the same color when a square is made
//           if(($scope.counter>=4) && (Math.abs(dot.xPos - $scope.OGDot.xPos) + Math.abs(dot.yPos - $scope.OGDot.yPos) <= 1)) {
//
//             //plays square sound
//             var squarescore = document.getElementById("squareScore");
//             squarescore.play();
//
//             //deletes all dots of one color when a square is made
//             for(var i = dotMin; i < dotMax; i++) {
//               for(var j = dotMin; j < dotMax; j++) {
//                 if($scope.board.rows[i].dots[j].color == dot.color){
//                   $scope.board.rows[i].dots[j].hasDot = false;
//                   $scope.score++;
//                 }
//               }
//             }
//           } //end checksquare if
//
//         } else {
//           $scope.hoverXPos = 100;
//           $scope.hoverYPos = 100;
//         }
//       }
//     }
//   }
//   //mouse unclick, repopulate, plays sound, sets counter to 0
//   $scope.mouseUp = function(dot) {
//     $scope.clicked = false;
//     //check each position, drop the dots all down and repopulate the top row
//     for(var i = dotMin; i < dotMax; i++) {
//       for(var j = dotMin; j < dotMax; j++) {
//         $scope.dotDrop();
//         // $scope.delayDrop();
//         TimerFactory.repopulate();
//         // $scope.dropInterval();
//       }
//     }
//     if (($scope.counter > 1) && ($scope.counter < 4)){
//       var scoreSound = document.getElementById("scoreSound");
//       scoreSound.play();
//     }
//     if ($scope.counter >= 4) {
//       var scoreSound2 = document.getElementById("scoreSound2");
//       scoreSound2.play();
//     }
//
//     $scope.counter = 0;
//   }
//
//
//   $scope.playSoundtrack = function() {
//     var soundTrack = document.getElementById("soundTrack");
//     soundTrack.loop = true;
//     if (soundTrack.paused) {
//       soundTrack.play();
//     } else {
//       soundTrack.pause();
//     }
//   }


});
