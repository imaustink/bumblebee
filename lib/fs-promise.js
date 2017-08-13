const fs = require('fs');
const promisify = require('./promisify');

module.exports = {
	readFile: promisify(fs.readFile),
	writeFile: promisify(fs.writeFile),
	unlink: promisify(fs.unlink)
};
