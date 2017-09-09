const Script = require('../lib/get-script');
const fsp = require('./fs-promise');
const path = require('path');

function getFile(fileName){
	if(fileName){
		return fsp.readFile(fsp.makeAbsolute(fileName), 'utf8').then(file => {
			if(path.parse(fileName).ext == '.json'){
				return Promise.resolve(JSON.parse(file));
			}
			return Promise.resolve(file);
		});
	}
	return Promise.resolve();
}

function runAll(allScripts, pipe, file, context = {}){
	let script = allScripts.shift(); 
	if(script){
		return Promise.resolve().then(() => {
			return script.call(context, {pipe, file});
		}).then(out => {
			if(typeof out === 'string' || (out && typeof out.then === 'function')){
				return out;
			}
			// Coerce pipe to string for a consistent interface
			return JSON.stringify(out);
		}).then(out => {
			return runAll(allScripts, out, file, context);
		});
	}
	return pipe;
}

module.exports = function(config, pipe, scriptNames, fileName){
	return new Script(config).getAll(scriptNames).then(scripts => {
		return getFile(fileName).then(file => {
			return runAll(scripts, pipe, file);
		});
	});
};
