$(document).ready(function(){
  $(".timer").TimeCircles().stop();
  $("#timerStart").click(function(){
    $(".timer").TimeCircles().start();
  });
});
