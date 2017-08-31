module.exports = function({pipe, file}){
	let map = JSON.parse(file);
	for(var key in map){
		if(map.hasOwnProperty(key)){
			pipe = pipe.replace(key, map[key]);
		}
	}
	return pipe;
};
