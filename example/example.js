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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */
/**
 * Class representing a language bar used to display a message to a user based on
 * their browser's preferred language.
 */
var _class = function () {
  /**
   * Create a language bar
   * @param {Object} languageMap - options associated with each possible language
   * @param {string} [insertSelector=body] - selector for where to insert the bar
   * @param {string} [language=null] - override the browser's preferred language setting
   */
  function _class(languageMap) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$insertSelector = _ref.insertSelector,
        insertSelector = _ref$insertSelector === undefined ? 'body' : _ref$insertSelector,
        _ref$language = _ref.language,
        language = _ref$language === undefined ? null : _ref$language;

    _classCallCheck(this, _class);

    this.languageMap = languageMap;
    this.insertSelector = insertSelector;
    this.language = language;
  }

  /**
   * See if a browser preferred language matches a language option
   * @returns {Object | Boolean} specific language options or false if no language is found
   */


  _createClass(_class, [{
    key: 'findLanguage',
    value: function findLanguage() {
      var selectedLanguages = [this.language] || navigator.languages || [navigator.userLanguage];
      for (var i = 0; i < selectedLanguages.length; i += 1) {
        var selectedLanguage = selectedLanguages[i].toLowerCase();
        if (selectedLanguage in this.languageMap) {
          return this.languageMap[selectedLanguage];
        }
      }
      return false;
    }

    /**
     * Check to see the localization bar is needed. If it is create the HTML and add to page
     */

  }, {
    key: 'check',
    value: function check() {
      this.language = this.findLanguage();
      console.log(this.language);
      if (this.language) {
        this.addHtml();
      }
    }

    /**
     * Create all the HTML for the localization bar
     */

  }, {
    key: 'addHtml',
    value: function addHtml() {
      this.createWrapper();
      this.addCopy();
      this.createCloseBtn();
    }
  }, {
    key: 'createWrapper',
    value: function createWrapper() {
      var bar = document.createElement('div');
      bar.classList.add('localization-bar');
      if (this.insertSelector === 'body') {
        this.wrapper = document.body.insertBefore(bar, document.body.firstChild);
      } else {
        var insertionPoint = document.querySelector(this.insertSelector);
        this.wrapper = insertionPoint.insertBefore(bar, insertionPoint.firstChild);
      }
    }
  }, {
    key: 'createCloseBtn',
    value: function createCloseBtn() {
      var _this = this;

      var button = document.createElement('button');
      button.classList.add('localization-bar__close');
      button.innerText = 'X';
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        _this.close();
      });
      this.wrapper.appendChild(button);
    }
  }, {
    key: 'close',
    value: function close() {
      this.wrapper.style.marginTop = '-' + this.wrapper.offsetHeight + 'px';
    }
  }, {
    key: 'addCopy',
    value: function addCopy() {
      var languageCta = document.createElement('a');
      languageCta.classList.add('localization-bar__cta');
      languageCta.href = this.language.cta.url;
      languageCta.innerText = this.language.cta.text;
      this.wrapper.innerText = this.language.message + ' ';
      this.wrapper.appendChild(languageCta);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _localizationBar = __webpack_require__(0);

var _localizationBar2 = _interopRequireDefault(_localizationBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var languageMap = {
  es: {
    message: 'Ver el sitio en',
    cta: {
      text: 'español',
      url: '/es'
    }
  },
  fr: {
    message: 'Voir le site en',
    cta: {
      text: 'français',
      url: '/fr'
    }
  }
};
var localizationBar = new _localizationBar2.default(languageMap, {
  language: 'es'
});
localizationBar.check();

/***/ })
/******/ ]);