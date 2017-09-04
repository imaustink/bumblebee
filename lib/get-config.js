const path = require('path');
const fsp = require('./fs-promise');
const inquirer = require('inquirer');
const config = require('../config');
const questions = require('../config-questions').filter(q => !config[q.name]);

module.exports = function(){
	return inquirer.prompt(questions).then(answers => {
		// TODO make scripts directory if it doesn't already exist
		return Object.assign(config, answers);
	}).then(answers => {
		let configPath = path.join(__dirname, '..', '/config.json');
		let configUpdate = JSON.stringify(answers, null, '\t');
		return fsp.writeFile(configPath, configUpdate).then(() => {
			return answers;
		});
	});
};
