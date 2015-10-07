function Dot(color, match){
  this.color = color;
  this.match = false;
}

var dotArray = [];
var gridArray = [];

Dot.prototype.dotGenerator = function(){
  var dot = new Dot(color, false);
  numberOfDots = dot * gridArray.length;
  // var dotArray = gridArray.length;
  dotArray.push(numberOfDots);
  console.log(dotArray);

  for(var i = 0; i < gridArray.length; i++){
    if (dotArray.length != gridArray.length){
      dot;
    }
  }
}

$("#timer").TimeCircles();
console.log("#timer");

// function dotLoop(){
//   for(var i = 0; i < gridArray.length; i++){
//     dotGenerator;
//
//   }
// }
