'use strict';

const { expect } = require('chai');

const fit = require('../lib/fit.js');

describe('fit', () => {
  describe('Given an ideal linear data set with slope=1 and y-intercept=0', () => {
    var data = [
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ];

    var result;

    before(() => {
      result = fit(data);
    });

    it('should return the expected coefficients', () => {
      expect(result.A).to.be.eql(0);
      expect(result.B).to.be.eql(1);
    });

    it('should have infinitesimally small uncertainties', () => {
      expect(result.dA).to.be.eql(0);
      expect(result.dB).to.be.eql(0);
    });

    it('should have a correlation coefficient rr=1', () => {
      expect(result.rr).to.be.eql(1);
    });
  });

  describe('Given a linear data set', () => {
    var data = [
      {x: 0, y: 0.1},
      {x: 1, y: 0.9},
      {x: 2, y: 2.2},
      {x: 3, y: 3.2},
      {x: 4, y: 3.9}
    ];

    var result;

    before(() => {
      result = fit(data);
    });

    it('should return the expected coefficients', () => {
      expect(result.A).to.be.eql(0.0800000000000003);
      expect(result.B).to.be.eql(0.9899999999999999);
    });

    it('should have the expected standard errors', () => {
      expect(result.dA).to.be.eql(0.10628403594282769);
      expect(result.dB).to.be.eql(0.0336099632494537);
    });

    it('should have the expected correlation coefficent', () => {
      expect(result.rr).to.be.eql(0.9967320261437909);
    });
  });

  describe('Given an invalid data set with less than two points', () => {
    var data = [{x: 1, y: 1}];
    it('should throw for ' + JSON.stringify(data), () => {
      expect(() => {
        fit(data);
      }).to.throw(/data array contains less than two elements/);
    });
  });

  describe('Given an invalid data set that is not an array', () => {
    var testSet = [null, undefined, 3.14, 'a', 42, {}];
    testSet.forEach((data) => {
      it('should throw for ' + JSON.stringify(data), () => {
        expect(() => {
          fit(data);
        }).to.throw(/data is not an array/);
      });
    });
  });

  describe('Given an invalid data set in which the item at index 0 is not an object', () => {
    var testSet = [null, undefined, 3.14, 'a', 42, []];
    testSet.forEach((test) => {
      var data = [test, {x: 0, y: 0}];
      it('should throw for ' + JSON.stringify(test), () => {
        expect(() =>{
          fit(data);
        }).to.throw(/element at index 0 is not an object/);
      });
    });
  });

  describe('Given an invalid data set with missing x data at index 1', () => {
    var data = [{x: 1, y: 1}, {y: 1}, {x: 1, y: 1}];
    it('should throw for ' + JSON.stringify(data), () => {
      expect(() =>{
        fit(data);
      }).to.throw(/element at index 1 has no x property/);
    });
  });

  describe('Given an invalid data set with invalid x data at index 1', () => {
    var testSet = [null, undefined, 'a', {}, []];
    testSet.forEach((test) => {
      var data = [{x: 1, y: 1}, {x: test, y: 1}, {x: 1, y: 1}];
      it('should throw for ' + JSON.stringify(data), () => {
        expect(() =>{
          fit(data);
        }).to.throw(/element at index 1 has non-numeric x property/);
      });
    });
  });

  describe('Given an invalid data set with missing y data at index 0', () => {
    var data = [{x: 1}, {x: 1, y: 1}, {x: 1, y: 1}];
    it('should throw for ' + JSON.stringify(data), () => {
      expect(() =>{
        fit(data);
      }).to.throw(/element at index 0 has no y property/);
    });
  });

  describe('Given an invalid data set with invalid y data at index 2', () => {
    var testSet = [null, undefined, 'a', {}, []];
    testSet.forEach((test) => {
      var data = [{x: 1, y: 1}, {x: 1, y: 1}, {x: 1, y: test}];
      it('should throw for ' + JSON.stringify(test), () => {
        expect(() =>{
          fit(data);
        }).to.throw(/element at index 2 has non-numeric y property/);
      });
    });
  });
});

