/*
    Virtual Keyboard for web app
*/

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
   * Add an event listener when the upperCase key is clicked
   * and set the behavior when this event is triggered
   * @param {any} key
   * @memberof VirtualKeyboard
   */
  upperCaseKeyEvent(key) {
    key.addEventListener('click', () => {
      this.setKeyboardRows(Array.of(this.upperkeysRow0, this.upperkeysRow1, this.upperkeysRow2, this.keysRow3));
    });
  }
  /**
   * Add an event listener when the lowerCase key is clicked
   * and set the behavior when this event is triggered
   * @param {any} key
   * @memberof VirtualKeyboard
   */
  lowerCaseKeyEvent(key) {
    key.addEventListener('click', () => {
      this.setKeyboardRows(Array.of(this.lowkeysRow0, this.lowkeysRow1, this.lowkeysRow2, this.keysRow3));
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
   * @param {any} mappingArray
   * @return {HTMLElement[]}
   * @memberof VirtualKeyboard
   */
  constructKeys(from, to, mappingArray) {
    const keys = [];
    for (let i = 0, j = from; i < to; i += 1, j += 1) {
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
        this.enterKeyEvent(keys[i]);
      }

      if (mappingArray[j].action === 'backspace') {
        this.backSpaceKeyEvent(keys[i]);
      }

      if (mappingArray[j].action === 'uppercase') {
        this.upperCaseKeyEvent(keys[i]);
      }

      if (mappingArray[j].action === 'lowercase') {
        this.lowerCaseKeyEvent(keys[i]);
      }

      if (!mappingArray[j].action) {
        keys[i].addEventListener('click', () => {
          // var event = new KeyboardEvent("keypress",
          // { cancelable: true, bubbles: true, key: mappingArray[j].key});
          // this.currentInputElement.dispatchEvent(event);
          this.currentInputElement.value =
            this.currentInputElement.value.slice(0, this.inputCaretPosition) +
            String.fromCharCode(mappingArray[j].ascii) +
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
  constructKeyboard(keysMapping) {
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
    const closeButton = this.actionsContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      this.closeKeyboard();
    });
    this.lowkeysRow0 = this.constructKeys(0, FIRST_ROW_LENGHT, keysMapping);
    this.lowkeysRow1 = this.constructKeys(10, SECOND_ROW_LENGHT, keysMapping);
    this.lowkeysRow2 = this.constructKeys(20, THIRD_ROW_LENGHT, keysMapping);

    this.upperkeysRow0 = this.constructKeys(29, FIRST_ROW_LENGHT, keysMapping);
    this.upperkeysRow1 = this.constructKeys(39, SECOND_ROW_LENGHT, keysMapping);
    this.upperkeysRow2 = this.constructKeys(49, THIRD_ROW_LENGHT, keysMapping);

    this.keysRow3 = this.constructKeys(58, FOURTH_ROW_LENGHT, keysMapping);

    this.keys = this.lowkeysRow0.concat(this.lowkeysRow1, this.lowkeysRow2,
      this.lowkeysRow3, this.upperkeysRow0, this.upperkeysRow1, this.upperkeysRow2, this.keysRow3);
    this.keysRow3 = this.constructKeys(58, FOURTH_ROW_LENGHT, keysMapping);
    this.setKeyboardRows(Array.of(this.lowkeysRow0,
      this.lowkeysRow1, this.lowkeysRow2, this.keysRow3));

    this.keyboardContainer.append(this.actionsContainer, ...this.rows);
    document.body.appendChild(this.keyboardContainer);

    this.registerHookListenner();
    // console.log(this.keyboardContainer);
    // console.log(this.keys);
  }
  /**
   * Setup the visible keys for the user
   * @param {any} keysRow
   * @memberof VirtualKeyboard
   */
  setKeyboardRows(keysRow) {
    for (let i = 0; i < keysRow.length; i += 1) {
      while (this.rows[i].firstChild) {
        this.rows[i].removeChild(this.rows[i].firstChild);
      }
      this.rows[i].append(...keysRow[i]);
    }
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
                // console.log('caret position', this.inputCaretPosition);
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
  /**
   * Close the virtual keyboard
   * @memberof VirtualKeyboard
   */
  closeKeyboard() {
    this.keyboardContainer.classList.remove('visible');
  }
}
