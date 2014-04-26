###
Counter.js
https://github.com/tombruijn/counter.js

Version: 0.0.3
Copyright (c) 2014 Tom de Bruijn

Counter.js is licensed under the MIT license.
https://github.com/tombruijn/counter.js/LICENSE
###

(($) ->
  pluginName = "counter"
  # Available options
  defaults =
    # Start counting automatically on plugin call.
    autoStart: true # true/false
    # Duration of the counter
    duration: 1500
    # If the given element contains a value larger than countTo it set on
    # countFrom
    countFrom: undefined # Defaults to 0 if not set
    # If the given element contains a value larger than countFrom it set on
    # countTo
    countTo: undefined # Defaults to 0 if not set
    # Run the counter only once
    runOnce: false # true/false
    # Placeholder to use before the counter has started.
    # Most useful with autoStart: false
    placeholder: undefined
    # Easing used by jQuery.animate
    easing: "easeOutQuad"
    # Callback called when the counter has started. No arguments.
    onStart: ->
    # Callback called when the counter is completed. No arguments.
    onComplete: ->
    # Format the displayed number with this function.
    # The given value is the number counted to at every step.
    # Return the value you want to display.
    numberFormatter: (number) ->
      Math.round(number)

  class Counter
    constructor: (@element, options) ->
      @options = $.extend true, {}, defaults, options
      @init()

  # Sets internal variables and sets placeholder.
  Counter::init = ->
    givenNumber = parseInt(@element.innerHTML)

    # Use number set in the HTML
    if givenNumber? && !isNaN(givenNumber)
      if @options.countFrom < givenNumber
        # Count up
        @options.countTo = givenNumber
      else
        # Count down
        @options.countFrom = givenNumber

    # Default values
    @options.countFrom = 0 if @options.countFrom == undefined
    @options.countTo = 0 if @options.countTo == undefined

    # Replace countTo with the given placeholder
    @element.innerHTML = @options.placeholder if @options.placeholder?

    # Start the counter if autoStart is on
    @start() if @options.autoStart

  # Starts the counter.
  # Will ignore any calls if it is already running.
  # Will ignore any calls if runOnce is true and it has already run once.
  Counter::start = ->
    return false if @options.runOnce && @runCount() >= 1

    unless @running
      @running = true
      @updateRunCount()
      @options.onStart()
      self = @
      jQuery(count: @options.countFrom).animate(count: @options.countTo,
        duration: @options.duration
        easing: @options.easing
        step: ->
          # Set the value to the DOM
          self.setNumber(this.count)
        complete: ->
          # Ensure the end result is always the given number
          self.setNumber(self.options.countTo)
          # Allow the counter to run again
          self.running = false
          self.options.onComplete()
      )

  # Update the run count for the counter.
  Counter::updateRunCount = ->
    $(@element).data("counterRunCount", (@runCount() || 0) + 1)

  # Return run count for counter.
  Counter::runCount = ->
    $(@element).data("counterRunCount")

  # Sets the given number in the element
  Counter::setNumber = (number) ->
    @element.innerHTML = @options.numberFormatter(number)

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
    @each ->
      if plugin = $(@).data("plugin_#{pluginName}")
        if typeof options == "string"
          switch options
            when "start"
              plugin.start()
      else
        $(@).data("plugin_#{pluginName}", new Counter(@, options))
)(jQuery)
