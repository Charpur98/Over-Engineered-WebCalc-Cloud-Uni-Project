var expect  = require('chai').expect;
var sub = require('../subtract');

it('Subtraction Test', function(done) {
        var x = 10;
        var y = 5;
        var a = x-y;
        expect(sub.subtract(x,y)).to.equal(a);
        done();
});

it('Subtraction Test MinusNumber', function(done) {
        var x = 1;
        var y = -2;
        var a = 3;
        expect(sub.subtract(x,y)).to.equal(a);
        done();
});

it('Subtraction Test NegNumber', function(done) {
        var x = 1;
        var y = 2;
        var a = -1;
        expect(sub.subtract(x,y)).to.equal(a);
        done();
});

it('Subtraction Test DecimalNumber', function(done) {
        var x = 3.2;
        var y = 2.2;
        var a = 1;
        expect(sub.subtract(x,y)).to.equal(a);
        done();
});
