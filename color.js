var color = {};
color = module.exports;

/* RGB FUNCTIONS (rgb functions output rgb values) */

color.getR = function(color) {
  if (getColorType(color) === ('rgb')) {
    var rgb = color;
  }
  if (getColorType(color) === ('hex')) {
    var rgb = this.hex2rgb(color);
  }
  if (getColorType(color) === ('hsl')) {
    var rgb = this.hsl2rgb(color);
  }
  rgbA = parseRGB(rgb);
  rgbR = rgbA[0];
  console.log(rgbR);
  return rgbR;
}
color.getG = function(color) {
  if (getColorType(color) === ('rgb')) {
    var rgb = color;
  }
  if (getColorType(color) === ('hex')) {
    var rgb = this.hex2rgb(color);
  }
  if (getColorType(color) === ('hsl')) {
    var rgb = this.hsl2rgb(color);
  }
  rgbA = parseRGB(rgb);
  rgbG = rgbA[1];
  console.log(rgbG);
  return rgbG;
}
color.getB = function(color) {
  if (getColorType(color) === ('rgb')) {
    var rgb = color;
  }
  if (getColorType(color) === ('hex')) {
    var rgb = this.hex2rgb(color);
  }
  if (getColorType(color) === ('hsl')) {
    var rgb = this.hsl2rgb(color);
  }
  rgbA = parseRGB(rgb);
  rgbB = rgbA[2];
  console.log(rgbB);
  return rgbB;
}

/** rgb helper functions **/
function parseRGB (rgb) {
  //works with rgb and rgba values
  var rgbA = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if(rgbA) {
    console.log([rgbA[1],rgbA[2],rgbA[3]]);
    return [rgbA[1],rgbA[2],rgbA[3]];
  } else if (rgbA = rgb.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0+\.?|0*\.\d+|0*1(\.0*)?)\s*\)$/i)) {
    var rgbA = rgb.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0+\.?|0*\.\d+|0*1(\.0*)?)\s*\)$/i);
    console.log([rgbA[1],rgbA[2],rgbA[3]]);
    return [rgbA[1],rgbA[2],rgbA[3]];
  } else {
    console.log('not rgb or rgba');
    return null;
  }
}

/* HEX FUNCTIONS (hex functions output hex values) */

/** rgb helper functions **/
function parseHEX (hex) {
  //works for 3 and 6 string hexcodes
  var re = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(re, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(result) {
    return result;
  } else {
    console.log('not hex');
    return false;
  }
}

/* HSL FUNCTIONS */

color.getH = function(color) {
  if (getColorType(color) === ('rgb')) {
    var hsl = this.rgb2hsl(color);
  }
  if (getColorType(color) === ('hex')) {
    var hsl = this.hex2hsl(color);
  }
  if (getColorType(color) === ('hsl')) {
    var hsl = color;
  }
  hslA = parseHSL(hsl);
  hslH = hslA[0];
  console.log(hslH);
  return hslH;
}
color.getS = function(color) {
  if (getColorType(color) === ('rgb')) {
    var hsl = this.rgb2hsl(color);
  }
  if (getColorType(color) === ('hex')) {
    var hsl = this.hex2hsl(color);
  }
  if (getColorType(color) === ('hsl')) {
    var hsl = color;
  }
  hslA = parseHSL(hsl);
  hslS = hslA[1];
  console.log(hslS);
  return hslS;
}
color.getL = function(color) {
  if (getColorType(color) === ('rgb')) {
    var hsl = this.rgb2hsl(color);
  }
  if (getColorType(color) === ('hex')) {
    var hsl = this.hex2hsl(color);
  }
  if (getColorType(color) === ('hsl')) {
    var hsl = color;
  }
  hslA = parseHSL(hsl);
  hslL = hslA[2];
  console.log(hslL);
  return hslL;
}

/** hsl helper functions **/
function parseHSL (hsl) {
  var hslA = hsl.match(/^hsl\s*\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);
  if (hslA) {
    var h = hslA[1];
    var s = hslA[2] * 1/100;
    var l = hslA[3] * 1/100;
    console.log(h,s,l);
    return [h,s,l];
  } else {
    console.log('not hsl');
    return null;
  }
}

/* CONVERT FUNCTIONS */

color.rgb2hex = function (rgb) {
  if (parseRGB(rgb)) {
    var rgbA = parseRGB(rgb);
    var hexR = parseInt(rgbA[0]).toString(16);
    var hexG = parseInt(rgbA[1]).toString(16);
    var hexB = parseInt(rgbA[2]).toString(16);
    hexR = hexR.length == 1 ? '0' + hexR: hexR;
    hexG = hexG.length == 1 ? '0' + hexG: hexG;
    hexB = hexB.length == 1 ? '0' + hexB: hexB;
    var hex = '#' + hexR + hexG + hexB;
    console.log(hex);
    return hex;
  } else {
    return null;
  }
}
color.hex2rgb = function (hex) {
  if (parseHEX(hex)) {
    var result = parseHEX(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(rgb);
    return rgb;
  } else {
  return null;
  }
}
color.rgb2hsl = function (rgb) {
  if (parseRGB(rgb)) {
    var rgbA = parseRGB(rgb);
    var r = parseFloat(rgbA[0]);
    var g = parseFloat(rgbA[1]);
    var b = parseFloat(rgbA[2]);
    var max = Math.max(...rgbA);
    var min = Math.min(...rgbA);
    var d = (max - min)/255;
    var l = (max + min)/510;
    if (l > 0) {
      var s = d/(1 - Math.abs(2*l-1));
    } else {
      var s = 0;
    }
    if (g >= b) {
      var h = Math.acos((r - .5*g - .5*b) / Math.sqrt(r*r + g*g + b*b - r*g - r*b - g*b)) * (180/Math.PI);

    } else {
      var h = 360 - Math.acos((r - .5*g - .5*b) / Math.sqrt(r*r + g*g + b*b - r*g - r*b - g*b)) * (180/Math.PI);
    }
    if (r === g && g === b) {
      var h = 0;
    }
    s = Math.round(s * 100) + "%";
    l = Math.round(l * 100) + "%";
    var hsl = "hsl(" + h + "," + s+ "," + l + ")";
    console.log("hsl:", hsl);
    return hsl;
  }
  return null;
}
color.hsl2rgb = function (hsl) {
  if (parseHSL(hsl)) {
    var hslA = parseHSL(hsl);
    var h = hslA[0];
    var s = hslA[1];
    var l = hslA[2];
    var d = s*(1 - Math.abs(2*l-1));
    var m = 255*(l - .5*d);
    var x = d*(1 - Math.abs((h/60) % 2 - 1));
    var r, g, b;
    if (h < 60) {
      r = 255*d + m;
      g = 255*x + m;
      b = m;
    }
    else if (h >= 60 && h < 120) {
      r = 255*x + m;
      g = 255*d + m;
      b = m;
    }
    else if (h >= 120 && h < 180) {
      r = m;
      g = 255*d + m;
      b = 255*x + m;
    }
    else if (h >= 180 && h < 240) {
      r = m;
      g = 255*x + m;
      b = 255*d + m;
    }
    else if (h >= 240 && h < 300) {
      r = 255*x + m;
      g = m;
      b = 255*d + m;
    } else {
      r = 255*d + m;
      g = m;
      b = 255*x + m;
    }
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(rgb);
    return rgb;
  }
  return null;
}
color.hex2hsl = function (hex) {
  var rgb = this.hex2rgb(hex);
  var hsl = this.rgb2hsl(rgb);
  console.log(hsl);
  return hsl;
}
color.hsl2hex = function (hsl) {
  var rgb = this.hsl2rgb(hsl);
  var hex = this.rgb2hex(rgb);
  console.log(hex);
  return hex;
}

/** convert helper functions **/
function getColorType (color) {
  if (parseRGB(color)) {
    console.log('its rgb')
    return 'rgb';
  }
  if (parseHEX(color)) {
    console.log('its hex')
    return 'hex';
  }
  if (parseHSL(color)) {
    console.log('its hsl')
    return 'hsl';
  }
  console.log('not a color')
  return false;
}
