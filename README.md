Linear Curve Fit with Standard Error 
====================================
A simple least-squares fit function which calculates linear coefficients with their standard errors and correlation coefficient (r<sup>2</sup>).

Given an array of x-y pairs:

```javascript
var data = [
    {x:0, y:0.1},
    {x:1, y:0.9},
    {x:2, y:2.2},
    {x:3, y:3.2},
    {x:4, y:3.9},
];
```

when linfit is evaluated

```javascript
var fit = require('linfit');
. . .
var result = fit(data);

```

it will return 

```javascript
result = {
   "A": 0.0800000000000003,
   "B": 0.9899999999999999,
   "dA": 0.1425949975747162,
   "dB": 0.0336099632494537,
   "rr": 0.9967320261437909
}
```

where 

|Result|Description|
|:---:|:---|
|A  |y-intercept|
|dA |standard error of the y-intercept|
|B  |slope|
|dB |standard error of the slope|
|rr |correlation coefficient|

and

### y = (A ± dA) + (B ± dB)x


