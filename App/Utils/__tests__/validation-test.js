jest.dontMock('../validation');
describe('weight validation', function(){

  var Validation = require('../validation');

  it('can tell if a weight is greater than or equal to 100', function(){
    expect(Validation.weightIsGreaterThanMin(101)).toEqual(true);
  });

  it('can tell if a weight is less than 100', function(){
    expect(Validation.weightIsGreaterThanMin(99)).toEqual(false);
  });

  it('can tell if a weight is less than or equal to 550', function(){
    expect(Validation.weightIsLessThanMax(449)).toEqual(true);
  });

  it('can tell if a weight is greater than 550', function(){
    expect(Validation.weightIsLessThanMax(560)).toEqual(false);
  });

  it('can tell if a weight is within range', function(){
    expect(Validation.weightIsWithinRange(150)).toEqual(true);
  });

  it('it rejects a weight that is out of bounds (greater)', function(){
    expect(Validation.weightIsWithinRange(551)).toEqual(false);
  });

  it('it rejects a weight that is out of bounds (less than)', function(){
    expect(Validation.weightIsWithinRange(99)).toEqual(false);
  });
});

