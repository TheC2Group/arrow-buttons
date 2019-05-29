var $ = require('jquery');
var ArrowButtons = require('../../cjs/arrow-buttons.js');

var $example1 = $('.Example1');
var arrows1 = new ArrowButtons($example1, 5);

arrows1.on('update', function (index) {
    $example1.attr('data-index', index);
});

var $example2 = $('.Example2');
var arrows2 = new ArrowButtons($example2, 5, {
    style: 'infinite'
});

arrows2.on('update', function (index) {
    $example2.attr('data-index', index);
});

var $example3 = $('.Example3');
var arrows3 = new ArrowButtons($example3, 5);

arrows3.on('update', function (index) {
    $example3.attr('data-index', index);
});
