# Counter.js

A _simple_ and _small_ number counter in JavaScript as a
[jQuery](http://jquery.com) plugin.
It counts to or down to the number set on an element using an easing effect.

You can configure certain options such as a duration, easing effect, auto start,
start at count, placeholder (for use with auto start) and it supports callbacks.

## Example

The index.html file contains a working example of the counter.

It's also live at
[tombruijn.github.io/counter.js](http://tombruijn.github.io/counter.js).

## Usage

__Simplest implementation:__

```html
<!-- HTML -->
<div id="counter">1024</div>
```

```javascript
// JavaScript
$("#counter").counter();
```

__With some more options:__

```javascript
// JavaScript
$("#counter").counter({
  autoStart: false,           // true/false, default: true
  duration: 5000,             // milliseconds, default: 1500
  countFrom: 10,              // start counting at this number, default: 0
  countTo: 30,                // count to this number, default: 0
  runOnce: true,              // only run the counter once, default: false
  placeholder: "?",           // replace the number with this before counting,
                              // most useful with autoStart: false. default: undefined
  easing: "easeOutCubic",     // see http://gsgd.co.uk/sandbox/jquery/easing
                              // for all available effects, see visual examples:
                              // http://easings.net
                              // default: "easeOutQuad"
  onStart: function() {},     // callback on start of the counting
  onComplete: function() {},  // callback on completion of the counting
  numberFormatter:            // function used to format the displayed numbers.
    function(number) {
      return "$ " + number;
    }
});
```

Counter.js supports counting up and counting down.
If either countFrom or countTo is not set it will try to determine which value
you meant by its innerHTML of the element and the countFrom and countTo options.
You can also not set an innerHTML value on the element and use both options.

### `autoStart: false`

When the `autoStart` option is set to false you have to start the counter using
the `"start"` command on the element like so:

```js
$("#counter").counter("start");
```

### `data-count-from` and `data-count-to` attributes

You can set the `countFrom` and `countTo` options with a data attribute on the
element instead of an option as well. However, when the option is given in
JavaScript that option is used instead.

```html
<div data-count-from="1"></div>
```

```js
$("#counter").counter();
# countFrom is now: 1

# When given as an option:
$("#counter").counter({ countFrom: 2 });
# countFrom is now: 2
```

## Installation

If you're just interested in just using the script then copy the
`js/counter.min.js` file in your project.
Then add the libraries as described in `Requirements` below.

## Requirements

You will need two libraries, jQuery (works with v2 and up, v1.64 and up
(I use as little jQuery as possible)) and the jQuery easing plugin (v1.3)
which is optional. You only need jQuery easing when you need a different
counting effect than swing.

Make sure to add these files to your project in this order:

```javascript
jquery.js        // Download from: http://jquery.com
jquery.easing.js // Download from: http://gsgd.co.uk/sandbox/jquery/easing/
counter.js       // Is located in this repository under `js/counter.js`
                 // A minified version is also available.
```

_(I don't recommend you using the `js/jquery.js` and `js/jquery.easing.js` files
that are available in this repository in your project.
Instead download the latest ones from [jquery.com](http://jquery.com/) and
[gsgd.co.uk (jQuery.easing)](http://gsgd.co.uk/sandbox/jquery/easing/).)_

## Contributing

When you find a bug, please report it in the issue tracker on
[GitHub](https://github.com/tombruijn/counter.js/issues).

If you're missing a feature, want to help make this project better or just
want to modify it?
Fork the project on [GitHub](https://github.com/tombruijn/counter.js)
(and send in a Pull Request).

Do you need help to start the development? Here's how:

### Requirements

For development you will need at least the CoffeeScript compiler.
The JavaScript minifier is not required, but it can't hurt to run your specs
with the minified version as well.

I use the [coffee-script](https://github.com/jashkenas/coffee-script) package in
[Node.js](http://nodejs.org) for compilation.

For minification I use [UglifyJS2](https://github.com/mishoo/UglifyJS2).

### Compilation

Compiled and minified javascript should **not** be committed in pull requests.
This will be done with every new release instead.

Use the bundled `Makefile` to compile and minify the original coffeescript file.
It's as simple as running `make` inside the project's directory.
Do make sure that all the required Node.js packages are installed.

```
make
```

For development purposes I recommend using the watch feature on the
`coffee-script` package so it will compile on every file change.

`coffee --watch --compile ./js/counter.coffee`

### Testing

This project is tested with [Jasmine](http://jasmine.github.io/) 2.0.

In the spec directory you can find all the tests for this project.
The spec suite expects a compiled `counter.js` file to be available in the
`js` directory, so make sure you have compiled it before testing.

The project uses the Jasmine Ruby gem so I don't have to copy Jasmine into this
project.

Start the Jasmine server with `rake jasmine` and visit the returned url.

## Code status

[![Build Status](https://travis-ci.org/tombruijn/counter.js.png)](https://travis-ci.org/tombruijn/counter.js)

## License

Counter.js released under the MIT License. See the bundled LICENSE file for
details.
