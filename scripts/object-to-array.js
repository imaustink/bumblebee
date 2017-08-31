module.exports = ({file, pipe}) => {
	let output = [];
	for(let item in file){
		output.push(item);
	}
	return output;
};
