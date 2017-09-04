module.exports = function({pipe, file}){
	return JSON.parse(pipe || file).join('');
};
