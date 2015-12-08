'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constrainIndex = constrainIndex;
exports.calcTargetIndex = calcTargetIndex;
exports.requestFrame = requestFrame;
exports.cancelFrame = cancelFrame;
exports.arrayDiff = arrayDiff;
var SECOND = exports.SECOND = 1000;
var FPS = exports.FPS = 60;
var TIMEOUT = exports.TIMEOUT = SECOND / FPS;
var MIN_POSITION = exports.MIN_POSITION = 0.25;
var DECAY = exports.DECAY = 0.9;
var EOA = exports.EOA = -1;

var isWindow = typeof window !== 'undefined';

function constrainIndex(index, length) {
  return Math.max(Math.min(Math.round(index), 0), 1 - length);
}

function calcTargetIndex(offset, velocity, width, length) {
  var absVelocity = Math.abs(velocity);
  var currOffset = offset;
  var currVelocity = velocity;

  while (absVelocity > MIN_POSITION) {
    absVelocity = Math.abs(currVelocity);
    currVelocity *= DECAY;
    currOffset += currVelocity;
  }

  return constrainIndex(currOffset / width, length);
}

function requestFrame(cb) {
  return isWindow ? window.requestAnimationFrame(cb) : setTimeout(cb, TIMEOUT);
}

function cancelFrame(frameId) {
  return isWindow ? window.cancelAnimationFrame(frameId) : clearTimeout(frameId);
}

function arrayDiff(a, b) {
  return a.filter(function (v) {
    return b.indexOf(v) === EOA;
  });
}