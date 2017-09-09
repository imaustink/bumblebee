const path = require('path');
const fsp = require('./fs-promise');
const inquirer = require('inquirer');
const config = require('../config');
const questions = require('../config-questions').filter(q => !config[q.name]);

module.exports = {
	init: function(){
		return inquirer.prompt(questions).then(answers => {
			// TODO make scripts directory if it doesn't already exist
			return this.config = Object.assign(this.config, answers);
		}).then(answers => {
			let configPath = path.join(__dirname, '..', '/config.json');
			let configUpdate = JSON.stringify(answers, null, '\t');
			return fsp.writeFile(configPath, configUpdate).then(() => {
				return answers;
			});
		});
	},
	get: function(){
		if(!questions.length){
			return Promise.resolve(this.config);	
		}
		return this.init();
	},
	config: config,
	get ready(){
		return !questions.length;
	}
};
