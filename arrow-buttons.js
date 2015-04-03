/*  arrow-buttons
 *  version: 0.0.0
 *  https://stash.c2mpg.com:8443/projects/C2/repos/arrow-buttons
 *  @preserve
 */

/* exported ArrowButtons */

var ArrowButtons = (function ($) {
    'use strict';

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
    var update = function () {
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
        if (!this.emit) return;

        var i = this.index - 1;
        if (i < 0) {
            if (this.opts.style === 'finite') return;
            i = this.max;
        }

        this.index = i;
        update.call(this);
        this.emit('previous', i);
    };

    // context should be an instance of Arrow
    var nextIndex = function () {
        if (!this.emit) return;

        var i = this.index + 1;
        if (i > this.max) {
            if (this.opts.style === 'finite') return;
            i = 0;
        }

        this.index = i;
        update.call(this);
        this.emit('next', i);
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

        this.$previous = $(this.opts.previousHTML);
        this.$next = $(this.opts.nextHTML);

        this.$parent.append(this.$previous, this.$next);

        this.index = this.opts.initial;

        update.call(this);

        bindEvents.call(this);
    };

    Arrows.setMax = function (max) {
        if (this.max === max) return;
        this.max = max;
        update.call(this);
    };

    Arrows.setIndex = function (index) {
        if (this.index === index) return;
        this.index = index;
        update.call(this);
    };

    return Arrows;
}(jQuery));
