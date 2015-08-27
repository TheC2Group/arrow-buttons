(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ArrowButtons = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Arrow Buttons
 * https://stash.c2mpg.com:8443/projects/C2/repos/arrow-buttons
 * @version 1.2.0
 * @license MIT (c) The C2 Group (c2experience.com)
 */

'use strict';

var $ = jQuery || require('jquery');

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

var emit = function (index, direction) {
    this._listeners.forEach(function (cb) {
        cb(index, direction);
    });
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
    emit.call(this, i, 'previous');
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
    emit.call(this, i, 'next');
};

// context should be an instance of Arrow
var bindEvents = function () {
    var self = this;
    this.$previous.on('click', function (e) {
        e.preventDefault();
        previousIndex.call(self);
    });
    this.$next.on('click', function (e) {
        e.preventDefault();
        nextIndex.call(self);
    });
};

var Arrows = function (parent, max, options) {
    this.$parent = $(parent);
    this.max = max;
    this.opts = $.extend({}, defaults, options);
    this._listeners = [];

    this.$previous = $(this.opts.previousHTML);
    this.$next = $(this.opts.nextHTML);

    this.$parent.append(this.$previous, this.$next);

    this.index = this.opts.initial;

    updateButtons.call(this);

    bindEvents.call(this);
};

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

Arrows.prototype.onUpdate = function (cb) {
    if (typeof cb !== 'function') return;
    this._listeners.push(cb);
    return this;
};

module.exports = Arrows;

},{"jquery":undefined}]},{},[1])(1)
});