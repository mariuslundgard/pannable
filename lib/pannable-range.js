'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPannableRange = createPannableRange;

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PannableRange = (function () {
  function PannableRange() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PannableRange);

    this.length = opts.length || 1;
    this.width = opts.width || 0;
    this.index = 0;
    this.offset = 0;
    this.startCursor = null;
    this.startOffset = null;
    this.cursor = null;
    this.velocity = 0;
    this.targetIndex = 0;
    this.isPanning = false;
    this.visibleItems = [];
    this.callbacks = [];
    this.render();
  }

  _createClass(PannableRange, [{
    key: 'prev',
    value: function prev() {
      this.stopMotion();
      this.targetIndex = (0, _helpers.constrainIndex)(this.targetIndex + 1, this.length);
      this.startMotion();
    }
  }, {
    key: 'next',
    value: function next() {
      this.stopMotion();
      this.targetIndex = (0, _helpers.constrainIndex)(this.targetIndex - 1, this.length);
      this.startMotion();
    }
  }, {
    key: 'panStart',
    value: function panStart(cursor) {
      this.stopMotion();
      this.isPanning = true;
      this.startOffset = this.offset;
      this.startCursor = cursor;
      this.cursor = cursor;
    }
  }, {
    key: 'panTo',
    value: function panTo(cursor) {
      if (this.isPanning) {
        this.offset = this.startOffset + cursor - this.startCursor;
        this.index = this.offset / this.width;
        this.velocity = cursor - this.cursor;
        this.cursor = cursor;
        this.render();
      }
    }
  }, {
    key: 'panStop',
    value: function panStop() {
      if (this.isPanning) {
        this.isPanning = false;
        this.startCursor = null;
        this.startOffset = null;
        this.cursor = null;

        var index = this.velocity < 0 ? Math.round(this.index - 1) : Math.round(this.index + 1);

        this.targetIndex = (0, _helpers.constrainIndex)(index, this.length);

        this.velocity = 0;

        this.startMotion();
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      var targetOffset = this.targetIndex * this.width;
      var diff = targetOffset - this.offset;
      var absDiff = Math.abs(diff);
      var absVelocity = Math.abs(this.velocity);

      if (absDiff > _helpers.MIN_POSITION || absVelocity > _helpers.MIN_POSITION) {
        // Move one step closer to the target position
        this.offset += diff / 11 + this.velocity;
        this.index = this.offset / this.width;
        this.velocity *= _helpers.DECAY;
        this.startMotion();
      } else {
        // Lock the target position
        this.index = this.targetIndex;
        this.offset = this.targetIndex * this.width;
        this.tickId = null;
      }

      this.render();
    }
  }, {
    key: 'startMotion',
    value: function startMotion() {
      this.tickId = (0, _helpers.requestFrame)(this.tick.bind(this));
    }
  }, {
    key: 'stopMotion',
    value: function stopMotion() {
      if (this.tickId) {
        (0, _helpers.cancelFrame)(this.tickId);

        this.tickId = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var nextIndex = Math.ceil(0 - this.index);
      var currIndex = nextIndex - 1;
      var nextVisibleItems = [];
      var translateDiff = [];

      if (currIndex >= 0 && currIndex < this.length) {
        nextVisibleItems.push(currIndex);
        translateDiff.push(['translate', currIndex, this.index + currIndex]);
      }

      if (nextIndex >= 0 && nextIndex < this.length) {
        nextVisibleItems.push(nextIndex);
        translateDiff.push(['translate', nextIndex, this.index + nextIndex]);
      }

      var hideDiff = (0, _helpers.arrayDiff)(this.visibleItems, nextVisibleItems).map(function (i) {
        return ['hide', i];
      });

      var showDiff = (0, _helpers.arrayDiff)(nextVisibleItems, this.visibleItems).map(function (i) {
        return ['show', i];
      });

      this.visibleItems = nextVisibleItems;

      this.callbacks.forEach(function (cb) {
        cb(hideDiff.concat(showDiff).concat(translateDiff));
      });
    }
  }, {
    key: 'onRender',
    value: function onRender(cb) {
      this.callbacks.push(cb);
    }
  }]);

  return PannableRange;
})();

function createPannableRange(opts) {
  return new PannableRange(opts);
}