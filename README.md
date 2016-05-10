Linear Curve Fit with Standard Error 
====================================

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

when linfit is calculated

```javascript
var fit = require('linfit');

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

|Value|Description|
|:---:|:---|
|A  |is the y-intercept|
|B  |is the slope|
|dA |is the standard error of the y-intercept|
|dB |is the standard error of the slope|
|rr |is the correlation coefficient|

or  

### y = (A ± dA)x + (B ± dB)
