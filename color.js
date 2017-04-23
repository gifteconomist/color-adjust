function Color (c) {
  this.color = c;
};

var formatError = this.color + ' Is not a properly formatted color';

Color.prototype = {

  /* RGB FUNCTIONS (rgb functions output rgb values) */
  red: function() {
    var color = this.color;
    if (this._color2rgb(color)) {
      var rgb = this._color2rgb(color);
      var rgbA = this._parseRGB(rgb);
      var rgbR = rgbA[0];
    } else {
      return new Error(formatError);
    }
    return rgbR;
  },
  green: function() {
    var color = this.color;
    if (this.color2hsl(color)) {
      var rgb = this._color2rgb(color);
      var rgbA = this._parseRGB(rgb);
      var rgbG = rgbA[1];
    } else {
      return new Error(formatError);
    }
    return rgbG;
  },
  blue: function() {
    var color = this.color;
    if (this.color2hsl(color)) {
      var rgb = this._color2rgb(color);
      var rgbA = this._parseRGB(rgb);
      var rgbB = rgbA[2];
    } else {
      return new Error(formatError);
    }
    return rgbB;
  },

  /* HSL FUNCTIONS */
  hue: function() {
    var color = this.color;
    if (this._color2hsl(color)) {
      var hsl = this._color2hsl(color);
      var hslA = this._parseHSL(hsl);
      var hslH = hslA[0];
    } else {
      return new Error(formatError);
    }
    return hslH;
  },
  saturation: function() {
    var color = this.color;
    if (this._color2hsl(color)) {
      var hsl = this._color2hsl(color);
      var hslA = this._parseHSL(hsl);
      var hslS = hslA[1];
    } else {
      return new Error(formatError);
    }
    return hslS;
  },
  lightness: function() {
    var color = this.color;
    if (this._color2hsl(color)) {
      var hsl = this._color2hsl(color);
      var hslA = this._parseHSL(hsl);
      var hslL = hslA[2];
      return hslL;
    } else {
      return new Error(formatError);
    }
  },

  adjustHue: function(degrees) {
    var color = this.color;
    if (this._color2hsl(color)) {
      var hsl = this._color2hsl(color);
      var hslA = this._parseHSL(hsl);
      var h = parseFloat(hslA[0]);
      degrees ?  h = h + degrees : h = h;
      (h < 0 || h > 360) ? h = 0 : h = h;
      var s = (hslA[1] * 100) + "%";
      var l = (hslA[2] * 100) + "%";
      hsl = "hsl(" + h + "," + s + "," + l + ")";
    } else {
      return new Error(formatError);
    }
    this.color = hsl;
    return this;
  },

  adjustSaturation: function(amount) {
   var color = this.color;
   if (this._color2hsl(color)) {
     var hsl = this._color2hsl(color);
     var hslA = this._parseHSL(hsl);
     var s = hslA[1];
     s = s + (s * (amount/100));
     if (s >= 1) { s = 1 };
     var h = hslA[0];
     s = Math.round(s * 100) + "%";
     var l = (hslA[2] * 100) + "%";
     hsl = "hsl(" + h + "," + s + "," + l + ")";
   } else {
     return new Error(formatError);
   }
   this.color = hsl;
   return this;
  },
  adjustLightness: function(amount) {
   var color = this.color;
   if (this._color2hsl(color)) {
     var hsl = this._color2hsl(color);
     var hslA = this._parseHSL(hsl);
     var l = hslA[2];
     l = l + (l * (amount/100));
     if (l >= 1) { l = 1 };
     h = hslA[0];
     s = (hslA[1] * 100) + "%";
     l = Math.round(l * 100) + "%";
     hsl = "hsl(" + h + "," + s + "," + l + ")";
   } else {
     return new Error(formatError);
   }
   this.color = hsl;
   return this;
  },
  grayscale: function() {
   var color = this.color;
   if (this._color2hsl(color)) {
     var hsl = this._color2hsl(color);
     var hslA = this._parseHSL(hsl);
     var h = parseFloat(hslA[0]);
     var s = 0 + "%";
     var l = (hslA[2] * 100) + "%";
     hsl = "hsl(" + h + "," + s + "," + l + ")";
   } else {
     return new Error(formatError);
   }
   this.color = hsl;
   return this;
  },
  complement: function() {
   var color = this.color;
   if (this._color2hsl(color)) {
     var hsl = this._color2hsl(color);
     var hslA = this._parseHSL(hsl);
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
     return new Error(formatError);
   }
   this.color = hsl;
   return this;
  },

  /* CONVERT FUNCTIONS */
  rgb2hex: function() {
  var rgb = this.color;
  if (this._parseRGB(rgb)) {
    var rgbA = this._parseRGB(rgb);
    var hexR = parseInt(rgbA[0]).toString(16);
    var hexG = parseInt(rgbA[1]).toString(16);
    var hexB = parseInt(rgbA[2]).toString(16);
    hexR = hexR.length == 1 ? '0' + hexR : hexR;
    hexG = hexG.length == 1 ? '0' + hexG : hexG;
    hexB = hexB.length == 1 ? '0' + hexB : hexB;
    var hex = '#' + hexR + hexG + hexB;
  } else {
    return new Error(formatError);
  }
  this.color = hex;
  return this;
  },

  hex2rgb: function () {
    var hex = this.color;
    if (this._parseHEX(hex)) {
      var result = this._parseHEX(hex);
      var r = parseInt(result[1], 16);
      var g = parseInt(result[2], 16);
      var b = parseInt(result[3], 16);
      var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    } else {
      return new Error(formatError);
    }
    this.color = rgb;
    return this;
  },
  rgb2hsl: function () {
    var rgb = this.color;
    if (this._parseRGB(rgb)) {
      var rgbA = this._parseRGB(rgb);
      var r = parseFloat(rgbA[0]);
      var g = parseFloat(rgbA[1]);
      var b = parseFloat(rgbA[2]);
      var max = Math.max(...rgbA);
      var min = Math.min(...rgbA);
      var d = (max - min)/255;
      var l = (max + min)/510;
      if (l > 0 && l < 1) {
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
    } else {
      return new Error(formatError);
    }
    this.color = hsl;
    return this;
  },
  hsl2rgb: function () {
    var hsl = this.color;
    if (this._parseHSL(hsl)) {
      var hslA = this._parseHSL(hsl);
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
    } else {
      return new Error(formatError);
    }
    this.color = rgb;
    return this;
  },
  hex2hsl: function () {
    var hex = this.color;
    if (this._parseHEX(hex)) {
      var rgb = this.hex2rgb(hex);
      var hsl = this.rgb2hsl(rgb);
    } else {
      return new Error(formatError);
    }
    this.color = hsl;
    return this;
  },
  hsl2hex: function () {
    var hsl = this.color;
    if (this._parseHSL(hsl)) {
      var rgb = this.hsl2rgb(hsl);
      var hex = this.rgb2hex(rgb);
    } else {
      return new Error(formatError);
    }
    this.color = hex;
    return this;
  },
  _getColorType (c) {
    if (this._parseRGB(c)) {
      return 'rgb';
    }
    else if (this._parseHEX(c)) {
      return 'hex';
    }
    else if (this._parseHSL(c)) {
      return 'hsl';
    } else {
      return null;
    }
  },

  /** rgb helper functions **/
  _parseRGB: function (rgb) {
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
  },
  _color2rgb: function (c) {
    if (this._getColorType(c) === ('rgb')) {
      var rgb = c;
    }
    else if (this._getColorType(c) === ('hex')) {
      var rgb = this.hex2rgb(c);
    }
    else if (this._getColorType(c) === ('hsl')) {
      var rgb = this.hsl2rgb(c);
    } else {
      return null;
    }
    return rgb;
  },

  /** hsl helper functions **/
  _parseHSL: function (hsl) {
    var hslA = hsl.match(/^hsl\s*\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);
    if (hslA) {
      var h = hslA[1];
      var s = hslA[2] * 1/100;
      var l = hslA[3] * 1/100;
      return [h,s,l];
    } else {
      return null;
    }
  },
  _color2hsl: function (c) {
    if (this._getColorType(c) === ('rgb')) {
      var hsl = this.rgb2hsl(c);
    }
    else if (this._getColorType(c) === ('hex')) {
      var hsl = this.hex2hsl(c);
    }
    else if (this._getColorType(c) === ('hsl')) {
      var hsl = c;
    } else {
      return null;
    }
    return hsl;
  },

  /** hex helper functions **/
  _parseHEX: function (hex) {
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
}

module.exports = Color;
