'use strict';
/*jshint node:true, expr:true, mocha:true*/

var expect = require('chai').expect;

var fit = require('../fit.js');

describe('fit', function() {

    describe('Given an ideal linear data set with slope=1 and y-intercept=0', function() {
       var data = [
           {x: 0, y:0},
           {x: 1, y:1},
           {x: 2, y:2},
           {x: 3, y:3}
       ];

       var result;

       before(function() {
           result = fit(data);
           console.log(JSON.stringify(result));
       });

        it('should return the expected coefficients', function() {
           expect(result.A).to.be.eql(0);
           expect(result.B).to.be.eql(1);
        });

        it('should have infinitesimally small uncertainties', function() {
           expect(result.dA).to.be.eql(0);
           expect(result.dB).to.be.eql(0);
        });

        it('should have a correlation coefficient rr=1', function() {
            expect(result.rr).to.be.eql(1);      
        });
    });
});

