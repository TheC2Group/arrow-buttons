/*!
 * Arrow Buttons
 * https://stash.c2mpg.com:8443/projects/C2/repos/arrow-buttons
 * @version 1.2.0
 * @license MIT (c) The C2 Group (c2experience.com)
 */

'use strict';

var $ = require('jquery');
var eventHandler = require('c2-event-handler');

var defaults = {
    previousHTML: '<a href="#" class="previous"><span class="Hidden">Go to previous item</span></a>',
    nextHTML: '<a href="#" class="next"><span class="Hidden">Go to next item</span></a>',
    style: 'finite',
    attribute: 'data-status',
    enabled: 'enabled',
    disabled: 'disabled',
    initial: 0
};

// context should be an instance of Arrow
var setPrevious = (function () {
    var cache;
    return function (value) {
        if (cache === value) return;
        this.$previous.attr(this.opts.attribute, value);

        if (value === this.opts.disabled) {
            this.$previous.attr('aria-disabled', 'true');
        } else {
            this.$previous.removeAttr('aria-disabled');
        }
    };
}());

// context should be an instance of Arrow
var setNext = (function () {
    var cache;
    return function (value) {
        if (cache === value) return;
        this.$next.attr(this.opts.attribute, value);

        if (value === this.opts.disabled) {
            this.$next.attr('aria-disabled', 'true');
        } else {
            this.$next.removeAttr('aria-disabled');
        }
    };
}());

// context should be an instance of Arrow
var updateButtons = function () {
    if (this.opts.style !== 'finite') return;
    if (this.index < 1) {
        setPrevious.call(this, this.opts.disabled);
    } else {
        setPrevious.call(this, this.opts.enabled);
    }

    if (this.index >= this.max) {
        setNext.call(this, this.opts.disabled);
    } else {
        setNext.call(this, this.opts.enabled);
    }
};

// context should be an instance of Arrow
var previousIndex = function () {
    var i = this.index - 1;
    if (i < 0) {
        if (this.opts.style === 'finite') return;
        i = this.max;
    }

    this.index = i;
    updateButtons.call(this);
    this.emit('update:previous', i);
};

// context should be an instance of Arrow
var nextIndex = function () {
    var i = this.index + 1;
    if (i > this.max) {
        if (this.opts.style === 'finite') return;
        i = 0;
    }

    this.index = i;
    updateButtons.call(this);
    this.emit('update:next', i);
};

// context should be an instance of Arrow
var bindEvents = function () {
    var self = this;
    this.$previous.on('click', function (e) {
        e.preventDefault();
        previousIndex.call(self);
        self.emit('click:previous');
    });
    this.$next.on('click', function (e) {
        e.preventDefault();
        nextIndex.call(self);
        self.emit('click:next');
    });
};

var Arrows = function (parent, max, options) {
    this.$parent = $(parent);
    this.max = max;
    this.opts = $.extend({}, defaults, options);

    this.$previous = $(this.opts.previousHTML);
    this.$next = $(this.opts.nextHTML);

    this.$parent.append(this.$previous, this.$next);

    this.index = this.opts.initial;

    updateButtons.call(this);

    bindEvents.call(this);
};

eventHandler(Arrows);

Arrows.prototype.setMax = function (max) {
    if (this.max === max) return;
    this.max = max;
    updateButtons.call(this);
    return this;
};

Arrows.prototype.setIndex = function (index) {
    if (this.index === index) return;
    this.index = index;
    updateButtons.call(this);
    return this;
};

Arrows.prototype.nextIndex = nextIndex;
Arrows.prototype.previousIndex = previousIndex;

module.exports = Arrows;
