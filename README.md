# color-adjust

[![Build Status](https://travis-ci.org/Qix-/color-convert.svg?branch=master)](https://travis-ci.org/Qix-/color-convert)

Javascript library for color conversion and channel manipulation of RGB, HEX and HSL

## Install

```console
$ npm install color-adjust
```

## Require, Construct, Get
```js
var Color = require('color');
var color = new Color('rgb(186, 218 ,85)');
color.complement();
color.rgb2hex();
```

## Functions
```js
* red()
* green()
* blue()
* hue()
* saturation()
* lightness()
* adjustHue(degrees)
* adjustSaturation(amount)
* adjustLightness(amount)
* grayscale()
* complement()
* rgb2hex(), hex2rgb(), rgb2hsl(), hsl2rgb(), hex2hsl(), hslhex()
```
