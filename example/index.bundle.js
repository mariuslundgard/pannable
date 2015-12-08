/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; })(); /* eslint max-len: 0 */\n/* eslint complexity: 0 */\n/* eslint id-match: 0 */\n/* eslint lines-around-comment: 0 */\n/* eslint no-inline-comments: 0 */\n/* eslint no-magic-numbers: 0 */\n/* eslint no-ternary: 0 */\n/* eslint operator-linebreak: 0 */\n/* eslint padded-blocks: 0 */\n/* eslint space-before-keywords: 0 */\n/* eslint no-restricted-syntax: [2, \"WithStatement\"] */\n\nvar _pannableRange = __webpack_require__(1);\n\nfunction _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }\n\nvar carouselEl = document.querySelector('.carousel');\nvar indexEl = document.querySelector('.index');\nvar fpsEl = document.querySelector('.fps');\nvar fpsGraphEl = document.querySelector('.fps-graph');\nvar prevEl = document.querySelector('.prev-btn');\nvar nextEl = document.querySelector('.next-btn');\nvar fpsSample = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\nvar photos = ['http://www.ncpress.com/assets/winners-website/DivC/c%20gen%20news%20photo%202nd.jpg', 'http://bloximages.chicago2.vip.townnews.com/lee.net/content/tncms/assets/v3/editorial/c/6f/c6f291e8-e91a-11e4-a3a8-47373b62b823/5537e408b6f38.image.jpg', 'http://www.speos-photo.com/wp-content/uploads/2014/07/Devenir-Photojournaliste-Speos-02.jpg', 'http://4.bp.blogspot.com/-gxj3kpXUKTo/T30ENqfQz9I/AAAAAAAABsE/4S_82myZpPQ/s1600/2011-military-photography-award-winners-news-MC1-chad-d-runge-three-cheers-us-naval-academy-class-of-2011-graduation.jpg', 'https://cdn-www.eyeem.com/blog/wp-content/uploads/2010/10/rse_eddie-adams_saigon-execution_1968_vietnam_v3.jpg', 'http://caad.msstate.edu/wpmu/artnews/files/2013/03/Tim-and-Timothy.jpg', 'http://www.armymwr.com/images/news/0949-cannon.jpg', 'https://d2exqf27hvm6dn.cloudfront.net/wp-content/uploads/2013/10/KNS002.jpg', 'http://2.bp.blogspot.com/-ZaVfgIRFcfw/UXJa-JMP7SI/AAAAAAAAE_0/7nwgiCPCj-Q/s1600/My+Photography+Student.jpg', 'https://sgphotographer.files.wordpress.com/2012/05/sg_news_01.jpg', 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Defense.gov_News_Photo_111218-M-MM918-007_-_U.S._Marine_Corps_Sgt._Jeremy_Holsten_right_a_squad_leader_with_3rd_Platoon_Lima_Company_3rd_Battalion_3rd_Marine_Regiment_interacts_with.jpg'];\n\nvar lastTime = new Date().getTime();\n\nfunction getFps() {\n  requestAnimationFrame(function () {\n    var currTime = new Date().getTime();\n    var diffTime = currTime - lastTime;\n\n    fpsSample.shift();\n    fpsSample.push(Math.round(1000 / diffTime));\n\n    var fps = fpsSample.reduce(function (a, b) {\n      return a + b;\n    }) / fpsSample.length;\n\n    fpsEl.innerHTML = fps.toFixed(1);\n\n    lastTime = currTime;\n\n    var item = document.createElement('div');\n\n    item.style.height = Math.max(44 - 1000 / diffTime / 2, 0) + 'px';\n    fpsGraphEl.appendChild(item);\n\n    if (fpsGraphEl.childNodes.length > 100) {\n      fpsGraphEl.removeChild(fpsGraphEl.firstChild);\n    }\n\n    getFps();\n  });\n}\n\nphotos.forEach(function (photo) {\n  var paneEl = document.createElement('div');\n\n  paneEl.className = 'pane';\n  paneEl.style.backgroundImage = 'url(' + photo + ')';\n  carouselEl.appendChild(paneEl);\n});\n\nvar range = (0, _pannableRange.createPannableRange)({\n  length: photos.length,\n  width: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)\n});\n\nvar diffHandlers = {\n  hide: function hide(_ref) {\n    var _ref2 = _slicedToArray(_ref, 1);\n\n    var index = _ref2[0];\n\n    carouselEl.childNodes[index].style.display = 'none';\n  },\n  show: function show(_ref3) {\n    var _ref4 = _slicedToArray(_ref3, 1);\n\n    var index = _ref4[0];\n\n    carouselEl.childNodes[index].style.display = 'block';\n  },\n  translate: function translate(_ref5) {\n    var _ref6 = _slicedToArray(_ref5, 2);\n\n    var index = _ref6[0];\n    var offset = _ref6[1];\n\n    carouselEl.childNodes[index].style.opacity = offset + 1;\n    carouselEl.childNodes[index].style.transform = 'translate3d(0, ' + offset * 100 + '%, 0)';\n  }\n};\n\nrange.onRender(function (diff) {\n  indexEl.innerHTML = '' + Math.abs(0 - range.index).toFixed(3);\n\n  diff.forEach(function (_ref7) {\n    var _ref8 = _toArray(_ref7);\n\n    var type = _ref8[0];\n\n    var args = _ref8.slice(1);\n\n    diffHandlers[type](args);\n  });\n});\n\n// carouselEl.addEventListener('mousedown', (e) => {\ncarouselEl.addEventListener('touchstart', function (e) {\n  // const touchY = e.clientY\n  var touchY = e.touches[0].clientY; // e.clientY\n\n  e.stopPropagation();\n  e.preventDefault();\n\n  range.panStart(touchY);\n});\n\n// window.addEventListener('mousemove', (e) => {\nwindow.addEventListener('touchmove', function (e) {\n  if (range.isPanning) {\n    // const touchY = e.clientY\n    var touchY = e.touches[0].clientY; // e.clientY\n\n    e.stopPropagation();\n    e.preventDefault();\n\n    range.panTo(touchY);\n  }\n});\n\n// window.addEventListener('mouseup', (e) => {\nwindow.addEventListener('touchend', function (e) {\n  if (range.isPanning) {\n    e.stopPropagation();\n    e.preventDefault();\n\n    range.panStop();\n  }\n});\n\nwindow.range = range;\n\nprevEl.addEventListener('click', function () {\n  range.prev();\n});\n\nnextEl.addEventListener('click', function () {\n  range.next();\n});\n\ngetFps();\n\n/*****************\n ** WEBPACK FOOTER\n ** ./index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./index.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createPannableRange = createPannableRange;\n\nvar _helpers = __webpack_require__(2);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar PannableRange = (function () {\n  function PannableRange() {\n    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n\n    _classCallCheck(this, PannableRange);\n\n    this.length = opts.length || 1;\n    this.width = opts.width || 0;\n    this.index = 0;\n    this.offset = 0;\n    this.startCursor = null;\n    this.startOffset = null;\n    this.cursor = null;\n    this.velocity = 0;\n    this.targetIndex = 0;\n    this.isPanning = false;\n    this.visibleItems = [];\n    this.callbacks = [];\n    this.render();\n  }\n\n  _createClass(PannableRange, [{\n    key: 'prev',\n    value: function prev() {\n      this.stopMotion();\n      this.targetIndex = (0, _helpers.constrainIndex)(this.targetIndex + 1, this.length);\n      this.startMotion();\n    }\n  }, {\n    key: 'next',\n    value: function next() {\n      this.stopMotion();\n      this.targetIndex = (0, _helpers.constrainIndex)(this.targetIndex - 1, this.length);\n      this.startMotion();\n    }\n  }, {\n    key: 'panStart',\n    value: function panStart(cursor) {\n      this.stopMotion();\n      this.isPanning = true;\n      this.startOffset = this.offset;\n      this.startCursor = cursor;\n      this.cursor = cursor;\n    }\n  }, {\n    key: 'panTo',\n    value: function panTo(cursor) {\n      if (this.isPanning) {\n        this.offset = this.startOffset + cursor - this.startCursor;\n        this.index = this.offset / this.width;\n        this.velocity = cursor - this.cursor;\n        this.cursor = cursor;\n        this.render();\n      }\n    }\n  }, {\n    key: 'panStop',\n    value: function panStop() {\n      if (this.isPanning) {\n        this.isPanning = false;\n        this.startCursor = null;\n        this.startOffset = null;\n        this.cursor = null;\n\n        var absVelocity = Math.abs(this.velocity);\n\n        // Calculate target index based on the current position and velocity\n        if (absVelocity > 5 && absVelocity < 60) {\n          var index = this.velocity < 0 ? Math.round(this.index - 1) : Math.round(this.index + 1);\n\n          this.targetIndex = (0, _helpers.constrainIndex)(index, this.length);\n        } else {\n          this.targetIndex = (0, _helpers.calcTargetIndex)(this.offset, this.velocity, this.width, this.length);\n        }\n\n        this.startMotion();\n      }\n    }\n  }, {\n    key: 'tick',\n    value: function tick() {\n      var targetOffset = this.targetIndex * this.width;\n      var diff = targetOffset - this.offset;\n      var absDiff = Math.abs(diff);\n      var absVelocity = Math.abs(this.velocity);\n\n      if (absDiff > _helpers.MIN_POSITION || absVelocity > _helpers.MIN_POSITION) {\n        // Move one step closer to the target position\n        this.offset += diff / 11 + this.velocity;\n        this.index = this.offset / this.width;\n        this.velocity *= _helpers.DECAY;\n        this.startMotion();\n      } else {\n        // Lock the target position\n        this.index = this.targetIndex;\n        this.offset = this.targetIndex * this.width;\n        this.tickId = null;\n      }\n\n      this.render();\n    }\n  }, {\n    key: 'startMotion',\n    value: function startMotion() {\n      this.tickId = (0, _helpers.requestFrame)(this.tick.bind(this));\n    }\n  }, {\n    key: 'stopMotion',\n    value: function stopMotion() {\n      if (this.tickId) {\n        (0, _helpers.cancelFrame)(this.tickId);\n\n        this.tickId = null;\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var nextIndex = Math.ceil(0 - this.index);\n      var currIndex = nextIndex - 1;\n      var nextVisibleItems = [];\n      var translateDiff = [];\n\n      if (currIndex >= 0 && currIndex < this.length) {\n        nextVisibleItems.push(currIndex);\n        translateDiff.push(['translate', currIndex, this.index + currIndex]);\n      }\n\n      if (nextIndex >= 0 && nextIndex < this.length) {\n        nextVisibleItems.push(nextIndex);\n        translateDiff.push(['translate', nextIndex, this.index + nextIndex]);\n      }\n\n      var hideDiff = (0, _helpers.arrayDiff)(this.visibleItems, nextVisibleItems).map(function (i) {\n        return ['hide', i];\n      });\n\n      var showDiff = (0, _helpers.arrayDiff)(nextVisibleItems, this.visibleItems).map(function (i) {\n        return ['show', i];\n      });\n\n      this.visibleItems = nextVisibleItems;\n\n      this.callbacks.forEach(function (cb) {\n        cb(hideDiff.concat(showDiff).concat(translateDiff));\n      });\n    }\n  }, {\n    key: 'onRender',\n    value: function onRender(cb) {\n      this.callbacks.push(cb);\n    }\n  }]);\n\n  return PannableRange;\n})();\n\nfunction createPannableRange(opts) {\n  return new PannableRange(opts);\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ../src/pannable-range.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///../src/pannable-range.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.constrainIndex = constrainIndex;\nexports.calcTargetIndex = calcTargetIndex;\nexports.requestFrame = requestFrame;\nexports.cancelFrame = cancelFrame;\nexports.arrayDiff = arrayDiff;\nvar SECOND = exports.SECOND = 1000;\nvar FPS = exports.FPS = 60;\nvar TIMEOUT = exports.TIMEOUT = SECOND / FPS;\nvar MIN_POSITION = exports.MIN_POSITION = 0.25;\nvar DECAY = exports.DECAY = 0.9;\nvar EOA = exports.EOA = -1;\n\nvar isWindow = typeof window !== 'undefined';\n\nfunction constrainIndex(index, length) {\n  return Math.max(Math.min(Math.round(index), 0), 1 - length);\n}\n\nfunction calcTargetIndex(offset, velocity, width, length) {\n  var absVelocity = Math.abs(velocity);\n  var currOffset = offset;\n  var currVelocity = velocity;\n\n  while (absVelocity > MIN_POSITION) {\n    absVelocity = Math.abs(currVelocity);\n    currVelocity *= DECAY;\n    currOffset += currVelocity;\n  }\n\n  return constrainIndex(currOffset / width, length);\n}\n\nfunction requestFrame(cb) {\n  return isWindow ? window.requestAnimationFrame(cb) : setTimeout(cb, TIMEOUT);\n}\n\nfunction cancelFrame(frameId) {\n  return isWindow ? window.cancelAnimationFrame(frameId) : clearTimeout(frameId);\n}\n\nfunction arrayDiff(a, b) {\n  return a.filter(function (v) {\n    return b.indexOf(v) === EOA;\n  });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ../src/helpers.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///../src/helpers.js?");

/***/ }
/******/ ]);