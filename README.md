arrow-buttons
=============

> This module builds "next" and "previous" buttons and emits an update whenever the index changes. If the index changes outside of this module, it is important to notify this module of the new index.

ES5 polyfills needed for `Array.forEach`.


To get started
--------------

### CommonJS

```
$ npm install c2-arrow-buttons
```

```js
var ArrowButtons = require('c2-arrow-buttons');
```

### Browser Global

```html
<script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
<script src="TheC2Group/event-handler.js"></script>
<script src="standalone/arrow-buttons.js"></script>
```


Basic example
-------------

```js
// The max is typically the array length minus 1
var max = 5;

// This wouldn't be necessary since all these options are the defaults
var options = {
    previousHTML: '<a href="#" class="previous"><span class="Hidden">Go to previous item</span></a>',
    nextHTML: '<a href="#" class="next"><span class="Hidden">Go to next item</span></a>',
    style: 'finite', // 'finite' || 'infinite'
    attribute: 'data-status',
    enabled: 'enabled',
    disabled: 'disabled',
    initial: 0
};

var arrows = new ArrowButtons('#parent', max, options);

arrows.on('update', function (index) {
    console.log(index);
});
```


ArrowButtons
------------
Constructor  
@param {jQuery} - element that the arrow buttons are appended to  
@param {Number} - max value that the index can reach, the min value is always 0  
@param {Object} - object to change any of the default options  
@return {Object} - instance of ArrowButtons  


.setIndex
---------
@param {Number}  
@return {Object} - instance of ArrowButtons  


.setMax
-------
@param {Number}  
@return {Object} - instance of ArrowButtons  


.nextIndex
----------

.previousIndex
--------------


Events
---------
* `update:previous`
* `update:next`
* `click:previous`
* `click:next`


License
-------

MIT © [The C2 Group](https://c2experience.com)
