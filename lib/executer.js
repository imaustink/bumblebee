const getConfig = require('./get-config');
const getPipe = require('./stdin');
const commands = {
	run: require('./run'),
	add: require('./add'),
};

function getExecuter(cmd, program){
	return (script, additionalScripts) => {
		let allScripts = [script];
		if(additionalScripts){
			allScripts = allScripts.concat(additionalScripts);
		}
		// Get pipe before config since config runs inquirer,
		// and inquirer dicks with stdin
		getPipe().then(pipe => {
			return getConfig().then(config => {
				return {pipe, config};
			});
		}).then(({config, pipe}) => {
			return commands[cmd](config, pipe, allScripts, program.file);
		}).then(result => {
			if(result){
				if(program.pretty){
					result = JSON.parse(result);
					result = JSON.stringify(result, null, '\t');
				}
				process.stdout.write(result + '\n');
			}
			process.exit(0);
		}, err => {
			console.error(err);
			process.exit(1);
		});
	};
}

module.exports = getExecuter;
