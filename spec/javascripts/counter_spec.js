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
