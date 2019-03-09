'use strict';

module.exports = (data) => {

  if (!Array.isArray(data)) {
    throw new Error('data is not an array.');
  }

  if (data.length < 2) {
    throw new Error('data array contains less than two elements');
  }

  const sumData = () => {
    var _sums = {
      X: 0,
      Y: 0,
      XX: 0,
      XY: 0,
      YY: 0
    };

    const validateElement = (datum, index) => {
      const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
      };

      if (!datum || (typeof datum !== 'object' || Array.isArray(datum))) {
        throw new Error('element at index ' + index + ' is not an object');
      }

      if (!datum.hasOwnProperty('x')) {
        throw new Error('element at index ' + index + ' has no x property');
      }

      if (!datum.hasOwnProperty('y')) {
        throw new Error('element at index ' + index + ' has no y property');
      }

      if (!isNumeric(datum.x)) {
        throw new Error('element at index ' + index + ' has non-numeric x property');
      }

      if (!isNumeric(datum.y)) {
        throw new Error('element at index ' + index + ' has non-numeric y property');
      }
    };

    data.forEach((datum, index) => {
      validateElement(datum, index);

      _sums.X += datum.x;
      _sums.Y += datum.y;
      _sums.XX += datum.x * datum.x;
      _sums.XY += datum.x * datum.y;
      _sums.YY += datum.y * datum.y;
    });

    return _sums;
  };

  const meanData = () => {
    return {
      X: sums.X / N,
      Y: sums.Y / N
    };
  };

  const N = data.length;
  const sums = sumData();
  const means = meanData();
  const sigmaXX = sums.XX - (N * means.X * means.X);
  const covarianceXY = sums.XY - (N * means.X * means.Y);

  // Correlation Coefficient
  const rr = (sums.XY * sums.XY) / (sums.XX * sums.YY);

  // Slope and Intercept
  const B = covarianceXY / sigmaXX;
  const A = means.Y - B * means.X;

  // Standard Errors in Slope and Intercept
  const ss = ((sums.YY - (sums.XY * sums.XY / sums.XX)) / (N - 2));
  const s = Math.sqrt(Math.abs(ss));

  const dA = s * Math.sqrt((1.0 / N) + (means.X * means.X / sums.XX));
  const dB = s / Math.sqrt(sums.XX);

  return {
    A: A,
    B: B,
    dA: dA,
    dB: dB,
    rr: rr,
  };
};
