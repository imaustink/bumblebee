const path = require('path');
const ScriptStore = require('./script-store');

module.exports = class GetScripts{
	constructor(config){
		this.external = new ScriptStore(config.external_scripts_path);
		this.internal = new ScriptStore(path.join(__dirname, '..', 'scripts'));
	}
	getAll(names){
		return Promise.all(names.map(name => this.get(name)));
	}
	get(name){
		if(this.external.exists(name)){
			return this.external.get(name);
		}
		if(this.internal.exists(name)){
			return this.internal.get(name);
		}
		return Promise.reject(new Error(`${name} not found!`));
	}
};
