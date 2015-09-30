describe('Dot', function(){
  it("creates a new dot", function(){
    var testDot = new Dot("Red", false);
    expect (testDot.color).to.equal("Red");
    expect (testDot.match).to.equal(false);
  });
});

describe('dotGenerator', function(){
  it("generates a certain number of dots", function(){
  var dot = new Dot("Red", false);
  var newGridArray = [1, 2, 3, 4];
  var dotArray = [];
  var numberOfDots = parseInt(dot * gridArray.length);
  dotArray.push(numberOfDots);
  console.log(dotArray.length);
  // var numberOfDots = newGridArray.length;

  expect (dotArray.length).to.equal(newGridArray.length);
  });
});
