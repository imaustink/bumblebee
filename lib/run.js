const Script = require('../lib/get-script');
const getConfig = require('./get-config');
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
		}).then((result) => {
			// Coerce pipe to string for a consistent interface
			if(typeof result === 'object'){
				result = JSON.stringify(result);
			}
			return runAll(allScripts, result, file, context);
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
