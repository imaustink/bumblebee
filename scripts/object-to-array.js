module.exports = ({file, pipe}) => {
	return Object.keys(file || JSON.parse(pipe)).map(key => file[key]);
};
