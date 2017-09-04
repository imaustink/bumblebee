const fs = require('fs');
const path = require('path');
const promisify = require('./promisify');

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
	makeAbsolute,
};
