const test = require('ava');
const run = require('../lib/run');
const path = require('path');
const fs = require('fs');

const TEST_CONFIG = {
	external_scripts_path: path.join(__dirname, 'test-scripts')
};
const TEST_STRING = 'The cake is a lie!';
const TEST_JSON_FILE_PATH = path.join(__dirname, 'fixtures', 'test-file.json');
const TEST_TEXT_FILE_PATH = path.join(__dirname, 'fixtures', 'test-file.txt');
const TEST_JSON_FILE = fs.readFileSync(TEST_JSON_FILE_PATH, 'utf8');
const TEST_TEXT_FILE = fs.readFileSync(TEST_TEXT_FILE_PATH, 'utf8');

test('returning a string', t => {
	let pipe = TEST_STRING;
	let transformations = ['glados'];
	return run(TEST_CONFIG, pipe, transformations).then(result => {
		t.is(result, 'The cake is delicious!');
	});
});

test('returning an object', t => {
	let pipe = '{"foo":true}';
	let transformations = ['parse-json'];
	return run(TEST_CONFIG, pipe, transformations).then(result => {
		t.is(result, pipe);
	});
});

test('returning a promise', t => {
	let pipe = TEST_STRING;
	let transformations = ['promise-resolve'];
	return run(TEST_CONFIG, pipe, transformations).then(result => {
		t.is(result, pipe);
	});
});

test('providing a plain text file', t => {
	let pipe = '';
	let transformations = ['return-file'];
	return run(TEST_CONFIG, pipe, transformations, TEST_TEXT_FILE_PATH).then(result => {
		t.is(result, TEST_TEXT_FILE);
	});
});

test('providing a JSON file', t => {
	let pipe = '';
	let transformations = ['file-is-object'];
	return run(TEST_CONFIG, pipe, transformations, TEST_JSON_FILE_PATH).then(result => {
		t.is(result, TEST_JSON_FILE.trim());
	});
});
