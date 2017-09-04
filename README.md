# bumble-bee

Bee transforms data using modules referred to as "transformations". It can run data through a single transformation or a pipeline of many transformations. The data returned from the last script will be written to standard out.

## Install

- $ `npm i bumble-bee -g`

## Basic Usage

- $ `cowsay moo | bee --file map.json run replace-map`
	- Pipe text to `bee`, load `map.json` file, and execute `replace-map.js`

__`replace-map.js`:__
```javascript
module.exports = function({pipe, file}){
	for(var key in file){
		if(file.hasOwnProperty(key)){
			pipe = pipe.replace(key, file[key]);
		}
	}
	return pipe;
};
```

__`map.json`:__
```json
{
	"moo": "foo"
}
```

__Output:__
```
 _____
< foo >
 ----- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Help

```
Usage: bee [options] [command]

Options:
	-V, --version      output the version number
	-f, --file [file]  Path to input file to be passed to transformation(s)
	-p, --pretty       Indent JSON output
	-h, --help         output usage information

Commands:
	run <script> [moreScripts...]  Execute transformation(s).
	add <name>                     Create new transformation script
```

# How Transformations Work

A transformation is just a module that exports a function.
 
Bee will call transformations with an `object` as the first argument, the `object` will have `pipe` and `file` properties, `pipe` being the text that was piped to bee, `file` being the contents of the file specified with the `--file` argument, files with a `.json` extension will be parse automatically.
 
The value returned by the transformation will be serialized if not already a `string`, with the exception of `Promise`s, the resolved value will be used instead, and serialized, if needed. The value will then be passed to the next transformation, or written to standard out if there is no remaining transformations specified.

__Example Transformation:__
```javascript
module.exports = function({pipe, file}){
	// Modify pipe here
	return pipe; // Return value or promise
};
```
