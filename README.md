arrow-buttons
=============

This module builds "next" and "previous" buttons and emits an update whenever the index changes. If the index changes outside of this module, it is important to notify this module of the new index.

Basic example
-------------

```js
// The max is typically the array length minus 1
var max = 5;

// This wouldn't be necessary since all these options are the defaults
var options = {
    previousHTML: '<a href="#" class="previous"><span class="Hidden">Go to previous item</span></a>',
    nextHTML: '<a href="#" class="next"><span class="Hidden">Go to next item</span></a>',
    style: 'finite',
    attribute: 'data-status',
    enabled: 'enabled',
    disabled: 'disabled',
    initial: 0
};

var arrows = new ArrowButtons('#parent', max, options);

arrows.onUpdate(function (index, direction) {
    console.log(index);
    console.log(direction);
});
```js

ArrowButtons
------------
Constructor  
@param {jQuery selector} - element that the arrow buttons are appended to  
@param {Number} - max value that the index can reach, the min value is always 0  
@param {Object} - object to change any of the default options  
@return {Object} - instance of ArrowButtons  

.setIndex
---------
@param {Number}  

.setMax
-------
@param {Number}  

.onUpdate
---------
@param {Function}
