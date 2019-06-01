# @sapper-dragon/json

Decorate your [Sapper](https://sapper.svelte.dev/) project with generated dummy JSON.

## Installation

```
npm install @sapper-dragon/json --save-dev
# or
yarn add @sapper-dragon/json --dev
```

## Usage

This project requires the [@sapper-dragon/trimmings](https://github.com/sapper-dragon/trimmings) lib, so look there first for instructions, then come back. 💫

### JSON Ipsum

After installing, `@sapper-dragon/json` will watch for changes to `*.js` files in `src/trimmings/json`, and generate a resulting `*.json` file in `static/json` based on the rules setup in your js file.

Rules are simple. In your `src/trimmings/json/*.js` file, export a `compile` function like so:

```js
export const compile = () => {
	const result = // create your json here...
	console.log(JSON.stringify(result))
}
```

Note the critical

```js
console.log(JSON.stringify(result))
```

at the end of the `compile` function. `@sapper-dragon/json` needs this to read the output of `compile` and save it to a `*.json` file. In other words, the rest of the contents of the `compile` function can be anything you like, as long as the logged result is valid stringified JSON data.

### Config

You can place a `trimmings.config.js` file in the root of your project to set configutations. These are the defaults:

```js
export default {
	json: {
		input: 'src/trimmings/json', // path to watch *.js files
		filter: /\.js$/, // pattern for files to watch
		outputStatic: 'static/json', // output path
	},
	// ... additional settings from other @sapper-dragon packages...
}
```
