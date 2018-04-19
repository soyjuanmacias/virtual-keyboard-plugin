import VirtualKeyboard from '../src/virtual-keyboard';

['WebComponentsReady', 'DOMContentLoaded'].map((event) =>
  document.addEventListener(event, () => {
    new VirtualKeyboard().launchVirtualKeyboard();
  })
);
