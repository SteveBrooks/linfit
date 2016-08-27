'use strict';
/*jshint node:true, expr:true, mocha:true*/

var expect = require('chai').expect;

var fit = require('../lib/fit.js');

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

    describe('Given a linear data set', function() {
        var data = [
            {x:0, y:0.1},
            {x:1, y:0.9},
            {x:2, y:2.2},
            {x:3, y:3.2},
            {x:4, y:3.9}
        ];

        var result;

        before(function() {
            result = fit(data);
        });

        it('should return the expected coefficients', function() {
            expect(result.A).to.be.eql(0.0800000000000003);
            expect(result.B).to.be.eql(0.9899999999999999);
        });

        it('should have the expected standard errors', function() {
            expect(result.dA).to.be.eql(0.1425949975747162);
            expect(result.dB).to.be.eql(0.0336099632494537);
        });

        it('should have the expected correlation coefficent', function() {
            expect(result.rr).to.be.eql(0.9967320261437909);
        });
    });

    describe('Given an invalid data set with less than two points', function() {
        var data = [{x:1, y:1}];
        it('should throw for ' + JSON.stringify(data), function() {
            expect(function(){
                fit(data);
            }).to.throw(/data array contains less than two elements/);
        });
    });

    describe('Given an invalid data set that is not an array', function() {
        var testSet = [null, undefined, 3.14, 'a', 42, {} ];
        testSet.forEach(function(data){
            it('should throw for ' + JSON.stringify(data), function() {
                expect(function(){
                    fit(data);
                }).to.throw(/data is not an array/);
            });
        });
    });

    describe('Given an invalid data set in which the item at index 0 is not an object', function() {
        var testSet = [null, undefined, 3.14, 'a', 42, [] ];
        testSet.forEach(function(test){
            var data = [test, {x:0, y:0}];
            it('should throw for ' + JSON.stringify(test), function() {
                expect(function(){
                    fit(data);
                }).to.throw(/element at index 0 is not an object/);
            });
        });
    });

    describe('Given an invalid data set with missing x data at index 1', function() {
        var data = [{x:1, y:1},{y:1},{x:1, y:1}];
        it('should throw for ' + JSON.stringify(data), function() {
            expect(function(){
                fit(data);
            }).to.throw(/element at index 1 has no x property/);
        });
    });

    describe('Given an invalid data set with invalid x data at index 1', function() {
        var testSet = [null, undefined, 'a', {}, []];
        testSet.forEach(function(test){
            var data = [{x:1, y:1},{x:test, y:1},{x:1, y:1}];
            it('should throw for ' + JSON.stringify(data), function() {
                expect(function(){
                    fit(data);
                }).to.throw(/element at index 1 has non-numeric x property/);
            });
        });
    });

    describe('Given an invalid data set with missing y data at index 0', function() {
        var data = [{x:1},{x:1, y:1},{x:1, y:1}];
        it('should throw for ' + JSON.stringify(data), function() {
            expect(function(){
                fit(data);
            }).to.throw(/element at index 0 has no y property/);
        });
    });

    describe('Given an invalid data set with invalid y data at index 2', function() {
        var testSet = [null, undefined, 'a', {}, []];
        testSet.forEach(function(test){
            var data = [{x:1, y:1},{x:1, y:1},{x:1, y:test}];
            it('should throw for ' + JSON.stringify(test), function() {
                expect(function(){
                    fit(data);
                }).to.throw(/element at index 2 has non-numeric y property/);
            });
        });
    });
});

