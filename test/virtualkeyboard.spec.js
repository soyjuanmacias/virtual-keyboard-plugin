// const virtualkeyboard = require('../src/VirtualKeyboard.js');
/* global describe beforeEach it expect jasmine spyOn */
import VirtualKeyboard from '../src/VirtualKeyboard';

describe('virtualkeyboard', () => {

  // let document = null;
  beforeEach(() => {
    // document = {
    //   querySelectorAll : function (args) {
    //     console.log(args);
    //   },
    // };
  });
  it('should init the constructor', () => {
    const virtualkeyboardInstance = new VirtualKeyboard();
    expect(virtualkeyboardInstance.actionsContainer).toBe(null);
    expect(virtualkeyboardInstance.keyboardContainer).toBe(null);
    expect(virtualkeyboardInstance.currentInputElement).toBe(null);
    expect(virtualkeyboardInstance.isvisible).toBeFalsy();
    expect(virtualkeyboardInstance.inputCaretPosition).toEqual(0);
    expect(virtualkeyboardInstance.keys).toBe(null);
    expect(virtualkeyboardInstance.targetedInputsElements).toEqual(jasmine.any(Set));
  });

  it('should have called the registerHookListener method of the class', () => {
    const virtualkeyboardInstance = new VirtualKeyboard();

    // document.querySelectorAll = jasmine.createSpy();
    const hookLauncher = document.createElement('div');
    hookLauncher.classList.add('virtual-keyboard-hook');
    hookLauncher.dataset.targetId = 'id1';
    hookLauncher.dataset.keyboardMapping = 'azerty';
    spyOn(hookLauncher, 'addEventListener').and.callFake((event, callback) => {
      if (event === 'click') {
        callback();
      }
    });
    const inputElement = document.createElement('textarea');
    inputElement.id = 'id1';
    inputElement.setAttribute('virtual-keyboard', true);
    spyOn(document, 'getElementById').and.callFake((args) => {
      if (args === 'id1') {
        return inputElement;
      }
    });

    spyOn(inputElement, 'addEventListener').and.callFake((event, callback) => {
      if (event === 'click') {
        callback();
      } else if (event === 'keypress') {
        callback();
      }
    });

    // inputElement.click();
    // hookLauncher.click();


    spyOn(document, 'querySelectorAll').and.callFake((args) => {
      switch (args) {
        case '.virtual-keyboard-hook':
          return [hookLauncher];
        default:
      }
    });
    
    // virtualkeyboardInstance.registerHookListener = jasmine.createSpy('registerHookListener');
    // virtualkeyboardInstance.actionsContainer = document.createElement('div');
    spyOn(document, 'querySelector').and.callFake((args) => {
      console.log(args);
      // console.log(virtualkeyboardInstance.actionsContainer);
    });
    virtualkeyboardInstance.registerHookListener();
    
  });


});
