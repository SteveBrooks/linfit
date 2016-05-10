'use strict';
/*jshint node:true, expr:true*/

var fit = function fit(data) {
    var N;
    var sums;
    var means;
    var sigmaXX;
    var sigmaYY;
    var covarianceXY;
    var rr;
    var ss;
    var s;
    var A;
    var B;
    var dA;
    var dB;

    if(!Array.isArray(data)) {
        throw new Error('data is not an array.');
    }

    if(data.length < 2) {
        throw new Error('data array contains less than two elements');
    }

    N = data.length;
    sums = sumData();
    means = meanData();
    sigmaXX = sums.XX - (N * means.X * means.X);
    sigmaYY = sums.YY - (N * means.Y * means.Y);
    covarianceXY = sums.XY - (N * means.X * means.Y);

    // Correlation Coefficient
    rr = (sums.XY * sums.XY) / (sums.XX * sums.YY);

    // Slope and Intercept
    B = covarianceXY / sigmaXX;
    A = means.Y - B * means.X;

    // Standard Errors in Slope and Intercept
    ss = ((sums.YY - (sums.XY * sums.XY / sums.XX)) / (N - 2));
    s = Math.sqrt(Math.abs(ss));

    dA = s * Math.sqrt((1.0 / N) + (means.X * means.X / sigmaXX));
    dB = s / Math.sqrt(sums.XX);

    return {
       A: A,
       B: B,
       dA: dA,
       dB: dB,
       rr: rr,
    };

    function sumData() {
        var _sums = {
            X: 0,
            Y: 0,
            XX: 0,
            XY: 0,
            YY: 0
        };

        function validateElement(datum, index) {
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            if(!datum || (typeof datum !== 'object' || Array.isArray(datum)))  {
                throw new Error('element at index ' + index + ' is not an object');
            }
        
            if(!datum.hasOwnProperty('x')) {
                throw new Error('element at index ' + index + ' has no x property');
            }

            if(!datum.hasOwnProperty('y')) {
                throw new Error('element at index ' + index + ' has no y property');
            }

            if(!isNumeric(datum.x)) {
                throw new Error('element at index ' + index + ' has non-numeric x property');
            }

            if(!isNumeric(datum.y)) {
                throw new Error('element at index ' + index + ' has non-numeric y property');
            }
        }

        data.forEach(function(datum, index) {
            validateElement(datum, index);

            _sums.X +=  datum.x;
            _sums.Y +=  datum.y;
            _sums.XX += datum.x * datum.x;
            _sums.XY += datum.x * datum.y;
            _sums.YY += datum.y * datum.y;
        });

        return _sums;
    }

    function meanData() {
        return {
            X: sums.X / N,
            Y: sums.Y / N
        };
    }
};
module.exports = fit;
