#!/usr/bin/env node
const program = require('commander');
const getExecuter = require('../lib/get-executer');
const package = require('../package');

program
	.version(package.version)
	.option('-f, --file [file]', 'Path to input file to be passed to transformation(s)')
	.option('-p, --pretty', 'Indent JSON output');

program
	.command('run <script> [moreScripts...]')
	.description('Execute transformation(s).')
	.action(getExecuter('run', program));

program
	.command('add <name>', null)
	.description('Create new transformation script')
	.action(getExecuter('add', program));
	
program
	.parse(process.argv);
