const os = require('os');
const path = require('path');
const EXTERNAL_SCRIPTS_PATH = path.join(os.homedir(), 'bee-scripts');

module.exports = [
	{
		type: 'text',
		name: 'external_scripts_path',
		message: 'Please choose a directory to store scripts in',
		default: EXTERNAL_SCRIPTS_PATH
	}
];
