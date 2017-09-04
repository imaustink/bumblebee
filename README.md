# bumble-bee

bumble-bee is a data transformation CLI. Just provide a transformation script and pipe data to it.

## Install

- $ `npm i bumble-bee -g`

## Usage

- $ `cowsay moo | bee run -f map.json replace-map`

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
Transformation scripts can return any value, even a `Promise`.

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

## Options

```
-V, --version      output the version number
-f, --file [file]  Path to input file to be passed to transformation(s)
-p, --pretty       Indent JSON output
-h, --help         output usage information
```
