circlesSquares.directive('timer', function() {
  return {
    link: function(scope, element) {
      $(".timer").TimeCircles();
    }
  };
});
