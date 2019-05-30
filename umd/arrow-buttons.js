/*!
 * c2-arrow-buttons
 * https://github.com/TheC2Group/arrow-buttons
 * @version 2.3.1
 * @license MIT (c) The C2 Group (c2experience.com)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global = global || self, global.ArrowButtons = factory(global.jQuery));
}(this, function ($) { 'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

    var on = function (event, fn) {
      var _this = this;

      if (typeof event !== 'string' || !event.length || typeof fn === 'undefined') return;

      if (event.indexOf(' ') > -1) {
        event.split(' ').forEach(function (eventName) {
          on.call(_this, eventName, fn);
        });
        return;
      }

      this._events = this._events || {};
      this._events[event] = this._events[event] || [];

      this._events[event].push(fn);
    };

    var off = function (event, fn) {
      var _this2 = this;

      if (typeof event !== 'string' || !event.length) return;

      if (event.indexOf(' ') > -1) {
        event.split(' ').forEach(function (eventName) {
          off.call(_this2, eventName, fn);
        });
        return;
      }

      this._events = this._events || {};
      if (event in this._events === false) return;

      if (typeof fn === 'undefined') {
        delete this._events[event];
        return;
      }

      var index = this._events[event].indexOf(fn);

      if (index > -1) {
        if (this._events[event].length === 1) {
          delete this._events[event];
        } else {
          this._events[event].splice(index, 1);
        }
      }
    };

    var emit = function (event) {
      var _this3 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var lastIndex = event.lastIndexOf(':');

      if (lastIndex > -1) {
        emit.call.apply(emit, [this, event.substring(0, lastIndex)].concat(args));
      }

      this._events = this._events || {};
      if (event in this._events === false) return;

      this._events[event].forEach(function (fn) {
        fn.apply(_this3, args);
      });
    };

    var EventConstructor = function () {};

    var proto = EventConstructor.prototype;
    proto.on = on;
    proto.off = off;
    proto.emit = emit; // legacy extensions

    proto.bind = on;
    proto.unbind = off;
    proto.trigger = emit;

    var handler = function (_class) {
      // constructor
      if (arguments.length === 0) {
        return new EventConstructor();
      } // mixin


      if (typeof _class === 'function') {
        _class.prototype.on = on;
        _class.prototype.off = off;
        _class.prototype.emit = emit;
      }

      if (typeof _class === 'object') {
        _class.on = on;
        _class.off = off;
        _class.emit = emit;
      }

      return _class;
    };

    handler.EventConstructor = EventConstructor;
    var eventHandler = handler;

    const defaults = {
      previousHTML: '<a href="#" class="previous" role="button"><span class="Hidden">Go to previous item</span></a>',
      nextHTML: '<a href="#" class="next" role="button"><span class="Hidden">Go to next item</span></a>',
      style: 'finite',
      attribute: 'data-state',
      enabled: 'enabled',
      disabled: 'disabled',
      initial: 0
    }; // context should be an instance of Arrow

    const setPreviousState = function setPreviousState(value) {
      if (this._previousState === value) return;
      this._previousState = value;
      this.$previous.attr(this.opts.attribute, value);

      if (value === this.opts.disabled) {
        this.$previous.attr('aria-disabled', 'true');
      } else {
        this.$previous.removeAttr('aria-disabled');
      }
    }; // context should be an instance of Arrow


    const setNextState = function setNextState(value) {
      if (this._nextState === value) return;
      this._nextState = value;
      this.$next.attr(this.opts.attribute, value);

      if (value === this.opts.disabled) {
        this.$next.attr('aria-disabled', 'true');
      } else {
        this.$next.removeAttr('aria-disabled');
      }
    }; // context should be an instance of Arrow


    const updateButtons = function updateButtons() {
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
    }; // context should be an instance of Arrow


    const previousIndex = function previousIndex() {
      let i = this.index - 1;

      if (i < 0) {
        if (this.opts.style === 'finite') return;
        i = this.max;
      }

      this.index = i;
      updateButtons.call(this);
      this.emit('update:previous', i);
    }; // context should be an instance of Arrow


    const nextIndex = function nextIndex() {
      let i = this.index + 1;

      if (i > this.max) {
        if (this.opts.style === 'finite') return;
        i = 0;
      }

      this.index = i;
      updateButtons.call(this);
      this.emit('update:next', i);
    }; // context should be an instance of Arrow


    const bindEvents = function bindEvents() {
      this.$previous.on('click', e => {
        e.preventDefault();
        previousIndex.call(this);
        this.emit('click:previous');
      });
      this.$next.on('click', e => {
        e.preventDefault();
        nextIndex.call(this);
        this.emit('click:next');
      });
    };

    const Arrows = function Arrows(parent, max, options) {
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
