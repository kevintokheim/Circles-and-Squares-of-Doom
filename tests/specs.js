describe('Dot', function(){
  it("creates a new dot" function(){
    var testDot = new Dot("Red", false);
    expect (testDot.color).to.equal("Red");
    expect (testDot.match).to.equal(false);
  });
});
