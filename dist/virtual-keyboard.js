(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Virtual Keyboard for web app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _azertyMapping = __webpack_require__(1);

var _azertyMapping2 = _interopRequireDefault(_azertyMapping);

var _qwertyMapping = __webpack_require__(2);

var _qwertyMapping2 = _interopRequireDefault(_qwertyMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FIRST_ROW_LENGHT = 10;
var SECOND_ROW_LENGHT = 10;
var THIRD_ROW_LENGHT = 9;
var FOURTH_ROW_LENGHT = 6;

/**
 * Class of Virtual keyboad
 * @class VirtualKeyboard
 */

var VirtualKeyboard = function () {
  /**
   * Creates an instance of VirtualKeyboard.
   * @param {any} options
   * @memberof VirtualKeyboard
   */
  function VirtualKeyboard() {
    _classCallCheck(this, VirtualKeyboard);

    this.currentInputElement = null;
    this.targetedInputsElements = new Set();
    this.isvisible = false;
    this.keyboardContainer = null;
    this.actionsContainer = null;
    this.inputCaretPosition = 0;
    this.rows = [this.row1, this.row2, this.row3, this.row4];
    this.keys = null;
  }
  /**
   * Add an event listener when the Enter key is clicked
   * and set the behavior when this event is triggered
   * @param {HTMLElement} key
   * @memberof VirtualKeyboard
   */


  _createClass(VirtualKeyboard, [{
    key: 'enterKeyEvent',
    value: function enterKeyEvent(key) {
      var _this = this;

      key.addEventListener('click', function () {
        _this.currentInputElement.value = _this.currentInputElement.value.slice(0, _this.inputCaretPosition) + '\n' + _this.currentInputElement.value.slice(_this.inputCaretPosition);
        _this.incrementCaretPosition();
      });
    }
    /**
     * Add an event listener when the BackSpace key is clicked
     * and set the behavior when this event is triggered
     * @param {HTMLElement} key
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'backSpaceKeyEvent',
    value: function backSpaceKeyEvent(key) {
      var _this2 = this;

      key.addEventListener('click', function () {
        _this2.currentInputElement.value = _this2.currentInputElement.value.slice(0, _this2.inputCaretPosition - 1) + _this2.currentInputElement.value.slice(_this2.inputCaretPosition);
        _this2.decrementCaretPosition();
      });
    }
    /**
     * Add an event listener when the upperCase key is clicked
     * and set the behavior when this event is triggered
     * @param {any} key
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'upperCaseKeyEvent',
    value: function upperCaseKeyEvent(key) {
      var _this3 = this;

      key.addEventListener('click', function () {
        _this3.setVisibleKeyboardRows(Array.of(_this3.upperkeysRow0, _this3.upperkeysRow1, _this3.upperkeysRow2, _this3.upperkeysRow3));
      });
    }
    /**
     * Add an event listener when the lowerCase key is clicked
     * and set the behavior when this event is triggered
     * @param {any} key
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'lowerCaseKeyEvent',
    value: function lowerCaseKeyEvent(key) {
      var _this4 = this;

      key.addEventListener('click', function () {
        _this4.setVisibleKeyboardRows(Array.of(_this4.lowkeysRow0, _this4.lowkeysRow1, _this4.lowkeysRow2, _this4.lowkeysRow3));
      });
    }
    /**
     * Add an event listener when the numerics key is clicked
     * and set the behavior when this event is triggered
     * @param {any} key
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'numericsKeyEvent',
    value: function numericsKeyEvent(key) {
      var _this5 = this;

      key.addEventListener('click', function () {
        _this5.setVisibleKeyboardRows(Array.of(_this5.numericKeysRow0, _this5.numericKeysRow1, _this5.numericKeysRow2, _this5.numericKeysRow3));
      });
    }
    /**
     * Add an event listener when the extrakey key is clicked
     * and set the behavior when this event is triggered
     * @param {any} key
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'extraKeyEvent',
    value: function extraKeyEvent(key) {
      var _this6 = this;

      key.addEventListener('click', function () {
        _this6.setVisibleKeyboardRows(Array.of(_this6.extraKeysRow0, _this6.extraKeysRow1, _this6.extraKeysRow2, _this6.numericKeysRow3));
      });
    }
    /**
     * Increment the position of the caret
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'incrementCaretPosition',
    value: function incrementCaretPosition() {
      this.inputCaretPosition += 1;
      this.currentInputElement.setSelectionRange(this.inputCaretPosition, this.inputCaretPosition);
      this.currentInputElement.focus();
    }
    /**
     * Decrement the position of the caret
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'decrementCaretPosition',
    value: function decrementCaretPosition() {
      this.inputCaretPosition -= 1;
      this.currentInputElement.setSelectionRange(this.inputCaretPosition, this.inputCaretPosition);
      this.currentInputElement.focus();
    }
    /**
     * Contruct an array of HTML elements representing keys
     * @param {number} from
     * @param {number} to
     * @param {any} mappingArray
     * @return {HTMLElement[]}
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'initKeys',
    value: function initKeys(from, to, mappingArray) {
      var _this7 = this;

      var keys = [];

      var _loop = function _loop(i, j) {
        keys[i] = document.createElement('div');
        keys[i].classList.add('key');
        if (mappingArray[j].class) {
          keys[i].classList.add(mappingArray[j].class);
        }
        if (mappingArray[j].action) {
          keys[i].setAttribute('data-action', mappingArray[j].action);
        }
        if (mappingArray[j].ascii) {
          keys[i].setAttribute('data-ascii', mappingArray[j].ascii);
        }
        if (mappingArray[j].key) {
          keys[i].innerHTML = mappingArray[j].key;
        }

        if (mappingArray[j].action === 'enter') {
          _this7.enterKeyEvent(keys[i]);
        }

        if (mappingArray[j].action === 'backspace') {
          _this7.backSpaceKeyEvent(keys[i]);
        }

        if (mappingArray[j].action === 'uppercase') {
          _this7.upperCaseKeyEvent(keys[i]);
        }

        if (mappingArray[j].action === 'lowercase') {
          _this7.lowerCaseKeyEvent(keys[i]);
        }

        if (mappingArray[j].action === 'numerics') {
          _this7.numericsKeyEvent(keys[i]);
        }

        if (mappingArray[j].action === 'extrakeys') {
          _this7.extraKeyEvent(keys[i]);
        }

        if (!mappingArray[j].action) {
          keys[i].addEventListener('click', function () {
            _this7.currentInputElement.value = _this7.currentInputElement.value.slice(0, _this7.inputCaretPosition) + String.fromCharCode(mappingArray[j].ascii) + _this7.currentInputElement.value.slice(_this7.inputCaretPosition);
            _this7.incrementCaretPosition();
          });
        }
      };

      for (var i = 0, j = from; i < to; i += 1, j += 1) {
        _loop(i, j);
      }
      return keys;
    }
    /**
     * Initialize the keboard container
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'initKeyboardContainer',
    value: function initKeyboardContainer() {
      this.keyboardContainer = document.createElement('div');
      this.keyboardContainer.classList.add('keyboard-container');
      this.keyboardContainer.appendChild(this.actionsContainer);
    }
    /**
     * Initialize the actions container inside the virtual keyboard
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'initKeyboardActionsContainer',
    value: function initKeyboardActionsContainer() {
      this.actionsContainer = document.createElement('div');
      this.actionsContainer.classList.add('actions-container');
      this.actionsContainer.innerHTML = '<span class="config-button">' + '<i class="fa fa-cog" aria-hidden="true"></i>' + '</span>' + '<span class="close-button">' + '<i class="fa fa-times" aria-hidden="true"></i>' + '</span>';
    }

    /**
     * Init all containers of the virtual keyboard
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'initAllContainers',
    value: function initAllContainers() {
      this.initKeyboardActionsContainer();
      this.initKeyboardContainer();
    }

    /**
     * Construct the virtual keyboard
     * @param {any} keysMapping
     * @param {any} actionsContainer
     * @param {any} keyboardContainer
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'constructKeyboard',
    value: function constructKeyboard(keysMapping, actionsContainer, keyboardContainer) {
      var _this8 = this;

      for (var i = 0; i < this.rows.length; i += 1) {
        this.rows[i] = document.createElement('div');
        this.rows[i].classList.add('row');
      }
      var closeButton = actionsContainer.querySelector('.close-button');
      closeButton.addEventListener('click', function () {
        _this8.closeKeyboard();
      });
      this.lowkeysRow0 = this.initKeys(0, FIRST_ROW_LENGHT, keysMapping);
      this.lowkeysRow1 = this.initKeys(10, SECOND_ROW_LENGHT, keysMapping);
      this.lowkeysRow2 = this.initKeys(20, THIRD_ROW_LENGHT, keysMapping);
      this.lowkeysRow3 = this.initKeys(29, FOURTH_ROW_LENGHT, keysMapping);

      this.upperkeysRow0 = this.initKeys(35, FIRST_ROW_LENGHT, keysMapping);
      this.upperkeysRow1 = this.initKeys(45, SECOND_ROW_LENGHT, keysMapping);
      this.upperkeysRow2 = this.initKeys(55, THIRD_ROW_LENGHT, keysMapping);
      this.upperkeysRow3 = this.initKeys(64, FOURTH_ROW_LENGHT, keysMapping);

      this.numericKeysRow0 = this.initKeys(70, FIRST_ROW_LENGHT, keysMapping);
      this.numericKeysRow1 = this.initKeys(80, SECOND_ROW_LENGHT, keysMapping);
      this.numericKeysRow2 = this.initKeys(90, THIRD_ROW_LENGHT, keysMapping);
      this.numericKeysRow3 = this.initKeys(99, FOURTH_ROW_LENGHT, keysMapping);

      this.extraKeysRow0 = this.initKeys(105, FIRST_ROW_LENGHT, keysMapping);
      this.extraKeysRow1 = this.initKeys(115, SECOND_ROW_LENGHT, keysMapping);
      this.extraKeysRow2 = this.initKeys(125, THIRD_ROW_LENGHT, keysMapping);

      this.keys = this.lowkeysRow0.concat(this.lowkeysRow1, this.lowkeysRow2, this.lowkeysRow3, this.upperkeysRow0, this.upperkeysRow1, this.upperkeysRow2, this.upperkeysRow3, this.numericKeysRow0, this.numericKeysRow1, this.numericKeysRow2, this.extraKeysRow0, this.extraKeysRow1, this.extraKeysRow2);

      this.setVisibleKeyboardRows(Array.of(this.lowkeysRow0, this.lowkeysRow1, this.lowkeysRow2, this.lowkeysRow3));

      keyboardContainer.append.apply(keyboardContainer, [actionsContainer].concat(_toConsumableArray(this.rows)));
      document.body.appendChild(keyboardContainer);
    }
    /**
     * Setup the visible keys for the user
     * @param {any} keysRow
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'setVisibleKeyboardRows',
    value: function setVisibleKeyboardRows(keysRow) {
      for (var i = 0; i < keysRow.length; i += 1) {
        var _rows$i;

        while (this.rows[i].firstChild) {
          this.rows[i].removeChild(this.rows[i].firstChild);
        }
        (_rows$i = this.rows[i]).append.apply(_rows$i, _toConsumableArray(keysRow[i]));
      }
    }
    /**
     * Set the position of the virtual keyboard
     * under the input HTML element with center alignment
     * @memberof VirtualKeyboard  
     */

  }, {
    key: 'setKeyboardPosition',
    value: function setKeyboardPosition(currentInputElement) {
      var inputCoord = currentInputElement.getBoundingClientRect();
      var virtualKeyboardWidth = this.keyboardContainer.offsetWidth;
      var left = currentInputElement.offsetWidth / 2 - virtualKeyboardWidth / 2 + inputCoord.left + document.documentElement.scrollLeft;
      var top = inputCoord.top + currentInputElement.offsetHeight + 15 + document.documentElement.scrollTop;

      if (left < 20) {
        left = 20;
      }
      this.keyboardContainer.style.left = left + 'px';
      this.keyboardContainer.style.top = top + 'px';
    }
    /**
     * Initialize the virtual keyboard
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'launchVirtualKeyboard',
    value: function launchVirtualKeyboard() {
      var _this9 = this;

      var hookLaunchers = document.querySelectorAll('.virtual-keyboard-hook');
      if (hookLaunchers.length > 0) {
        [].concat(_toConsumableArray(hookLaunchers)).forEach(function (hookLauncher) {
          hookLauncher.addEventListener('click', _this9.handleClickOnVirtualKeyboardHook.bind(_this9, hookLauncher));
        });
      }
    }
    /**
     * Handle the click event on the virtual keyboard hook
     * @param {any} hookLauncher
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'handleClickOnVirtualKeyboardHook',
    value: function handleClickOnVirtualKeyboardHook(hookLauncher) {
      var _this10 = this;

      var targetedInput = document.getElementById(hookLauncher.dataset.targetId);
      var mapping = hookLauncher.dataset.keyboardMapping;
      if (targetedInput && mapping) {
        this.currentInputElement = targetedInput;
        if (!this.targetedInputsElements.has(targetedInput)) {
          if (this.keyboardContainer) {
            this.keyboardContainer.parentNode.removeChild(this.keyboardContainer);
          }
          this.initAllContainers();
          if (mapping === 'qwerty') {
            this.constructKeyboard(_qwertyMapping2.default, this.actionsContainer, this.keyboardContainer);
          } else {
            this.constructKeyboard(_azertyMapping2.default, this.actionsContainer, this.keyboardContainer);
          }
          targetedInput.addEventListener('click', function () {
            _this10.inputCaretPosition = _this10.currentInputElement.selectionStart;
          });

          targetedInput.addEventListener('keydown', function () {
            _this10.inputCaretPosition = _this10.currentInputElement.selectionStart;
          });

          this.inputCaretPosition = targetedInput.value.length;
          this.targetedInputsElements.add(targetedInput);
        }
        this.currentInputElement = targetedInput;
        this.setKeyboardPosition(this.currentInputElement);
        this.isvisible = true;
        this.keyboardContainer.classList.add('visible');
        this.currentInputElement.focus();
      }
    }
    /**
     * Close the virtual keyboard
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'closeKeyboard',
    value: function closeKeyboard() {
      this.isvisible = false;
      this.keyboardContainer.classList.remove('visible');
    }
  }]);

  return VirtualKeyboard;
}();

exports.default = VirtualKeyboard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var azertyMapping = [
///// LOWCASE KEYS
{ key: 'a', ascii: '97' }, { key: 'z', ascii: '122' }, { key: 'e', ascii: '101' }, { key: 'r', ascii: '114' }, { key: 't', ascii: '116' }, { key: 'y', ascii: '121' }, { key: 'u', ascii: '117' }, { key: 'i', ascii: '105' }, { key: 'o', ascii: '111' }, { key: 'p', ascii: '112' }, { key: 'q', ascii: '113' }, { key: 's', ascii: '115' }, { key: 'd', ascii: '100' }, { key: 'f', ascii: '102' }, { key: 'g', ascii: '103' }, { key: 'h', ascii: '104' }, { key: 'j', ascii: '106' }, { key: 'k', ascii: '107' }, { key: 'l', ascii: '108' }, { key: 'm', ascii: '109' }, { key: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', action: 'uppercase' }, { key: 'x', ascii: '120' }, { key: 'w', ascii: '119' }, { key: 'c', ascii: '99' }, { key: 'v', ascii: '118' }, { key: 'b', ascii: '98' }, { key: 'n', ascii: '110' }, { key: '\'', ascii: '39' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}, { key: '#123?', action: 'numerics' }, { key: ',', ascii: '44' }, { key: '', action: 'emotes' }, { key: 'Space', ascii: '32', class: 'space-key' }, { key: '.', ascii: '46' }, { key: 'Enter', class: 'enter-key', action: 'enter' },
///// UPPERCASE KEYS
{ key: 'A', ascii: '65' }, { key: 'Z', ascii: '90' }, { key: 'E', ascii: '69' }, { key: 'R', ascii: '82' }, { key: 'T', ascii: '84' }, { key: 'Y', ascii: '89' }, { key: 'U', ascii: '85' }, { key: 'I', ascii: '73' }, { key: 'O', ascii: '79' }, { key: 'P', ascii: '80' }, { key: 'Q', ascii: '81' }, { key: 'S', ascii: '83' }, { key: 'D', ascii: '68' }, { key: 'F', ascii: '70' }, { key: 'G', ascii: '71' }, { key: 'H', ascii: '72' }, { key: 'J', ascii: '74' }, { key: 'K', ascii: '75' }, { key: 'L', ascii: '76' }, { key: 'M', ascii: '77' }, { key: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', action: 'lowercase' }, { key: 'X', ascii: '88' }, { key: 'W', ascii: '87' }, { key: 'C', ascii: '67' }, { key: 'V', ascii: '86' }, { key: 'B', ascii: '66' }, { key: 'N', ascii: '78' }, { key: '\'', ascii: '39' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}, { key: '#123?', action: 'numerics' }, { key: ',', ascii: '44' }, { key: '', action: 'emotes' }, { key: 'Space', ascii: '32', class: 'space-key' }, { key: '.', ascii: '46' }, { key: 'Enter', class: 'enter-key', action: 'enter' },
////// NUMERIC AND EXTRA KEYS
{ key: '1', ascii: '49' }, { key: '2', ascii: '50' }, { key: '3', ascii: '51' }, { key: '4', ascii: '52' }, { key: '5', ascii: '53' }, { key: '6', ascii: '54' }, { key: '7', ascii: '55' }, { key: '8', ascii: '56' }, { key: '9', ascii: '57' }, { key: '0', ascii: '48' }, { key: '@', ascii: '64' }, { key: '#', ascii: '35' }, { key: '€', ascii: '8364' }, { key: '_', ascii: '95' }, { key: '&', ascii: '38' }, { key: '-', ascii: '45' }, { key: '+', ascii: '43' }, { key: '(', ascii: '40' }, { key: ')', ascii: '41' }, { key: '/', ascii: '47' }, { key: '=\\<', action: 'extrakeys' }, { key: '*', ascii: '42' }, { key: '"', ascii: '34' }, { key: '\'', ascii: '44' }, { key: ':', ascii: '58' }, { key: ';', ascii: '59' }, { key: '!', ascii: '33' }, { key: '?', ascii: '63' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}, { key: 'ABC', action: 'lowercase' }, { key: ',', ascii: '44' }, { key: '', action: 'emotes' }, { key: 'Space', ascii: '32', class: 'space-key' }, { key: '.', ascii: '46' }, { key: 'Enter', class: 'enter-key', action: 'enter' },
///////EXTRA KEYS
{ key: '~', ascii: '126' }, { key: '`', ascii: '94' }, { key: '|', ascii: '124' }, { key: '·', ascii: '183' }, { key: '=', ascii: '61' }, { key: '^', ascii: '94' }, { key: '{', ascii: '123' }, { key: '}', ascii: '125' }, { key: '%', ascii: '37' }, { key: '\\', ascii: '92' }, { key: '[', ascii: '91' }, { key: ']', ascii: '93' }, { key: '€', ascii: '8364' }, { key: '_', ascii: '95' }, { key: '&', ascii: '38' }, { key: '-', ascii: '45' }, { key: '+', ascii: '43' }, { key: '(', ascii: '40' }, { key: ')', ascii: '41' }, { key: '/', ascii: '47' }, { key: '#123?', action: 'numerics' }, { key: '*', ascii: '42' }, { key: '"', ascii: '34' }, { key: '\'', ascii: '44' }, { key: ':', ascii: '58' }, { key: ';', ascii: '59' }, { key: '!', ascii: '33' }, { key: '?', ascii: '63' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}];

exports.default = azertyMapping;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var qwertyMapping = [
///// LOWCASE KEYS
{ key: 'q', ascii: '113' }, { key: 'w', ascii: '119' }, { key: 'e', ascii: '101' }, { key: 'r', ascii: '114' }, { key: 't', ascii: '116' }, { key: 'y', ascii: '121' }, { key: 'u', ascii: '117' }, { key: 'i', ascii: '105' }, { key: 'o', ascii: '111' }, { key: 'p', ascii: '112' }, { key: 'a', ascii: '97' }, { key: 's', ascii: '115' }, { key: 'd', ascii: '100' }, { key: 'f', ascii: '102' }, { key: 'g', ascii: '103' }, { key: 'h', ascii: '104' }, { key: 'j', ascii: '106' }, { key: 'k', ascii: '107' }, { key: 'l', ascii: '108' }, { key: '\'', ascii: '39' }, { key: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', action: 'uppercase' }, { key: 'z', ascii: '122' }, { key: 'x', ascii: '120' }, { key: 'c', ascii: '99' }, { key: 'v', ascii: '118' }, { key: 'b', ascii: '98' }, { key: 'n', ascii: '110' }, { key: 'm', ascii: '109' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}, { key: '#123?', action: 'numerics' }, { key: ',', ascii: '44' }, { key: '', action: 'emotes' }, { key: 'Space', ascii: '32', class: 'space-key' }, { key: '.', ascii: '46' }, { key: 'Enter', class: 'enter-key', action: 'enter' },
///// UPPERCASE KEYS
{ key: 'Q', ascii: '81' }, { key: 'W', ascii: '87' }, { key: 'E', ascii: '69' }, { key: 'R', ascii: '82' }, { key: 'T', ascii: '84' }, { key: 'Y', ascii: '89' }, { key: 'U', ascii: '85' }, { key: 'I', ascii: '73' }, { key: 'O', ascii: '79' }, { key: 'P', ascii: '80' }, { key: 'A', ascii: '65' }, { key: 'S', ascii: '83' }, { key: 'D', ascii: '68' }, { key: 'F', ascii: '70' }, { key: 'G', ascii: '71' }, { key: 'H', ascii: '72' }, { key: 'J', ascii: '74' }, { key: 'K', ascii: '75' }, { key: 'L', ascii: '76' }, { key: '\'', ascii: '39' }, { key: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', action: 'lowercase' }, { key: 'Z', ascii: '90' }, { key: 'X', ascii: '88' }, { key: 'C', ascii: '67' }, { key: 'V', ascii: '86' }, { key: 'B', ascii: '66' }, { key: 'N', ascii: '78' }, { key: 'M', ascii: '77' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}, { key: '#123?', action: 'numerics' }, { key: ',', ascii: '44' }, { key: '', action: 'emotes' }, { key: 'Space', ascii: '32', class: 'space-key' }, { key: '.', ascii: '46' }, { key: 'Enter', class: 'enter-key', action: 'enter' },
////// NUMERIC AND EXTRA KEYS
{ key: '1', ascii: '49' }, { key: '2', ascii: '50' }, { key: '3', ascii: '51' }, { key: '4', ascii: '52' }, { key: '5', ascii: '53' }, { key: '6', ascii: '54' }, { key: '7', ascii: '55' }, { key: '8', ascii: '56' }, { key: '9', ascii: '57' }, { key: '0', ascii: '48' }, { key: '@', ascii: '64' }, { key: '#', ascii: '35' }, { key: '€', ascii: '8364' }, { key: '_', ascii: '95' }, { key: '&', ascii: '38' }, { key: '-', ascii: '45' }, { key: '+', ascii: '43' }, { key: '(', ascii: '40' }, { key: ')', ascii: '41' }, { key: '/', ascii: '47' }, { key: '=\\<', action: 'extrakeys' }, { key: '*', ascii: '42' }, { key: '"', ascii: '34' }, { key: '\'', ascii: '44' }, { key: ':', ascii: '58' }, { key: ';', ascii: '59' }, { key: '!', ascii: '33' }, { key: '?', ascii: '63' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}, { key: 'ABC', action: 'lowercase' }, { key: ',', ascii: '44' }, { key: '', action: 'emotes' }, { key: 'Space', ascii: '32', class: 'space-key' }, { key: '.', ascii: '46' }, { key: 'Enter', class: 'enter-key', action: 'enter' },
///////EXTRA KEYS
{ key: '~', ascii: '126' }, { key: '`', ascii: '94' }, { key: '|', ascii: '124' }, { key: '·', ascii: '183' }, { key: '=', ascii: '61' }, { key: '^', ascii: '94' }, { key: '{', ascii: '123' }, { key: '}', ascii: '125' }, { key: '%', ascii: '37' }, { key: '\\', ascii: '92' }, { key: '[', ascii: '91' }, { key: ']', ascii: '93' }, { key: '€', ascii: '8364' }, { key: '_', ascii: '95' }, { key: '&', ascii: '38' }, { key: '-', ascii: '45' }, { key: '+', ascii: '43' }, { key: '(', ascii: '40' }, { key: ')', ascii: '41' }, { key: '/', ascii: '47' }, { key: '#123?', action: 'numerics' }, { key: '*', ascii: '42' }, { key: '"', ascii: '34' }, { key: '\'', ascii: '44' }, { key: ':', ascii: '58' }, { key: ';', ascii: '59' }, { key: '!', ascii: '33' }, { key: '?', ascii: '63' }, {
  key: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  ascii: '',
  action: 'backspace',
  class: 'backspace-key'
}];

exports.default = qwertyMapping;

/***/ })
/******/ ]);
});