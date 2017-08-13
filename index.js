const path = require('path');
const ScriptStore = require('./lib/script-store');
const getConfig = require('./lib/get-config');
const fsp = require('./lib/fs-promise');

function makeAbsolute(file){
	if(path.isAbsolute(file)){
		return file;
	}
	return path.join(process.cwd(), file);
}

module.exports = function({script, file}, pipe){
	var promises = [
		getConfig()
	];
	if(file){
		promises.push(fsp.readFile(makeAbsolute(file), 'utf8'));
	}
	return Promise.all(promises).then(([config, file]) => {
		let scriptStore = new ScriptStore(config.scripts_path);
		return scriptStore.get(script).then(script => {
			return script({pipe, file});
		});
	});
};
