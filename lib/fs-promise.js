const fs = require('fs');
const path = require('path');
const promisify = require('./promisify');
const existsSync = fs.existsSync;
const mkdirSync = fs.mkdirSync;

function mkdirRecursiveWrap(p){
	return mkdirRecursiveSync(p.substr(1).split(path.sep));
}

function mkdirRecursiveSync(fp, p){
	if(!fp.length){
		return true;
	}
	var dir = path.join('/', fp.shift());
	if(p){
		dir = path.join(p, dir);
	}
	if(!existsSync(dir)){
		mkdirSync(dir);
	}
	mkdirRecursiveSync(fp, dir);
}

function makeAbsolute(file){
	if(path.isAbsolute(file)){
		return file;
	}
	return path.join(process.cwd(), file);
}

module.exports = {
	readFile: promisify(fs.readFile),
	writeFile: promisify(fs.writeFile),
	unlink: promisify(fs.unlink),
	mkdirRecursiveSync: mkdirRecursiveWrap,
	readdirSync: fs.readdirSync,
	existsSync: fs.existsSync,
	writeFileSync: fs.writeFileSync,
	makeAbsolute
};
