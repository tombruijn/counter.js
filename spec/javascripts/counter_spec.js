describe("Counter.js", function() {
  var element, counter;

  beforeEach(function() {
    element = $("<div>");
    counter = element.counter({autoStart: false}).data("plugin_counter");
  });

  describe("counter()", function(){
    it("should set plugin data attribute on element", function() {
      expect(typeof $("<div>").data("plugin_counter")).toEqual("undefined");
      expect(typeof counter).toEqual("object");
    });

    it("should execute start when a string with start is given", function() {
      expect(counter.running).toBeUndefined();
      element.counter("start");
      expect(counter.running).toBe(true);
    });

    it("should merge set options", function(){
      var onStart = function() { };
      var onComplete = function() { };
      var element = $("<div>");
      element.counter({
        autoStart: false,
        duration: 10,
        countFrom: 1,
        countTo: 2,
        placeholder: "?",
        easing: "linear",
        onStart: onStart,
        onComplete: onComplete
      });
      options = element.data("plugin_counter").options
      expect(options.autoStart).toBe(false);
      expect(options.duration).toBe(10);
      expect(options.countFrom).toBe(1);
      expect(options.countTo).toBe(2);
      expect(options.placeholder).toBe("?");
      expect(options.easing).toBe("linear");
      expect(options.onStart).toBe(onStart);
      expect(options.onComplete).toBe(onComplete);
    });

    it("should set defaults for undefined options", function(){
      var element = $("<div>");
      element.counter({ countFrom: 0, countTo: 1 });
      options = element.data("plugin_counter").options
      expect(options.autoStart).toBe(true);
      expect(options.duration).toBe(1500);
      expect(options.countFrom).toBe(0);
      expect(options.countTo).toBe(1);
      expect(options.easing).toBe("easeOutQuad");
    });

    describe("data-count-from attribute", function(){
      it("should load data-count-from attribute when set", function() {
        var element = $("<div data-count-from='1'>");
        element.counter({ countTo: 2 });
        options = element.data("plugin_counter").options
        expect(options.countFrom).toBe(1);
        expect(options.countTo).toBe(2);
      });

      it("should not load data-count-from attribute when option given", function() {
        var element = $("<div data-count-from='1'>");
        element.counter({ countFrom: 0, countTo: 2 });
        options = element.data("plugin_counter").options
        expect(options.countFrom).toBe(0);
        expect(options.countTo).toBe(2);
      });
    });

    describe("data-count-to attribute", function(){
      it("should load data-count-to attribute when set", function() {
        var element = $("<div data-count-to='1'>");
        element.counter({ countFrom: 0 });
        options = element.data("plugin_counter").options
        expect(options.countFrom).toBe(0);
        expect(options.countTo).toBe(1);
      });

      it("should not load data-count-from attribute when option given", function() {
        var element = $("<div data-count-to='1'>");
        element.counter({ countFrom: 0, countTo: 2 });
        options = element.data("plugin_counter").options
        expect(options.countFrom).toBe(0);
        expect(options.countTo).toBe(2);
      });
    });

    describe("element value", function(){
      it("should use the element value for countTo if larger than countFrom", function(){
        var element = $("<div>1</div>");
        element.counter({ countFrom: 0 });
        options = element.data("plugin_counter").options
        expect(options.countFrom).toBe(0);
        expect(options.countTo).toBe(1);
      });

      it("should use the element value for countFrom if larger than countTo", function(){
        var element = $("<div>1</div>");
        element.counter({ countTo: 2 });
        options = element.data("plugin_counter").options
        expect(options.countFrom).toBe(1);
        expect(options.countTo).toBe(2);
      });
    });

    describe("placeholder", function(){
      it("should set the placeholder in the HTML", function(){
        var element = $("<div>1</div>");
        element.counter({ autoStart: false, countFrom: 0, placeholder: "?" });
        expect(element[0].innerHTML).toBe("?");
      });
    });

    describe("numberFormatter", function(){
      it("should set format on element", function(){
        var element = $("<div>1</div>");
        element.counter({
          autoStart: true,
          countTo: 10,
          duration: 0,
          numberFormatter: function(number){
            return "$ " + number;
          }
        });
        expect(element[0].innerHTML).toBe("$ 10");
      });
    });
  });

  describe("start()", function(){
    var options = null;

    beforeEach(function() {
      element = $("<div>0</div>");
      options = {
        autoStart: false,
        duration: 1000,
        countFrom: 0,
        countTo: 1000,
        onStart: function() { },
        onComplete: function() { }
      };
      spyOn(options, "onStart");
      spyOn(options, "onComplete");
      counter = element.counter(options).data("plugin_counter");
      jQuery.fx.off = true;
    });

    it("should increment the element's value", function(){
      expect(element[0].innerHTML).toBe("0");
      counter.start();
      expect(element[0].innerHTML).toBe("1000");
    });

    it("should prevent calls when already running", function(){
      jQuery.fx.off = false;
      expect(options.onStart).not.toHaveBeenCalled();
      expect(options.onComplete).not.toHaveBeenCalled();
      expect(counter.running).toBeUndefined();

      counter.start();
      expect(counter.running).toBe(true);
      counter.start();
      counter.start();

      expect(options.onStart.calls.count()).toEqual(1);
      expect(options.onComplete.calls.count()).toEqual(0);
    });

    it("should trigger callbacks", function(){
      expect(options.onStart).not.toHaveBeenCalled();
      expect(options.onComplete).not.toHaveBeenCalled();
      counter.start();
      expect(options.onStart).toHaveBeenCalled();
      expect(options.onComplete).toHaveBeenCalled();
    });

    describe("runOnce option = true", function(){
      beforeEach(function() {
        element = $("<div>0</div>");
        options = {
          autoStart: false,
          duration: 0,
          countFrom: 0,
          countTo: 1000,
          runOnce: true,
          onStart: function() { },
          onComplete: function() { }
        };
        spyOn(options, "onStart");
        spyOn(options, "onComplete");
        counter = element.counter(options).data("plugin_counter");
        jQuery.fx.off = false;
      });

      it("should only run once", function(){
        expect(options.onStart).not.toHaveBeenCalled();
        expect(options.onComplete).not.toHaveBeenCalled();
        expect(counter.running).toBeUndefined();

        counter.start();
        expect(options.onStart.calls.count()).toEqual(1);
        expect(options.onComplete.calls.count()).toEqual(1);

        counter.start();
        expect(options.onStart.calls.count()).toEqual(1);
        expect(options.onComplete.calls.count()).toEqual(1);
      });
    });
  });

  describe("setNumber()", function(){
    it("should modify the element's innerHTML", function(){
      counter.setNumber(1);
      expect(element[0].innerHTML).toBe("1");
    });

    it("should round the value", function(){
      counter.setNumber(3.14);
      expect(element[0].innerHTML).toBe("3");
    });
  });
});
