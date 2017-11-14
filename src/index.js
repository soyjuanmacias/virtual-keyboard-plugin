

import { VirtualKeyboard } from './VirtualKeyboard';
// function constructVirtualsKeyboards(elements) {
//     for (let i = 0; i < elements.length; i++) {
//         new VirtualKeyboard(elements[i]).constructKeyboard();
//     }
// }


const elements = document.body.querySelectorAll('[virtual-keyboard]');
const virtualKeyboardInstance = new VirtualKeyboard().constructKeyboard();
// constructVirtualsKeyboards(elements);
