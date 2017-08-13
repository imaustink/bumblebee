const fs = require('fs');
const path = require('path');
const fsp = require('./fs-promise');

class ScriptStore{
	constructor(dir){
		this.dir = dir;
		this.files = fs.readdirSync(dir);
	}
	create(name, script){
		if(this.exists(name)){
			return Promise.reject(new Error(`Cannot overwrite ${name}!`));
		}
		return this.writeFile(name, script).then(() => {
			this.files.push(name);
		});
	}
	get(name){
		if(this.exists(name)){
			return Promise.resolve(require(this.getPath(name)));
		}
		return Promise.resolve(require(name));
	}
	update(name, script){
		if(this.exists(name)){
			return this.writeFile(name, script);
		}
		return this.create(name, script);
	}
	delete(name){
		if(this.exists(name)){
			return fsp.unlink(this.getPath(name));
		}
	}
	exists(name){
		return this.files.some(f => path.parse(f).name === name);
	}
	writeFile(name, script){
		return fsp.writeFile(this.getPath(name), script, 'utf8');
	}
	getPath(name){
		return path.join(this.dir, name);
	}
}

module.exports = ScriptStore;
