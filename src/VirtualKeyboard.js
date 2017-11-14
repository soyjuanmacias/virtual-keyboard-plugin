/*
    Virtual Keyboard for web app
*/

import azertyMapping from './azertyMapping';

const FIRST_ROW_LENGHT = 10;
const SECOND_ROW_LENGHT = 10;
const THIRD_ROW_LENGHT = 9;
const FOURTH_ROW_LENGHT = 6;

/**
 * Class of Virtual keyboad
 * @class VirtualKeyboard
 */
export default class VirtualKeyboard {
  /**
   * Creates an instance of VirtualKeyboard.
   * @param {any} options
   * @memberof VirtualKeyboard
   */
  constructor(options) {
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
  getInputElement() {
    return this.currentInputElement;
  }
  /**
   * Set the current input HTML of the  virtual keyboard
   * @param {HTMLElement} element
   * @memberof VirtualKeyboard
   */
  setInputElement(element) {
    this.currentInputElement = element;
  }
  /**
   * Add an event listener when the Enter key is clicked
   * and set the behavior when this event is triggered
   * @param {HTMLElement} key
   * @memberof VirtualKeyboard
   */
  enterKeyEvent(key) {
    key.addEventListener('click', () => {
      this.currentInputElement.value =
        `${this.currentInputElement.value.slice(0, this.inputCaretPosition)}\n${this.currentInputElement.value.slice(this.inputCaretPosition)}`;
      this.incrementCaretPosition();
    });
  }
  /**
   * Add an event listener when the BackSpace key is clicked
   * and set the behavior when this event is triggered
   * @param {HTMLElement} key
   * @memberof VirtualKeyboard
   */
  backSpaceKeyEvent(key) {
    key.addEventListener('click', () => {
      this.currentInputElement.value =
        this.currentInputElement.value.slice(0, this.inputCaretPosition - 1) +
        this.currentInputElement.value.slice(this.inputCaretPosition);
      this.decrementCaretPosition();
    });
  }
  /**
   * Increment the position of the caret
   * @memberof VirtualKeyboard
   */
  incrementCaretPosition() {
    this.inputCaretPosition += 1;
    this.currentInputElement.setSelectionRange(this.inputCaretPosition, this.inputCaretPosition);
    this.currentInputElement.focus();
  }
  /**
   * Decrement the position of the caret
   * @memberof VirtualKeyboard
   */
  decrementCaretPosition() {
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
  constructKeys(from, to) {
    const keys = [];
    for (let i = 0, j = from; i < to; i += 1, j += 1) {
      keys[i] = document.createElement('div');
      keys[i].classList.add('key');
      if (azertyMapping[j].class) {
        keys[i].classList.add(azertyMapping[j].class);
      }
      if (azertyMapping[j].action) {
        keys[i].setAttribute('data-action', azertyMapping[j].action);
      }
      if (azertyMapping[j].ascii) {
        keys[i].setAttribute('data-ascii', azertyMapping[j].ascii);
      }
      if (azertyMapping[j].key) {
        keys[i].innerHTML = azertyMapping[j].key;
      }

      if (azertyMapping[j].action === 'enter') {
        this.enterKeyEvent(keys[i]);
      }

      if (azertyMapping[j].action === 'backspace') {
        this.backSpaceKeyEvent(keys[i]);
      }

      if (!azertyMapping[j].action) {
        keys[i].addEventListener('click', () => {
          // var event = new KeyboardEvent("keypress",
          // { cancelable: true, bubbles: true, key: azertyMapping[j].key});
          // this.currentInputElement.dispatchEvent(event);
          this.currentInputElement.value =
            this.currentInputElement.value.slice(0, this.inputCaretPosition) +
            String.fromCharCode(azertyMapping[j].ascii) +
            this.currentInputElement.value.slice(this.inputCaretPosition);
          this.incrementCaretPosition();
        });
      }
    }
    return keys;
  }
  /**
   * Construct the virtual keyboard
   * @memberof VirtualKeyboard
   */
  constructKeyboard() {
    this.keyboardContainer = document.createElement('div');
    this.actionsContainer = document.createElement('div');

    this.keyboardContainer.classList.add('keyboard-container');
    this.actionsContainer.classList.add('actions-container');

    this.keyboardContainer.appendChild(this.actionsContainer);

    for (let i = 0; i < this.rows.length; i += 1) {
      this.rows[i] = document.createElement('div');
      this.rows[i].classList.add('row');
    }
    this.actionsContainer.innerHTML = `<span class="config-button">
            <i class="fa fa-cog" aria-hidden="true"></i>
            </span>
            <span class="close-button">
            <i class="fa fa-times" aria-hidden="true"></i>
            </span>`;

    const keysRow0 = this.constructKeys(0, FIRST_ROW_LENGHT);
    const keysRow1 = this.constructKeys(10, SECOND_ROW_LENGHT);
    const keysRow2 = this.constructKeys(20, THIRD_ROW_LENGHT);
    const keysRow3 = this.constructKeys(29, FOURTH_ROW_LENGHT);

    this.keys = keysRow0.concat(keysRow1, keysRow2, keysRow3);

    this.rows[0].append(...keysRow0);
    this.rows[1].append(...keysRow1);
    this.rows[2].append(...keysRow2);
    this.rows[3].append(...keysRow3);

    this.keyboardContainer.append(this.actionsContainer, ...this.rows);
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
  setKeyboardPosition() {
    const virtualKeyboardWidth = this.keyboardContainer.offsetWidth;
    let left = ((this.currentInputElement.offsetWidth / 2) - (virtualKeyboardWidth / 2)) +
      this.currentInputElement.getBoundingClientRect().left + document.documentElement.scrollLeft;
    const top = this.currentInputElement.getBoundingClientRect().top +
      this.currentInputElement.offsetHeight + 15 + document.documentElement.scrollTop;

    if (left < 20) {
      left = 20;
    }
    this.keyboardContainer.style.left = `${left}px`;
    this.keyboardContainer.style.top = `${top}px`;
  }
  /**
   * Add event listener for the virtual keyboard hook
   * @memberof VirtualKeyboard
   */
  registerHookListenner() {
    const hookLaunchers = document.querySelectorAll('.virtual-keyboard-hook');
    let targetedInput;
    if (hookLaunchers.length > 0) {
      [...hookLaunchers].forEach((hookLauncher) => {
        hookLauncher.addEventListener('click', () => {
          targetedInput = document.getElementById(hookLauncher.dataset.targetId);
          if (targetedInput) {
            if (!this.targetedInputsElements.has(targetedInput)) {
              targetedInput.addEventListener('click', () => {
                this.inputCaretPosition = this.currentInputElement.selectionStart;
                console.log('caret position', this.inputCaretPosition);
              });

              targetedInput.addEventListener('keypress', () => {
                this.inputCaretPosition += 1;
              });
              this.inputCaretPosition = targetedInput.value.length;

              this.targetedInputsElements.add(targetedInput);
            }
            if (this.isvisible && this.currentInputElement &&
              hookLauncher.dataset.targetId === this.currentInputElement.id) {
              this.isvisible = !this.isvisible;
              this.keyboardContainer.classList.remove('visible');
            } else {
              this.setInputElement(targetedInput);
              this.setKeyboardPosition();
              this.isvisible = true;
              this.keyboardContainer.classList.add('visible');
              this.currentInputElement.focus();
            }
          }
        });
      });
    }
  }
}
