'use strict'

/*
    Virtual Keyboard for web app 
*/

const azertyMapping = [
    { 'key': "a", 'ascii': '&#97' },
    { 'key': "z", 'ascii': '&#122' },
    { 'key': "e", 'ascii': '&#101' },
    { 'key': "r", 'ascii': '&#114' },
    { 'key': "t", 'ascii': '&#116' },
    { 'key': "y", 'ascii': '&#121' },
    { 'key': "u", 'ascii': '&#117' },
    { 'key': "i", 'ascii': '&#105' },
    { 'key': "o", 'ascii': '&#111' },
    { 'key': "p", 'ascii': '&#112' },
    { 'key': "q", 'ascii': '&#113' },
    { 'key': "s", 'ascii': '&#115' },
    { 'key': "d", 'ascii': '&#100' },
    { 'key': "f", 'ascii': '&#102' },
    { 'key': "g", 'ascii': '&#103' },
    { 'key': "h", 'ascii': '&#104' },
    { 'key': "j", 'ascii': '&#106' },
    { 'key': "k", 'ascii': '&#107' },
    { 'key': "l", 'ascii': '&#108' },
    { 'key': "m", 'ascii': '&#109' },
    { 'key': '<i class="fa fa-arrow-up" aria-hidden="true"></i>', 'action': 'uppercase' },
    { 'key': "w", 'ascii': '&#119' },
    { 'key': "x", 'ascii': '&#120' },
    { 'key': "c", 'ascii': '&#99' },
    { 'key': "v", 'ascii': '&#118' },
    { 'key': "b", 'ascii': '&#98' },
    { 'key': "n", 'ascii': '&#110' },
    { 'key': "'", 'ascii': '&#39' },
    { 'key': '<i class="fa fa-arrow-left" aria-hidden="true"></i>', 'ascii': '', 'action': 'backspace', 'class': 'backspace-key' },
    { 'key': "?#!123", 'ascii': '', 'action': 'numerics_symbols' },
    { 'key': ",", 'ascii': '&#44' },
    { 'key': "", 'action': 'emotes' },
    { 'key': "Space", 'ascii': '&#32', 'class': 'space-key' },
    { 'key': ".", 'ascii': '&#46' },
    { 'key': "Enter", 'class': 'enter-key' },
];

const FIRST_ROW_LENGHT = 10;
const SECOND_ROW_LENGHT = 10;
const THIRD_ROW_LENGHT = 9;
const FOURTH_ROW_LENGHT = 6;

class VirtualKeyboard {

    constructor(options) {
        this._inputElement = null;
        this._options = options || {};
    }

    getInputElement() {
        return this._inputElement;
    }

    setInputElement(element) {
        this._inputElement = element;
    }

    constructKeys(from, to) {
        let keys = [];
        for (let i = 0, j = from; i < to; i++, j++) {
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
        }
        return keys;
    }

    constructKeyboard() {
        this.rows = [this.row1, this.row2, this.row3, this.row4];
        this.keys = [];


        this.keyboardContainer = document.createElement('div');
        this.actionsContainer = document.createElement('div');

        this.keyboardContainer.classList.add('keyboard-container');
        this.actionsContainer.classList.add('actions-container');


        this.keyboardContainer.appendChild(this.actionsContainer);

        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i] = document.createElement('div');
            this.rows[i].classList.add('row');
        }
        this.actionsContainer.innerHTML = `<span class="config-button">
            <i class="fa fa-cog" aria-hidden="true"></i>
            </span>
            <span class="close-button">
            <i class="fa fa-times" aria-hidden="true"></i>
            </span>`;

        this.rows[0].append(...this.keys.concat(this.constructKeys(0, FIRST_ROW_LENGHT)));
        this.rows[1].append(...this.keys.concat(this.constructKeys(10, SECOND_ROW_LENGHT)));
        this.rows[2].append(...this.keys.concat(this.constructKeys(20, THIRD_ROW_LENGHT)));
        this.rows[3].append(...this.keys.concat(this.constructKeys(29, FOURTH_ROW_LENGHT)));
        this.keyboardContainer.append(this.actionsContainer, ...this.rows);
        document.body.appendChild(this.keyboardContainer);
        this.registerListenner();
        console.log(this.keyboardContainer);
    }


    calculatePosition() {
        let virtualKeyboardWidth = this.keyboardContainer.offsetWidth;
        let virtualKeyboarHeight = this.keyboardContainer.offsetHeight;
        let left = (this._inputElement.offsetWidth / 2) - (virtualKeyboardWidth / 2) + this._inputElement.getBoundingClientRect().left + document.documentElement.scrollLeft;
        let top = this._inputElement.getBoundingClientRect().top + this._inputElement.offsetHeight + 15 + document.documentElement.scrollTop;

        this.keyboardContainer.style.left = left + "px";
        this.keyboardContainer.style.top = top + "px";
    }

    registerListenner() {
        let hookLaunchers = document.querySelectorAll('.virtual-keyboard-hook');
        if (hookLaunchers.length > 0) {
            [...hookLaunchers].forEach((hookLauncher) => {
                hookLauncher.addEventListener('click', (event) => {
                    let targetedInput = document.getElementById(hookLauncher.dataset.targetId)
                    if (targetedInput) {
                        this.setInputElement(targetedInput);
                        console.log(this._inputElement);
                        this.calculatePosition();
                    }
                });
            });

        }
    }

}


// function constructVirtualsKeyboards(elements) {
//     for (let i = 0; i < elements.length; i++) {
//         new VirtualKeyboard(elements[i]).constructKeyboard();
//     }
// }



let elements = document.body.querySelectorAll('[virtual-keyboard]');
let virtualKeyboardInstance = new VirtualKeyboard().constructKeyboard();
// constructVirtualsKeyboards(elements);