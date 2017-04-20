var color = {};
color = module.exports;

/* RGB FUNCTIONS (rgb functions output rgb values) */

color.red = function(color) {
  if (color2hsl(color)) {
    var rgb = color2rgb(color);
    var rgbA = parseRGB(rgb);
    var rgbR = rgbA[0];
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return rgbR;
}
color.green = function(color) {
  if (color2hsl(color)) {
    var rgb = color2rgb(color);
    var rgbA = parseRGB(rgb);
    var rgbG = rgbA[1];
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return rgbG;
}
color.blue = function(color) {
  if (color2hsl(color)) {
    var rgb = color2rgb(color);
    var rgbA = parseRGB(rgb);
    var rgbB = rgbA[2];
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return rgbB;
}

/** rgb helper functions **/

function parseRGB (rgb) {
  //works with rgb and rgba values
  var rgbA = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if(rgbA) {
    return [rgbA[1],rgbA[2],rgbA[3]];
  } else if (rgbA = rgb.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0+\.?|0*\.\d+|0*1(\.0*)?)\s*\)$/i)) {
    var rgbA = rgb.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0+\.?|0*\.\d+|0*1(\.0*)?)\s*\)$/i);
    return [rgbA[1],rgbA[2],rgbA[3]];
  } else {
    return null;
  }
}

function color2rgb (c) {
  if (getColorType(c) === ('rgb')) {
    var rgb = color;
  }
  else if (getColorType(c) === ('hex')) {
    var rgb = color.hex2rgb(c);
  }
  else if (getColorType(c) === ('hsl')) {
    var rgb = color.hsl2rgb(c);
  } else {
    return null;
  }
  return rgb;
}

/* HEX FUNCTIONS (hex functions output hex values) */

/** hex helper functions **/

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
    return null;
  }
}

/* HSL FUNCTIONS */

color.hue = function(color) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var hslH = hslA[0];
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return hslH;
}
color.saturation = function(color) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var hslS = hslA[1];return hslS;
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return hslS;
}
color.lightness = function(color) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var hslL = hslA[2];
    return hslL;
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
}
color.adjustHue = function(color, degrees) {
 if (color2hsl(color)) {
   var hsl = color2hsl(color);
   var hslA = parseHSL(hsl);
   var h = parseFloat(hslA[0]);
   h = h + degrees;
   if (h < 0 || h > 360) { h = 0; }
   var s = (hslA[1] * 100) + "%";
   var l = (hslA[2] * 100) + "%";
   hsl = "hsl(" + h + "," + s + "," + l + ")";
 } else {
   return new Error(color + ' Is not a properly formatted color');
 }
 return hsl;
}
color.adjustSaturation = function(color, amount) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var s = hslA[1];
    s = s + (s * (amount/100));
    if (s >= 1) { s = 1 };
    var h = hslA[0];
    s = Math.round(s * 100) + "%";
    var l = (hslA[2] * 100) + "%";
    hsl = "hsl(" + h + "," + s + "," + l + ")";
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return hsl;
}
color.adjustLightness = function(color, amount) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var l = hslA[2];
    l = l + (l * (amount/100));
    if (l >= 1) { l = 1 };
    h = hslA[0];
    s = (hslA[1] * 100) + "%";
    l = Math.round(l * 100) + "%";
    hsl = "hsl(" + h + "," + s + "," + l + ")";
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return hsl;
}
color.grayscale = function(color) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var h = parseFloat(hslA[0]);
    var s = 0 + "%";
    var l = (hslA[2] * 100) + "%";
    hsl = "hsl(" + h + "," + s + "," + l + ")";
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return hsl;
}
color.complement = function(color) {
  if (color2hsl(color)) {
    var hsl = color2hsl(color);
    var hslA = parseHSL(hsl);
    var h = parseFloat(hslA[0]);
    if (h <= 180) {
      h = h + 180;
    } else {
      h = h - 180;
    }
    var s = (hslA[1] * 100) + "%";
    var l = (hslA[2] * 100) + "%";
    hsl = "hsl(" + h + "," + s + "," + l + ")";
  } else {
    return new Error(color + ' Is not a properly formatted color');
  }
  return hsl;
}

/** hsl helper functions **/

function parseHSL (hsl) {
  var hslA = hsl.match(/^hsl\s*\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);
  if (hslA) {
    var h = hslA[1];
    var s = hslA[2] * 1/100;
    var l = hslA[3] * 1/100;
    return [h,s,l];
  } else {
    return null;
  }
}
function color2hsl (c) {
  if (getColorType(c) === ('rgb')) {
    var hsl = color.rgb2hsl(c);
  }
  else if (getColorType(c) === ('hex')) {
    var hsl = color.hex2hsl(c);
  }
  else if (getColorType(c) === ('hsl')) {
    var hsl = c;
  } else {
    return null;
  }
  return hsl;
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
    h = Math.round(h);
    s = Math.round(s * 100) + "%";
    l = Math.round(l * 100) + "%";
    var hsl = "hsl(" + h + "," + s+ "," + l + ")";
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
    return rgb;
  }
  return null;
}
color.hex2hsl = function (hex) {
  var rgb = this.hex2rgb(hex);
  var hsl = this.rgb2hsl(rgb);
  return hsl;
}
color.hsl2hex = function (hsl) {
  var rgb = this.hsl2rgb(hsl);
  var hex = this.rgb2hex(rgb);
  return hex;
}

/** convert helper functions **/
function getColorType (c) {
  if (parseRGB(c)) {
    return 'rgb';
  }
  else if (parseHEX(c)) {
    return 'hex';
  }
  else if (parseHSL(c)) {
    return 'hsl';
  } else {
    return null;
  }
}
