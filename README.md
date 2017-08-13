# Fuck

Fuck is a data transformation CLI. Just provide a transformation script and pipe data to it.

## Install

- $ `npm i fuck -g`

## Usage

- $ `cowsay moo | fuck -s replace -f replace-map.json`

__`replace.js`:__
```javascript
module.exports = function({pipe, file}){
	let map = JSON.parse(file);
	for(var key in map){
		if(map.hasOwnProperty(key)){
			pipe = pipe.replace(key, map[key]);
		}
	}
	return pipe;
};
```
Transformation scripts can return any value, even a `Promise`.

__`replace-map.json`:__
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

## Options

```
-V, --version          output the version number
-s, --script [module]  Name of script to handle transformation
-f, --file [file]      Path to input file to be passed to transformation
-h, --help             output usage information
```
