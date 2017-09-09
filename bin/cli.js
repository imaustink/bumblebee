#!/usr/bin/env node
const program = require('commander');
const executer = require('../lib/executer');
const package = require('../package');
const config = require('../lib/configuration');

program
	.version(package.version)
	.option('-f, --file [file]', 'Path to input file to be passed to transformation(s)')
	.option('-p, --pretty', 'Indent JSON output');

program
	.command('run <script> [moreScripts...]')
	.description('Execute transformation(s).')
	.action(executer('run', program));

program
	.command('add <name>')
	.description('Create new transformation script')
	.action(executer('add', program));
	
program
	.parse(process.argv);

if(!program.args.length){
	if(!config.ready){
		config.init();
	}else{
		program.outputHelp();
		process.exit(0);
	}
}
