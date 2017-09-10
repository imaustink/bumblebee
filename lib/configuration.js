const path = require('path');
const fsp = require('./fs-promise');
const fs = require('fs');
const inquirer = require('inquirer');
const questions = require('../config-questions');
const config = getConfigFile(path.join(__dirname, '..', 'config.json'));

module.exports = {
	init: function(){
		return inquirer.prompt(this.questions).then(answers => {
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
		if(!this.questions.length){
			return Promise.resolve(this.config);	
		}
		return this.init();
	},
	get questions(){
		return questions.filter(q => !config[q.name])
	},
	get ready(){
		return !this.questions.length;
	},
	config: config
};

function getConfigFile(configPath){
	if(!fs.existsSync(configPath)){
		fs.writeFileSync(configPath, '{}\n', 'utf8');
	}
	return require(configPath);
}
