/*
Counter.js
https://github.com/tombruijn/counter.js

Version: 0.0.3
Copyright (c) 2014 Tom de Bruijn

Counter.js is licensed under the MIT license.
https://github.com/tombruijn/counter.js/LICENSE
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
      runOnce: false,
      placeholder: void 0,
      easing: "easeOutQuad",
      onStart: function() {},
      onComplete: function() {},
      numberFormatter: function(number) {
        return Math.round(number);
      }
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
      givenNumber = parseFloat(this.element.innerHTML);
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
      if (this.options.runOnce && this.runCount() >= 1) {
        return false;
      }
      if (!this.running) {
        this.running = true;
        this.updateRunCount();
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
    Counter.prototype.updateRunCount = function() {
      return $(this.element).data("counterRunCount", (this.runCount() || 0) + 1);
    };
    Counter.prototype.runCount = function() {
      return $(this.element).data("counterRunCount");
    };
    Counter.prototype.setNumber = function(number) {
      return this.element.innerHTML = this.options.numberFormatter(number);
    };
    return $.fn.counter = function(options) {
      var countFromAttr, countToAttr, self;
      self = this;
      countToAttr = parseFloat($(this).attr("data-count-to"));
      countFromAttr = parseFloat($(this).attr("data-count-from"));
      if (typeof options !== "string") {
        if (!(options.countTo != null) && countToAttr) {
          options.countTo = countToAttr;
        }
        if (!(options.countFrom != null) && countFromAttr) {
          options.countFrom = countFromAttr;
        }
      }
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
