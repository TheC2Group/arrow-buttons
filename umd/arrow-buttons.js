/*!
 * c2-arrow-buttons
 * https://github.com/TheC2Group/arrow-buttons
 * @version 2.1.0
 * @license MIT (c) The C2 Group (c2experience.com)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('c2-event-handler')) :
    typeof define === 'function' && define.amd ? define(['jquery', 'c2-event-handler'], factory) :
    global.ArrowButtons = factory(global.jQuery,global.eventHandler);
}(this, function ($,eventHandler) { 'use strict';

    var defaults = {
        previousHTML: '<a href="#" class="previous"><span class="Hidden">Go to previous item</span></a>',
        nextHTML: '<a href="#" class="next"><span class="Hidden">Go to next item</span></a>',
        style: 'finite',
        attribute: 'data-state',
        enabled: 'enabled',
        disabled: 'disabled',
        initial: 0
    };

    // context should be an instance of Arrow
    var setPreviousState = function setPreviousState(value) {
        if (this._previousState === value) return;
        this._previousState = value;
        this.$previous.attr(this.opts.attribute, value);

        if (value === this.opts.disabled) {
            this.$previous.attr('aria-disabled', 'true');
        } else {
            this.$previous.removeAttr('aria-disabled');
        }
    };

    // context should be an instance of Arrow
    var setNextState = function setNextState(value) {
        if (this._nextState === value) return;
        this._nextState = value;
        this.$next.attr(this.opts.attribute, value);

        if (value === this.opts.disabled) {
            this.$next.attr('aria-disabled', 'true');
        } else {
            this.$next.removeAttr('aria-disabled');
        }
    };

    // context should be an instance of Arrow
    var updateButtons = function updateButtons() {
        if (this.opts.style !== 'finite') return;
        if (this.index < 1) {
            setPreviousState.call(this, this.opts.disabled);
        } else {
            setPreviousState.call(this, this.opts.enabled);
        }

        if (this.index >= this.max) {
            setNextState.call(this, this.opts.disabled);
        } else {
            setNextState.call(this, this.opts.enabled);
        }
    };

    // context should be an instance of Arrow
    var previousIndex = function previousIndex() {
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
    var nextIndex = function nextIndex() {
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
    var bindEvents = function bindEvents() {
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

    var Arrows = function Arrows(parent, max, options) {
        this.$parent = $(parent);
        this.max = max;
        this.opts = $.extend({}, defaults, options);

        this.$previous = $(this.opts.previousHTML);
        this.$next = $(this.opts.nextHTML);

        this._previousState = this.$previous.attr(this.opts.attribute);
        this._nextState = this.$next.attr(this.opts.attribute);

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

    return Arrows;

}));