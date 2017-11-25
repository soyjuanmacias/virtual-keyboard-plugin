/*
    Virtual Keyboard for web app
*/
import azertyMapping from './azertyMapping';
import qwertyMapping from './qwertyMapping';

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
      this.setKeyboardRows(Array.of(this.upperkeysRow0, this.upperkeysRow1, this.upperkeysRow2, this.upperkeysRow3));
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
      this.setKeyboardRows(Array.of(this.lowkeysRow0, this.lowkeysRow1, this.lowkeysRow2, this.lowkeysRow3));
    });
  }
  /**
   * Add an event listener when the numerics key is clicked
   * and set the behavior when this event is triggered
   * @param {any} key
   * @memberof VirtualKeyboard
   */
  numericsKeyEvent(key) {
    key.addEventListener('click', () => {
      this.setKeyboardRows(Array.of(this.numericKeysRow0, this.numericKeysRow1, this.numericKeysRow2, this.numericKeysRow3));
    });
  }
  /**
   * Add an event listener when the extrakey key is clicked
   * and set the behavior when this event is triggered
   * @param {any} key
   * @memberof VirtualKeyboard
   */
  extraKeyEvent(key) {
    key.addEventListener('click', () => {
      this.setKeyboardRows(Array.of(this.extraKeysRow0, this.extraKeysRow1, this.extraKeysRow2, this.numericKeysRow3));
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
  initKeys(from, to, mappingArray) {
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

      if (mappingArray[j].action === 'numerics') {
        this.numericsKeyEvent(keys[i]);
      }

      if (mappingArray[j].action === 'extrakeys') {
        this.extraKeyEvent(keys[i]);
      }

      if (!mappingArray[j].action) {
        keys[i].addEventListener('click', () => {
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
   * Initialize the keboard container
   * @memberof VirtualKeyboard
   */
  initKeyboardContainer() {
    this.keyboardContainer = document.createElement('div');
    this.keyboardContainer.classList.add('keyboard-container');
    this.keyboardContainer.appendChild(this.actionsContainer);
  }
  /**
   * Initialize the actions container inside the virtual keyboard
   * @memberof VirtualKeyboard
   */
  initKeyboardActionsContainer() {
    this.actionsContainer = document.createElement('div');
    this.actionsContainer.classList.add('actions-container');
    this.actionsContainer.innerHTML = '<span class="config-button">' +
    '<i class="fa fa-cog" aria-hidden="true"></i>' +
    '</span>' +
    '<span class="close-button">' +
    '<i class="fa fa-times" aria-hidden="true"></i>' +
    '</span>';
  }

  /**
   * Init all containers of the virtual keyboard
   * @memberof VirtualKeyboard
   */
  initAllContainers() {
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
  constructKeyboard(keysMapping, actionsContainer, keyboardContainer) {
    for (let i = 0; i < this.rows.length; i += 1) {
      this.rows[i] = document.createElement('div');
      this.rows[i].classList.add('row');
    }
    const closeButton = actionsContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      this.closeKeyboard();
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
    
    this.keys = this.lowkeysRow0.concat(
      this.lowkeysRow1, this.lowkeysRow2, this.lowkeysRow3,
      this.upperkeysRow0, this.upperkeysRow1, this.upperkeysRow2, this.upperkeysRow3,
      this.numericKeysRow0, this.numericKeysRow1, this.numericKeysRow2,
      this.extraKeysRow0, this.extraKeysRow1, this.extraKeysRow2,
    );
    
    this.setKeyboardRows(Array.of(
      this.lowkeysRow0,
      this.lowkeysRow1, this.lowkeysRow2, this.lowkeysRow3,
    ));
    
    keyboardContainer.append(actionsContainer, ...this.rows);
    document.body.appendChild(keyboardContainer);
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
  setKeyboardPosition(currentInputElement) {
    const inputCoord = currentInputElement.getBoundingClientRect();
    const virtualKeyboardWidth = this.keyboardContainer.offsetWidth;
    let left = ((currentInputElement.offsetWidth / 2) - (virtualKeyboardWidth / 2)) +
    inputCoord.left + document.documentElement.scrollLeft;
    const top = inputCoord.top +
      currentInputElement.offsetHeight + 15 + document.documentElement.scrollTop;

    if (left < 20) {
      left = 20;
    }
    this.keyboardContainer.style.left = `${left}px`;
    this.keyboardContainer.style.top = `${top}px`;
  }
  /**
   * Initialize the virtual keyboard
   * @memberof VirtualKeyboard
   */
  launchVirtualKeyboard() {
    const hookLaunchers = document.querySelectorAll('.virtual-keyboard-hook');
    if (hookLaunchers.length > 0) {
      [...hookLaunchers].forEach((hookLauncher) => {
        hookLauncher.addEventListener('click', this.handleClickOnVirtualKeyboardHook.bind(this, hookLauncher));
      });
    }
  }
  /**
   * Handle the click event on the virtual keyboard hook
   * @param {any} hookLauncher
   * @memberof VirtualKeyboard
   */
  handleClickOnVirtualKeyboardHook(hookLauncher) {
    const targetedInput = document.getElementById(hookLauncher.dataset.targetId);
    const mapping = hookLauncher.dataset.keyboardMapping;
    if (targetedInput && mapping) {
      this.currentInputElement = targetedInput;
      if (!this.targetedInputsElements.has(targetedInput)) {
        if (this.keyboardContainer) {
          this.keyboardContainer.parentNode.removeChild(this.keyboardContainer);
        }
        this.initAllContainers();
        if (mapping === 'qwerty') {
          this.constructKeyboard(qwertyMapping, this.actionsContainer, this.keyboardContainer);
        } else {
          this.constructKeyboard(azertyMapping, this.actionsContainer, this.keyboardContainer);
        }
        targetedInput.addEventListener('click', () => {
          this.inputCaretPosition = this.currentInputElement.selectionStart;
        });

        targetedInput.addEventListener('keypress', () => {
          this.inputCaretPosition += 1;
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
  closeKeyboard() {
    this.isvisible = false;
    this.keyboardContainer.classList.remove('visible');
  }
}
