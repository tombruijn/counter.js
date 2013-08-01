###
Counter.js
https://github.com/tombruijn/counter.js

A _simple_ number counter in JavaScript as a jQuery plugin.
It counts the number set on an element using an easing effect.

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
###

(($, window, document) ->
  pluginName = "counter"
  # Available options
  defaults =
    autoStart: true
    duration: 1500
    startAt: 0
    placeholder: 0
    easing: "easeOutQuad"
    onStart: ->
    onComplete: ->

  class Counter
    constructor: (@element, options) ->
      @options = $.extend true, {}, defaults, options
      @init()

  # Sets internal variables and sets placeholder
  Counter::init = ->
    # Save the maxNumber for reference
    @maxNumber = parseInt(@element.innerHTML)

    # Replace maxNumber with the given placeholder
    @element.innerHTML = @options.placeholder

    # Start the counter if autoStart is on
    @start() if @options.autoStart

  # Starts the counter
  # Will ignore any calls to it if it is already running.
  Counter::start = ->
    unless @running
      @running = true
      @options.onStart()
      self = @
      jQuery(count: @options.startAt).animate(count: @maxNumber,
        duration: @options.duration
        easing: @options.easing
        step: ->
          # Set the value to the DOM
          self.setNumber(this.count)
        complete: ->
          # Allow the counter to run again
          self.running = false
          self.options.onComplete()
      )

  # Sets the given number in the element
  Counter::setNumber = (number) ->
    @element.innerHTML = Math.round(number)

  # example usage:
  #
  # - $("selector").counter({option: value})
  # - $("selector").counter("command")
  #
  # available commands:
  # - start
  #   starts the counter
  $.fn.counter = (options) ->
    self = @
    self.elementI = 0
    @each ->
      if plugin = $(@).data("plugin_#{pluginName}")
        if typeof options == "string"
          switch options
            when "start"
              plugin.start()
      else
        $(@).data("plugin_#{pluginName}", new Counter(@, options))

)(jQuery, window, document)
