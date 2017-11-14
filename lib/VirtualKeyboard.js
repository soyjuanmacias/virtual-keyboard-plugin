'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Virtual Keyboard for web app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _azertyMapping = require('./azertyMapping');

var _azertyMapping2 = _interopRequireDefault(_azertyMapping);

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
  function VirtualKeyboard(options) {
    _classCallCheck(this, VirtualKeyboard);

    this.options = options || {};
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
   * Return the reference of the current input Html element to whitch
   *  the virtual keyboard is pointing
   * @return {HTMLElement}
   * @memberof VirtualKeyboard
   */


  _createClass(VirtualKeyboard, [{
    key: 'getInputElement',
    value: function getInputElement() {
      return this.currentInputElement;
    }
    /**
     * Set the current input HTML of the  virtual keyboard
     * @param {HTMLElement} element
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'setInputElement',
    value: function setInputElement(element) {
      this.currentInputElement = element;
    }
    /**
     * Add an event listener when the Enter key is clicked
     * and set the behavior when this event is triggered
     * @param {HTMLElement} key
     * @memberof VirtualKeyboard
     */

  }, {
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
     * @return {HTMLElement[]}
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'constructKeys',
    value: function constructKeys(from, to) {
      var _this3 = this;

      var keys = [];

      var _loop = function _loop(i, j) {
        keys[i] = document.createElement('div');
        keys[i].classList.add('key');
        if (_azertyMapping2.default[j].class) {
          keys[i].classList.add(_azertyMapping2.default[j].class);
        }
        if (_azertyMapping2.default[j].action) {
          keys[i].setAttribute('data-action', _azertyMapping2.default[j].action);
        }
        if (_azertyMapping2.default[j].ascii) {
          keys[i].setAttribute('data-ascii', _azertyMapping2.default[j].ascii);
        }
        if (_azertyMapping2.default[j].key) {
          keys[i].innerHTML = _azertyMapping2.default[j].key;
        }

        if (_azertyMapping2.default[j].action === 'enter') {
          _this3.enterKeyEvent(keys[i]);
        }

        if (_azertyMapping2.default[j].action === 'backspace') {
          _this3.backSpaceKeyEvent(keys[i]);
        }

        if (!_azertyMapping2.default[j].action) {
          keys[i].addEventListener('click', function () {
            // var event = new KeyboardEvent("keypress",
            // { cancelable: true, bubbles: true, key: azertyMapping[j].key});
            // this.currentInputElement.dispatchEvent(event);
            _this3.currentInputElement.value = _this3.currentInputElement.value.slice(0, _this3.inputCaretPosition) + String.fromCharCode(_azertyMapping2.default[j].ascii) + _this3.currentInputElement.value.slice(_this3.inputCaretPosition);
            _this3.incrementCaretPosition();
          });
        }
      };

      for (var i = 0, j = from; i < to; i += 1, j += 1) {
        _loop(i, j);
      }
      return keys;
    }
    /**
     * Construct the virtual keyboard
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'constructKeyboard',
    value: function constructKeyboard() {
      var _rows$, _rows$2, _rows$3, _rows$4, _keyboardContainer;

      this.keyboardContainer = document.createElement('div');
      this.actionsContainer = document.createElement('div');

      this.keyboardContainer.classList.add('keyboard-container');
      this.actionsContainer.classList.add('actions-container');

      this.keyboardContainer.appendChild(this.actionsContainer);

      for (var i = 0; i < this.rows.length; i += 1) {
        this.rows[i] = document.createElement('div');
        this.rows[i].classList.add('row');
      }
      this.actionsContainer.innerHTML = '<span class="config-button">\n            <i class="fa fa-cog" aria-hidden="true"></i>\n            </span>\n            <span class="close-button">\n            <i class="fa fa-times" aria-hidden="true"></i>\n            </span>';

      var keysRow0 = this.constructKeys(0, FIRST_ROW_LENGHT);
      var keysRow1 = this.constructKeys(10, SECOND_ROW_LENGHT);
      var keysRow2 = this.constructKeys(20, THIRD_ROW_LENGHT);
      var keysRow3 = this.constructKeys(29, FOURTH_ROW_LENGHT);

      this.keys = keysRow0.concat(keysRow1, keysRow2, keysRow3);

      (_rows$ = this.rows[0]).append.apply(_rows$, _toConsumableArray(keysRow0));
      (_rows$2 = this.rows[1]).append.apply(_rows$2, _toConsumableArray(keysRow1));
      (_rows$3 = this.rows[2]).append.apply(_rows$3, _toConsumableArray(keysRow2));
      (_rows$4 = this.rows[3]).append.apply(_rows$4, _toConsumableArray(keysRow3));

      (_keyboardContainer = this.keyboardContainer).append.apply(_keyboardContainer, [this.actionsContainer].concat(_toConsumableArray(this.rows)));
      document.body.appendChild(this.keyboardContainer);

      this.registerHookListenner();
      console.log(this.keyboardContainer);
      console.log(this.keys);
    }

    /**
     * Set the position of the virtual keyboard
     * under the input HTML element with center alignment
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'setKeyboardPosition',
    value: function setKeyboardPosition() {
      var virtualKeyboardWidth = this.keyboardContainer.offsetWidth;
      var left = this.currentInputElement.offsetWidth / 2 - virtualKeyboardWidth / 2 + this.currentInputElement.getBoundingClientRect().left + document.documentElement.scrollLeft;
      var top = this.currentInputElement.getBoundingClientRect().top + this.currentInputElement.offsetHeight + 15 + document.documentElement.scrollTop;

      if (left < 20) {
        left = 20;
      }
      this.keyboardContainer.style.left = left + 'px';
      this.keyboardContainer.style.top = top + 'px';
    }
    /**
     * Add event listener for the virtual keyboard hook
     * @memberof VirtualKeyboard
     */

  }, {
    key: 'registerHookListenner',
    value: function registerHookListenner() {
      var _this4 = this;

      var hookLaunchers = document.querySelectorAll('.virtual-keyboard-hook');
      var targetedInput = void 0;
      if (hookLaunchers.length > 0) {
        [].concat(_toConsumableArray(hookLaunchers)).forEach(function (hookLauncher) {
          hookLauncher.addEventListener('click', function () {
            targetedInput = document.getElementById(hookLauncher.dataset.targetId);
            if (targetedInput) {
              if (!_this4.targetedInputsElements.has(targetedInput)) {
                targetedInput.addEventListener('click', function () {
                  _this4.inputCaretPosition = _this4.currentInputElement.selectionStart;
                  console.log('caret position', _this4.inputCaretPosition);
                });

                targetedInput.addEventListener('keypress', function () {
                  _this4.inputCaretPosition += 1;
                });
                _this4.inputCaretPosition = targetedInput.value.length;

                _this4.targetedInputsElements.add(targetedInput);
              }
              if (_this4.isvisible && _this4.currentInputElement && hookLauncher.dataset.targetId === _this4.currentInputElement.id) {
                _this4.isvisible = !_this4.isvisible;
                _this4.keyboardContainer.classList.remove('visible');
              } else {
                _this4.setInputElement(targetedInput);
                _this4.setKeyboardPosition();
                _this4.isvisible = true;
                _this4.keyboardContainer.classList.add('visible');
                _this4.currentInputElement.focus();
              }
            }
          });
        });
      }
    }
  }]);

  return VirtualKeyboard;
}();

exports.default = VirtualKeyboard;