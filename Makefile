.PHONY: test clean unit e2e

dev:
	rm -rf example &&\
	node src/index.js -t vue-eslint

publish:
	npm publish

test:
	./node_modules/mocha/bin/mocha \
	--timeout 10000 \
	./test/*.spec.js  ./test/unit/*.spec.js