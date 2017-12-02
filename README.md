# Virtual Keyboard plugin [![Build Status](https://travis-ci.org/stephen31/virtual-keyboard-plugin.svg?branch=master)](https://travis-ci.org/stephen31/virtual-keyboard-plugin) [![codecov](https://codecov.io/gh/stephen31/virtual-keyboard-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/stephen31/virtual-keyboard-plugin)

> A simple virtual keyboard plugin for inputs and text areas

### Preview 

![Alt Text](https://media.giphy.com/media/3osBLcxrlQ9ZO3Mf6w/giphy.gif)

### Demo Link

[Demo here](https://stephen31.github.io/virtual-keyboard-plugin/public/)

## Installation

#### npm

```bash
$ npm install virtual-keyboard-plugin --save
```

#### yarn
```bash
$ yarn add virtual-keyboard-plugin --save
```

### unpkg CDN
 You can also skip yarn/npm install by using repos on the cdn 

```html
<link rel="stylesheet" href="https://unpkg.com/virtual-keyboard-plugin@1.0.0/dist/virtual-keyboard.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://unpkg.com/virtual-keyboard-plugin@1.0.0/dist/virtual-keyboard.min.js"></script>
```

## Configuration
* Add fontawesome css file in your index.html  
* Add virtual-keyboard.css which is inside the node_modules/virtual-keyboard folder
* Add the javascript file of the virtual-keyboard plugin at the end of your index.html

```html
<link rel="stylesheet" href="../node_modules/virtual-keyboard-plugin/dist/virtual-keyboard.css">
<link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.min.css">
<script src="../node_modules/virtual-keyboard-plugin/dist/virtual-keyboard.js"></script>
```
* add 'virtual-keyboard' as an attribute of your input/text-area
* Create a new HTML element that will serve as a button to open the virtual keyboard and add to it two attributes :
  1. 'data-target-id': 'input_id'   => put the Id of the input that will be used by the virtual keyboard
  2. 'data-keyboard-mapping': 'azerty' or 'qwerty'  => set 'azerty' as value if you want azerty layout or 'qwerty' if you want qwerty layout

 ### Example of use
```html
<textarea name="" id="Id1" cols="30" rows="10" virtual-keyboard></textarea>
<div class="virtual-keyboard-hook" data-target-id="Id1" data-keyboard-mapping="qwerty"><i class="fa fa-keyboard-o" aria-hidden="true"></i></div>
```
```html
<input id="Id2" type="text" virtual-keyboard>
<div class="virtual-keyboard-hook" data-target-id=Id2" data-keyboard-mapping="azerty"><i class="fa fa-keyboard-o" aria-hidden="true"></i></div>
````
### Compatibility

 Chrome & Firefox
### TODO

* Support of characters with accents
* Add a new key for smileys before the space key
* Configuration button (colors etc...)
* Add posibility to choose keyboard position (default is bottom centered)
