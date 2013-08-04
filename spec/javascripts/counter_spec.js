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
      expect(counter.running).toBe(undefined);
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
