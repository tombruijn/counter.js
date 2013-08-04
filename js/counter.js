/*
Counter.js
https://github.com/tombruijn/counter.js
(c) 2013 Tom de Bruijn

A _simple_ number counter in JavaScript as a jQuery plugin.

Version: 0.0.1
Updated: 2013-08-04

Counter.js is licensed under the MIT license.
jQuery is also licensed under the MIT license.
The jQuery easing plugin Counter.js uses is licensed under the BSD license.

---

The MIT License (MIT)

Copyright (c) 2013 Tom de Bruijn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function() {

  (function($) {
    var Counter, defaults, pluginName;
    pluginName = "counter";
    defaults = {
      autoStart: true,
      duration: 1500,
      countFrom: void 0,
      countTo: void 0,
      placeholder: void 0,
      easing: "easeOutQuad",
      onStart: function() {},
      onComplete: function() {}
    };
    Counter = (function() {

      function Counter(element, options) {
        this.element = element;
        this.options = $.extend(true, {}, defaults, options);
        this.init();
      }

      return Counter;

    })();
    Counter.prototype.init = function() {
      var givenNumber;
      givenNumber = parseInt(this.element.innerHTML);
      if ((givenNumber != null) && !isNaN(givenNumber)) {
        if (this.options.countFrom < givenNumber) {
          this.options.countTo = givenNumber;
        } else {
          this.options.countFrom = givenNumber;
        }
      }
      if (this.options.countFrom === void 0) {
        this.options.countFrom = 0;
      }
      if (this.options.countTo === void 0) {
        this.options.countTo = 0;
      }
      if (this.options.placeholder != null) {
        this.element.innerHTML = this.options.placeholder;
      }
      if (this.options.autoStart) {
        return this.start();
      }
    };
    Counter.prototype.start = function() {
      var self;
      if (!this.running) {
        this.running = true;
        this.options.onStart();
        self = this;
        return jQuery({
          count: this.options.countFrom
        }).animate({
          count: this.options.countTo
        }, {
          duration: this.options.duration,
          easing: this.options.easing,
          step: function() {
            return self.setNumber(this.count);
          },
          complete: function() {
            self.setNumber(self.options.countTo);
            self.running = false;
            return self.options.onComplete();
          }
        });
      }
    };
    Counter.prototype.setNumber = function(number) {
      return this.element.innerHTML = Math.round(number);
    };
    return $.fn.counter = function(options) {
      var self;
      self = this;
      return this.each(function() {
        var plugin;
        if (plugin = $(this).data("plugin_" + pluginName)) {
          if (typeof options === "string") {
            switch (options) {
              case "start":
                return plugin.start();
            }
          }
        } else {
          return $(this).data("plugin_" + pluginName, new Counter(this, options));
        }
      });
    };
  })(jQuery);

}).call(this);
