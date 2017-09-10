const path = require('path');
const fsp = require('./fs-promise');

class ScriptStore{
	constructor(dir){
		if(!fsp.existsSync(dir)){
			fsp.mkdirRecursive(dir);
		}
		this.dir = dir;
		this.files = fsp.readdirSync(dir);
	}
	create(name, script){
		if(this.exists(name)){
			return Promise.reject(new Error(`Cannot overwrite "${name}.js"!`));
		}
		let fullName = `${name}.js`;
		return this.writeFile(fullName, script).then(() => {
			this.files.push(fullName);
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
