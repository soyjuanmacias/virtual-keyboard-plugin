# Virtual Keyboard plugin

> Sample virtual keyboard plugin for inputs and text areas

### Preview 

![alt text](https://github.com/stephen31/web-virtual-keyboard/tree/master/public/virtual-keyboard.gif "Virtual keyboard")

## Installation

#### npm

```bash
$ npm install virtual-keyboard --save
```

#### yarn
```bash
$ yarn add virtual-keyboard --save
```

## Configuration
* Add fontawesome css file in your index.html  
* Add Css 's files the virtual keyboard which is inside the node_modules/virtual-keyboard folder
* Add the javascript file of the virtual-keyboard plugin at the end of your index.html

```html
	<link rel="stylesheet" href="../node_modules/web-virtual-keyboard/virtual-keyboard.css">
    <link rel="stylesheet" href="../node_modules/web-virtual-keyboard/node_modules/font-awesome/css/font-awesome.min.css">
    <script src="../node_modules/web-virtual-keyboard/virtual-keyboard.js""></script>
```
* add 'virtual-keyboard' as an attribute of your input/text-area
* Create a new HTML element that will serve as a button to open the virtual keyboard and add to it two attributes :
   1/ 'data-targt-id': 'input_id'   => put the Id of the input that will be used by the virtual keyboard
   2/ 'data-keyboard-mapping': 'azerty' or 'qwerty'  => put the azerty as value if you want azerty layout or qwerty if you want qwerty layout

 ### Examples of use
```html
	<textarea name="" id="Id1" cols="30" rows="10" virtual-keyboard></textarea>
	<div class="virtual-keyboard-hook" data-target-id="Id1" data-keyboard-mapping="qwerty"><i class="fa fa-keyboard-o" aria-hidden="true"></i></div>
```
```html
	<input id="Id2" type="text" virtual-keyboard>
	<div class="virtual-keyboard-hook" data-target-id=Id2" data-keyboard-mapping="azerty"><i class="fa fa-keyboard-o" aria-hidden="true"></i></div>
````

### TODO

* Support of characters with accents
* Add a new key for smileys before the space key
* Configuration button (colors etc...)
* Add posibility to choose keyboard position (default is bottom centered)
