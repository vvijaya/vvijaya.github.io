#!bin/sh

start:
	rm -rf ./.cache ./src.* && \
	node_modules/.bin/parcel build ./src/index.html --public-url / -d ./ && \
	mv ./index.html ./_layouts/index.html && \
	export JEKYLL_GITHUB_TOKEN=dfe906a7aaeaa7bd3bf8bbf5e5577ff94fcd8a44 && \
	bundle exec jekyll serve
