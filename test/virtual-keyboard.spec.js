/* global describe beforeEach it expect jasmine spyOn it */
/* eslint no-use-before-define: 0 */
import VirtualKeyboard from '../src/virtual-keyboard';

describe('virtualkeyboard', () => {
  let virtualkeyboardInstance;
  let hookLauncher;
  let inputElement;

  beforeEach(() => {
    virtualkeyboardInstance = new VirtualKeyboard();
    hookLauncher = document.createElement('div');
    hookLauncher.classList.add('virtual-keyboard-hook');
    hookLauncher.dataset.targetId = 'id1';
    hookLauncher.dataset.keyboardMapping = 'azerty';
    spyOn(hookLauncher, 'addEventListener').and.callFake((event, callback) => {
      if (event === 'click') {
        callback();
      }
    });
    inputElement = document.createElement('textarea');
    inputElement.id = 'id1';
    inputElement.setAttribute('virtual-keyboard', true);
    spyOn(document, 'getElementById').and.callFake((args) => {
      if (args === 'id1') {
        return inputElement;
      }
    });
    spyOn(document, 'querySelectorAll').and.callFake((args) => {
      switch (args) {
        case '.virtual-keyboard-hook':
          return [hookLauncher];
        default:
      }
    });
  });
  it('should init the constructor', () => {
    expect(virtualkeyboardInstance.actionsContainer).toBe(null);
    expect(virtualkeyboardInstance.keyboardContainer).toBe(null);
    expect(virtualkeyboardInstance.currentInputElement).toBe(null);
    expect(virtualkeyboardInstance.isvisible).toBeFalsy();
    expect(virtualkeyboardInstance.inputCaretPosition).toEqual(0);
    expect(virtualkeyboardInstance.keys).toBe(null);
    expect(virtualkeyboardInstance.targetedInputsElements).toEqual(
      jasmine.any(Set)
    );
  });

  it('should set the correct position of the virtual keyboard after create', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    const elem = document.createElement('textarea');
    spyOn(
      virtualkeyboardInstance.keyboardContainer,
      'getBoundingClientRect'
    ).and.returnValue({
      width: 700
    });
    spyOn(elem, 'getBoundingClientRect').and.returnValue({
      left: 600,
      top: 50
    });
    virtualkeyboardInstance.setKeyboardPosition(elem);
    expect(virtualkeyboardInstance.keyboardContainer.style.left).toBe('250px');
    expect(virtualkeyboardInstance.keyboardContainer.style.top).toBe('65px');
  });

  it('should set the correct position of the virtual keyboard when the position of the targeted input is close to the browser border', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    const elem = document.createElement('textarea');
    spyOn(
      virtualkeyboardInstance.keyboardContainer,
      'getBoundingClientRect'
    ).and.returnValue({
      width: 700
    });
    spyOn(elem, 'getBoundingClientRect').and.returnValue({
      left: 180,
      top: 50
    });
    virtualkeyboardInstance.setKeyboardPosition(elem);
    expect(virtualkeyboardInstance.keyboardContainer.style.left).toBe('20px');
    expect(virtualkeyboardInstance.keyboardContainer.style.top).toBe('65px');
  });

  it('should close the virtual keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    const closeButton = virtualkeyboardInstance.actionsContainer.querySelector(
      '.close-button'
    );
    closeButton.click();

    expect(virtualkeyboardInstance.isvisible).toBeFalsy();
    expect(
      virtualkeyboardInstance.keyboardContainer.classList.contains('visible')
    ).toBeFalsy();
  });

  it('should back to new line when enter key is pressed', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 5;
    const enterKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>'
    );

    enterKey.click();
    expect(virtualkeyboardInstance.currentInputElement.value).toBe('test1\n');
  });

  it('should dispatch onEnterKey_VK when enter key is pressed', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    spyOn(virtualkeyboardInstance.currentInputElement, 'dispatchEvent');
    spyOn(window, 'CustomEvent');
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 5;
    const enterKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>'
    );

    enterKey.click();
    expect(window.CustomEvent).toHaveBeenCalledWith('onEnterKey_VK', {
      detail: {
        keyAscii: '13',
        keyValue: 'Enter',
        newInputValue: 'test1\n',
        oldInputValue: 'test1'
      }
    });
    expect(
      virtualkeyboardInstance.currentInputElement.dispatchEvent
    ).toHaveBeenCalledWith(new CustomEvent());
  });

  it('should delete the selected text when backspacing with virtual keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    spyOn(virtualkeyboardInstance.currentInputElement, 'focus');
    spyOn(virtualkeyboardInstance.currentInputElement, 'setSelectionRange');

    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'testdeleting with backspace';
    virtualkeyboardInstance.currentInputElement.selectionStart = 9;
    virtualkeyboardInstance.currentInputElement.selectionEnd = 16;
    const backspaceKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
          '</div>'
    );
    backspaceKey.click();
    expect(virtualkeyboardInstance.currentInputElement.value).toEqual('testdeleth backspace');
    expect(virtualkeyboardInstance.currentInputElement.setSelectionRange).toHaveBeenCalled();
    expect(virtualkeyboardInstance.currentInputElement.focus).toHaveBeenCalled();
  });

  it('should delete a character before the caret position', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 1;
    const backspaceKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
          '</div>'
    );

    backspaceKey.click();
    expect(virtualkeyboardInstance.currentInputElement.value).toBe('est1');
  });

  it('should dispatch onBackSpaceKey_VK when backspacekey is pressed', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    spyOn(virtualkeyboardInstance.currentInputElement, 'dispatchEvent');
    spyOn(window, 'CustomEvent');
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 5;
    const backspaceKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
          '</div>'
    );

    backspaceKey.click();
    expect(window.CustomEvent).toHaveBeenCalledWith('onBackSpaceKey_VK', {
      detail: {
        keyAscii: '8',
        keyValue: 'backspace',
        newInputValue: 'test',
        oldInputValue: 'test1'
      }
    });
    expect(
      virtualkeyboardInstance.currentInputElement.dispatchEvent
    ).toHaveBeenCalledWith(new CustomEvent());
  });

  it('should do nothing when the cursor is at the begining of the line and backspace is fired', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 0;
    const backspaceKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
          '</div>'
    );

    backspaceKey.click();
    expect(virtualkeyboardInstance.currentInputElement.value).toBe('test1');
  });

  it('should do nothing when the input value is empty and backspace is fired', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = '';
    const backspaceKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
          '</div>'
    );

    backspaceKey.click();
    expect(virtualkeyboardInstance.currentInputElement.value).toBe('');
  });

  it('should set the correct caretPosition to the clicked position when the input is clicked', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'test';
    virtualkeyboardInstance.currentInputElement.click();
    expect(virtualkeyboardInstance.currentInputElement.selectionStart).toBe(4);
  });

  it('should increment the caretPostion on the currentInputElement when typing with virtual keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    spyOn(virtualkeyboardInstance.currentInputElement, 'focus');
    spyOn(virtualkeyboardInstance.currentInputElement, 'setSelectionRange');
    virtualkeyboardInstance.currentInputElement.value = 'test';
    virtualkeyboardInstance.inputCaretPosition = 4;
    const key = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML === '<div class="key" data-ascii="97">a</div>'
    );
    key.click();
    key.click();
    key.click();
    expect(virtualkeyboardInstance.inputCaretPosition).toBe(7);
    expect(
      virtualkeyboardInstance.currentInputElement.focus
    ).toHaveBeenCalled();
    expect(
      virtualkeyboardInstance.currentInputElement.setSelectionRange
    ).toHaveBeenCalledWith(5, 5);
    expect(
      virtualkeyboardInstance.currentInputElement.setSelectionRange
    ).toHaveBeenCalledWith(6, 6);
    expect(
      virtualkeyboardInstance.currentInputElement.setSelectionRange
    ).toHaveBeenCalledWith(7, 7);
  });

  it('should dispatch onInputValueChange_VK when the value of the input change due to a key pressed', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    spyOn(virtualkeyboardInstance.currentInputElement, 'dispatchEvent');
    spyOn(window, 'CustomEvent');
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 5;
    const aKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML === '<div class="key" data-ascii="97">a</div>'
    );

    aKey.click();
    expect(window.CustomEvent).toHaveBeenCalledWith('onInputValueChange_VK', {
      detail: {
        keyAscii: '97',
        keyValue: 'a',
        newInputValue: 'test1a',
        oldInputValue: 'test1'
      }
    });
    expect(
      virtualkeyboardInstance.currentInputElement.dispatchEvent
    ).toHaveBeenCalledWith(new CustomEvent());
  });

  it('should change the caretPostion of the currentInputElement when typing with real keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'test';
    virtualkeyboardInstance.currentInputElement.click();
    const event = new KeyboardEvent('keydown', {
      cancelable: true,
      key: 'a'
    });
    virtualkeyboardInstance.currentInputElement.dispatchEvent(event);
    expect(virtualkeyboardInstance.inputCaretPosition).toBe(5);
  });

  it('should decrement the caretPostion on the currentInputElement when backspacing with virtual keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    spyOn(virtualkeyboardInstance.currentInputElement, 'focus');
    spyOn(virtualkeyboardInstance.currentInputElement, 'setSelectionRange');
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'test1';
    virtualkeyboardInstance.inputCaretPosition = 3;
    const backspaceKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
          '</div>'
    );
    backspaceKey.click();
    expect(virtualkeyboardInstance.inputCaretPosition).toEqual(2);
    expect(
      virtualkeyboardInstance.currentInputElement.focus
    ).toHaveBeenCalled();
    expect(
      virtualkeyboardInstance.currentInputElement.setSelectionRange
    ).toHaveBeenCalledWith(2, 2);
  });

  it('should change the value of the currentInputElement and increment the caretPosition when typing with the virtual keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.currentInputElement.value = 'Bonjour';
    virtualkeyboardInstance.inputCaretPosition = 7;
    const key1 = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML === '<div class="key" data-ascii="97">a</div>'
    );
    const key2 = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML === '<div class="key" data-ascii="122">z</div>'
    );
    const key3 = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML === '<div class="key" data-ascii="101">e</div>'
    );
    const key4 = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML === '<div class="key" data-ascii="114">r</div>'
    );

    key1.click();
    key2.click();
    key3.click();
    key4.click();
    expect(virtualkeyboardInstance.currentInputElement.value).toBe(
      'Bonjourazer'
    );
    expect(virtualkeyboardInstance.inputCaretPosition).toEqual(11);
  });

  it('should set the Uppercase keys layout visible', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.inputCaretPosition = 1;
    const upperCaseKey = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key" data-action="uppercase">' +
          '<i class="fa fa-arrow-up" aria-hidden="true"></i>' +
          '</div>'
    );

    upperCaseKey.click();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe(
      upperCaseKeysHTML
    );
  });

  it('should set the numerics keys layout visible', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.inputCaretPosition = 1;
    const numericsKeys = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key" data-action="numerics">#123?</div>'
    );

    numericsKeys.click();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe(
      numericsKeysHTML
    );
  });

  it('should set the extra keys layout visible', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.inputCaretPosition = 1;
    const extraKeys = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key" data-action="extrakeys">=\\&lt;</div>'
    );

    extraKeys.click();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe(
      extraKeysHTML
    );
  });

  it('should set the lowercase keys layout visible', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    virtualkeyboardInstance.inputCaretPosition = 1;
    const lowercaseKeys = virtualkeyboardInstance.keys.find(
      (element) =>
        element.outerHTML ===
        '<div class="key" data-action="lowercase">' +
          '<i class="fa fa-arrow-up" aria-hidden="true"></i>' +
          '</div>'
    );

    lowercaseKeys.click();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe(
      lowerCaseKeysHTML
    );
  });

  it('should have created the HTML of the azerty virtual keyboard', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe(
      lowerCaseKeysHTML
    );
  });

  it('should have created the HTML of the qwerty virtual keyboard', () => {
    hookLauncher.dataset.keyboardMapping = 'qwerty';
    virtualkeyboardInstance.launchVirtualKeyboard();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe(
      qwertyKeysHTML
    );
  });

  it('should remove the virtualkeyboard of the parent Node when another the targeted input element isnt the same ', () => {
    virtualkeyboardInstance.keyboardContainer = document.createElement('div');
    const parentElement = document.createElement('div');
    parentElement.appendChild(virtualkeyboardInstance.keyboardContainer);
    spyOn(parentElement, 'removeChild').and.callThrough();
    virtualkeyboardInstance.handleClickOnVirtualKeyboardHook(hookLauncher);
    expect(parentElement.removeChild).toHaveBeenCalled();
  });

  it('should have not created the HTML of the virtual keyboard when hook is not present', () => {
    document.querySelectorAll.and.callFake((args) => {
      switch (args) {
        case '.virtual-keyboard-hook':
          return [];
        default:
      }
    });
    virtualkeyboardInstance.launchVirtualKeyboard();
    expect(virtualkeyboardInstance.keyboardContainer).toBe(null);
  });

  it('should have not created the HTML of the virtual keyboard when the hook not referencing a real input', () => {
    hookLauncher.dataset.targetId = 'fakeid';
    virtualkeyboardInstance.handleClickOnVirtualKeyboardHook(hookLauncher);
    expect(virtualkeyboardInstance.keyboardContainer).toBe(null);
  });
});

const lowerCaseKeysHTML =
  '<div class="keyboard-container visible" style="left: 20px; top: 15px;">' +
  '<div class="actions-container">' +
  '<span class="close-button">' +
  '<i class="fa fa-times" aria-hidden="true"></i>' +
  '</span>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="97">a</div>' +
  '<div class="key" data-ascii="122">z</div>' +
  '<div class="key" data-ascii="101">e</div>' +
  '<div class="key" data-ascii="114">r</div>' +
  '<div class="key" data-ascii="116">t</div>' +
  '<div class="key" data-ascii="121">y</div>' +
  '<div class="key" data-ascii="117">u</div>' +
  '<div class="key" data-ascii="105">i</div>' +
  '<div class="key" data-ascii="111">o</div>' +
  '<div class="key" data-ascii="112">p</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="113">q</div>' +
  '<div class="key" data-ascii="115">s</div>' +
  '<div class="key" data-ascii="100">d</div>' +
  '<div class="key" data-ascii="102">f</div>' +
  '<div class="key" data-ascii="103">g</div>' +
  '<div class="key" data-ascii="104">h</div>' +
  '<div class="key" data-ascii="106">j</div>' +
  '<div class="key" data-ascii="107">k</div>' +
  '<div class="key" data-ascii="108">l</div>' +
  '<div class="key" data-ascii="109">m</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="uppercase">' +
  '<i class="fa fa-arrow-up" aria-hidden="true"></i>' +
  '</div>' +
  '<div class="key" data-ascii="120">x</div>' +
  '<div class="key" data-ascii="119">w</div>' +
  '<div class="key" data-ascii="99">c</div>' +
  '<div class="key" data-ascii="118">v</div>' +
  '<div class="key" data-ascii="98">b</div>' +
  '<div class="key" data-ascii="110">n</div>' +
  '<div class="key" data-ascii="39">\'</div>' +
  '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
  '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
  '</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="numerics">#123?</div>' +
  '<div class="key" data-ascii="44">,</div>' +
  '<div class="key" data-action="emotes"></div>' +
  '<div class="key space-key" data-ascii="32">Space</div>' +
  '<div class="key" data-ascii="46">.</div>' +
  '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>' +
  '</div>' +
  '</div>';

const upperCaseKeysHTML =
  '<div class="keyboard-container visible" style="left: 20px; top: 15px;">' +
  '<div class="actions-container">' +
  '<span class="close-button">' +
  '<i class="fa fa-times" aria-hidden="true"></i>' +
  '</span>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="65">A</div>' +
  '<div class="key" data-ascii="90">Z</div>' +
  '<div class="key" data-ascii="69">E</div>' +
  '<div class="key" data-ascii="82">R</div>' +
  '<div class="key" data-ascii="84">T</div>' +
  '<div class="key" data-ascii="89">Y</div>' +
  '<div class="key" data-ascii="85">U</div>' +
  '<div class="key" data-ascii="73">I</div>' +
  '<div class="key" data-ascii="79">O</div>' +
  '<div class="key" data-ascii="80">P</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="81">Q</div>' +
  '<div class="key" data-ascii="83">S</div>' +
  '<div class="key" data-ascii="68">D</div>' +
  '<div class="key" data-ascii="70">F</div>' +
  '<div class="key" data-ascii="71">G</div>' +
  '<div class="key" data-ascii="72">H</div>' +
  '<div class="key" data-ascii="74">J</div>' +
  '<div class="key" data-ascii="75">K</div>' +
  '<div class="key" data-ascii="76">L</div>' +
  '<div class="key" data-ascii="77">M</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="lowercase">' +
  '<i class="fa fa-arrow-up" aria-hidden="true"></i>' +
  '</div>' +
  '<div class="key" data-ascii="88">X</div>' +
  '<div class="key" data-ascii="87">W</div>' +
  '<div class="key" data-ascii="67">C</div>' +
  '<div class="key" data-ascii="86">V</div>' +
  '<div class="key" data-ascii="66">B</div>' +
  '<div class="key" data-ascii="78">N</div>' +
  '<div class="key" data-ascii="39">\'</div>' +
  '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
  '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
  '</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="numerics">#123?</div>' +
  '<div class="key" data-ascii="44">,</div>' +
  '<div class="key" data-action="emotes"></div>' +
  '<div class="key space-key" data-ascii="32">Space</div>' +
  '<div class="key" data-ascii="46">.</div>' +
  '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>' +
  '</div>' +
  '</div>';

const extraKeysHTML =
  '<div class="keyboard-container visible" style="left: 20px; top: 15px;">' +
  '<div class="actions-container">' +
  '<span class="close-button">' +
  '<i class="fa fa-times" aria-hidden="true"></i>' +
  '</span>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="126">~</div>' +
  '<div class="key" data-ascii="96">`</div>' +
  '<div class="key" data-ascii="124">|</div>' +
  '<div class="key" data-ascii="183">·</div>' +
  '<div class="key" data-ascii="61">=</div>' +
  '<div class="key" data-ascii="94">^</div>' +
  '<div class="key" data-ascii="123">{</div>' +
  '<div class="key" data-ascii="125">}</div>' +
  '<div class="key" data-ascii="37">%</div>' +
  '<div class="key" data-ascii="92">\\</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="91">[</div>' +
  '<div class="key" data-ascii="93">]</div>' +
  '<div class="key" data-ascii="8364">€</div>' +
  '<div class="key" data-ascii="95">_</div>' +
  '<div class="key" data-ascii="38">&amp;</div>' +
  '<div class="key" data-ascii="45">-</div>' +
  '<div class="key" data-ascii="43">+</div>' +
  '<div class="key" data-ascii="40">(</div>' +
  '<div class="key" data-ascii="41">)</div>' +
  '<div class="key" data-ascii="47">/</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="numerics">#123?</div>' +
  '<div class="key" data-ascii="42">*</div>' +
  '<div class="key" data-ascii="34">"</div>' +
  '<div class="key" data-ascii="39">\'</div>' +
  '<div class="key" data-ascii="58">:</div>' +
  '<div class="key" data-ascii="59">;</div>' +
  '<div class="key" data-ascii="33">!</div>' +
  '<div class="key" data-ascii="63">?</div>' +
  '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
  '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
  '</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="lowercase">ABC</div>' +
  '<div class="key" data-ascii="44">,</div>' +
  '<div class="key" data-action="emotes"></div>' +
  '<div class="key space-key" data-ascii="32">Space</div>' +
  '<div class="key" data-ascii="46">.</div>' +
  '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>' +
  '</div>' +
  '</div>';

const numericsKeysHTML =
  '<div class="keyboard-container visible" style="left: 20px; top: 15px;">' +
  '<div class="actions-container">' +
  '<span class="close-button">' +
  '<i class="fa fa-times" aria-hidden="true"></i>' +
  '</span>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="49">1</div>' +
  '<div class="key" data-ascii="50">2</div>' +
  '<div class="key" data-ascii="51">3</div>' +
  '<div class="key" data-ascii="52">4</div>' +
  '<div class="key" data-ascii="53">5</div>' +
  '<div class="key" data-ascii="54">6</div>' +
  '<div class="key" data-ascii="55">7</div>' +
  '<div class="key" data-ascii="56">8</div>' +
  '<div class="key" data-ascii="57">9</div>' +
  '<div class="key" data-ascii="48">0</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="64">@</div>' +
  '<div class="key" data-ascii="35">#</div>' +
  '<div class="key" data-ascii="8364">€</div>' +
  '<div class="key" data-ascii="95">_</div>' +
  '<div class="key" data-ascii="38">&amp;</div>' +
  '<div class="key" data-ascii="45">-</div>' +
  '<div class="key" data-ascii="43">+</div>' +
  '<div class="key" data-ascii="40">(</div>' +
  '<div class="key" data-ascii="41">)</div>' +
  '<div class="key" data-ascii="47">/</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="extrakeys">=\\&lt;</div>' +
  '<div class="key" data-ascii="42">*</div>' +
  '<div class="key" data-ascii="34">"</div>' +
  '<div class="key" data-ascii="39">\'</div>' +
  '<div class="key" data-ascii="58">:</div>' +
  '<div class="key" data-ascii="59">;</div>' +
  '<div class="key" data-ascii="33">!</div>' +
  '<div class="key" data-ascii="63">?</div>' +
  '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
  '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
  '</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="lowercase">ABC</div>' +
  '<div class="key" data-ascii="44">,</div>' +
  '<div class="key" data-action="emotes"></div>' +
  '<div class="key space-key" data-ascii="32">Space</div>' +
  '<div class="key" data-ascii="46">.</div>' +
  '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>' +
  '</div>' +
  '</div>';

const qwertyKeysHTML =
  '<div class="keyboard-container visible" style="left: 20px; top: 15px;">' +
  '<div class="actions-container">' +
  '<span class="close-button">' +
  '<i class="fa fa-times" aria-hidden="true"></i>' +
  '</span>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="113">q</div>' +
  '<div class="key" data-ascii="119">w</div>' +
  '<div class="key" data-ascii="101">e</div>' +
  '<div class="key" data-ascii="114">r</div>' +
  '<div class="key" data-ascii="116">t</div>' +
  '<div class="key" data-ascii="121">y</div>' +
  '<div class="key" data-ascii="117">u</div>' +
  '<div class="key" data-ascii="105">i</div>' +
  '<div class="key" data-ascii="111">o</div>' +
  '<div class="key" data-ascii="112">p</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-ascii="97">a</div>' +
  '<div class="key" data-ascii="115">s</div>' +
  '<div class="key" data-ascii="100">d</div>' +
  '<div class="key" data-ascii="102">f</div>' +
  '<div class="key" data-ascii="103">g</div>' +
  '<div class="key" data-ascii="104">h</div>' +
  '<div class="key" data-ascii="106">j</div>' +
  '<div class="key" data-ascii="107">k</div>' +
  '<div class="key" data-ascii="108">l</div>' +
  '<div class="key" data-ascii="39">\'</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="uppercase">' +
  '<i class="fa fa-arrow-up" aria-hidden="true"></i>' +
  '</div>' +
  '<div class="key" data-ascii="122">z</div>' +
  '<div class="key" data-ascii="120">x</div>' +
  '<div class="key" data-ascii="99">c</div>' +
  '<div class="key" data-ascii="118">v</div>' +
  '<div class="key" data-ascii="98">b</div>' +
  '<div class="key" data-ascii="110">n</div>' +
  '<div class="key" data-ascii="109">m</div>' +
  '<div class="key backspace-key" data-action="backspace" data-ascii="8">' +
  '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
  '</div>' +
  '</div>' +
  '<div class="row-virtual-keyboard">' +
  '<div class="key" data-action="numerics">#123?</div>' +
  '<div class="key" data-ascii="44">,</div>' +
  '<div class="key" data-action="emotes"></div>' +
  '<div class="key space-key" data-ascii="32">Space</div>' +
  '<div class="key" data-ascii="46">.</div>' +
  '<div class="key enter-key" data-action="enter" data-ascii="13">Enter</div>' +
  '</div>' +
  '</div>';
