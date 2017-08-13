#!/usr/bin/env node
const program = require('commander');
const executer = require('../index');
const getPipe = require('../lib/stdin');
const package = require('../package');

program
	.version(package.version)
	.option(`-s, --script [module]`, `Name of script to handle transformation`)
	.option(`-f, --file [file]`, `Path to input file to be passed to transformation`)
	.parse(process.argv);

// TODO This has become a bloody mess
new Promise(reslove => {
	if(!process.stdin.isTTY){
		return getPipe().then(reslove);
	}
	reslove(null);
}).then(pipe => {
	// TODO check all inputs
	executer(program, pipe).then(result => {
		if(result) {
			process.stdout.write(result + '\n');
		}
		process.exit(0);
	}, err => {
		console.error(err);
		process.exit(1);
	});
});
