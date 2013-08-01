# Counter.js

A _simple_ number counter in JavaScript as a jQuery plugin.
It counts the number set on an element using an easing effect.

## Example

The index.html file contains a working example of the counter.

## Usage

Simplest implementation:

```html
<!-- HTML -->
<div id="counter">1024</div>
```

```javascript
$("#counter").counter();
```

With options:

```javascript
// JavaScript
$("#counter").counter({
  autoStart: false, // true/false, default: true
  duration: 1000, // milliseconds, default: 1500
  startAt: 1, // start counting at this number, default: 0
  placeholder: "?", // replace the number with this before counting, most useful with autoStart: false
  easing: "swing" // see http://gsgd.co.uk/sandbox/jquery/easing/ for all available effects
});
```

## Installation

If you're just interested in using the script copy the `js/counter.js` file in your project. I don't recommend using the `js/jquery.js` and `js/jquery.easing.js` files that are available in this repository in your project. Instead download the latest ones from [jquery.com](http://jquery.com/) and [gsgd.co.uk (jQuery.easing)](http://gsgd.co.uk/sandbox/jquery/easing/)

## Contributing

Want to help make this better? Or just modify it? Here's how:

### Requirements

For development you will need a CoffeeScript compiler.
I use the one in [Node.js](http://nodejs.org).

### Compilation

Once you modified the CoffeeScript you will need to compile it to JavaScript.
There's a `Makefile` available in the repo to do so.

If you like entering commands in the terminal more, use one of these commands:

__One time compilation:__

`coffee --output js/ --compile js/counter.coffee`

__Compilation on save:__

`coffee --watch --compile ./js/counter.coffee`

### Testing

This project needs test coverage. ;)

## License

Counter.js released under the MIT License. See the bundled LICENSE file for details.
