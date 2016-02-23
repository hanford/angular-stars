(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":3}],2:[function(require,module,exports){
// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = require("is-finite");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};

},{"is-finite":1}],3:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],4:[function(require,module,exports){
'use strict'

var EXPONENTIAL = /^(-?\d?\.?\d+)e([\+\-]\d)+/

module.exports = function parseExponential (exponential) {
  var matches = exponential.match(EXPONENTIAL)
  if (!matches) throw new Error('Invalid exponential')
  return matches.slice(1)
}

},{}],5:[function(require,module,exports){
'use strict'

var numberIsFinite = require('is-finite')
var parseExponential = require('parse-exponential')

module.exports = function precision (value) {
  if (!numberIsFinite(value)) {
    throw new Error('Value must be a finite number')
  }

  var exponential = parseExponential(value.toExponential())
  var coefficient = exponential[0]
  var exponent = parseInt(exponential[1], 10)
  var places = (coefficient.split('.')[1] || '').length
  return !places && exponent > 0
    ? 0
    : places + (-1 * exponent)
}

},{"is-finite":1,"parse-exponential":4}],6:[function(require,module,exports){
'use strict'

var numberIsFinite = require('is-finite')
var isInteger = require('is-integer')

module.exports = function toPrecision (value, places) {
  if (!numberIsFinite(value)) {
    throw new Error('Value must be a finite number')
  }
  if (!isInteger(places) || places < 0) {
    throw new Error('Precision must be a non-negative integer')
  }
  return parseFloat(value.toFixed(places))
}

},{"is-finite":1,"is-integer":2}],7:[function(require,module,exports){
'use strict'

var roundPrecision = require('round-precision')
var precision = require('precision')

exports = module.exports = round

var methods = {
  down: 'floor',
  up: 'ceil'
}

function round (value, multiple, direction) {
  multiple = multiple || 1
  if (direction) {
    if (!methods.hasOwnProperty(direction)) {
      throw new Error('invalid direction')
    }
    var method = methods[direction]
    return roundPrecision(Math[method](value / multiple) * multiple, precision(multiple))
  }
  var down = round(value, multiple, 'down')
  var up = round(value, multiple, 'up')
  if ((value - down) < (up - value)) {
    return down
  }
  return up
}

round.up = function roundUp (value, multiple) {
  return round(value, multiple, 'up')
}

round.down = function roundDown (value, multiple) {
  return round(value, multiple, 'down')
}

},{"precision":5,"round-precision":6}],8:[function(require,module,exports){
(function (global){
var round = require('round')

module.exports = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
  .module('angular-stars', [])
  .component('stars', {
    template: 
      '<div class="star-container">' +
        '<span ng-repeat="s in star.stars">' +
          '<div class="star-mask"></div>' +
        '</span>' +
      '</div>'
    ,
    bindings: {
      amount: '<',
      max: '<'
    },
    controllerAs: 'star',
    controller: Star
  })
  .app

function Star () {
  var state = {
    amount: round((this.amount || 0), 1),
    max: (this.max || 5),
    stars: []
  }

  for (var i = 0; i < state.max; i++) {
    if (state.amount > i) {
      state.stars.push(i)
    }
  }

  return state
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"round":7}]},{},[8]);
