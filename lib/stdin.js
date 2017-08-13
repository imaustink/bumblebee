let data = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	let chunk = process.stdin.read();
	if(chunk !== null){
		data += chunk;
	}
});
module.exports = function(){
	return new Promise(resolve => {
		process.stdin.on('end', () => {
			resolve(data.trim());
		});
	});
};
