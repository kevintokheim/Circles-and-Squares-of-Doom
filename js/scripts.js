$(document).ready(function(){
  $(".timer").TimeCircles().stop();
  $("#timerStart").click(function(){
    $(".timer").TimeCircles().start();
  });

  var timerValue = function() {
    while(i <= 31) {
      $(".timerValue").text();
      console.log(timerValue);

    }
  }
});
