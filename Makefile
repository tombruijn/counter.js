all:
	coffee --output js/ --compile js/counter.coffee
	uglifyjs js/counter.js -o js/counter.min.js -c hoist_vars=false,if_return=false --comments /license/
