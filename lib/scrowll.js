(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("scrowll", [], factory);
	else if(typeof exports === 'object')
		exports["scrowll"] = factory();
	else
		root["scrowll"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*

Forked From https://github.com/GoogleChrome/sample-media-pwa/blob/master/src/client/scripts/helpers/lazy-load-images.js

*/



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(className, params, id) {
    _classCallCheck(this, _class);

    this.id = id ? id : 'scrowll-' + this.getRandomInt(0, 100);
    this.className = className;
    this.once = params.once;
    this.config = _extends({}, params, {
      rootMargin: '00px',
      threshold: 0.1
    });
  }

  _createClass(_class, [{
    key: 'getRandomInt',
    value: function getRandomInt(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this.els = document.querySelectorAll('.' + this.className);
      this.stylesheetInit();
      for (var i = 0; i < this.els.length; i++) {
        this.els[i].classList.add('scrowll-hidden');
      }
      if (!('IntersectionObserver' in window)) {
        this.scrollManager();
        window.onscroll = function (ev) {
          _this.scrollManager(ev);
        };
      } else {
        this.intersectionManager();
      }
    }
  }, {
    key: 'stylesheetInit',
    value: function stylesheetInit() {
      this.stylesheet = document.createElement('style');
      this.stylesheet.innerHTML = " .scrowll-hidden {opacity: 0; transform: translate(0px, 50px); transition: all .3s;} " + ".scrowll-reveal {opacity: 1; transform: translate(0px, 0px);}";
      document.body.appendChild(this.stylesheet);
    }
  }, {
    key: 'scrollManager',
    value: function scrollManager(ev) {
      for (var i = 0; i < this.els.length; i++) {
        var bottom_of_object = this.els[i].getBoundingClientRect().y + this.els[i].getBoundingClientRect().height + 60;
        var bottom_of_window = window.scrollY + window.innerHeight / 2;
        if (bottom_of_window > bottom_of_object) {
          this.els[i].classList.add('scrowll-reveal');
        } else {
          this.els[i].classList.remove('scrowll-reveal');
        }
      }
    }
  }, {
    key: 'intersectionManager',
    value: function intersectionManager() {
      var _this2 = this;

      this.observer = new IntersectionObserver(this.onIntersection.bind(this), this.config);
      this.els.forEach(function (el) {
        _this2.observer.observe(el);
      });
    }
  }, {
    key: 'onIntersection',
    value: function onIntersection(entries) {
      var that = this;
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0.1) {
          entry.target.classList.add('scrowll-reveal');
          that.once && that.observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove('scrowll-reveal');
        }
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=scrowll.js.map