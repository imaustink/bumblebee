const path = require('path');
const ScriptStore = require('../lib/script-store');
const fsp = require('../lib/fs-promise');


function getFileContents(pipe, filePath){
	if(pipe){
		return Promise.resolve(pipe);
	}
	return fsp.readFile(filePath);
}

module.exports = function(config, pipe, [name], fileName){
	let scripts = new ScriptStore(config.external_scripts_path);
	let templateFilePath = path.join(__dirname, '..', 'template');
	if(fileName){
		templateFilePath = fsp.makeAbsolute(fileName);
	}
	return getFileContents(pipe, templateFilePath).then(template => {
		return scripts.create(name, template);
		// TODO add option to open created file in an editor
	}).then(() => `Created ${path.join(config.external_scripts_path, name)}.js`);
};
