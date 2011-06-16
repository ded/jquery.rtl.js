/*!
  * jQuery.rtl.js: A wrapper for jQuery's .css and .animation methods
  * copyright Dustin Diaz 2011 (@ded)
  * https://github.com/ded/jquery.rtl.js
  * License MIT
  */
!function ($) {
  var css = $.fn.css
      , animate = $.fn.animate
      , props = {
        'padding-left': 1
        , 'paddingLeft': 1
        , 'padding-right': 1
        , 'paddingRight': 1
        , 'margin-left': 1
        , 'marginLeft': 1
        , 'margin-right': 1
        , 'marginRight': 1
        , 'border-left-width': 1
        , 'borderLeftWidth': 1
        , 'border-right-width': 1
        , 'borderRightWidth': 1
        , 'left': 1
        , 'right': 1
      }
      , values = {
        'padding': quad
        , 'margin': quad
        , 'text-align': rtltr
        , 'textAlign': rtltr
        , 'float': rtltr
        , 'direction': direction
      }
      , trimReplace = /(^\s*|\s*$)/g
      , trim = String.prototype.trim ?
          function (s) {
            return s.trim();
          } :
          function (s) {
            return s.replace(trimReplace, '');
          }

  function getOptions(options, k, v) {
    for (k in options) {
      if (options.hasOwnProperty(k) && (props[k] || values[k])) {
        v = options[k]
        v = values[k] ? values[k](v) : v
        props[k] && delete options[k]
        props[k] && options[k.replace(/left|right/ig, function (m, r) {
          r = /left/i.exec(m) ? 'Right' : 'Left'
          return /^[a-z]+$/.test(k) ? r.toLowerCase() : r
        })] = v
      }
    }
    return options
  }

  function quad(v, m) {
    // 1px 2px 3px 4px => 1px 4px 3px 2px
    if (typeof v !== 'string') return v
    if ((m = trim(v).split(/\s+/)) && m.length == 4) {
      return [m[0], m[3], m[2], m[1]].join(' ')
    }
    return v
  }

  function direction(v) {
    return v == 'ltr' ? 'rtl' : v == 'rtl' ? 'ltr' : v
  }

  function rtltr(v) {
    if (v == 'left') return 'right'
    if (v == 'right') return 'left'
    return v
  }

  $.fn.css = function () {
    var args = [].slice.call(arguments, 0);
    return args.length == 1 ?
      typeof args[0] == 'string' ?
        css.call(this, args[0]) :
        css.call(this, getOptions(args[0])) :
      !function () {
        var o = {};
        o[args[0]] = args[1];
        return css.call(this, getOptions(o));
      }();
  };

  $.fn.animate = function () {
    var args = [].slice.call(arguments, 0);
    return animate.call(this, getOptions(args[0]), args[1], args[2], args[3]);
  };
}(jQuery);