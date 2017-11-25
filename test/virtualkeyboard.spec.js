// const virtualkeyboard = require('../src/VirtualKeyboard.js');
/* global describe beforeEach it expect jasmine spyOn fit */
import VirtualKeyboard from '../src/VirtualKeyboard';

describe('virtualkeyboard', () => {
  let virtualkeyboardInstance;
  let hookLauncher;
  let inputElement;
  // let document = null;
  beforeEach(() => {
    virtualkeyboardInstance = new VirtualKeyboard();

    // document.querySelectorAll = jasmine.createSpy();
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
    expect(virtualkeyboardInstance.targetedInputsElements).toEqual(jasmine.any(Set));
  });

  fit('should set the correct position of the virtual keyboard after create', () => {
    virtualkeyboardInstance.launchVirtualKeyboard();
    const elem = document.createElement('textarea');
    spyOn(elem, 'getBoundingClientRect').and.returnValue({
      left: 180,
      top: 50,
    });
    virtualkeyboardInstance.setKeyboardPosition(elem);
    console.log(virtualkeyboardInstance.keyboardContainer.style.top);
    expect(virtualkeyboardInstance.keyboardContainer.style.left).toBe('20px');
    expect(virtualkeyboardInstance.keyboardContainer.style.top).toBe('65px');
    

    // virtualkeyboardInstance.launchVirtualKeyboard();
  });

  it('should have created the HTML of the virtual keyboard', () => {
    // spyOn(inputElement, 'addEventListener').and.callFake((event, callback) => {
    //   if (event === 'click') {
    //     callback();
    //   } else if (event === 'keypress') {
    //     callback();
    //   }
    // });
    // inputElement.click();
    // hookLauncher.click();
    // virtualkeyboardInstance.registerHookListener = jasmine.createSpy('registerHookListener');
    // virtualkeyboardInstance.actionsContainer = document.createElement('div');
    // spyOn(virtualkeyboardInstance.actionsContainer, 'querySelector').and.callFake((args) => {
    //   console.log(args);
    //   console.log(virtualkeyboardInstance.actionsContainer);
    // });
    virtualkeyboardInstance.launchVirtualKeyboard();
    expect(virtualkeyboardInstance.keyboardContainer.outerHTML).toBe('<div class="keyboard-container visible" style="left: 20px; top: 15px;">' +
      '<div class="actions-container">' +
      '<span class="config-button">' +
      '<i class="fa fa-cog" aria-hidden="true"></i>' +
      '</span>' +
      '<span class="close-button">' +
      '<i class="fa fa-times" aria-hidden="true"></i>' +
      '</span>' +
      '</div>' +
      '<div class="row">' +
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
      '<div class="row">' +
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
      '<div class="row">' +
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
      '<div class="key backspace-key" data-action="backspace">' +
      '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="key" data-action="numerics">#123?</div>' +
      '<div class="key" data-ascii="44">,</div>' +
      '<div class="key" data-action="emotes"></div>' +
      '<div class="key space-key" data-ascii="32">Space</div>' +
      '<div class="key" data-ascii="46">.</div>' +
      '<div class="key enter-key" data-action="enter">Enter</div>' +
      '</div>' +
      '</div>');
  });
});
